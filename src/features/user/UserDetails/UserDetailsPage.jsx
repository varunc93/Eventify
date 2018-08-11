import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { firestoreConnect, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux';
import UserDetailsHeader from './UserDetailsHeader';
import UserDetailsDescription from './UserDetailsDescription';
import UserDetailsPhotos from './UserDetailsPhotos';
import UserDetailsSidebar from './UserDetailsSidebar';
import UserDetailsEvents from './UserDetailsEvents';
import { userDetailsQuery } from '../userQueries';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { getUserEvents } from '../userActions';

const mapStateToProps = (state, ownProps) => {
  let userUid = null;
  let profile = {};

  if (ownProps.match.params.id === state.auth.uid) {
    profile = state.firebase.profile
  } else {
    profile = !isEmpty(state.firestore.ordered.profile) && state.firestore.ordered.profile[0];
    userUid = ownProps.match.params.id;
  }
  return {
    profile,
    userUid,
    events: state.events,
    eventsLoading: state.async.loading,
    auth: state.firebase.auth,
    photos: state.firestore.ordered.photos,
    requesting: state.firestore.status.requesting
  }
}

const mapDispatchToProps = {
  getUserEvents
}

class UserDetailsPage extends Component {

  changeTab = (e, data) => {
    this.props.getUserEvents(this.props.userUid, data.activeIndex);
  }

  render() {
    const { profile, photos, auth, match, requesting, events, eventsLoading } = this.props;
    const isCurrentUser = auth.uid === match.params.id;
    const loading = Object.values(requesting).some(a => a === true);

    if (loading) return <LoadingComponent inverted={true} />
    return (
      <Grid>
        <UserDetailsHeader profile={profile} />
        <UserDetailsDescription profile={profile} />
        <UserDetailsSidebar isCurrentUser={isCurrentUser} />
        {photos && photos.length > 0 &&
          <UserDetailsPhotos photos={photos} />}
        <UserDetailsEvents events={events} eventsLoading={eventsLoading} changeTab={this.changeTab}/>
      </Grid>
    );
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((auth, userUid) => userDetailsQuery(auth, userUid)),
)(UserDetailsPage);

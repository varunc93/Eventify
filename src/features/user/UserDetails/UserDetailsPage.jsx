import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { firestoreConnect, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux'
import UserDetailsHeader from './UserDetailsHeader'
import UserDetailsDescription from './UserDetailsDescription'
import UserDetailsPhotos from './UserDetailsPhotos'
import UserDetailsSidebar from './UserDetailsSidebar'
import UserDetailsEvents from './UserDetailsEvents'
import { userDetailsQuery } from '../userQueries'
import LoadingComponent from '../../../app/layout/LoadingComponent'

const mapState = (state, ownProps) => {
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
    auth: state.firebase.auth,
    photos: state.firestore.ordered.photos,
    requesting: state.firestore.status.requesting
  }
}

class UserDetailsPage extends Component {
  render() {
    const { profile, photos, auth, match, requesting } = this.props;
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
        <UserDetailsEvents />
      </Grid>
    );
  }
}

export default compose(
  connect(mapState),
  firestoreConnect((auth, userUid) => userDetailsQuery(auth, userUid)),
)(UserDetailsPage);

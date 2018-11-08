import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { firestoreConnect, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux';
import { toastr } from 'react-redux-toastr';
import UserDetailsHeader from './UserDetailsHeader';
import UserDetailsDescription from './UserDetailsDescription';
import UserDetailsPhotos from './UserDetailsPhotos';
import UserDetailsSidebar from './UserDetailsSidebar';
import UserDetailsEvents from './UserDetailsEvents';
import { userDetailsQuery } from '../userQueries';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { getUserEvents, followUser, unfollowUser } from '../userActions';

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
    requesting: state.firestore.status.requesting,
    following: state.firestore.ordered.following
  }
}

const mapDispatchToProps = {
  getUserEvents,
  followUser,
  unfollowUser
}

class UserDetailsPage extends Component {

  async componentDidMount() {
    let user = await this.props.firestore.get(`users/${this.props.match.params.id}`);
    if(!user.exists){
      toastr.error('Not found', 'The user you are looking for is not present in the database');
      this.props.history.push('/error');
    }
    await this.props.getUserEvents(this.props.userUid);
  }

  changeTab = (e, data) => {
    this.props.getUserEvents(this.props.userUid, data.activeIndex)
  }

  render() {
    const {profile, photos, auth, match, requesting, events, eventsLoading, followUser, following, unfollowUser} = this.props;
    const isCurrentUser = auth.uid === match.params.id;
    const loading = requesting[`users/${match.params.id}`];
    const isFollowing = !isEmpty(following)

    if (loading) return <LoadingComponent inverted={true}/>
    return (
      <Grid>
        <UserDetailsHeader profile={profile}/>
        <UserDetailsDescription profile={profile}/>
        <UserDetailsSidebar unfollowUser={unfollowUser} isFollowing={isFollowing} profile={profile} followUser={followUser} isCurrentUser={isCurrentUser}/>
        {photos && photos.length > 0 &&
        <UserDetailsPhotos photos={photos}/>}
        <UserDetailsEvents changeTab={this.changeTab} events={events} eventsLoading={eventsLoading}/>
      </Grid>
    );
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((auth, userUid, match) => userDetailsQuery(auth, userUid, match)),
)(UserDetailsPage);

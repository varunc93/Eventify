import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import SettingsNav from './SettingsNav';
import BasicPage from './BasicPage';
import AboutPage from './AboutPage';
import PhotosPage from './PhotosPage';
import AccountPage from './AccountPage';
import { updatePassword } from '../../auth/authActions';
import { updateProfile } from '../userActions';

const mapStateToProps = (state) => ({
    providerId: state.firebase.auth.providerData[0].providerId,
    user: state.firebase.profile
})

const mapDispatchToProps = {
    updatePassword,
    updateProfile
}

const SettingsDashboard = ({ updatePassword, providerId, user, updateProfile }) => {
    return (
        <Grid>
            <Grid.Column width={12}>
                <Switch>
                    <Redirect exact from="/settings" to="settings/basic"></Redirect>
                    <Route
                        path="/settings/basic"
                        render={() => <BasicPage updateProfile={updateProfile} initialValues={user} />} >
                    </Route>
                    <Route
                        path="/settings/about"
                        render={() => <AboutPage updateProfile={updateProfile} initialValues={user} />}>
                    </Route>
                    <Route path="/settings/photos" component={PhotosPage}></Route>
                    <Route
                        path="/settings/account"
                        render={() => <AccountPage updatePassword={updatePassword} providerId={providerId} />}>
                    </Route>
                </Switch>
            </Grid.Column>
            <Grid.Column width={4}>
                <h1>Nav</h1>
                <SettingsNav />
            </Grid.Column>
        </Grid>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsDashboard);
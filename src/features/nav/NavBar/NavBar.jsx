import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { Menu, Container, Button } from 'semantic-ui-react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import SignOutMenu from '../Menus/SignOutMenu';
import SignInMenu from '../Menus/SignInMenu';
import { openModal } from '../../modals/modalActions';

const mapStateToProps = (state) => ({
    auth: state.firebase.auth
})

const mapDispatchToProps = {
    openModal,
}
class NavBar extends Component {
    constructor(props) {
        super(props);

        this.handleSignOut = this.handleSignOut.bind(this);
    }

    handleSignIn = () => {
        this.props.openModal('LoginModal');
    }

    handleRegister = () => {
        this.props.openModal('RegisterModal');
    }

    handleSignOut() {
        this.props.firebase.logout();
        this.props.history.push("/");
    }

    render() {
        const { auth } = this.props;
        const authenticated = auth.isLoaded && !auth.isEmpty;
        return (
            <Menu inverted fixed="top">
                <Container>
                    <Menu.Item as={Link} to="/">
                        <img src="/assets/images/logo.png" alt="logo" />
                        Eventify
                </Menu.Item>
                    <Menu.Item as={NavLink} to="/events" name="Events" />
                    {authenticated && <Menu.Item as={NavLink} to="/people" name="People" />}
                    {authenticated &&
                        <Menu.Item>
                            <Button as={Link} to="/createEvent" floated="right" positive inverted content="Create Event" />
                        </Menu.Item>}
                    {
                        authenticated ?
                            <SignInMenu auth={auth} signOut={this.handleSignOut} />
                            :
                            <SignOutMenu signIn={this.handleSignIn} register={this.handleRegister} />
                    }
                </Container>
            </Menu>
        )
    }
}

export default withRouter(withFirebase(connect(mapStateToProps, mapDispatchToProps)(NavBar)));
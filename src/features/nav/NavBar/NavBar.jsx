import React, { Component } from 'react';
import {Menu, Container, Button  } from 'semantic-ui-react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import SignOutMenu from '../Menus/SignOutMenu';
import SignInMenu from '../Menus/SignInMenu';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false
        }

        this.handleSignOut = this.handleSignOut.bind(this);
    }

    handleSignIn = () => {
        this.setState({
            authenticated: true
        });
    }

    handleSignOut() {
        this.setState({
            authenticated: false
        });
        this.props.history.push("/");
    }

    render() {
        const { authenticated } = this.state;
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
                </Menu.Item> }
                {authenticated ? <SignInMenu signOut={this.handleSignOut}/> : <SignOutMenu signIn={this.handleSignIn}/>}
                </Container>
            </Menu>
        )
    }
}

export default withRouter(NavBar);
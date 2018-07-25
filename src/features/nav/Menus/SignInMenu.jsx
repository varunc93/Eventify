import React from 'react';
import { Menu, Image, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const SignInMenu = ({signOut, profile}) => (
    <Menu.Item position="right">
        <Image avatar spaced="right" src={ profile.photoURL || '/assets/images/user.png' } />
        <Dropdown pointing="top left" text={ profile.displayName }>
            <Dropdown.Menu>
                <Dropdown.Item text="Create Event" icon="plus" />
                <Dropdown.Item text="My Events" icon="calendar" />
                <Dropdown.Item text="My Network" icon="users" />
                <Dropdown.Item text="My Profile" icon="user" />
                <Dropdown.Item as={Link} to="/settings" text="Settings" icon="settings" />
                <Dropdown.Item onClick={signOut} text="Sign Out" icon="power" />
            </Dropdown.Menu>
        </Dropdown>
    </Menu.Item>
);

export default SignInMenu;
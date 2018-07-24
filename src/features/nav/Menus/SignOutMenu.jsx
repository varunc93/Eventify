import React from 'react';
import { Menu, Button } from 'semantic-ui-react';

const SignOutMenu = ({ signIn, register }) => (
    <Menu.Item position="right">
        <Button onClick={signIn} basic inverted content="Login" />
        <Button onClick={register} basic inverted content="Register" style={{ marginLeft: '0.5em' }} />
    </Menu.Item>
);

export default SignOutMenu;
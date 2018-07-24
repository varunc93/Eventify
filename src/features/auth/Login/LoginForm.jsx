import React from 'react';
import { connect } from 'react-redux';
import { Form, Segment, Button, Label } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../../app/common/form/TextInput';
import { login } from '../authActions';

const mapDispatchToProps = {
    login
}

const LoginForm = ({ login, handleSubmit, error }) => {
    return (
        <Form size="large" onSubmit={handleSubmit(login)}>
            {error && <Label basic color='red'>{error}</Label>}
            <Segment>
                <Field
                    name="email"
                    component={TextInput}
                    type="text"
                    placeholder="Email Address"
                />
                <Field
                    name="password"
                    component={TextInput}
                    type="password"
                    placeholder="password"
                />
                <Button fluid size="large" color="teal">
                    Login
        </Button>
            </Segment>
        </Form>
    );
};

export default connect(null, mapDispatchToProps)(reduxForm({ form: 'loginForm' })(LoginForm));
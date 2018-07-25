import React from 'react';
import { connect } from 'react-redux';
import { combineValidators, isRequired } from 'revalidate';
import { Form, Segment, Button, Label, Divider } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../../app/common/form/TextInput';
import { registerUser } from '../authActions';
import SocialLogin from '../SocialLogin/SocialLogin';

const mapDispatchToProps = {
    registerUser
}

const validate = combineValidators({
    displayName: isRequired('Display Name'),
    email: isRequired('Email'),
    password: isRequired('Password')
})

const RegisterForm = ({ handleSubmit, registerUser, error, invalid, submitting }) => {
    return (
        <div>
            <Form size="large" onSubmit={handleSubmit(registerUser)}>
                {error && <Label basic color='red'>{error}</Label>}
                <Segment>
                    <Field
                        name="displayName"
                        type="text"
                        component={TextInput}
                        placeholder="Username"
                    />
                    <Field
                        name="email"
                        type="text"
                        component={TextInput}
                        placeholder="Email"
                    />
                    <Field
                        name="password"
                        type="password"
                        component={TextInput}
                        placeholder="Password"
                    />
                    <Button disabled={invalid || submitting} fluid size="large" color="teal">Register</Button>
                    <Divider horizontal>Or</Divider>
                    <SocialLogin />
                </Segment>
            </Form>
        </div>
    );
};

export default connect(null, mapDispatchToProps)(reduxForm({ form: 'registerForm', validate })(RegisterForm));
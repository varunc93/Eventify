import React from 'react';
import { connect } from 'react-redux';
import { combineValidators, isRequired } from 'revalidate';
import { Form, Segment, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../../app/common/form/TextInput';
import { registerUser } from '../authActions';

const mapDispatchToProps = {
    registerUser
}

const RegisterForm = ({handleSubmit, registerUser}) => {
    return (
        <div>
            <Form size="large" onSubmit={handleSubmit(registerUser)}>
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
                    <Button fluid size="large" color="teal">
                        Register
          </Button>
                </Segment>
            </Form>
        </div>
    );
};

export default connect(null, mapDispatchToProps)(reduxForm({form: 'registerForm'})(RegisterForm));
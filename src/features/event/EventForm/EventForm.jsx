/* global google */
import React, { Component } from 'react';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Script from 'react-load-script';
import { reduxForm, Field } from 'redux-form';
import { composeValidators, combineValidators, isRequired, hasLengthGreaterThan } from 'revalidate';
import { createEvent, updateEvent, cancelToggle } from '../eventActions';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from '../../../app/common/form/SelectInput';
import DateInput from '../../../app/common/form/DateInput';
import PlaceInput from '../../../app/common/form/PlaceInput';

const mapStateToProps = (state, ownProps) => {

    let event = {};

    if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
        event = state.firestore.ordered.events[0];
    }

    return {
        initialValues: event,
        event
    }
}

const mapDispatchToProps = {
    createEvent,
    updateEvent,
    cancelToggle
}

const category = [
    { key: 'drinks', text: 'Drinks', value: 'drinks' },
    { key: 'culture', text: 'Culture', value: 'culture' },
    { key: 'film', text: 'Film', value: 'film' },
    { key: 'food', text: 'Food', value: 'food' },
    { key: 'music', text: 'Music', value: 'music' },
    { key: 'travel', text: 'Travel', value: 'travel' },
];

const validate = combineValidators({
    title: isRequired({ message: "The event title is a required field" }),
    category: isRequired({ message: "Please provide an event category" }),
    description: composeValidators(
        isRequired({ message: "Please enter a description " }),
        hasLengthGreaterThan(4)({ message: "Description needs at least 5 characters" })
    )(),
    city: isRequired('City'),
    venue: isRequired('Venue'),
    date: isRequired('Date')
})

class EventForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cityLatLng: {},
            venueLatLng: {},
            scriptLoaded: false
        }
    }

    async componentDidMount() {
        const { firestore, match } = this.props;
        await firestore.setListener(`events/${match.params.id}`);
    }

    async componentWillUnmount() {
        const { firestore, match } = this.props;
        await firestore.unsetListener(`events/${match.params.id}`);
    }

    handleCitySelect = (selectedCity) => {
        geocodeByAddress(selectedCity)
            .then(results => getLatLng(results[0]))
            .then(latlng => {
                this.setState({
                    cityLatLng: latlng
                })
            })
            .then(() => {
                this.props.change('city', selectedCity);
            })
    }

    handleVenueSelect = (selectedVenue) => {
        geocodeByAddress(selectedVenue)
            .then(results => getLatLng(results[0]))
            .then(latlng => {
                this.setState({
                    venueLatLng: latlng
                })
            })
            .then(() => {
                this.props.change('venue', selectedVenue);
            })
    }

    handleScriptLoaded = () => {
        this.setState({
            scriptLoaded: true
        })
    }

    onFormSubmit = (values) => {
        values.venueLatLng = this.state.venueLatLng;
        if (this.props.initialValues.id) {
            if(Object.keys(values.venueLatLng).length === 0){
                values.venueLatLng = this.props.event.venueLatLng;
            }
            this.props.updateEvent(values);
            this.props.history.goBack();
        }
        else {
            this.props.createEvent(values);
            this.props.history.push('/events');
        }
    }

    render() {
        const { invalid, submitting, pristine, event, cancelToggle } = this.props;
        return (
            <Grid>
                <Script url="https://maps.googleapis.com/maps/api/js?key=AIzaSyC0CSi7BBxMF3aORIwq0hcpDzmLn_9_200&libraries=places" onLoad={this.handleScriptLoaded}></Script>
                <Grid.Column width={10}>
                    <Segment>
                        <Header sub color='teal' content='Event Details'></Header>
                        <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
                            <Field name='title' type='text' component={TextInput} placeholder='Event Title' />
                            <Field name='category' type='text' component={SelectInput} options={category} placeholder='Event Category' />
                            <Field name='description' type='text' rows={3} component={TextArea} placeholder='Event Description' />
                            <Header sub color='teal' content='Event Location Details'></Header>
                            <Field
                                name='city'
                                type='text'
                                component={PlaceInput}
                                options={{ types: ['(cities)'] }}
                                placeholder='Event City'
                                onSelect={this.handleCitySelect}
                            />
                            {this.state.scriptLoaded &&
                                <Field
                                    name='venue'
                                    type='text'
                                    component={PlaceInput}
                                    options={{
                                        location: new google.maps.LatLng(this.state.cityLatLng),
                                        radius: 1000,
                                        types: ['establishment']
                                    }
                                    }
                                    placeholder='Event Venue'
                                    onSelect={this.handleVenueSelect}
                                />
                            }
                            <Field
                                name='date'
                                type='text'
                                component={DateInput}
                                dateFormat="YYYY-MM-DD HH:mm"
                                timeFormat="HH:mm"
                                showTimeSelect
                                placeholder='Event Date & Time'
                            />
                            <Button disabled={invalid || submitting || pristine} positive type="submit">Submit</Button>
                            <Button onClick={this.props.history.goBack} type="button">Cancel</Button>
                            <Button
                                onClick={() => cancelToggle(!event.cancelled, event.id)}
                                type='button'
                                color={event.cancelled ? 'green' : 'red'}
                                floated='right'
                                content={event.cancelled ? 'Re-initiate Event' : 'Cancel event'}
                            >
                            </Button>
                        </Form>
                    </Segment>
                </Grid.Column>
            </Grid >
        )
    }
}

export default withFirestore(connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'eventForm', enableReinitialize: true, validate })(EventForm)));

import React, { Component } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { createEvent, updateEvent } from '../eventActions';
import cuid from 'cuid';

const mapStateToProps = (state, ownProps) => {
    const eventId = ownProps.match.params.id;

    let event = {
        title: '',
        date: '',
        city: '',
        venue: '',
        hostedBy: ''
    };

    if(eventId && state.events.length > 0){
        event = state.events.filter(event => event.id === eventId)[0]
    }

    return {
        event
    }
}

const mapDispatchToProps = {
    createEvent,
    updateEvent
}

class EventForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            event: Object.assign({}, this.props.event)
        };
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        if (this.state.event.id) {
            this.props.updateEvent(this.state.event);
            this.props.history.goBack();
        }
        else {
            const newEvent = {
                ...this.state.event,
                id: cuid(),
                hostPhotoURL: '/assets/images/user.png'
            }
            this.props.createEvent(newEvent);
            this.props.history.push('/events');
        }
    }

    onChange = (e) => {
        const newEvent = this.state.event;
        newEvent[e.target.name] = e.target.value;
        this.setState({
            event: newEvent
        });
    }


    render() {
        const { event } = this.state;
        return (
            <Segment>
                <Form onSubmit={this.onFormSubmit}>
                    <Form.Field>
                        <label>Event Title</label>
                        <input name="title" onChange={this.onChange} value={event.title} placeholder="Event Title" />
                    </Form.Field>
                    <Form.Field>
                        <label>Event Date</label>
                        <input type="date" name="date" onChange={this.onChange} value={event.date} placeholder="Event Date" />
                    </Form.Field>
                    <Form.Field>
                        <label>City</label>
                        <input name="city" placeholder="City event is taking place" value={event.city} onChange={this.onChange} />
                    </Form.Field>
                    <Form.Field>
                        <label>Venue</label>
                        <input name="venue" placeholder="Enter the Venue of the event" value={event.venue} onChange={this.onChange} />
                    </Form.Field>
                    <Form.Field>
                        <label>Hosted By</label>
                        <input name="hostedBy" placeholder="Enter the name of person hosting" value={event.hostedBy} onChange={this.onChange} />
                    </Form.Field>
                    <Button positive type="submit">
                        Submit
                  </Button>
                    <Button onClick={this.props.history.goBack} type="button">Cancel</Button>
                </Form>
            </Segment>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventForm);

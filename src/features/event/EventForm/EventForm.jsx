import React, { Component } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';

class EventForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            event: {
                title: '',
                date: '',
                city: '',
                venue: '',
                hostedBy: ''
            }
        }
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        this.props.createEvent(this.state.event);
    }

    onChange = (e) => {
        const newEvent = this.state.event;
        newEvent[e.target.name] = e.target.value;
        this.setState({
            event: newEvent
        });
    }


    render() {
        const {handleFormCancel} = this.props;
        const {event} = this.state;
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
                        <input name="city" placeholder="City event is taking place" value={event.city} onChange={this.onChange}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Venue</label>
                        <input name="venue" placeholder="Enter the Venue of the event" value={event.venue} onChange={this.onChange}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Hosted By</label>
                        <input name="hostedBy" placeholder="Enter the name of person hosting" value={event.hostedBy} onChange={this.onChange}/>
                    </Form.Field>
                    <Button positive type="submit">
                        Submit
                  </Button>
                    <Button onClick={handleFormCancel} type="button">Cancel</Button>
                </Form>
            </Segment>
        )
    }
}

export default EventForm;

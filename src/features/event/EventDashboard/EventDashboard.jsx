import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import { deleteEvent } from '../eventActions';

const mapStateToProps = (state) => ({
    events: state.events
});


const mapDispatchToProps = {
    deleteEvent
}

class EventDashboard extends Component {

    //this.handleFormOpen = this.handleFormOpen.bind(this); We can define the functions as arrow functions instead which automatically binds them.

    handleDeleteEvent = (eventId) => () => {
        this.props.deleteEvent(eventId);
    }

    render() {
        const { events } = this.props;
        return (
            <Grid>
                <Grid.Column width={10}>
                    <EventList
                        deleteEvent={this.handleDeleteEvent}
                        events={events} />
                </Grid.Column>
                <Grid.Column width={6}>
                </Grid.Column>
            </Grid>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDashboard);
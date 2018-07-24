import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Grid } from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import { deleteEvent } from '../eventActions';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import EventActivity from '../EventActivity/EventActivity';

const mapStateToProps = (state) => ({
    events: state.firestore.ordered.events,
    loading: state.async.loading
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
        const { events, loading } = this.props;
        if(loading)
            return <LoadingComponent inverted={true} />
        return (
            <Grid>
                <Grid.Column width={10}>
                    <EventList
                        deleteEvent={this.handleDeleteEvent}
                        events={events} />
                </Grid.Column>
                <Grid.Column width={6}>
                    <EventActivity />
                </Grid.Column>
            </Grid>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(firestoreConnect([{collection: 'events'}])(EventDashboard));
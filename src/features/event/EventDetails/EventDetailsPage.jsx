import React from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import EventDetailsHeader from './EventDetailsHeader';
import EventDetailsInfo from './EventDetailsInfo';
import EventDetailsChat from './EventDetailsChat';
import EventDetailsSidebar from './EventDetailsSidebar';

const mapStateToProps = (state, ownProps) => {
    const eventId = ownProps.match.params.id;

    let event = {};

    if(eventId && state.events.length > 0){
        event = state.events.filter(event => event.id === eventId)[0];
    }

    return {
        event
    }
}

const EventDetailsPage = ({event}) => {
    return (
        <div>
            <Grid>
                <Grid.Column width={10}>
                    <EventDetailsHeader event={event}/>
                    <EventDetailsInfo event={event}/>
                    <EventDetailsChat />
                </Grid.Column>
                <Grid.Column width={6}>
                    <EventDetailsSidebar attendees={event.attendees}/>
                </Grid.Column>
            </Grid>
        </div>
    )

}

export default connect(mapStateToProps)(EventDetailsPage);
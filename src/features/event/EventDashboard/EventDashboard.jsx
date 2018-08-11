import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Grid, Loader } from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import { getEventsForDashboard } from '../eventActions';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import EventActivity from '../EventActivity/EventActivity';

const mapStateToProps = (state) => ({
    events: state.events,
    loading: state.async.loading
});


const mapDispatchToProps = {
    getEventsForDashboard
}

class EventDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moreEvents: false,
            loadingInitial: true,
            loadedEvents: []
        }
    }

    async componentDidMount() {
        let next = await this.props.getEventsForDashboard();

        if (next && next.docs && next.docs.length > 1) {
            this.setState({
                moreEvents: true,
                loadingInitial: false
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.events !== nextProps.events){
            this.setState({
                loadedEvents: [...this.state.loadedEvents, ...nextProps.events]
            })
        }
    }

    getNextEvents = async () => {
        const { events } = this.props;
        let lastEvent = events && events[events.length - 1];
        let next = await this.props.getEventsForDashboard(lastEvent);

        if (next && next.docs && next.docs.length <= 1) {
            this.setState({
                moreEvents: false
            })
        }
    }

    //this.handleFormOpen = this.handleFormOpen.bind(this); We can define the functions as arrow functions instead which automatically binds them.

    render() {
        const { loading } = this.props;
        const { loadedEvents, moreEvents } = this.state;
        if (this.state.loadingInitial)
            return <LoadingComponent inverted={true} />
        return (
            <Grid>
                <Grid.Column width={10}>
                    <EventList
                        loading={loading}
                        moreEvents={moreEvents}
                        events={loadedEvents}
                        getNextEvents={this.getNextEvents} />
                </Grid.Column>
                <Grid.Column width={6}>
                    <EventActivity />
                </Grid.Column>
                <Grid.Column width={10}>
                    <Loader active={loading}></Loader>
                </Grid.Column>
            </Grid>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(firestoreConnect([{ collection: 'events' }])(EventDashboard));
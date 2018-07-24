import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { Route, Switch } from 'react-router-dom';
import EventDashboard from '../../features/event/EventDashboard/EventDashboard';
import NavBar from '../../features/nav/NavBar/NavBar';
import EventForm from '../../features/event/EventForm/EventForm';
import SettingsDashboard from '../../features/user/Settings/SettingsDashboard';
import EventDetailsPage from '../../features/event/EventDetails/EventDetailsPage';
import PeopleDashboard from '../../features/user/PeopleDashboard/PeopleDashboard';
import UserDetails from '../../features/user/UserDetails/UserDetailsPage';
import HomePage from '../../features/home/HomePage';
import PageNotFound from '../../features/pageNotFound/PageNotFound';
import ModalManager from '../../features/modals/ModalManager';

class App extends Component {
	render() {
		return (
			<div>
				<ModalManager />
				<Switch>
					<Route exact={true} path="/" component={HomePage}></Route>
				</Switch>

				<Route path="/(.+)" render={() => (
					<div>
						<NavBar />
						<Container className="main"	>
							<Switch>
								<Route path="/events" component={EventDashboard}></Route>
								<Route path="/event/:id" component={EventDetailsPage}></Route>
								<Route path="/manage/:id" component={EventForm}></Route>
								<Route path="/people" component={PeopleDashboard}></Route>
								<Route path="/profile/:id" component={UserDetails}></Route>
								<Route path="/settings" component={SettingsDashboard}></Route>
								<Route path="/createEvent" component={EventForm}></Route>
								<Route component={PageNotFound} />
							</Switch>
						</Container>
					</div>)}>
				</Route>
			</div>
		);
	}
}

export default App;

import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { Route, Switch } from 'react-router-dom';
import EventDashboard from '../../features/event/EventDashboard/EventDashboard';
import NavBar from '../../features/nav/NavBar/NavBar';
import EventForm from '../../features/event/EventForm/EventForm';
import SettingsDashboard from '../../features/user/Settings/SettingsDashboard';
import UserDetailsPage from '../../features/user/UserDetails/UserDetailsPage';
import PeopleDashboard from '../../features/user/PeopleDashboard/PeopleDashboard';
import EventDetailsPage from '../../features/event/EventDetails/EventDetailsPage';
import HomePage from '../../features/home/HomePage';
import ModalManager from '../../features/modals/ModalManager';
import { UserIsAuthenticated } from '../../features/auth/authWrapper';

class App extends Component {
  render() {
    return (
      <div>
        <ModalManager/>
        <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>

        <Route
          path="/(.+)"
          render={() => (
            <div>
              <NavBar />
              <Container className="main">
                <Switch>
                  <Route path="/events" component={EventDashboard} />
                  <Route path="/event/:id" component={EventDetailsPage} />
                  <Route path="/manage/:id" component={UserIsAuthenticated(EventForm)} />
                  <Route path="/people" component={UserIsAuthenticated(PeopleDashboard)} />
                  <Route path="/profile/:id" component={UserIsAuthenticated(UserDetailsPage)} />
                  <Route path="/settings" component={UserIsAuthenticated(SettingsDashboard)} />
                  <Route path="/createEvent" component={UserIsAuthenticated(EventForm)} />
                </Switch>
              </Container>
            </div>
          )}
        />
      </div>
    );
  }
}

export default App;

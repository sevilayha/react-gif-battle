import React, { Component, Fragment } from 'react';
import { Provider, Subscribe } from 'unstated';
import AuthContainer from './state/AuthContainer';
import Header from './components/Header';
import CreateGif from './components/CreateGif';
import BattleGifs from './components/BattleGifs';
import Leaderboard from './components/Leaderboard';
import 'bulma/css/bulma.css';
import './App.css';

/**
 * Main app component
 */
class App extends Component {
  componentDidMount() {
    this.props.handleAuthentication();
  }

  render() {
    const { isAuthenticated, login, logout } = this.props;

    return (
      <Fragment>
        <Header
          isAuthenticated={isAuthenticated}
          login={login}
          logout={logout}
        />
        <CreateGif isAuthenticated={isAuthenticated} login={login} />
        <BattleGifs />
        <Leaderboard />
      </Fragment>
    );
  }
}

/**
 * Wrapper to pass down unstated things
 */
const AppWrapper = () => (
  <Provider>
    <Subscribe to={[AuthContainer]}>
      {auth => (
        <App
          handleAuthentication={auth.handleAuthentication}
          isAuthenticated={auth.state.isAuthenticated}
          login={auth.login}
          logout={auth.logout}
        />
      )}
    </Subscribe>
  </Provider>
);

export default AppWrapper;

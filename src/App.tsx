import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import {
  Router,
  Scene,
  Stack
} from 'react-native-router-flux';
import logger from 'redux-logger';

import movieApp from './redux/reducers';
import Landing from './components/pages/Landing';
import EditMoviePage from './components/pages/EditMoviePage';

const RouterWithRedux = connect()(Router);
const store = createStore(movieApp, applyMiddleware(logger));

export default class App extends Component {
    render() {
        return (
          <Provider store={store}>
            <RouterWithRedux>
              <Stack key='root' hideNavBar>
                <Scene key='home' component={Landing} initial gestureEnabled={false}/>
                <Scene key='editMovie' component={EditMoviePage} />
              </Stack>
            </RouterWithRedux>
          </Provider>
        );
    }
}

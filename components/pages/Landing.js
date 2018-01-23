import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import Header from '../Header';
import { getRoutes } from '../../redux/reducers'
import MovieList from '../MovieList';

class Landing extends Component {

  render() {
    return(
      <View style={{ flex: 1 }}>
        <Header
          headerText={'Movie List'}
        />
        <MovieList />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...getRoutes(state)
  }
}

export default connect(mapStateToProps)(Landing);

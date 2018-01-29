import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import Header from '../Header';
import MovieList from '../MovieList';

class Landing extends Component<any, any> {

  render() {
    return(
      <View style = {{ flex: 1 }}>
        <Header
          headerText={'Movie List'}
        />
        <MovieList />
      </View>
    );
  }
}

export default connect()(Landing);

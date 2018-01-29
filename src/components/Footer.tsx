import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { connect } from 'react-redux';
import Movie from '../model/Movie';

export interface Props {
  movieList: Array<Movie>,
  onPress: () => void
}

class Footer extends Component<Props, any> {
  render() {
    const { movieList = [], onPress } = this.props;
    if (movieList.length > 1) {
      return (
        <View style={style.footer}>
          <TouchableOpacity
            onPress={onPress}
          >
            <FontAwesome style={{fontSize: 24, color: '#FFFFFF'}}>
              {Icons.sortAlphaAsc}
            </FontAwesome>
          </TouchableOpacity>
          <Text style={style.footerLabel}>Sort</Text>
        </View>
      );
    }
    return null;
  }
}

const style = StyleSheet.create({
  footer: {
    alignItems: 'center',
    backgroundColor: '#3366CC',
    paddingTop: 10,
    paddingBottom: 10
  },

  footerLabel: {
    color: '#FFFFFF',
    fontSize: 10
  }
});

function mapStateToProps(state) {
  return {
    movieList: state.movies.movieList
  }
}

export default connect(mapStateToProps)(Footer);

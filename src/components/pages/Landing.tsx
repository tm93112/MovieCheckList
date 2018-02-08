import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import Header from '../Header';
import MovieList from '../MovieList';
import { Store } from '../../redux/reducers';
import Movie from '../../model/Movie';

export interface Props {
  movieList: Array<Movie>;
}

class Landing extends Component<Props, any> {

  render() {
    const { movieList } = this.props;
    const filterIcon = movieList.length > 0;
    return(
      <View style = {{ flex: 1 }}>
        <Header
          headerText={'Movie List'}
          filterIcon={filterIcon}
        />
        <MovieList />
      </View>
    );
  }
}

function mapStateToProps(state: Store) {
  return {
    movieList: state.movies.movieList
  };
}

export default connect(mapStateToProps)(Landing);

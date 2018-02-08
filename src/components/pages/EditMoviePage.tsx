import React, { Component } from 'react';
import { View } from 'react-native';
import Header from '../Header';
import EditForm from '../EditForm';
import Movie from '../../model/Movie';

export interface Props {
  movie: Movie;
}

class EditMoviePage extends Component<Props, any> {

  render() {

    const { movie } = this.props;
    return(
      <View style={{ flex: 1 }}>
        <Header
          headerText={`Edit Details for ${movie.title}`}
          returnIcon={true}
        />
        <EditForm
          movie={movie}
        />
      </View>
    );
  }
}

export default EditMoviePage;

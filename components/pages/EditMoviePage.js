import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Header from '../Header';
import EditForm from '../EditForm';

class EditMoviePage extends Component {

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

EditMoviePage.propTypes = {
  movie: PropTypes.object
}

export default EditMoviePage;

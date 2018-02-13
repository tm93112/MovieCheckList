import React, { Component } from 'react';
import {
  ScrollView,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Linking
} from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Actions } from 'react-native-router-flux';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import axios from 'axios';
import { MovieCheckListState } from '../redux/reducers/movies';
import { updateMovie } from '../redux/actions';
import MovieService from '../services/MovieService';
import Movie from '../model/Movie';

const URL_WITH_KEY = 'https://www.omdbapi.com/?apikey=35756462&i=';

export interface Props {
  movie: Movie;
  update?: (movie: Movie) => any;
}

export interface State {
  editingTitle: boolean;
  editingTrailer: boolean;
  editingIMDB: boolean;
  movie: Movie;
}

type OnChangeTextType = (text: string, fieldName: string, movie: Movie) => void;

type OnSubmitEditingType = OnChangeTextType;

class EditForm extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    const { movie } = props;
    this.state = {
      editingTitle: false,
      editingTrailer: movie.trailerURL === undefined,
      editingIMDB: movie.imdbURL === undefined,
      movie: movie
    }

  }

  parseIMDBurlForID(imdbURL: string) {
    const path = 'title/';
    return imdbURL.substring(imdbURL.indexOf(path) + path.length, imdbURL.indexOf('/?'));
  }

  setValuesFromOMDB(url: string, movie: Movie) {
    try {
      const imdbID = this.parseIMDBurlForID(url);
      movie.imdbID = imdbID;
      this.setDataFromOMDB(movie);
      this.setState({
        movie
      });
    } catch (error) {
      console.log(error);
    }
  }

  renderField(field: string, isEditing: boolean, onChangeText: OnChangeTextType,
    onSubmitEditing: OnSubmitEditingType, fieldName?: string) {
    const { movie } = this.state;
    if (isEditing) {
      return (
        <View style={style.editInput}>
          <TextInput
            value={field}
            returnKeyType='done'
            autoCorrect={false}
            autoFocus={true}
            onChangeText={(text) => onChangeText(text, fieldName, movie)}
            onSubmitEditing={(event) => onSubmitEditing(event.nativeEvent.text, fieldName, movie)}
          />
        </View>
      );
    }
    if (fieldName && field !== null) {
      return (
        <TouchableOpacity
          onPress={() => Linking.openURL(field)}
        >
          <Text style={style.textField}>{field}</Text>
        </TouchableOpacity>
      );
    }
    return (
      <View>
        <Text style={style.textField}>{field}</Text>
      </View>
    );
  }

  onChange(newContent: string, field: string, movie: Movie) {
    switch (field){
      case 'trailer':
        movie.trailerURL = newContent;
        this.setState({
          movie
        });
        break;
      case 'imdb':
        movie.imdbURL = newContent;
        this.setState({
          movie
        });
        break;
      default:
        movie.title = newContent;
        this.setState({
          movie
        })
        break;
    }
  }

  onSubmit(newContent: string, field: string, movie: Movie) {
    if (!newContent) {
      return;
    }
    switch (field) {
      case 'trailer':
        movie.trailerURL = newContent;
        this.setState({
          movie,
          editingTrailer: false
        });
        break;
      case 'imdb':
        movie.imdbURL = newContent;
        this.setState({
          movie,
          editingIMDB: false
        });
        this.setValuesFromOMDB(newContent, movie);
        break;
      default:
        movie.title = newContent;
        this.setState({
          movie,
          editingTitle: false
        });
        break;
    }
  }

  renderLabel(label: string, isEditing: boolean, onEditIconClick: (name: any) => void) {
    const icon = !isEditing
      ? (<TouchableOpacity
          style={{ paddingLeft: 5 }}
          onPress={onEditIconClick}
        >
          <FontAwesome style={{fontSize: 18}}>
            {Icons.edit}
          </FontAwesome>
        </TouchableOpacity>)
    : undefined;
    return (
      <View style={style.withIcon}>
        <Text style={{ fontWeight: 'bold' }}>{label}</Text>
        {icon}
      </View>
    );
  }

  shouldComponentUpdate() {
    return true;
  }

  onEditIconClick(name: string) {
    switch (name) {
      case 'trailer':
        this.setState({
          editingTrailer: true
        });
        break;
      case 'imdb':
        this.setState({
          editingIMDB: true
        });
        break;
      default:
        this.setState({
          editingTitle: true
        });
        break;
    }
  }

  onSave() {
    const {
      movie
    } = this.state;
    const {
      title,
      imdbURL,
      imdbID,
      genres,
      year,
      languages,
      runTime
    } = movie;
    const omdbData = {
      imdbID,
      title,
      genres,
      year,
      languages,
      runTime,
      imdbURL
    };
    movie.omdbData = omdbData;
    this.props.update(movie);
    MovieService.update(movie)
    Actions.home();
  }

  setDataFromOMDB(movie: Movie) {
    const url = `${URL_WITH_KEY}${movie.imdbID}`;
    axios.get(url)
      .then((response) => {
        const genres = response.data.Genre.split(', ');
        const languages = response.data.Language.split(', ');
        const runTime = response.data.Runtime.substring(0, response.data.Runtime.indexOf(' '));
        movie.title = response.data.Title;
        movie.genres = genres;
        movie.year = response.data.Year;
        movie.languages = languages;
        movie.runTime = runTime;
        this.setState({
          movie
        });
      })
      .catch(error => {
        console.log(error)
      });
  }

  render() {
    const { editingTitle, movie, editingIMDB, editingTrailer } = this.state;
    const titleField = this.renderField(movie.title, editingTitle, this.onChange.bind(this), this.onSubmit.bind(this));
    const titleLabel = this.renderLabel('Title', editingTitle, this.onEditIconClick);
    const trailerField = this.renderField(movie.trailerURL, editingTrailer, this.onChange.bind(this), this.onSubmit.bind(this), 'trailer');
    const trailerLabel = this.renderLabel('Link to Trailer', editingTrailer, () => this.onEditIconClick('trailer'));
    const imdbField = this.renderField(movie.imdbURL, editingIMDB, this.onChange.bind(this), this.onSubmit.bind(this), 'imdb');
    const imdbLabel = this.renderLabel('Link to IMDB', editingIMDB, () => this.onEditIconClick('imdb'));
    return(
      <ScrollView style={style.scrollView}>
        <View>
          {titleLabel}
          {titleField}
        </View>
        <View>
          {trailerLabel}
          {trailerField}
        </View>
        <View>
          {imdbLabel}
          {imdbField}
        </View>
        <View>
          <TouchableOpacity
            onPress={this.onSave.bind(this)}
            style={style.saveButtonContainer}
          >
            <Text style={style.saveButton}>Save Details</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const style = StyleSheet.create({
  scrollView: {
    flex: 1,
    flexDirection: 'column',
    padding: 15,
    margin: 15
  },

  withIcon: {
    flexDirection: 'row'
  },

  editInput: {
    padding: 10,
    borderBottomWidth: 1
  },

  textField: {
    fontSize: 17,
    padding: 10
  },

  saveButtonContainer: {
    alignSelf: 'flex-end',
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
    marginTop: 25
  },

  saveButton: {
    fontSize: 20
  }
})

function mapDispatchToProps(dispatch: Dispatch<MovieCheckListState>) {
  return {
    update: (movie: Movie) =>
      dispatch(updateMovie(movie))
  }
}

const fullEditForm =  connect(null, mapDispatchToProps)(EditForm);

export default fullEditForm;

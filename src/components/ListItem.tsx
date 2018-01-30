import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Swipeout from 'react-native-swipeout';
import { deleteMovie } from '../redux/actions';
import Checkbox from './Checkbox';
import MovieService from '../services/MovieService';

export interface Props {
    onCheck: (id: string) => void,
    text: string,
    id: string,
    styling: any,
    disabled: boolean,
    checked: boolean,
    onClickEdit: () => void,
    delete: (id: string) => void
}

class ListItem extends Component<Props, any> {

  constructor(props: Props) {
    super(props);
  }

  onClickDelete = (id: string) => {
    MovieService.delete(id);
    this.props.delete(id);
  }

  render() {
    const { onCheck, text, id, styling,
      disabled, checked, onClickEdit } = this.props;

    const swipeRight = [{
      text: 'Edit',
      backgroundColor: '#f4ce42',
      onPress: onClickEdit
    },
    {
      text: 'Delete',
      backgroundColor: 'red',
      onPress: () => this.onClickDelete(id)
    }];
    return(
      <Swipeout
        right={swipeRight}
        autoClose={true}
        backgroundColor='transparent'
      >
        <View style={styles.listItem}>
          <Checkbox
            onPress={() => onCheck(id)}
            checked={checked}
            disabled={disabled}
          />
          <TouchableOpacity>
            <Text
              style={styling}
              ellipsizeMode={'tail'}
              numberOfLines={1}
            >
              {text}
            </Text>
          </TouchableOpacity>
        </View>
      </Swipeout>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    delete: (id: string) => dispatch(deleteMovie(id))
  }
}

const styles = StyleSheet.create({

  listItem: {
    padding: 15,
    marginRight: 15,
    marginLeft: 15,
    marginBottom: 1,
    flexDirection: 'row',
    backgroundColor: '#EBF9FF',
    borderRadius: 3
  }
});

export default connect(null, mapDispatchToProps)(ListItem);

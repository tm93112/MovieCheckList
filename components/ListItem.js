import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox';

function ListItem({ onCheck, text, id, styling, disabled, checked, onTitleClick }) {
  return(
    <View style={styles.listItem}>
      <Checkbox
        disabled={disabled}
        checked={checked}
        onPress={() => onCheck(id)}
      />
      <TouchableOpacity
        onPress={onTitleClick}
      >
        <Text
          style={[styling, { paddingRight: 20 }]}
          ellipsizeMode={'tail'}
          numberOfLines={1}
        >
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  );
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
  },
});

ListItem.propTypes = {
  onCheck: PropTypes.func,
  text: PropTypes.string,
  id: PropTypes.string,
  styling: PropTypes.number,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  onTitleClick: PropTypes.func,
};

export default ListItem;

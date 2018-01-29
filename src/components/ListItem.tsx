import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Checkbox from './Checkbox';

export interface Props {
    onCheck: (id: string) => void,
    text: string,
    id: string,
    styling: any,
    disabled: boolean,
    checked: boolean,
    onTitleClick: () => void
}

function ListItem({ onCheck, text, id, styling, disabled, checked, onTitleClick }: Props) {
  return(
    <View style={styles.listItem}>
      <Checkbox
        onPress={() => onCheck(id)}
        checked={checked}
        disabled={disabled}
      />
      <TouchableOpacity
        onPress={onTitleClick}
      >
        <Text
          style={styling}
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
  }
});

export default ListItem;

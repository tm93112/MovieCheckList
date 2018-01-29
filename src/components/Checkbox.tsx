import React from 'react';
import { View, TouchableOpacity, StyleSheet} from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';

export interface Props {
    onPress: () => void,
    checked: boolean,
    disabled: boolean
}

function Checkbox({ onPress, checked, disabled }: Props) {
  const iconName = checked ? Icons.checkSquareO : Icons.squareO;
  const color = '#828585';
  return(
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={style.container}
    >
      <View style={style.wrapper}>
        <FontAwesome
          style={{fontSize: 24, color: color}}
        >
          {iconName}
        </FontAwesome>
      </View>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  container: {
    marginRight: 10
  }
});

export default Checkbox;

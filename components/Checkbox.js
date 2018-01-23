import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, StyleSheet} from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';

function Checkbox({ onPress, checked, disabled }) {
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
    alignItems: 'center',
  },

  container: {
    marginRight: 10
  }
});

Checkbox.propTypes = {
  onPress: PropTypes.func,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
}

export default Checkbox;

import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
function Checkbox({ onPress, checked, disabled }) {
    const iconName = checked ? Icons.checkSquareO : Icons.squareO;
    const color = '#828585';
    return (React.createElement(TouchableOpacity, { onPress: onPress, disabled: disabled, style: style.container },
        React.createElement(View, { style: style.wrapper },
            React.createElement(FontAwesome, { style: { fontSize: 24, color: color } }, iconName))));
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
//# sourceMappingURL=Checkbox.js.map
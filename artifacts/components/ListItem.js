import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Checkbox from './Checkbox';
function ListItem({ onCheck, text, id, styling, disabled, checked, onTitleClick }) {
    return (React.createElement(View, { style: styles.listItem },
        React.createElement(Checkbox, { onPress: () => onCheck(id), checked: checked, disabled: disabled }),
        React.createElement(TouchableOpacity, { onPress: onTitleClick },
            React.createElement(Text, { style: styling, ellipsizeMode: 'tail', numberOfLines: 1 }, text))));
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
//# sourceMappingURL=ListItem.js.map
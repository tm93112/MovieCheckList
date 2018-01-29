import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import NavigationBar from 'react-native-navbar';
import FontAwesome, { Icons } from 'react-native-fontawesome';
function Header({ headerText, returnIcon }) {
    const titleConfig = {
        title: headerText,
        tintColor: '#ffffff',
        style: { fontSize: 20, marginLeft: 40, marginRight: 40 },
        ellipsizeMode: 'tail',
        numberOfLines: 1
    };
    const icon = returnIcon
        ? (React.createElement(TouchableOpacity, { onPress: Actions.home },
            React.createElement(View, { style: { padding: 10 } },
                React.createElement(FontAwesome, { style: { fontSize: 24, color: '#FFFFFF' } }, Icons.arrowLeft))))
        : undefined;
    return (React.createElement(NavigationBar, { title: titleConfig, leftButton: icon, tintColor: '#3366CC' }));
}
export default Header;
//# sourceMappingURL=Header.js.map
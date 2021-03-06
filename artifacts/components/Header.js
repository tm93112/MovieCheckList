import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import NavigationBar from 'react-native-navbar';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { connect } from 'react-redux';
import { toggleFilter, toggleRandom } from '../redux/actions';
class Header extends Component {
    render() {
        const { headerText, returnIcon, toggleFilterModal, filterIcon, randomIcon, toggleRandomModal } = this.props;
        const titleConfig = {
            title: headerText,
            tintColor: '#ffffff',
            style: { fontSize: 20, marginLeft: 40, marginRight: 40 },
            ellipsizeMode: 'tail',
            numberOfLines: 1
        };
        let icon = undefined;
        if (returnIcon) {
            icon = (React.createElement(TouchableOpacity, { onPress: Actions.home },
                React.createElement(View, { style: { padding: 10 } },
                    React.createElement(FontAwesome, { style: { fontSize: 24, color: '#FFFFFF' } }, Icons.arrowLeft))));
        }
        else if (randomIcon) {
            icon =
                (React.createElement(TouchableOpacity, { onPress: () => toggleRandomModal() },
                    React.createElement(View, { style: { padding: 10 } },
                        React.createElement(FontAwesome, { style: { fontSize: 24, color: '#FFFFFF' } }, Icons.random))));
        }
        const filter = filterIcon
            ? (React.createElement(TouchableOpacity, { onPress: () => toggleFilterModal() },
                React.createElement(View, { style: { padding: 10 } },
                    React.createElement(FontAwesome, { style: { fontSize: 24, color: '#FFFFFF' } }, Icons.filter))))
            : undefined;
        return (React.createElement(NavigationBar, { title: titleConfig, leftButton: icon, rightButton: filter, tintColor: '#3366CC' }));
    }
}
function mapDispatchToProps(dispatch) {
    return {
        toggleFilterModal: () => dispatch(toggleFilter()),
        toggleRandomModal: () => dispatch(toggleRandom())
    };
}
export default connect(null, mapDispatchToProps)(Header);
//# sourceMappingURL=Header.js.map
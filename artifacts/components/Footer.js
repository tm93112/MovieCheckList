import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { connect } from 'react-redux';
class Footer extends Component {
    render() {
        const { movieList = [], onPress } = this.props;
        if (movieList.length > 1) {
            return (React.createElement(View, { style: style.footer },
                React.createElement(TouchableOpacity, { onPress: onPress },
                    React.createElement(FontAwesome, { style: { fontSize: 24, color: '#FFFFFF' } }, Icons.sortAlphaAsc)),
                React.createElement(Text, { style: style.footerLabel }, "Sort")));
        }
        return null;
    }
}
const style = StyleSheet.create({
    footer: {
        alignItems: 'center',
        backgroundColor: '#3366CC',
        paddingTop: 10,
        paddingBottom: 10
    },
    footerLabel: {
        color: '#FFFFFF',
        fontSize: 10
    }
});
function mapStateToProps(state) {
    return {
        movieList: state.movies.movieList
    };
}
export default connect(mapStateToProps)(Footer);
//# sourceMappingURL=Footer.js.map
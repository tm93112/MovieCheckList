import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import Header from '../Header';
import MovieList from '../MovieList';
class Landing extends Component {
    render() {
        return (React.createElement(View, { style: { flex: 1 } },
            React.createElement(Header, { headerText: 'Movie List' }),
            React.createElement(MovieList, null)));
    }
}
export default connect()(Landing);
//# sourceMappingURL=Landing.js.map
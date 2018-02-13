import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import Header from '../Header';
import MovieList from '../MovieList';
class Landing extends Component {
    render() {
        const { movieList } = this.props;
        const moviesPresent = movieList.length > 0;
        return (React.createElement(View, { style: { flex: 1 } },
            React.createElement(Header, { headerText: 'Movie List', filterIcon: moviesPresent, randomIcon: moviesPresent }),
            React.createElement(MovieList, null)));
    }
}
function mapStateToProps(state) {
    return {
        movieList: state.movies.movieList
    };
}
export default connect(mapStateToProps)(Landing);
//# sourceMappingURL=Landing.js.map
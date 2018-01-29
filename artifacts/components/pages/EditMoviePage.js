import React, { Component } from 'react';
import { View } from 'react-native';
import Header from '../Header';
import EditForm from '../EditForm';
class EditMoviePage extends Component {
    render() {
        const { movie } = this.props;
        return (React.createElement(View, { style: { flex: 1 } },
            React.createElement(Header, { headerText: `Edit Details for ${movie.title}`, returnIcon: true }),
            React.createElement(EditForm, { movie: movie })));
    }
}
export default EditMoviePage;
//# sourceMappingURL=EditMoviePage.js.map
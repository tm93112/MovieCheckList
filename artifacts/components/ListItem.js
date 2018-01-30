import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Swipeout from 'react-native-swipeout';
import { deleteMovie } from '../redux/actions';
import Checkbox from './Checkbox';
import MovieService from '../services/MovieService';
class ListItem extends Component {
    constructor(props) {
        super(props);
        this.onClickDelete = (id) => {
            MovieService.delete(id);
            this.props.delete(id);
        };
    }
    render() {
        const { onCheck, text, id, styling, disabled, checked, onClickEdit } = this.props;
        const swipeRight = [{
                text: 'Edit',
                backgroundColor: '#f4ce42',
                onPress: onClickEdit
            },
            {
                text: 'Delete',
                backgroundColor: 'red',
                onPress: () => this.onClickDelete(id)
            }];
        return (React.createElement(Swipeout, { right: swipeRight, autoClose: true, backgroundColor: 'transparent' },
            React.createElement(View, { style: styles.listItem },
                React.createElement(Checkbox, { onPress: () => onCheck(id), checked: checked, disabled: disabled }),
                React.createElement(TouchableOpacity, null,
                    React.createElement(Text, { style: styling, ellipsizeMode: 'tail', numberOfLines: 1 }, text)))));
    }
}
function mapDispatchToProps(dispatch) {
    return {
        delete: (id) => dispatch(deleteMovie(id))
    };
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
export default connect(null, mapDispatchToProps)(ListItem);
//# sourceMappingURL=ListItem.js.map
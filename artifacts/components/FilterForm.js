import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Switch, Text, Button, StyleSheet } from 'react-native';
import { updateFilters, toggleFilter } from '../redux/actions';
class FilterForm extends Component {
    constructor(props) {
        super(props);
        this.onClose = () => {
            const { close, applyFilters } = this.props;
            const filtersToApply = {
                lessThan120MinOnly: this.state.lessThan120MinOnly,
                englishOnly: this.state.englishOnly,
                youngerThan50yrsOnly: this.state.youngerThan50yrsOnly,
                includeComedy: this.state.includeComedy,
                includeDrama: this.state.includeDrama,
                includeHorror: this.state.includeHorror,
                includeAllGenres: this.state.includeComedy && this.state.includeDrama && this.state.includeHorror
            };
            applyFilters(filtersToApply);
            close();
        };
        const { lessThan120MinOnly, englishOnly, youngerThan50yrsOnly, includeComedy, includeDrama, includeHorror } = props.filters;
        this.state = {
            lessThan120MinOnly,
            englishOnly,
            youngerThan50yrsOnly,
            includeComedy,
            includeDrama,
            includeHorror
        };
    }
    render() {
        return (React.createElement(View, { style: { flex: 1 } },
            React.createElement(View, { style: styles.filterView },
                React.createElement(Text, { style: styles.text }, "Under 2 Hours Only"),
                React.createElement(Switch, { onValueChange: () => this.setState({ lessThan120MinOnly: !this.state.lessThan120MinOnly }), value: this.state.lessThan120MinOnly })),
            React.createElement(View, { style: styles.filterView },
                React.createElement(Text, { style: styles.text }, "English Only"),
                React.createElement(Switch, { onValueChange: () => this.setState({ englishOnly: !this.state.englishOnly }), value: this.state.englishOnly })),
            React.createElement(View, { style: styles.filterView },
                React.createElement(Text, { style: styles.text }, "Younger Than 50 Only"),
                React.createElement(Switch, { onValueChange: () => this.setState({ youngerThan50yrsOnly: !this.state.youngerThan50yrsOnly }), value: this.state.youngerThan50yrsOnly })),
            React.createElement(View, { style: styles.filterView },
                React.createElement(Text, { style: styles.text }, "Include Comedy"),
                React.createElement(Switch, { onValueChange: () => this.setState({ includeComedy: !this.state.includeComedy }), value: this.state.includeComedy })),
            React.createElement(View, { style: styles.filterView },
                React.createElement(Text, { style: styles.text }, "Include Drama"),
                React.createElement(Switch, { onValueChange: () => this.setState({ includeDrama: !this.state.includeDrama }), value: this.state.includeDrama })),
            React.createElement(View, { style: styles.filterView },
                React.createElement(Text, { style: styles.text }, "Include Horror"),
                React.createElement(Switch, { onValueChange: () => this.setState({ includeHorror: !this.state.includeHorror }), value: this.state.includeHorror })),
            React.createElement(Button, { title: 'Filter', onPress: this.onClose })));
    }
}
const styles = StyleSheet.create({
    filterView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    text: {
        fontSize: 16
    }
});
function mapStateToProps(state) {
    return {
        filters: state.movies.filtersToApply
    };
}
function mapDispatchToProps(dispatch) {
    return {
        applyFilters: (filters) => dispatch(updateFilters(filters)),
        close: () => dispatch(toggleFilter())
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(FilterForm);
//# sourceMappingURL=FilterForm.js.map
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Switch, Text, Button, StyleSheet } from 'react-native';
import { updateFilters, toggleFilter } from '../redux/actions';
import { Store } from '../redux/reducers/index';
import { Dispatch } from 'redux';
import { MovieCheckListState } from '../redux/reducers/movies';

export type FilterType = {
    lessThan120MinOnly: boolean,
    englishOnly: boolean,
    youngerThan50yrsOnly: boolean,
    includeComedy: boolean,
    includeDrama: boolean,
    includeHorror: boolean,
    includeAllGenres: boolean
}

export interface Props {
    filters: FilterType,
    applyFilters: (filters: FilterType) => any,
    close: () => any
}

class FilterForm extends Component<Props, any> {

    constructor(props){
        super(props);
        const {
            lessThan120MinOnly,
            englishOnly,
            youngerThan50yrsOnly,
            includeComedy,
            includeDrama,
            includeHorror
        } = props.filters;
        this.state = {
            lessThan120MinOnly,
            englishOnly,
            youngerThan50yrsOnly,
            includeComedy,
            includeDrama,
            includeHorror
        };
    }

    onClose = () => {
        const { close, applyFilters } = this.props;
        const filtersToApply = {
            lessThan120MinOnly: this.state.lessThan120MinOnly,
            englishOnly: this.state.englishOnly,
            youngerThan50yrsOnly: this.state.youngerThan50yrsOnly,
            includeComedy: this.state.includeComedy,
            includeDrama: this.state.includeDrama,
            includeHorror: this.state.includeHorror,
            includeAllGenres: this.state.includeComedy && this.state.includeDrama && this.state.includeHorror
        }
        applyFilters(filtersToApply);
        close();
    }

    render() {
        return(
            <View style={{ flex: 1 }}>
                <View style={styles.filterView}>
                    <Text style={styles.text}>Under 2 Hours Only</Text>
                    <Switch
                        onValueChange={() => this.setState({ lessThan120MinOnly: !this.state.lessThan120MinOnly })}
                        value={this.state.lessThan120MinOnly}
                    />
                </View>
                <View style={styles.filterView}>
                    <Text style={styles.text}>English Only</Text>
                    <Switch
                        onValueChange={() => this.setState({ englishOnly: !this.state.englishOnly })}
                        value={this.state.englishOnly}
                    />
                </View>
                <View style={styles.filterView}>
                    <Text style={styles.text}>Younger Than 50 Only</Text>
                    <Switch
                        onValueChange={() => this.setState({ youngerThan50yrsOnly: !this.state.youngerThan50yrsOnly })}
                        value={this.state.youngerThan50yrsOnly}
                    />
                </View>
                <View style={styles.filterView}>
                    <Text style={styles.text}>Include Comedy</Text>
                    <Switch
                        onValueChange={() => this.setState({ includeComedy: !this.state.includeComedy })}
                        value={this.state.includeComedy}
                    />
                </View>
                <View style={styles.filterView}>
                    <Text style={styles.text}>Include Drama</Text>
                    <Switch
                        onValueChange={() => this.setState({ includeDrama: !this.state.includeDrama })}
                        value={this.state.includeDrama}
                    />
                </View>
                <View style={styles.filterView}>
                    <Text style={styles.text}>Include Horror</Text>
                    <Switch
                        onValueChange={() => this.setState({ includeHorror: !this.state.includeHorror })}
                        value={this.state.includeHorror}
                    />
                </View>
                <Button
                    title={'Filter'}
                    onPress={this.onClose}
                />
            </View>
        );
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
})

function mapStateToProps(state: Store) {
    return {
        filters: state.movies.filtersToApply
    }
}

function mapDispatchToProps(dispatch: Dispatch<MovieCheckListState>) {
    return {
        applyFilters: (filters: FilterType) => dispatch(updateFilters(filters)),
        close: () => dispatch(toggleFilter())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterForm);
import React, { Component} from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import NavigationBar from 'react-native-navbar';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { MovieCheckListState } from '../redux/reducers/movies';
import { toggleFilter, toggleRandom } from '../redux/actions';

export interface Props {
    headerText: string,
    returnIcon?: boolean,
    filterIcon?: boolean,
    toggleFilterModal: () => void;
    randomIcon?: boolean;
    toggleRandomModal: () => void;
}

class Header extends Component<Props, any> {

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
      icon = (<TouchableOpacity onPress={Actions.home}>
      <View style={{ padding: 10 }}>
        <FontAwesome style={{ fontSize: 24, color: '#FFFFFF'}}>
          {Icons.arrowLeft}
        </FontAwesome>
      </View>
    </TouchableOpacity>)
    } else if (randomIcon) {
      icon =
      (<TouchableOpacity onPress={() => toggleRandomModal()}>
      <View style={{ padding: 10 }}>
        <FontAwesome style={{ fontSize: 24, color: '#FFFFFF' }}>
          {Icons.random}
        </FontAwesome>
      </View>
    </TouchableOpacity>)
    }

    const filter = filterIcon
      ? (<TouchableOpacity onPress={() => toggleFilterModal()}>
        <View style={{ padding: 10 }}>
          <FontAwesome style={{ fontSize: 24, color: '#FFFFFF' }}>
            {Icons.filter}
          </FontAwesome>
        </View>
      </TouchableOpacity>)
      : undefined;

    return(
      <NavigationBar
        title={titleConfig}
        leftButton={icon}
        rightButton={filter}
        tintColor={'#3366CC'}
      />
    )
  }
}

function mapDispatchToProps(dispatch: Dispatch<MovieCheckListState>) {
  return {
    toggleFilterModal: () => dispatch(toggleFilter()),
    toggleRandomModal: () => dispatch(toggleRandom())
  };
}

export default connect(null, mapDispatchToProps)(Header);

import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import NavigationBar from 'react-native-navbar';
import FontAwesome, { Icons } from 'react-native-fontawesome';

function Header({ headerText, returnIcon }){

  const titleConfig = {
    title: headerText,
    tintColor: "#ffffff",
    style: { fontSize: 20, marginLeft: 40, marginRight: 40 },
    ellipsizeMode: 'tail',
    numberOfLines: 1
  }

  const icon = returnIcon
    ? (<TouchableOpacity onPress={Actions.home}>
        <View style={{ padding: 10 }}>
          <FontAwesome style={{fontSize: 24, color: '#FFFFFF'}}>
            {Icons.arrowLeft}
          </FontAwesome>
        </View>
      </TouchableOpacity>
    )
    : null;
  return(
    <NavigationBar
      title={titleConfig}
      leftButton= {icon}
      tintColor={'#3366CC'}
    />
  );
}

Header.propTypes = {
  headerText: PropTypes.string,
  returnIcon: PropTypes.bool,
};

export default Header;

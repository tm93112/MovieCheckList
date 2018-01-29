import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import NavigationBar from 'react-native-navbar';
import FontAwesome, { Icons } from 'react-native-fontawesome';

export interface Props {
    headerText: string,
    returnIcon?: boolean
}

function Header({ headerText, returnIcon }: Props) {

  const titleConfig = {
    title: headerText,
    tintColor: '#ffffff',
    style: { fontSize: 20, marginLeft: 40, marginRight: 40 },
    ellipsizeMode: 'tail',
    numberOfLines: 1
  };

  const icon = returnIcon
    ? (<TouchableOpacity onPress = {Actions.home} >
      <View style = {{ padding: 10 }}>
        <FontAwesome style = {{ fontSize: 24, color: '#FFFFFF'}} >
          {Icons.arrowLeft}
        </FontAwesome>
      </View>
    </TouchableOpacity>)
    : undefined;

  return(
    <NavigationBar
      title = {titleConfig}
      leftButton = {icon}
      tintColor = {'#3366CC'}
    />
  )
}

export default Header;

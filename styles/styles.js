import { StyleSheet, Platform, StatusBar } from 'react-native';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

export default StyleSheet.create({
  listContainer: {
    flex: 1,
    flexDirection: 'column',
  },

  showCompletedButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EBF9FF',
    marginTop: 20,
    marginBottom: 20,
    marginRight: 120,
    marginLeft: 120,
    paddingBottom: 10,
    borderRadius: 3
  },

  showCompletedText : {
    fontSize: 13
  },

  listItem: {
    padding: 15,
    marginRight: 15,
    marginLeft: 15,
    marginBottom: 1,
    flexDirection: 'row',
    backgroundColor: '#EBF9FF',
    borderRadius: 3
  },

  completedItem: {
    fontSize: 18,
    textDecorationLine: 'line-through'
  },

  text: {
    fontSize: 18
  },

  statusBar: {
    height: STATUSBAR_HEIGHT,
    backgroundColor: '#3366CC',
  },

  appBar: {
    height: APPBAR_HEIGHT,
  },

  innerAppBar: {
    backgroundColor: '#3366CC',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    padding: 20
  },

  appBarTextView: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  appBarText: {
    fontSize: 20,
    color: '#ffffff',
    paddingTop: 10
  },

  appBarIcon: {
    padding: 5,
  }

});

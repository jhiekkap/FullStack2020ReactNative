import React from 'react';
//import Constants from 'expo-constants';
import { Text, StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import Appbar from './AppBar';

const styles = StyleSheet.create({
  container: {
    // marginTop: Constants.statusBarHeight,
    backgroundColor: '#e1e4e8',
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
 
  return (
    <View style={styles.container}>
      <Appbar />
      <RepositoryList />
    </View>
  );
};

export default Main;
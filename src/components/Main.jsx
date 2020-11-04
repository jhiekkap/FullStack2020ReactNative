import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import SignOut from './SignOut';
import Appbar from './AppBar';


const Main = () => <View style={styles.container}>
  <Appbar />
  <Switch>
    <Route path="/" exact>
      <RepositoryList />
    </Route>
    <Route path="/SignIn" exact>
      <SignIn />
    </Route>
    <Route path="/SignOut" exact>
      <SignOut />
    </Route>
    <Redirect to="/" />
  </Switch>
</View>;

export default Main;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e1e4e8',
    flexGrow: 1,
    flexShrink: 1,
  },
});
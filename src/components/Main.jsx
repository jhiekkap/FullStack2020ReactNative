import React from 'react';  
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import Appbar from './AppBar';

const styles = StyleSheet.create({
  container: { 
    backgroundColor: '#e1e4e8',
    flexGrow: 1,
    flexShrink: 1,
  },
});

const tabs = [
  {
    title: 'Repositories',
    to: '/',
  },
  {
    title: 'Sign In',
    to: '/SignIn'
  }
];

const Main = () => {

  return (
    <View style={styles.container}>
      <Appbar tabs={tabs} />
      <Switch>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Route path="/SignIn" exact>
          <SignIn />
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;
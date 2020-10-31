import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Text } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
    container: {
        height: 50,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: 'black',
        justifyContent: 'flex-end'
    },
    tab: {
        color: 'white',
        paddingBottom:30,
        paddingLeft: 10
    }
});

const AppBar = () => {
    return <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => alert('Pressed!')}>
            <Text style={styles.tab}>Repositories</Text> 
        </TouchableWithoutFeedback>  
  </View>;
};

export default AppBar;
import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Text } from 'react-native';
import Constants from 'expo-constants';
import { Link } from "react-router-native";



const styles = StyleSheet.create({
    container: {
        height: 50,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: 'black',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    tab: {
        color: 'white',
        paddingBottom: 30,
        paddingLeft: 10
    }
});

const Tab = ({ title, to }) => <Link to={to}>
    <Text style={styles.tab}>{title}</Text>
</Link>;



const AppBar = ({ tabs }) => <View style={styles.container}>
    {tabs.map((props, i) => <Tab  {...props} key={i} />)}
</View>;

export default AppBar;
import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import Constants from 'expo-constants';
import { Link } from "react-router-native";

 
const styles = StyleSheet.create({
    container: {
        height: 50,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: 'black', 
    },
    scrollView: {
        flexDirection: 'row',
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
    <ScrollView horizontal style={styles.scrollView}>
        {tabs.map((props, i) => <Tab  {...props} key={i} />)}
    </ScrollView>
</View>;

export default AppBar;
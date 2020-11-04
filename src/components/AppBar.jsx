import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import Constants from 'expo-constants';
import { Link } from "react-router-native";
import { AUTHORIZED_USER } from '../graphql/queries';


const Tab = ({ title, to }) => <Link to={to}>
    <Text style={styles.tab}>{title}</Text>
</Link>;


const AppBar = () => {
    const [authorizedUser, setAuthorizedUser] = useState();
    const { data } = useQuery(AUTHORIZED_USER, {
        fetchPolicy: 'cache-and-network',
        // Other options
    });


    useEffect(() => {
        if (data) {
            setAuthorizedUser(data.authorizedUser);
        }
    }, [data]);
    console.log('AUTH USER DATA', data);

    const tabs = [
        {
            title: 'Repositories',
            to: '/',
        },
        {
            title: authorizedUser ? 'Sign Out' : 'Sign In',
            to: authorizedUser ? '/SignOut' : '/SignIn'
        },
    ];

    return (
        <View style={styles.container}>
            <ScrollView horizontal style={styles.scrollView}>
                {tabs.map((props, i) => <Tab  {...props} key={i} />)}
            </ScrollView>
        </View>
    );
};

export default AppBar;


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
        marginLeft: 10,
        paddingBottom: 30,
        paddingLeft: 10
    }
});
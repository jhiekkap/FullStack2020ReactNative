import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useHistory } from 'react-router-native';
import AuthStorage from './../utils/authStorage';
import { useApolloClient } from '@apollo/client';

const authStorage = new AuthStorage();

const SignOut = () => {

    let history = useHistory();
    const apolloClient = useApolloClient();

    useEffect(() => {
        const signOut = async () => {
            console.log('SIGNING OUT');
            await authStorage.removeAccessToken();
            await apolloClient.resetStore();
            history.push('/signIn');
        };
        signOut();
    }, []);

    return <View></View>;
};

export default SignOut;
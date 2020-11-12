import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

const Loading = () => {
    return (
        <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="gray" />
        </View>
    );
}

export default Loading;

const styles = StyleSheet.create({
    container: {
    /*     flex: 1,
        justifyContent: 'center', */
        //borderWidth: 1,
        position: 'absolute',
        bottom: 80,
        alignSelf: 'flex-end'
    },
    horizontal: {
        // flexDirection: 'row',
        //justifyContent: 'space-around',
        padding: 180,
    }, 

});
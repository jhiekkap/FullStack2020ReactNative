import React from 'react';
import { TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';


const SubmitButton = ({ onSubmit, text }) => <TouchableWithoutFeedback onPress={onSubmit} >
    <View style={styles.submitButton}>
        <Text style={styles.buttonText} fontWeight='bold'>{text}</Text>
    </View>
</TouchableWithoutFeedback>;


export default SubmitButton;

const styles = StyleSheet.create({
    formContainer: {
        marginTop: 10,
    },
    submitButton: {
        backgroundColor: theme.colors.primary,
        borderStyle: 'solid',
        borderRadius: 5,
        margin: 15,
        padding: 13,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center'
    }
});
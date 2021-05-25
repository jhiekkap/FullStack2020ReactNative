import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../../theme';

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [
    styles.textInput,
    error && styles.error,
    style
  ];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;

const styles = StyleSheet.create({
  textInput: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
    borderColor: theme.colors.textSecondary, 
    height: 40, 
    borderWidth: 1,
    borderRadius: 5,
    margin: 15,
    paddingLeft: 15,
  },
  error: {
    borderColor: theme.colors.error,
  },
});
import React from 'react';
import { Text as NativeText, StyleSheet } from 'react-native';
import theme from '../theme';


const Text = ({ color, fontSize, fontWeight, tag, style, ...props }) => {
  const textStyle = [
    styles.text,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'primary' && styles.colorPrimary,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontWeight === 'bold' && styles.fontWeightBold,
    tag && styles.tag,
    style,
  ]; 
  return <NativeText style={textStyle} {...props} />;
};

export default Text;

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
  tag: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 5,
    color: 'white',
    flexGrow: 0,
    maxWidth: 150,
  }
});
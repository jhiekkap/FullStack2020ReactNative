import React from 'react';
import { View, StyleSheet } from 'react-native';
import SubmitButton from './SubmitButton';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';

const initialValues = {
  userName: '',
  passWord: '',
};

const SigniInForm = ({ onSubmit }) => <View style={styles.formContainer}>
  <FormikTextInput name="userName" placeholder="Username" />
  <FormikTextInput secureTextEntry name="passWord" placeholder="Password" />
  <SubmitButton text='Sign in' onSubmit={onSubmit} />
</View>;

const onSubmit = ({ values }) => console.log('VALUES', values);

const SignIn = () => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <SigniInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 10,
  },
});
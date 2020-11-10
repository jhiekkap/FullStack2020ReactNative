import React from 'react';
import { View, StyleSheet } from 'react-native';
import SubmitButton from './SubmitButton';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import * as yup from 'yup';
import useSignIn from './../hooks/useSignIn';
import { useHistory } from 'react-router-native';


const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});

const SignInForm = ({ onSubmit }) => <View style={styles.formContainer}>
  <FormikTextInput testID="usernameField" name="username" placeholder="Username" />
  <FormikTextInput testID="passwordField" secureTextEntry name="password" placeholder="Password" />
  <SubmitButton testID="submitButton" text='Sign in' onSubmit={onSubmit} />
</View>;

export const SignInContainer = ({ onSubmit }) => <Formik
  initialValues={initialValues}
  validationSchema={validationSchema}
  onSubmit={onSubmit}>
  {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
</Formik>


const SignIn = () => {

  const [signIn] = useSignIn();
  let history = useHistory();

  const onSubmit = async (credentials) => { 
    console.log('CREDENTIALS', credentials); 
    try {
      const data = await signIn({ ...credentials });
      console.log('RESPONSE: ', data);
      history.push('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SignInContainer onSubmit={onSubmit} />
  );
};

export default SignIn;

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 10,
  },
});
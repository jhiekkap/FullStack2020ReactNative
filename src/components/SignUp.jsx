import React from 'react';
import { View, StyleSheet } from 'react-native';
import SubmitButton from './SubmitButton';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import * as yup from 'yup';
import useSignUp from './../hooks/useSignUp';
import useSignIn from './../hooks/useSignIn';
import { useHistory } from 'react-router-native';


const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .min(5)
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .min(5)
    .oneOf([yup.ref('password'), null])
    .required('Password confirmation is required')
});

const SignUpForm = ({ onSubmit }) => <View style={styles.formContainer}>
  <FormikTextInput testID="usernameField" name="username" placeholder="Username" />
  <FormikTextInput testID="passwordField" secureTextEntry name="password" placeholder="Password" />
  <FormikTextInput testID="passwordConfirmationField" secureTextEntry name="passwordConfirmation" placeholder="Password confirmation" />
  <SubmitButton testID="signUpSubmitButton" text='Sign in' onSubmit={onSubmit} />
</View>;

export const SignUpContainer = ({ onSubmit }) => <Formik
  initialValues={initialValues}
  validationSchema={validationSchema}
  onSubmit={onSubmit}>
  {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
</Formik>


const SignUp = () => {

  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  let history = useHistory();

  const onSubmit = async ({ username, password }) => {
    console.log('CREDENTIALS', { username, password });
    try {
      const data = await signUp({ username, password });
      console.log('RESPONSE: ', data);
      await signIn({ username, password }); 
      history.push('/'); 
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SignUpContainer onSubmit={onSubmit} />
  );
};

export default SignUp;

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 10,
  },
});
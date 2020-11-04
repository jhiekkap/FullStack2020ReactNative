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

const SigniInForm = ({ onSubmit }) => <View style={styles.formContainer}>
  <FormikTextInput name="username" placeholder="Username" />
  <FormikTextInput secureTextEntry name="password" placeholder="Password" />
  <SubmitButton text='Sign in' onSubmit={onSubmit} />
</View>;


const SignIn = () => {

  const [signIn] = useSignIn();
  let history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;
    console.log('VALUES', values);

    try {
      const data = await signIn({ username, password });
      console.log('RESPONSE: ', data);
      history.push('/'); 
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
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
import React from 'react';
import { View, StyleSheet } from 'react-native';
import SubmitButton from './SubmitButton';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import * as yup from 'yup';
import useReview from '../hooks/useReview';
import { useHistory } from 'react-router-native';

/* const reviewMock = {
    ownerName: 'holtwick',
    repositoryName: 'spontan',
    rating: 99,
    text: 'amazing',
} */

const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: '',
    text: '',
};

const validationSchema = yup.object().shape({
    ownerName: yup
        .string()
        .required('Repository owner name is required'),
    repositoryName: yup
        .string()
        .required('Repository name is required'),
    rating: yup
        .number()
        .min(0)
        .max(100)
        .required('Rating is required'),
    text: yup
        .string(),
});


const CreateReviewForm = ({ onSubmit }) => {
    return (
        <View style={styles.formContainer}>
            <FormikTextInput testID="ownerName" name="ownerName" placeholder="Repository owner name" />
            <FormikTextInput testID="repositoryName" name="repositoryName" placeholder="Repository name" />
            <FormikTextInput testID="rating" name="rating" placeholder="Rating between 0 and 100" />
            <FormikTextInput testID="review" name="text" placeholder="Review" multiline />
            <SubmitButton testID="reviewSubmitButton" text='Create a review' onSubmit={onSubmit} />
        </View>
    );
}


const CreateReview = () => {

    const [createReview] = useReview();
    let history = useHistory();

    const onSubmit = async (values) => {
        console.log('SUBMIT REVIEW', { ...values });
        try {
            const data = await createReview({ ...values });
            console.log('RESPONSE: ', data);
            history.push('/Repositories/' + data.createReview.repositoryId);
        } catch (e) {
            console.log('CREATE REVIEW ERROR', e.message)
            alert(e.message)
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
        </Formik>
    );
}

export default CreateReview;

const styles = StyleSheet.create({
    formContainer: {
        marginTop: 10,
    },
});
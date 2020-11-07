import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import { SignInContainer } from '../../components/SignIn'

describe('SignIn', () => {
    describe('SignInContainer', () => {
        it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
            // render the SignInContainer component, fill the text inputs and press the submit button
            const onSubmit = jest.fn();

            const { getByTestId } = render(<SignInContainer onSubmit={onSubmit} />);

            act(() => {
                fireEvent.changeText(getByTestId('usernameField'), 'kalle');
            });
            act(() => {
                fireEvent.changeText(getByTestId('passwordField'), 'password');
            });
            act(() => {
                fireEvent.press(getByTestId('submitButton'));
            });

            await waitFor(() => {
                expect(onSubmit).toHaveBeenCalledTimes(1);
                // onSubmit.mock.calls[0][0] contains the first argument of the first call
                expect(onSubmit.mock.calls[0][0]).toEqual({
                    username: 'kalle',
                    password: 'password',
                });
                // expect the onSubmit function to have been called once and with a correct first argument
            });
        });
    });
});
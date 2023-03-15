// Import required packages and modules
import React from 'react';
import LoginPage from './LoginPage.js';
import { render, screen } from '@testing-library/react';

// Mock the router
jest.mock('next/router', () => require('next-router-mock'));

// Create test case using describe and it statements
describe('LoginPage', () => {
    //test to check if the login page renders correctly
    it('should render correctly', () => {
    render(<LoginPage />);
    });

    //test to check whether the input fields take input properly
    it('should take input correctly', () => {
        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Password');
        expect(emailInput.value).toBe('');
        expect(passwordInput.value).toBe('');
        fireEvent.change(emailInput, { target: { value: 'wahab.javed@live.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });
        expect(emailInput.value).toBe('wahab.javed@live.com');
        expect(passwordInput.value).toBe('password');
    });
});

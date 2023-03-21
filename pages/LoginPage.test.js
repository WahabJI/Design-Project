// Import required packages and modules
import React from 'react';
import LoginPage from './LoginPage.js';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
//mock next/font/local
jest.mock('next/font/local', () => ({
  __esModule: true,
  default: jest.fn(() => 'mocked font'),
  localFont: jest.fn(() => 'mocked font')
}));
// Mock the router
jest.mock('next/router', () => ({
    useRouter: jest.fn()
  }));
jest.mock("next-auth/react", () => ({
    signIn: jest.fn()
  }));
// Create test case using describe and it statements
describe('LoginPage', () => {
    //test to check if the login page renders correctly
    it('should render correctly', () => {
      render(<LoginPage/>);
    });

    //test to check whether the input fields take input properly
    it('should take input correctly', () => {
    render(<LoginPage/>);
    const emailInput = screen.getAllByPlaceholderText('Email Address')[0];
    const passwordInput = screen.getAllByPlaceholderText('Password')[0];
    expect(emailInput.value).toBe('');
    expect(passwordInput.value).toBe('');

    act(() => {
        fireEvent.change(emailInput, { target: { value: 'wahab.javed@live.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });
    });

    expect(emailInput.value).toBe('wahab.javed@live.com');
    expect(passwordInput.value).toBe('password');
    });
    // testing google sign in?
    it("calls signIn with the correct parameters when the Google sign-in button is clicked", () => {
        const { getByText } = render(<LoginPage />);
    
        fireEvent.click(getByText("Sign in with Google"));
    
        expect(signIn).toHaveBeenCalledWith("google", {
          callbackUrl: "http://localhost:3000",
        });
      });

      it("calls signIn with the correct parameters when the form is submitted with valid credentials", async () => {
        const { getByLabelText, getByText } = render(<LoginPage />);
    
        fireEvent.change(getByLabelText("Email"), {
          target: { value: "test@test.com" },
        });
        fireEvent.change(getByLabelText("Password"), {
          target: { value: "test" },
        });
        fireEvent.click(getByText("Login"));
    
        await waitFor(() => expect(signIn).toHaveBeenCalledWith("credentials", {
          email: "test@test.com",
          password: "test",
          callbackUrl: "/",
        }));

      });
      
});

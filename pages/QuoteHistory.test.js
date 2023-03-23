import QuoteHistory from "./QuoteHistory";
import { render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import React from 'react';
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

describe('QuoteHistory', () => {
    //test to check if the login page renders correctly
    it('should render correctly', () => {
      render(<QuoteHistory/>);
    });
});
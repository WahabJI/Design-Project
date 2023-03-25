import QuoteHistory from "../pages/QuoteHistory.js"
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { useRouter } from "next/router";
import React from 'react';
import fetchMock from "jest-fetch-mock";
fetchMock.enableMocks();
beforeEach(() => {
  fetch.resetMocks();
});

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
  it('should render correctly', async () => {
    //mock the fetch call
    fetch.mockResponseOnce(JSON.stringify({ date: '01-01-2022', address_1: '3551 Cullen Blvd', address_2: 'Rm563', city: 'Houston', state: 'TX', zipCode: 77004, gallons: 100, pricePerGallon: 2.50, totalCost: 250 },
    { date: '02-01-2022', address_1: '2700 Bay Area Blvd', address_2: 'N/A', city: 'Houston', state: 'TX', zipCode: 77058, gallons: 200, pricePerGallon: 2.75, totalCost: 550 },
    { date: '03-01-2022', address_1: '1 Main St', address_2: 'N/A', city: 'Houston', state: 'TX', zipCode: 77002, gallons: 150, pricePerGallon: 3.00, totalCost: 450 },
    { date: '04-01-2022', address_1: '14000 University Blvd', address_2: 'Albert and Mamie George Bldg.', city: 'Sugar Land', state: 'TX', zipCode: 77479, gallons: 300, pricePerGallon: 2.25, totalCost: 675 }));
      render(<QuoteHistory/>);
      await waitFor(() => screen.getByText('Fuel Quote History'));

  });
});
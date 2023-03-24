import ProfilePage from "./ProfilePage.js";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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

describe('ProfilePage', () => {
    it('should render correctly', async () => {
        fetch.mockResponseOnce(JSON.stringify({
            firstName: "Joe", lastName: "Shmoe", address1: "5098 Jacksonville Rd",
            address2: "Apartment 1960", city: "Houston", state: "TX", zipCode: "77034"
        }));
        render(<ProfilePage/>);
        await waitFor(() => screen.getByText('Profile'));
    })
})

describe('ProfilePage', () => {
    it('should render correctly', async () => {
        fetch.mockResponseOnce(JSON.stringify({
            firstName: "Joe", lastName: "Shmoe", address1: "5098 Jacksonville Rd",
            address2: "Apartment 1960", city: "Houston", state: "TX", zipCode: "77034"
        }));
        render(<ProfilePage/>);
        await waitFor(() => screen.getByText('Profile'));
    })
})

describe('ProfilePage', () => {
    it('should render correctly', async () => {
        fetch.mockResponseOnce(JSON.stringify({
            firstName: "Joe", lastName: "Shmoe", address1: "5098 Jacksonville Rd",
            address2: "Apartment 1960", city: "Houston", state: "TX", zipCode: "77034"
        }));
        const onClickButton = jest.fn();
        render(<button onClick={onClickButton} />);
        const button = screen.getByRole("button");
        fireEvent.click(button);
        expect(onClickButton).toHaveBeenCalled();
    })
})
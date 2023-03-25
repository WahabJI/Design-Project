import ProfilePage from "./ProfilePage.js";
import { fireEvent, getByPlaceholderText, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
    __esModule: true,
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
        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    })

    //add a test case to test all the onChange functions
    it('Should test all the onChange to be working and expect values to be changed and grabbed', async () => {
        //dummy to just mock the fetch or else the page will not render
        fetch.mockResponseOnce(JSON.stringify({
            firstName: "Joe", lastName: "Shmoe", address1: "5098 Jacksonville Rd",
            address2: "Apartment 1960", city: "Houston", state: "TX", zipCode: "77034"
        }));
        const { getByPlaceholderText } = render(<ProfilePage />);
        const firstNameInput = getByPlaceholderText("First Name");
        const lastNameInput = getByPlaceholderText("Last Name");
        const address1Input = getByPlaceholderText("Address 1");
        const address2Input = getByPlaceholderText("Address 2");
        const cityInput = getByPlaceholderText("City");
        const stateInput = getByPlaceholderText("State");
        const zipInput = getByPlaceholderText("Zip Code");


        //simulate typing in the input for all onChange functions
        fireEvent.change(firstNameInput, { target: { value: 'Joe' } });
        fireEvent.change(lastNameInput, { target: { value: 'Shmoe' } });
        fireEvent.change(address1Input, { target: { value: '5098 Jacksonville Rd' } });
        fireEvent.change(address2Input, { target: { value: 'Apartment 1960' } });
        fireEvent.change(cityInput, { target: { value: 'Houston' } });
        fireEvent.change(stateInput, { target: { value: 'TX' } });
        fireEvent.change(zipInput, { target: { value: '77034' } });

        //expect the values to be changed with what we said above
        await waitFor(() => expect(firstNameInput.value).toBe('Joe'));
        await waitFor(() => expect(lastNameInput.value).toBe('Shmoe'));
        await waitFor(() => expect(address1Input.value).toBe('5098 Jacksonville Rd'));
        await waitFor(() => expect(address2Input.value).toBe('Apartment 1960'));
        await waitFor(() => expect(cityInput.value).toBe('Houston'));
        await waitFor(() => expect(stateInput.value).toBe('TX'));
        await waitFor(() => expect(zipInput.value).toBe('77034'));

    })
})
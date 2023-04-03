import connectMongo from "../database/conn";
import History from "../model/historySchema";
import Profile from '../model/profileSchema';
import PricingModule from "../pages/api/PricingModule";
import { createMocks } from 'node-mocks-http';
import User from "../model/schema";
//mock dependencies
jest.mock("../database/conn");
jest.mock("../model/historySchema");
jest.mock("../model/profileSchema");
jest.mock("../model/schema");

describe("Not a GET or POST request", () => {
    it("should return a 405 error", async () => {
        const { req, res } = createMocks({
            method: "PUT",
        });

        await PricingModule(req, res);

        expect(res._getStatusCode()).toBe(405);
        expect(res._getData()).toBe('{"message":"Method Not Allowed"}');
    });
});

describe("GET request", () => {
    it("should return the correct data", async () => {
        const { req, res } = createMocks({
            method: "GET",
            body: {
                deliveryDate: "2024-08-01",
                gallonsRequested: 1000,
            },
        });
        await PricingModule(req, res);
        expect(res._getStatusCode()).toBe(200);
    });
});
describe("POST request", () => {
    it("should return a 404 error if the user is not found", async () => {

        // Create a mock request and response
        const { req, res } = createMocks({
            method: "POST",
            body: {
                email: "test@example.com",
                deliveryDate: "2024-08-01",
                gallonsRequested: 1000,
                pricePerGallon: 1.5,
                totalAmountDue: 1500,
            },
        });

        // Mock the database call
        User.findOne.mockResolvedValue(null);

        // Call the function
        await PricingModule(req, res);

        // Assert that the response is correct
        expect(res._getStatusCode()).toBe(404);
        expect(res._getJSONData()).toEqual({ message: "User not found" });

    });

    it("Should create a new quote history entry if the user does not have one", async () => {
        const { req, res } = createMocks({
            method: "POST",
            body: {
                email: "test@example.com",
                deliveryDate: "2024-08-01",
                gallonsRequested: 1000,
                pricePerGallon: 1.5,
                totalAmountDue: 1500,
            },
        });

        User.findOne.mockResolvedValueOnce({
            email: req.body.email,
        });

        Profile.findOne.mockResolvedValueOnce({
            email: req.body.email,
            firstName: "Test",
            lastName: "User",
            address1: "123 Main St",
            address2: "Apt 1",
            city: "New York",
            state: "NY",
            zipCode: "12345",
        });

        connectMongo.mockResolvedValue(true);

        History.findOne.mockResolvedValueOnce(null);
        
        await PricingModule(req, res);

        expect(res._getStatusCode()).toBe(200);
        expect(res._getJSONData()).toEqual({
            message: "Quote history created",
        });
        expect(connectMongo).toHaveBeenCalled();
        expect(History.findOne).toHaveBeenCalledWith({ email: req.body.email });

    })

    it("Should update the entry in the collection if the user already has one", async () => {
        const { req, res } = createMocks({
            method: "POST",
            body: {
                email: "test@example.com",
                deliveryDate: "2024-08-01",
                gallonsRequested: 1000,
                pricePerGallon: 1.5,
                totalAmountDue: 1500,
            },
        });

        User.findOne.mockResolvedValueOnce({
            email: req.body.email,
        });

        Profile.findOne.mockResolvedValueOnce({
            email: req.body.email,
            firstName: "Test",
            lastName: "User",
            address1: "123 Main St",
            address2: "Apt 1",
            city: "New York",
            state: "NY",
            zipCode: "12345",
        });

        connectMongo.mockResolvedValue(true);

        History.findOne.mockResolvedValueOnce({
            email: req.body.email,
            quoteHistory: [{
                deliveryDate: "2024-08-01",
                address1: "123 Main St",
                address2: "Apt 1",
                city: "New York",
                state: "NY",
                zipCode: "12345",
                gallonsRequested: 150,
                pricePerGallon: 2,
                totalAmountDue: 1500,
            }]
        });
        const exec = jest.fn();
        History.findOneAndUpdate.mockReturnValueOnce({ exec });
        exec.mockResolvedValueOnce({
            email: req.body.email,
            quoteHistory: [{
                deliveryDate: "2024-08-01",
                address1: "123 Main St",
                address2: "Apt 1",
                city: "New York",
                state: "NY",
                zipCode: "12345",
                gallonsRequested: 150,
                pricePerGallon: 2,
                totalAmountDue: 1500,
            },
            {
                deliveryDate: "2024-08-01",
                address1: "123 Main St",
                address2: "Apt 1",
                city: "New York",
                state: "NY",
                zipCode: "12345",
                gallonsRequested: 1000,
                pricePerGallon: 1.5,
                totalAmountDue: 1500,
            }]
        });

        await PricingModule(req, res);

        expect(res._getStatusCode()).toBe(200);
        expect(res._getJSONData()).toEqual({
            message: "Quote history updated",
        });
    });
    it("Should return a 500 error if the database connection fails", async () => {
        const { req, res } = createMocks({
            method: "POST",
            body: {
                email: "test@example.com",
                deliveryDate: "2024-08-01",
                gallonsRequested: 1000,
                pricePerGallon: 1.5,
                totalAmountDue: 1500,
            },
        });

        User.findOne.mockResolvedValueOnce({
            email: req.body.email,
        });

        Profile.findOne.mockResolvedValueOnce({
            email: req.body.email,
            firstName: "Test",
            lastName: "User",
            address1: "123 Main St",
            address2: "Apt 1",
            city: "New York",
            state: "NY",
            zipCode: "12345",
        });

        connectMongo.mockResolvedValue(true);

        History.findOne.mockResolvedValueOnce({
            email: req.body.email,
            quoteHistory: [{
                deliveryDate: "2024-08-01",
                address1: "123 Main St",
                address2: "Apt 1",
                city: "New York",
                state: "NY",
                zipCode: "12345",
                gallonsRequested: 150,
                pricePerGallon: 2,
                totalAmountDue: 1500,
            }]
        });

        const exec = jest.fn();
        History.findOneAndUpdate.mockReturnValueOnce({ exec });
        exec.mockRejectedValueOnce(new Error("Server error"));

        await PricingModule(req, res);

        expect(res._getStatusCode()).toBe(500);

        expect(res._getJSONData()).toEqual({
            message: "Server error",
        });

    });

});

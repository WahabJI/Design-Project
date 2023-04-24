import connectMongo from "../database/conn";
import History from "../model/historySchema";
import Profile from '../model/profileSchema';
import PricingModule from "../pages/api/PricingModule";
import { createMocks } from 'node-mocks-http';
import User from "../model/schema";
import { getSession } from 'next-auth/react';
//mock dependencies
jest.mock("../database/conn.js");
jest.mock("../model/historySchema");
jest.mock("../model/profileSchema");
jest.mock("../model/schema");
jest.mock('next-auth/react', () => ({
    getSession: jest.fn(),
  }));

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

describe("GET /api/PricingModule", () => {
    it("should return the correct data values for the first half of if branches", async () => {
        const session = {
            user: {
              email: 'test@test.com',
            },
          };

        const quoteHistoryData = {
        // Add some mock quote history data here to test
            email: 'test@test.com',
            quoteHistory: [{
                deliveryDate: "2024-08-01",
                address1: "123 Main St",
                address2: "Apt 1",
                city: "Houston",
                state: "TX",
                zipCode: "12345",
                gallonsRequested: 999,
                pricePerGallon: 1.5,
                totalAmountDue: 1498.5,
            }],
        };

        const mockProfileData = {
            email: 'test@example.com',
            firstName: 'Test',
            lastName: 'User',
            address1: '123 Main St',
            city: 'Houston',
            state: 'TX',
            zipCode: '12345',
        };
          
        const { req, res } = createMocks({
            method: "GET",
            query: {
                deliveryDate: "2024-08-01",
                gallonsRequested: 1500,
            },
        });

        getSession.mockResolvedValue(session);
        History.findOne.mockResolvedValue(quoteHistoryData);
        Profile.findOne.mockResolvedValue(mockProfileData);
        

        await PricingModule(req, res);

        expect(res._getStatusCode()).toBe(200);
        expect(res._getJSONData()).toEqual({
            pricePerGallon: 1.695,
            totalAmountDue: 1.695 * req.query.gallonsRequested,
        });
        expect(History.findOne).toHaveBeenCalledWith({ email: session.user.email });
        expect(Profile.findOne).toHaveBeenCalledWith({ email: session.user.email });

    });
    it("should return the correct data values for the second half of if branches", async () => {
        const session = {
            user: {
              email: 'test@test.com',
            },
          };

        const mockProfileData = {
            email: 'test@example.com',
            firstName: 'Test',
            lastName: 'User',
            address1: '123 Main St',
            city: 'Brooklyn',
            state: 'NY',
            zipCode: '12345',
        };
          
        const { req, res } = createMocks({
            method: "GET",
            query: {
                deliveryDate: "2024-08-01",
                gallonsRequested: 999,
            },
        });

        getSession.mockResolvedValue(session);
        History.findOne.mockResolvedValue(null);
        Profile.findOne.mockResolvedValue(mockProfileData);
        

        await PricingModule(req, res);

        expect(res._getStatusCode()).toBe(200);
        expect(res._getJSONData()).toEqual({
            pricePerGallon: 1.755,
            totalAmountDue: 1.755 * req.query.gallonsRequested,
        });
        expect(History.findOne).toHaveBeenCalledWith({ email: session.user.email });
        expect(Profile.findOne).toHaveBeenCalledWith({ email: session.user.email });

    });
});

describe("POST /api/PricingModule", () => {
    it("Should return a 404 error if the user is not found", async () => {

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
    it("Should throw an error if database connection (connectMongo) fails", async () => {
        const { req, res } = createMocks({
            method: "POST",
        });
        
        User.findOne.mockResolvedValueOnce({
            email: req.body.email,
        }); 
        connectMongo.mockRejectedValue(new Error("Database connection failed"));
  
        const error = jest.spyOn(console, "error").mockImplementation(() => {});
  
        await PricingModule(req, res);
  
        expect(error).toHaveBeenCalledWith(new Error("Database connection failed"));
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

    it("Should return a 500 error if the findOneAndUpdate for the else branch fails", async () => {
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
        const error = jest.spyOn(console, "error").mockImplementation(() => {});
        await PricingModule(req, res);

        expect(error).toHaveBeenCalledWith(new Error("Server error"));
        expect(res._getStatusCode()).toBe(500);
        expect(res._getJSONData()).toEqual({
            message: "Server error",
        });
    });

});

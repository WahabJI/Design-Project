import userSchema from "../model/schema.js";
import { createMocks } from 'node-mocks-http';
import { getSession } from "next-auth/react";
import UserCredentials from "../pages/api/UserCredentials";
jest.mock("../model/schema");
jest.mock('next-auth/react', () => ({
    getSession: jest.fn(),
  }));

describe('NOT a POST or GET request /api/UserCredentials', () => {
    it('should return a 405 if its a method that is not allowed', async () => {
        const { req, res } = createMocks({
        method: 'PUT',
        });
        await UserCredentials(req, res);
        expect(res._getStatusCode()).toBe(405);
    });
});

describe('GET request /api/UserCredentials', () => {
    it('should return a 401 if there is no session', async () => {
        const { req, res } = createMocks({
        method: 'GET',
        });
        getSession.mockResolvedValueOnce(null);
        await UserCredentials(req, res);
        expect(res._getStatusCode()).toBe(401);
    });
    it('should return expected data from the database', async () => {
        const { req, res } = createMocks({
            method: 'GET',
        });
        const session = {
            user: {
                email: 'test@test.com',
            },
        };
        getSession.mockResolvedValueOnce(session);
        userSchema.findOne.mockResolvedValueOnce({
            email: 'test@test.com',
            profileSet: true,
        });
        await UserCredentials(req, res);

        expect(res._getStatusCode()).toBe(200);
        expect(res._getJSONData()).toStrictEqual({
            email: 'test@test.com',
            profileSet: true,
        });

    });
});

describe('POST request /api/UserCredentials', () => {
    it('should return a 401 if there is no session', async () => {
        const { req, res } = createMocks({
        method: 'POST',
        });
        getSession.mockResolvedValueOnce(null);
        await UserCredentials(req, res);
        expect(res._getStatusCode()).toBe(401);
    });
    it('should return a 500 if the profile is already set with message', async () => {
        const { req, res } = createMocks({
            method: 'POST',
        });
        const session = {
            user: {
                email: 'test@test.com',
            },
        };
        getSession.mockResolvedValueOnce(session);
        userSchema.findOne.mockResolvedValueOnce({
            email: 'test@test.com',
            profileSet: true,
        });

        await UserCredentials(req, res);

        expect(res._getStatusCode()).toBe(500);
        expect(res._getJSONData()).toStrictEqual({
            message: 'Profile Already Set'
        });

    });
    it('should return a 500 if there is an error with the findOneAndUpdate', async () => {
        const { req, res } = createMocks({
            method: 'POST',
        });
        const session = {
            user: {
                email: 'test@test.com'
            },
        };

        getSession.mockResolvedValueOnce(session);
        userSchema.findOne.mockResolvedValueOnce({
            email: 'test@test.com',
            profileSet: false,
        });
        const exec = jest.fn();
        exec.mockRejectedValueOnce(new Error("Server error"));
        userSchema.findOneAndUpdate.mockReturnValueOnce({ exec });
        const error = jest.spyOn(console, "error").mockImplementation(() => {});

        await UserCredentials(req, res);

        expect(error).toHaveBeenCalledWith(new Error("Server error"));
        expect(res._getStatusCode()).toBe(500);
        expect(res._getJSONData()).toEqual({
            message: "Server error",
        });
    });
    it('should return a 200 if the profile is updated correctly', async () => {
        const { req, res } = createMocks({
            method: 'POST',
        });
        const session = {
            user: {
                email: 'test@test.com',
            },
        };
        getSession.mockResolvedValueOnce(session);
        userSchema.findOne.mockResolvedValueOnce({
            email: 'test@test.com',
            profileSet: false,
        });
        const exec = jest.fn();
        exec.mockResolvedValueOnce({
            email: 'test@test.com',
            profileSet: true,
        });
        userSchema.findOneAndUpdate.mockReturnValueOnce({ exec });

        await UserCredentials(req, res);

        expect(res._getStatusCode()).toBe(200);
        expect(res._getJSONData()).toEqual({
            message: "Profile Updated",
        });
    

    });
});

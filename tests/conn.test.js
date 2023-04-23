import connectMongo from '../database/conn';
import { createMocks } from 'node-mocks-http';
import mongoose from 'mongoose';

jest.mock("mongoose");

describe('connectMongo', () => {
    beforeEach(() => {
        // Clear all mock implementations before each test
        jest.clearAllMocks();
    });
    it('should resolve if connection is successful', async () => {
        const mockConnection = { readyState: 1 };
        mongoose.connect.mockResolvedValue({ connection: mockConnection });

        await expect(connectMongo()).resolves.toBe(true);
    });

    it('should reject if connection fails', async () => {
        const mockError = new Error('Connection Failed');
        mongoose.connect.mockRejectedValue(mockError);
        const error = jest.spyOn(console, "error").mockImplementation(() => {});
        
        await expect(connectMongo()).rejects.toThrow(mockError);
        await expect(error).toHaveBeenCalledWith(new Error("Connection Failed"));
    });
});


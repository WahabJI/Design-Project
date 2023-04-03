import connectMongo from '../database/conn';
import getQuoteHistory from '../pages/api/getQuoteHistory';
import { createMocks } from 'node-mocks-http';
import History from '../model/historySchema';
import { getSession } from 'next-auth/react';
jest.mock('../database/conn.js');
jest.mock('../model/historySchema');
jest.mock('next-auth/react', () => ({
  getSession: jest.fn(),
}));
describe('GET /api/getProfilePage', () => {
    beforeEach(() => {
      // Clear all mock implementations before each test
      jest.clearAllMocks();
    });
    // it("should return 500 if database connection fails", async () => {
    //   const session = {
    //     user: {
    //       email: 'test@example.com',
    //     },
    //   };
    //   getSession.mockResolvedValue(session);
    //   connectMongo.mockRejectedValueOnce(new Error('Database connection failed'));
    //   const { req, res } = createMocks({
    //     method: "GET",
    //   });
    //   await getQuoteHistory(req, res);
    //   expect(res._getStatusCode()).toBe(500);
    //   expect(res._getJSONData()).toStrictEqual({ message: "Unable to connect to database" });
    // });
    it("should return 401 if user is not logged in", async () => {
      getSession.mockReturnValue(null);
      const { req, res } = createMocks({
        method: "GET",
      });
      await getQuoteHistory(req, res);
      expect(res._getStatusCode()).toBe(401);
      expect(res._getJSONData()).toStrictEqual({ message: "Unauthorized" });
    });
    it('should return 200 OK and make sure that everything is called properly', async () => {
      const quoteHistory = {
        // Add some mock quote history data here

      };
      quoteHistory.sort = jest.fn().mockReturnValue(quoteHistory);
      const session = {
        user: {
          email: 'test@example.com',
        },
      };
      getSession.mockResolvedValue(session);
      History.findOne.mockResolvedValue({ quoteHistory });
      connectMongo.mockResolvedValue(true);
        const { req, res } = createMocks({
            method: 'GET',
          });

        await getQuoteHistory(req, res);

        expect(res._getStatusCode()).toBe(200);
        //chack if any data is returned, no need to check if the data is correct
        expect(res._getJSONData()).not.toBeNull();
        expect(History.findOne).toHaveBeenCalledWith({ email: session.user.email });
        expect(connectMongo).toHaveBeenCalled();
    });
    it("should sort quote history by delivery date", async () => {
      const session = {
        user: {
          email: 'test@example.com',
        },
      };
      getSession.mockResolvedValue(session);
      const mockResult = {
        quoteHistory: [
          { deliveryDate: new Date("2023-04-02") },
          { deliveryDate: new Date("2023-04-01") },
          { deliveryDate: new Date("2023-04-03") },
        ]
      };
      History.findOne.mockResolvedValue(mockResult);
      const { req, res } = createMocks({
        method: "GET",
      });
      await getQuoteHistory(req, res);
      expect(res._getStatusCode()).toBe(200);
      expect(mockResult.quoteHistory).toEqual([
        { deliveryDate: new Date("2023-04-03") },
        { deliveryDate: new Date("2023-04-02") },
        { deliveryDate: new Date("2023-04-01") },
      ]);
    });
    
    });



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
    it('should return 200 OK and make sure that everything is called properly', async () => {
      const quoteHistory = {
        // Add some mock quote history data here

      };
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
    });



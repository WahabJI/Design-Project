import getQuoteHistory from '../pages/api/getQuoteHistory';
import { createMocks } from 'node-mocks-http';
describe('GET /api/getProfilePage', () => {
    it('should return 200 OK', async () => {
        const { req, res } = createMocks({
            method: 'GET',
          });

        await getQuoteHistory(req, res);

        expect(res._getStatusCode()).toBe(200);
        //chack if any data is returned, no need to check if the data is correct
        expect(res._getJSONData()).not.toBeNull();
    });
    });

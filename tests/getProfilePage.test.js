import getProfilePage from '../pages/api/getProfilePage.js';
import { createMocks } from 'node-mocks-http';
describe('GET /api/getProfilePage', () => {
    it('should return 200 OK', async () => {
        const { req, res } = createMocks({
            method: 'GET',
          });

        await getProfilePage(req, res);

        expect(res._getStatusCode()).toBe(200);
        expect(res._getJSONData()).not.toBeNull();
    });
    });
describe('POST /api/getProfilePage', () => {
    it('should return 200 OK', async () => {
        const { req, res } = createMocks({
            method: 'POST',
            body: {
                firstName: "Joe", lastName: "Shmoe", address1: "5098 Jacksonville Rd",
                address2: "Apartment 1960", city: "Houston", state: "TX", zipCode: "77034"
            }
          });

        await getProfilePage(req, res);

        expect(res._getStatusCode()).toBe(200);
        expect(res._getJSONData()).toEqual({message: "Profile Updated"});
    });
    });
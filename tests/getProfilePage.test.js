import getProfilePage from '../pages/api/getProfilePage.js';
import { createMocks } from 'node-mocks-http';
import { getSession, useSession } from 'next-auth/react';
import connectMongo from '../database/conn';
import Profile from '../model/profileSchema';
jest.mock('../database/conn.js');
jest.mock('../model/profileSchema');
jest.mock('next-auth/react', () => ({
    getSession: jest.fn(),
    useSession: jest.fn(),
  }));
describe('when user is not logged in', () => {
it('should return 401 Unauthorized', async () => {
    connectMongo.mockResolvedValue(true);
    getSession.mockResolvedValue(null);
    const { req, res } = createMocks({
    method: 'GET',
    });
    await getProfilePage(req, res);
    expect(res._getStatusCode()).toBe(401);
    expect(res._getData()).toBe('{"message":"Unauthorized"}');
});
});
describe('when user is logged in', () => {
    beforeEach(() => {
      getSession.mockResolvedValue({
        user: {
          email: 'test@example.com',
        },
      });
    });

    describe('when request method is not GET or POST', () => {
      it('should return 400 Bad Request', async () => {
        const { req, res } = createMocks({
          method: 'PUT',
        });
        await getProfilePage(req, res);
        expect(res._getStatusCode()).toBe(400);
        expect(res._getData()).toBe('{"message":"Bad Request"}');
      });
    });

    describe('when request method is GET', () => {
      it('should return user data in JSON format', async () => {
        const { req, res } = createMocks({
          method: 'GET',
        });
        const mockProfileData = {
          email: 'test@example.com',
          firstName: 'Test',
          lastName: 'User',
          address1: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '12345',
        };
        Profile.findOne.mockResolvedValue(mockProfileData);
        await getProfilePage(req, res);
        expect(res._getStatusCode()).toBe(200);
        expect(res._getJSONData()).toEqual(mockProfileData);
        expect(Profile.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
        expect(connectMongo).toHaveBeenCalled();
      });
    });
    describe('when request method is POST', () => {
        it('should create a new user information if they did not exist previously', async () => {
        const { req, res } = createMocks({
            method: 'POST',
            body: {
                firstName: 'Test',
                lastName: 'User',
                address1: '123 Main St',
                address2: 'Apt 1',
                city: 'New York',
                state: 'NY',
                zipCode: '12345',
            },
        });
        const session = {
            user: {
              email: "test@example.com",
            },
          };
        Profile.findOne.mockResolvedValueOnce(null);
        Profile.create.mockResolvedValueOnce({
            email: session.user.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address1: req.body.address1,
            address2: req.body.address2,
            city: req.body.city,
            state: req.body.state,
            zipCode: req.body.zipCode,
        });
        await getProfilePage(req, res);

        expect(res._getStatusCode()).toBe(200);
        expect(res._getJSONData()).toEqual({
            message: 'Profile created',
            newProfile: {
                email: session.user.email,
                firstName: "Test",
                lastName: "User",
                address1: "123 Main St",
                address2: "Apt 1",
                city: "New York",
                state: "NY",
                zipCode: "12345",
            },
        });
        expect(connectMongo).toHaveBeenCalled();
        expect(Profile.findOne).toHaveBeenCalledWith({ email: session.user.email });


    });
    it('should update user information if they already exist', async () => {
        const { req, res } = createMocks({
            method: 'POST',
            body: {
                firstName: 'Test',
                lastName: 'User',
                address1: '123 Main St',
                address2: 'Apt 1',
                city: 'New York',
                state: 'NY',
                zipCode: '12345',
            },
        });
        const session = {
            user: {
              email: "test@example.com",
            },
            };
        Profile.findOne.mockResolvedValueOnce({
            email: session.user.email,
            firstName: "Test",
            lastName: "User",
            address1: "124 Main St",
            address2: "",
            city: "New York",
            state: "NY",
            zipCode: "12345",
        });
        const exec = jest.fn();
        Profile.findOneAndUpdate.mockReturnValueOnce({ exec });
        exec.mockResolvedValueOnce({
            email: session.user.email,
            firstName: "Test",
            lastName: "User",
            address1: "123 Main St",
            address2: "Apt 1",
            city: "New York",
            state: "NY",
            zipCode: "12345",
        });
        await getProfilePage(req, res);
        expect(res._getStatusCode()).toBe(200);
        expect(res._getJSONData()).toEqual({
            message: 'Profile updated',
            updatedProfile: {
                email: session.user.email,
                firstName: "Test",
                lastName: "User",
                address1: "123 Main St",
                address2: "Apt 1",
                city: "New York",
                state: "NY",
                zipCode: "12345",
            },
        });
        expect(connectMongo).toHaveBeenCalled();
        expect(Profile.findOne).toHaveBeenCalledWith({ email: session.user.email });
        expect(Profile.findOneAndUpdate).toHaveBeenCalledWith(
            { email: session.user.email },
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                address1: req.body.address1,
                address2: req.body.address2,
                city: req.body.city,
                state: req.body.state,
                zipCode: req.body.zipCode,
            },
            { new: true }
            
        );



        });// IT for post else 
        it("should handle error if the user information cannot be updated IF THE USER EXISTS", async () => {
            const { req, res } = createMocks({
                method: 'POST',
                body: {
                    firstName: 'Test',
                    lastName: 'User',
                    address1: '123 Main St',
                    address2: 'Apt 1',
                    city: 'New York',
                    state: 'NY',
                    zipCode: '12345',
                },
            });
            const session = {
                user: {
                  email: "test@example.com",
                },
            };
            const exec = jest.fn();
            Profile.findOneAndUpdate.mockReturnValueOnce({ exec });
            exec.mockRejectedValueOnce(new Error("Server error"));
            await getProfilePage(req, res);
            expect(res._getStatusCode()).toBe(500);
            expect(res._getJSONData()).toEqual({
                message: "Server error",
            });

        });//IT for error if user exists
        it("should handle error if the user information cannot be updated IF THE USER EXISTS", async () => {
            const { req, res } = createMocks({
                method: 'POST',
                body: {
                    firstName: 'Test',
                    lastName: 'User',
                    address1: '123 Main St',
                    address2: 'Apt 1',
                    city: 'New York',
                    state: 'NY',
                    zipCode: '12345',
                },
            });
            const session = {
                user: {
                  email: "test@example.com",
                },
            };
            Profile.findOne.mockResolvedValueOnce(null);
            Profile.create.mockRejectedValueOnce(new Error("Server error"));
            await getProfilePage(req, res);
            expect(res._getStatusCode()).toBe(500);
            expect(res._getJSONData()).toEqual({
                message: "Server error",
            });

        });//IT for error


        
    });//post describe
});//user logged in describe

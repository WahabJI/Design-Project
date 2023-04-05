import Register from "../pages/api/register";
import { createMocks } from "node-mocks-http";
import User from "../model/schema";
import connectMongo from "../database/conn";
import { hash } from "bcryptjs";

jest.mock("../model/schema");
jest.mock("../database/conn");
jest.mock("bcryptjs");

describe("Not a POST request", () => {
    it("Should return 405 if not a POST request", async () => {
        const { req, res } = createMocks({
            method: "GET",
        });

        await Register(req, res);

        expect(res._getStatusCode()).toBe(405);
        expect(res._getData()).toBe('{"message":"Method Not Allowed"}');
    });
});

describe("POST request", () => {
    it("Should throw an error if database connection fails", async () => {
        const { req, res } = createMocks({
            method: "POST",
        });

        connectMongo.mockRejectedValue(new Error("Database connection failed"));

        const error = jest.spyOn(console, "error").mockImplementation(() => {});

        await Register(req, res);

        expect(error).toHaveBeenCalledWith(new Error("Database connection failed"));
    });

    it("Should return 404 if no data is sent", async () => {
        const { req, res } = createMocks({
            method: "POST",
        });

        connectMongo.mockResolvedValue(true);

        await Register(req, res);

        expect(res._getStatusCode()).toBe(404);
        expect(res._getData()).toBe('{"message":"No data sent"}');
    });

    it("Should return 422 if user already exists", async () => {
        const { req, res } = createMocks({
            method: "POST",
            body: {
                email: "test@example.com",
                password: "password",
                confirmedPassword: "password",
            },
        });

        connectMongo.mockResolvedValue(true);

        User.findOne.mockResolvedValue({
            email: "test@example.com",
        });

        await Register(req, res);

        expect(res._getStatusCode()).toBe(422);
        expect(res._getData()).toBe('{"message":"User already exists"}');
    });

    it("Should return 200 if user is created", async () => {
        const { req, res } = createMocks({
            method: "POST",
            body: {
                email: "test@example.com",
                password: "password",
                confirmedPassword: "password",
            },
        });

        connectMongo.mockResolvedValue(true);

        hash.mockResolvedValue("hashedPassword");

        User.findOne.mockResolvedValue(null);

        User.create.mockResolvedValue({
            email: "test@example.com",
            password: "hashedPassword",
            profileSet: false,
        });
        
        await Register(req, res);

        expect(res._getStatusCode()).toBe(200);
        expect(res._getData()).toBe('{"message":"User created","user":{"email":"test@example.com","password":"hashedPassword","profileSet":false}}');
    });
});
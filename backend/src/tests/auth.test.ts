import appPromise from '../app'
import mongoose from 'mongoose';
import request from "supertest";
import { Application } from 'express';
import UserModel from '../models/user.model';

var app: Application;

const username = 'test';
const email = 'test@mail.com';
const userPassword = '123456';
let accessToken: string;
let refreshToken: string;

jest.setTimeout(30000);

beforeAll(async () => {
    app = await appPromise;
    await UserModel.deleteMany();
});

afterAll(async () => {
    await Promise.all([
        UserModel.deleteMany(),
        mongoose.connection.close()
    ])
});


describe("Auth tests", () => {
    test("Add new user", async () => {
        const response = await request(app)
            .post("/api/auth/register")
            .send({
                'username': username,
                'email': email,
                'password': userPassword
            });
        expect(response.statusCode).toEqual(201);
    });



    test("It should respond with error", async () => {
        const response = await request(app).get("/api/post/all");
        expect(response.statusCode).not.toEqual(200);
    });



    test("Login user", async () => {
        const response = await request(app).post("/api/auth/login").send({
            username: username,
            password: userPassword
        });

        expect(response.statusCode).toEqual(200);

        accessToken = response.body.accessToken;
        refreshToken = response.body.refreshToken;

        expect(accessToken).not.toEqual(null);
        expect(refreshToken).not.toEqual(null);
    });



    test('should respond with tokens', async () => {
        const response = await request(app).post('/api/auth/refresh')
            .set({ authorization: 'Bearer ' + refreshToken });
        expect(response.statusCode).toEqual(200);

        const newAccessToken = response.body.accessToken;
        const newRefreshToken = response.body.refreshToken;

        expect(newAccessToken).not.toEqual(null);
        expect(newRefreshToken).not.toEqual(null);
    });


    test('User logout', async () => {
        const response = await request(app).post('/api/auth/logout')
            .set({ authorization: 'Bearer ' + refreshToken });
        expect(response.statusCode).toEqual(200);

        const userafterLogout = await UserModel.findOne({ username });
        expect(userafterLogout?.tokens).not.toContain(refreshToken);
    });


    test('it should not provide the information', async () => {
        await new Promise(r => setTimeout(r, 20000));
        const response = await request(app).get('/api/post/all')
            .set({ authorization: 'Bearer ' + accessToken });
        expect(response.statusCode).not.toEqual(200);
    });

});





// import appPromise from '../app'
// import mongoose from 'mongoose';
// import request from "supertest";
// import { Application } from 'express';
// import UserModel from '../models/user.model';

// var app: Application;

// const username = 'test';
// const email = 'test@mail.com';
// const userPassword = '123456';
// let accessToken;
// let refreshToken;

// beforeAll(async () => {
//     app = await appPromise;
//     await UserModel.deleteOne({ username });
// });

// afterAll(async () => {
//     await UserModel.deleteOne({ username });
//     mongoose.connection.close();
// });


// describe("Register", () => {
//     test("Add new user", async () => {
//         const response = await request(app)
//             .post("/api/auth/register")
//             .send({
//                 'username': username,
//                 'email': email,
//                 'password': userPassword
//             });
//         expect(response.statusCode).toEqual(201);
//     });
// });

// describe("Restrict access without Auth /", () => {
//     test("It should respond with error", async () => {
//         const response = await request(app).get("/api/post/all");
//         expect(response.statusCode).not.toEqual(200);
//     });
// });

// describe("Login", () => {
//     test("Login user", async () => {
//         const response = await request(app).post("/api/auth/login").send({
//             username: username,
//             password: userPassword
//         });

//         expect(response.statusCode).toEqual(200);

//         accessToken = response.body.accessToken;
//         refreshToken = response.body.refreshToken;

//         expect(accessToken).not.toEqual(null);
//         expect(refreshToken).not.toEqual(null);
//     });
// });


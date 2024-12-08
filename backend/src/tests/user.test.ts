import appPromise from '../app'
import mongoose from 'mongoose';
import request from "supertest";
import { Application } from 'express';
import UserModel from '../models/user.model';
import PostModel from '../models/post.model';

var app: Application;

const username = 'testUser1';
const userPassword = '123456';
const email = 'test@email.com';
let postText = "test text"
let postImg = "img.png"
let userUpdatedImg = "img2.png"
let newUserId: string;
let accessToken: string;

beforeAll(async () => {
    app = await appPromise;
    await UserModel.deleteMany();
    await PostModel.deleteMany();
    const userResponse = await request(app)
        .post("/api/auth/register")
        .send({
            'username': username,
            'email': email,
            'password': userPassword
        });
    newUserId = userResponse.body._id;

    await loginUser();
    await request(app)
        .post('/api/post/create')
        .set({ authorization: 'Bearer ' + accessToken }).send({
            "text": postText,
            "image": postImg
        });
});

const loginUser = async () => {
    const response = await request(app).post('/api/auth/login').send({
        username: username,
        password: userPassword,
    });
    accessToken = response.body.accessToken;
}

beforeEach(async () => {
    await loginUser();
});

afterAll(async () => {
    await Promise.all([
        PostModel.deleteMany(),
        UserModel.deleteMany(),
        mongoose.connection.close()
    ])
});


describe("User Tests", () => {


    test("update a user ", async () => {
        const response = await request(app)
            .put(`/api/user/update`)
            .set({ authorization: 'Bearer ' + accessToken }).send({
                "image": userUpdatedImg
            });

        expect(response.statusCode).toEqual(200);
        expect(response.body.image).toEqual(userUpdatedImg);
    });

    test("user data", async () => {
        const response = await request(app)
            .get(`/api/user/data`)
            .set({ authorization: 'Bearer ' + accessToken }).send();

        expect(response.statusCode).toEqual(200);
        expect(response.body.username).toEqual(username);
        expect(response.body.email).toEqual(email);
    });

    test("user posts", async () => {
        const response = await request(app)
            .get(`/api/user/${newUserId}/posts`)
            .set({ authorization: 'Bearer ' + accessToken }).send();

        expect(response.statusCode).toEqual(200);
        expect(response.body.length).toEqual(1);
    });

    test("Delete a User", async () => {
        const response = await request(app)
            .delete(`/api/user/${newUserId}`)
            .set({ authorization: 'Bearer ' + accessToken }).send();
        expect(response.statusCode).toEqual(200);
        const user = await UserModel.findOne({ username });
        expect(user).toEqual(null);
    });


});


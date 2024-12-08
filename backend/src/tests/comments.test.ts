import appPromise from '../app'
import mongoose from 'mongoose';
import request from "supertest";
import { Application } from 'express';
import UserModel from '../models/user.model';
import PostModel from '../models/post.model';
import CommentModel from '../models/comment.model';
import testComments from "./data/test.comments.json";

var app: Application;

const username = 'testUser';
const userPassword = '123456';
const email = 'test@email.com';
let postText = "test text"
let postImg = "img.png"
let commentId: string;
let updatedcommentText = "comment text"
let postId: string;
let newUserId: string;
let accessToken: string;

beforeAll(async () => {
    app = await appPromise;
    await UserModel.deleteMany();
    await PostModel.deleteMany();
    await CommentModel.deleteMany();
    const userResponse = await request(app)
        .post("/api/auth/register")
        .send({
            'username': username,
            'email': email,
            'password': userPassword
        });
    newUserId = userResponse.body._id;

    await loginUser();
    const postResponse = await request(app)
        .post('/api/post/create')
        .set({ authorization: 'Bearer ' + accessToken }).send({
            "text": postText,
            "image": postImg
        });

    postId = postResponse.body._id;
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
        CommentModel.deleteMany(),
        mongoose.connection.close()
    ])
});


describe("Comment Tests", () => {

    test("create a comment ", async () => {
        const response = await request(app)
            .post(`/api/comment/create`)
            .set({ authorization: 'Bearer ' + accessToken }).send({
                "postId": postId,
                "text": testComments[0].text
            });

        expect(response.statusCode).toEqual(200);
        expect(response.body.text).toEqual(testComments[0].text);
        commentId = response.body._id;
    });

    test("get a comment ", async () => {
        const response = await request(app)
            .get(`/api/comment/${commentId}`)
            .set({ authorization: 'Bearer ' + accessToken }).send();

        expect(response.statusCode).toEqual(200);
        expect(response.body.text).toEqual(testComments[0].text);
    });

    test("get all post comments ", async () => {
        const response = await request(app)
            .get(`/api/comment/post/${postId}`)
            .set({ authorization: 'Bearer ' + accessToken }).send();

        expect(response.statusCode).toEqual(200);
        expect(response.body.length).toEqual(1);
    });


    test("update a comment ", async () => {
        const response = await request(app)
            .put(`/api/comment/update`)
            .set({ authorization: 'Bearer ' + accessToken }).send({
                "id": commentId,
                "text": updatedcommentText
            });

        expect(response.statusCode).toEqual(200);
        expect(response.body.text).toEqual(updatedcommentText);
    });



    test("Delete a Comment", async () => {
        const response = await request(app)
            .delete(`/api/comment/${commentId}`)
            .set({ authorization: 'Bearer ' + accessToken }).send();
        expect(response.statusCode).toEqual(200);
        const comment = await CommentModel.findOne({ _id: commentId });
        expect(comment).toEqual(null);
    });

    test("get all post comments 2", async () => {
        const response = await request(app)
            .get(`/api/comment/post/${postId}`)
            .set({ authorization: 'Bearer ' + accessToken }).send();

        expect(response.statusCode).toEqual(200);
        expect(response.body.length).toEqual(0);
    });


});


import { Application } from 'express';
import request from "supertest";
import appPromise from '../app';
import PostModel from '../models/post.model';
import UserModel from '../models/user.model';

var app: Application;

const username = 'testPostsUser';
const userPassword = '123456';
const email = 'test@email.com';
let postText = "test text"
let postImg = "img.png"
let postUpdatedImg = "img2.png"
let newPostSender: string;
let newPostId: string;
let accessToken: string;

beforeAll(async () => {
    app = await appPromise;
    await UserModel.deleteMany();
    await PostModel.deleteMany();
    const response = await request(app)
        .post("/api/auth/register")
        .send({
            'username': username,
            'email': email,
            'password': userPassword
        });
    newPostSender = response.body._id;
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
        PostModel.deleteMany()
    ])
});


describe("Posts Tests", () => {

    test("Posts test get all", async () => {
        const response = await request(app)
            .get('/api/post/all')
            .set({ authorization: 'Bearer ' + accessToken }).send();

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(0);
    });

    test("add new post", async () => {
        const response = await request(app)
            .post('/api/post/create')
            .set({ authorization: 'Bearer ' + accessToken }).send({
                "text": postText,
                "image": postImg
            });

        expect(response.statusCode).toEqual(200);
        expect(response.body.text).toEqual(postText);
        expect(response.body.image).toEqual(postImg);
        expect(response.body.userId).toEqual(newPostSender);
        newPostId = response.body._id;

    });

    test("Posts test get all 2", async () => {
        const response = await request(app)
            .get('/api/post/all')
            .set({ authorization: 'Bearer ' + accessToken }).send();

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
    });

    test("Like a post ", async () => {
        const response = await request(app)
            .post(`/api/post/${newPostId}/like`)
            .set({ authorization: 'Bearer ' + accessToken }).send();

        expect(response.statusCode).toEqual(200);

        expect(response.body.likes).toContain(newPostSender);


    });

    test("Unlike a post ", async () => {
        const response = await request(app)
            .post(`/api/post/${newPostId}/unlike`)
            .set({ authorization: 'Bearer ' + accessToken }).send();

        expect(response.statusCode).toEqual(200);
        expect(response.body.likes).not.toContain(newPostSender);


    });

    test("update a post ", async () => {
        const response = await request(app)
            .put(`/api/post/update`)
            .set({ authorization: 'Bearer ' + accessToken }).send({
                "id": newPostId,
                "image": postUpdatedImg
            });
        expect(response.statusCode).toEqual(200);
        expect(response.body.image).toEqual(postUpdatedImg);
    });

    test("Delete a post ", async () => {
        const response = await request(app)
            .delete(`/api/post/${newPostId}`)
            .set({ authorization: 'Bearer ' + accessToken }).send();
        expect(response.statusCode).toEqual(200);
    });


    test("Posts test get all 3", async () => {
        const response = await request(app)
            .get('/api/post/all')
            .set({ authorization: 'Bearer ' + accessToken }).send();


        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(0);
    });

});


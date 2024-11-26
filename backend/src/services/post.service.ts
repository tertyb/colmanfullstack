import { IComment } from '../models/comment.model';
import PostModel from '../models/post.model';

export const createPost = async (userId: string, text: string, image: string) => {
    const now = new Date();
    const newPost = new PostModel({ userId, text, image, date: now });

    const createdPost = await newPost.save().then(res => {
        return 'created Post sucssfully';
    }, (err) => {
        console.log(err)
        return 'could not create Post';
    });

    return createdPost;
}

export const commentOnPost = async (userId: string, postId: string, text: string,) => {
    const now = new Date();
    const comment = { userId, text, date: now };

    const updatedPost = await PostModel.findByIdAndUpdate(
        postId,
        { $push: { comments: comment } }, 
        { new: true, runValidators: true } 
    ).exec();

    if (updatedPost) {
        return 'created Post sucssfully';
    } else {
        return 'could not create Post';
    }
}

export const likePost = async (userId: string, postId: string) => {
    const now = new Date();

    const updatedPost = await PostModel.findByIdAndUpdate(
        postId,
        { $push: { likes: userId } }, 
        { new: true, runValidators: true } 
    ).exec();

    if (updatedPost) {
        return 'created Post sucssfully';
    } else {
        return 'could not create Post';
    }
}




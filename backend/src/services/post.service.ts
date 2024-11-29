import { text } from 'stream/consumers';
import { IComment } from '../models/comment.model';
import PostModel from '../models/post.model';
import { DeleteResult } from 'mongoose';

export const createPost = async (userId: string, text: string, image: string) => {
    const now = new Date();
    const newPost = new PostModel({ userId, text, image, date: now });

    const createdPost = await newPost.save().then(res => {
        return 'created Post sucssfully';
    }, (err) => {
        throw new Error('could not create Post');
    });

    return createdPost;
}

export const allPosts = async () => await PostModel.find()


export const commentOnPost = async (userId: string, postId: string, text: string,) => {
    const now = new Date();
    const comment = { userId, text, date: now };

    const updatedPost = await PostModel.findByIdAndUpdate(
        postId,
        { $push: { comments: comment } },
        { new: true, runValidators: true }
    ).exec();

    if (updatedPost) {
        return 'commented on Post sucssfully';
    } else {
        throw new Error('could not comment on Post');
    }
}


export const likePost = async (userId: string, postId: string) => {
    const updatedPost = await PostModel.findByIdAndUpdate(
        postId,
        { $addToSet: { likes: userId } },
        { new: true, runValidators: true }
    ).exec();

    if (updatedPost) {
        return 'liked Post sucssfully';
    } else {
        throw new Error('could not like Post');
    }
}

export const unlikePost = async (userId: string, postId: string) => {
    const updatedPost = await PostModel.findByIdAndUpdate(
        postId,
        { $pull: { likes: userId } },
        { new: true, runValidators: true }
    ).exec();

    if (updatedPost) {
        return 'unliked Post sucssfully';
    } else {
        throw new Error('could not unlike Post');
    }
}

export const postOwner = async (postId: string) => {
    const postInfo = await PostModel.findOne({ _id: postId });
    if (postInfo) {
        return postInfo?.userId;
    } else {
        throw new Error('post owner not found')
    }
}

export const updatePost = async (postId: string, updateData: { text?: string, image?: string }) => {

    console.log(updateData.text, updateData.image)
    const updatedPost = await PostModel.findByIdAndUpdate(
        postId,
        { $set: updateData },
        { new: true, runValidators: true }
    );
    console.log('dnaile', updatedPost)
    if (!updatedPost) {
        throw new Error('Post not found');
    }

    return updatedPost;
}

export const deletePost = async (postId: string) => {

    const result: DeleteResult = await PostModel.deleteOne(
        { _id: postId }
    );
    if (result.deletedCount == 0) {
        throw new Error('Post not found');
    }

    return 'delete Post sucssfully';
}









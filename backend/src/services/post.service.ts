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
        return 'could not comment on Post';
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
        return 'could not like Post';
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
        return 'could not unlike Post';
    }
}





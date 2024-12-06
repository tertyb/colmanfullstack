import mongoose, { DeleteResult } from 'mongoose';
import PostModel, { IPost } from '../models/post.model';
import { BaseService } from './base.service';

export class PostService extends BaseService<IPost> {
    constructor() {
        super(PostModel);
    }

    async changeLikeMode(userId: string, postId: string, isLike: boolean) {
        const findByIdAndUpdateConfig = isLike ? { $addToSet: { likes: userId } } : { $pull: { likes: userId } };
        const findByIdAndUpdateOptions = { new: true, runValidators: true };
        return await this.customizedUpdate(postId, findByIdAndUpdateConfig, findByIdAndUpdateOptions);
    }

    async getPostOwner(postId: string) {
        const postInfo = await this.getById(postId);
        if (postInfo) {
            return postInfo?.userId;
        } else {
            throw new Error('post owner not found')
        }
    }

    async getPosts() {
        return await this.getByFilter();
    }
}













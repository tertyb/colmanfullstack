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
}













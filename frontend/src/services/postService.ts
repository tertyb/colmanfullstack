import useSWR from "swr";
import { IPost, IUserPostsResponse } from "../interfaces/post";
import { AxiosInstence } from "./axios/AxiosInstance";
import { showToast } from "../consts/toast";
import { IGenericResponse } from "../interfaces/user";

export const useGetUserPosts = (userid?: string) =>
    useSWR<IPost[]>(
        userid ? `posts-${userid}` : null,
        async () => {
            const res = await AxiosInstence.get<IUserPostsResponse>(`/user/${userid}/posts`);
            return res.data.posts;
        }, {
        refreshInterval: 1000 * 10,
    }
    );

export const editPost = async (postId: string, editedPost: Partial<IPost>) => {
    try {
        const responseStatus = (await AxiosInstence.put<IGenericResponse>(`post/${postId}/update`, {
            ...editedPost,
        })).data
        showToast(responseStatus.message, "success");
      } catch (error) {
        showToast('failed to edit post', "error")
    }
}

export const deletePost = async (postId: string) => {
    try {
        const responseStatus = (await AxiosInstence.delete<IGenericResponse>(`post/${postId}`)).data
        showToast(responseStatus.message, "success");
      } catch (error) {
        showToast('failed to delete post', "error")
    }
}

export const likePost = async (postId: string) => {
    try {
         (await AxiosInstence.post<IGenericResponse>(`post/${postId}/like`)).data
      } catch (error) {
        showToast('failed to like post', "error")
    }
}

export const unlikePost = async (postId: string) => {
    try {
         (await AxiosInstence.post<IGenericResponse>(`post/${postId}/unlike`)).data
      } catch (error) {
        showToast('failed to unlike post', "error")
    }
}

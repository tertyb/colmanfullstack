export interface IPost {
    _id: string;
    userId: string;
    text: string;
    image: string;
    date: string;
    likes: string[];
    comments: CommentModel[];
  }

  export interface CommentModel {
    username: string;
    text: string;
    date: string;
  }

  export interface IUserPostsResponse {
    posts: IPost[]
  }
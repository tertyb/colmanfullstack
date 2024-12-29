export interface IPost extends IPostMainData {
    _id: string;
    userId: string;
    date: string;
    likes: string[];
    comments: CommentModel[];
  }

  export interface IPostWithUser extends IPost {
    postUserImage: string;
    postUsername: string
  }

  export interface IPostMainData {
    text: string;
    image: string;
    
  }

  export interface CommentModel {
    username: string;
    text: string;
    date: string;
    image?: string
  }

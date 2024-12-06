
export interface IUser {
    _id: string;
    username: string;
    description?: string
  }

  export interface IUserResponse {
    userData: IUser;
  }

  export interface IGenericResponse {
    message: string;
  }


 
  
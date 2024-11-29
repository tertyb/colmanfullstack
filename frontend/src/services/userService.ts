import axios from 'axios';
import useSWR from 'swr'; // Replace with your Axios instance setup
import { showToast } from '../consts/toast';
import { IGenericResponse, IUser, IUserResponse } from '../interfaces/user';
import { AxiosInstence } from './axios/AxiosInstance';
import { updateTokens } from '../utils/functions/localstorage';

export interface ILoginResponse {
  token: string;
  refreshToken: string;
}

export const userDataKey = 'user-data'

const fetchUserData = async () => {
  const res = await AxiosInstence.get<IUserResponse>('/user/data');
  return res.data.userData;
}

export const useGetUserData = (userid: string | null) =>
  useSWR<IUser>(
    userid ? `user-data` : null,
    fetchUserData
  );


export const loginUser = async (username: string, password: string) => {

  const data = (await axios.post<ILoginResponse>('http://localhost:5000/api/auth/login', {
    username,
    password
  })).data;

  updateTokens(data)
};

export const registerUser = async (username: string, password: string) => {

  const data = (await axios.post<ILoginResponse>('http://localhost:5000/api/auth/register', {
    username,
    password
  })).data;
  
  updateTokens(data);
};

export const getLogin = async (username: string, password: string) => {
  try {
    await loginUser(username, password);
    showToast('login successfully', "success");

    return true;
  } catch (error) {
    showToast('failed to login', "error");
    return 
  }
}

export const getRegister = async (username: string, password: string) => {
  try {
    await registerUser(username, password);
    showToast('register successfully', "success");

  } catch (error) {
    showToast('failed to register', "error")
  }
}

export const editProfile = async (userId: string, editedProfile: Partial<IUser>) => {
  try {
      const responseStatus = (await AxiosInstence.put<IGenericResponse>(`user/update`, {
          ...editedProfile,
      })).data
      showToast(responseStatus.message, "success")
    } catch (error) {
      showToast('failed to edit post', "error")
  }
}


import axios from 'axios';
import useSWR from 'swr'; // Replace with your Axios instance setup
import { showToast } from '../consts/toast';
import { IGenericResponse, IUser } from '../interfaces/user';
import { getAuthTokenByName, refreshTokenName, removeAuthTokens, updateTokens } from '../utils/functions/localstorage';
import { AxiosInstence } from './axios/AxiosInstance';

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IRegisterResponse {
  _id: string;
  username: string;
  password: string;
}

export const userDataKey = 'user-data'

const fetchUserData = async () => {
  const res = await AxiosInstence.get<IUser>('/user/data');
  return res.data;
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

export const registerUser = async (email: string, username: string, password: string) => {

  (await axios.post<IRegisterResponse>('http://localhost:5000/api/auth/register', {
    email,
    username,
    password
  }));

  await loginUser(username, password);
};

export const logout = async () => {
  try {
    const refreshToken = getAuthTokenByName(refreshTokenName);
    (await axios.post<IRegisterResponse>('http://localhost:5000/api/auth/logout', {}, {
      headers: {
        Authorization: `Bearer ${refreshToken}`
      }
    }));
    removeAuthTokens()
  } catch {
    showToast('failed to logout', "error");

  }
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


export const editProfile = async (userId: string, editedProfile: FormData) => {
  try {
    (await AxiosInstence.put<IGenericResponse>(`user/update`, editedProfile)).data
    showToast('successfully update profile', "success")
  } catch (error) {
    showToast('failed to edit post', "error")
  }
}


import axios from 'axios';
import useSWR from 'swr'; // Replace with your Axios instance setup
import { IUser } from '../interfaces/user';
import { AxiosInstence } from './axios/AxiosInstance';

export interface ILoginResponse {
  token: string;
  refreshToken: string;
}

const fetchUserData = async () => {
  const res = await AxiosInstence.get<IUser>('/user/userData');
  return res.data;
}

export const useGetAutomaticUserData = (token: string | null) =>
  useSWR<IUser>(
    token ? ['UserData', token] : null,
    fetchUserData
  );

const getAuthentication = async (username: string, password: string) => {

  const res = await axios.post<ILoginResponse>('http://localhost:5000/api/auth/login', {
    username,
    password
  });
  localStorage.setItem('accessToken', res.data.token);
  console.log('auth - ', JSON.stringify(res.data.token))
};

const registerUser = async (username: string, password: string) => {

  const res = await axios.post<ILoginResponse>('http://localhost:5000/api/auth/register', {
    username,
    password
  });
  localStorage.setItem('accessToken', res.data.token);
  console.log('auth - ', JSON.stringify(res.data.token))
};
export const getLogin = async (username: string, password: string) => {
  try {
    await getAuthentication(username, password);
    return await fetchUserData();
  } catch (error) {
    alert('שגיאה בניסיון ההתחברות');
    //add here alertify
  }
}

export const register = async (username: string, password: string) => {
  try {
    await registerUser(username, password);
    // console.log('daniel')
    return await fetchUserData();
  } catch (error) {
    alert('שגיאה בניסיון ההתחברות');
    //add here alertify
  }
}



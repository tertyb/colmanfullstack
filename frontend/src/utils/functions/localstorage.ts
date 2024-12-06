import { ILoginResponse } from "../../services/userService";

export const updateTokens = (authTokens: ILoginResponse) => {
  localStorage.setItem('accessToken', authTokens.token);
  localStorage.setItem('refreshToken', authTokens.refreshToken);
}

export const removeAuthTokens = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
}
import axios, { AxiosResponse } from "axios";
import useSWR from "swr";

// Create an Axios instance
export const AxiosInstence = axios.create({
    baseURL: "http://localhost:5000/api", // Replace with your API base URL
});
// Attach tokens to requests
AxiosInstence.interceptors.request.use((request) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        request.headers.Authorization = `Bearer ${token}`;
        console.log('add token', token)
    }
    return request;
});

// Handle token refresh
AxiosInstence.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem("refreshToken");
            try {
                const { data } = await axios.post("http://localhost:5000/auth/refresh", {
                    token: refreshToken,
                });

                // Update tokens
                localStorage.setItem("accessToken", data.accessToken);
                localStorage.setItem("refreshToken", data.refreshToken);

                // Retry original request
                originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
                // return AxiosInstence(originalRequest);
            } catch (refreshError) {
                // Handle refresh token failure (e.g., log out user)
                console.error("Refresh token failed:", refreshError);
                throw refreshError;
            }
        }

        throw error;
    }
);

// SWR fetcher using Axios
const fetcher = (url: string) => AxiosInstence.get(url).then((res) => res.data);

// Example: Using SWR with the custom fetcher
export function useData(endpoint: string) {
    const { data, error, isLoading } = useSWR(endpoint, fetcher, {
        revalidateOnFocus: false, // Optional: Adjust based on your needs
    });

    return { data, error, isLoading };
}

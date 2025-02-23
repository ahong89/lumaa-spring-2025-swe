import axios from "./axios";
import type { AxiosError } from "axios";

export async function loginAPI(username: string, password: string) {
  try {
    const response = await axios.post("/auth/login", {
      username: username,
      password: password,
    });
    localStorage.setItem("accessToken", response.data.token);
    return response;
  } catch(error) {
    const axiosError = error as AxiosError<{ error: string }>;
    return axiosError?.response;
  }
}

export async function signupAPI(username: string, password: string) {
  try {
    const response = await axios.post("/auth/register", {
      username: username,
      password: password,
    });
    return response;
  } catch(error) {
    const axiosError = error as AxiosError<{ error: string }>;
    return axiosError?.response;
  }
}


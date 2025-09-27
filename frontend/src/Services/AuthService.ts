import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

interface LoginResponse {
  token: string;
}

export default class AuthService {
  static async register(username: string, password: string): Promise<LoginResponse> {
    try {
      const res = await axios.post<LoginResponse>(API_URL + 'users', { username, password });
      return res.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Registration failed");
      }
      throw new Error("An unexpected error occurred");
    }
  }

  static async login(username: string, password: string): Promise<LoginResponse> {
    try {
      const res = await axios.post<LoginResponse>(API_URL + 'users/login', { username, password });
      if (res.data.token) {
        localStorage.setItem("user", JSON.stringify({ token: res.data.token }));
      }

      return res.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Login failed");
      }
      console.error('Error:', error)
      throw new Error("An unexpected error occurred");
    }
  }

  static logout() {
    localStorage.removeItem("user");
  }

  static getCurrentUser(): { token: string } | null {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  }
}
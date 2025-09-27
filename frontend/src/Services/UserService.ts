import axios from "axios";
import { authHeader } from "../Utils/UtilFunctions";

const API_URL = import.meta.env.VITE_API_URL;

interface UserResponse {
    id: string,
    username: string,
    password: string,
    rounds: string[],
}

export default class UserService {
    static async getUser(): Promise<UserResponse> {
        try {
            const user = await axios.get(API_URL + 'users/me', { headers: authHeader() });
            return user.data;
        } catch (error) {
            console.error('UserService getUser() Error:', error);
            throw new Error('Failed to get user data.');
        }
    }

    static async getHandicap(): Promise<number | null> {
        try {
            const handicap = await axios.get(API_URL + 'users/me/handicap', { headers: authHeader() });
            return handicap.data.message === 'Insufficient rounds' ? null : handicap.data;
        } catch (error) {
            console.error('UserService getHandicap() Error:', error);
            throw new Error('Failed to get user handicap.');
        }
    }

}
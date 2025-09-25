import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

interface UserResponse {
    id: string,
    username: string,
    password: string,
    rounds: string[],
}

function authHeader() {
    const localUser = localStorage.getItem('user');
    let user = null;
    if(localUser) {
        user = JSON.parse(localUser);
    }

    if (user.token) {
        return { Authorization:`Bearer ${user.token}`};
    } else {
        return { Authorization: ''};
    }
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

    static async getHandicap(): Promise<number> {
        try {
            const handicap = await axios.get(API_URL + 'users/me/handicap', { headers: authHeader() });
            return handicap.data;
        } catch (error) {
            console.error('UserService getHandicap() Error:', error);
            throw new Error('Failed to get user handicap.');
        }
    }

}
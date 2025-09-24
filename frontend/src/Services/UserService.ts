import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function authHeader() {
    const userToken = localStorage.getItem('user');
    let user = null;
    if(userToken) {
        user = JSON.parse(userToken);
    }

    if (user && user.accessToken) {
        return { Authorization: 'Bearer ' + user.accessToken};
    } else {
        return { Authorization: ''};
    }
}


export default class UserService {
    static async getUser(): Promise<Response> {
        return axios.get(API_URL + 'users/me', { headers: authHeader() });
    }

    static async getHandicap(): Promise<Response> {
        return axios.get(API_URL + 'users/me/handicap', { headers: authHeader() });
    }

}
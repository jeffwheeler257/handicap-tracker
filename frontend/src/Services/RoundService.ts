import axios from "axios";
import { authHeader } from "../Utils/UtilFunctions";

const API_URL = import.meta.env.VITE_API_URL;

interface RoundInterface {
    id: string,
    course: string,
    courseRating: number,
    slopeRating: number,
    numberOfHoles: 9 | 18,
    date: Date,
    score: number,
    user: string,
    scoreDifferential: number
}

export default class RoundService {
    static async postRound( course: string, 
                            courseRating: number, 
                            slopeRating: number,
                            numberOfHoles: 9 | 18, 
                            date: Date,
                            score: number): Promise<RoundInterface> {
        try {
            const round = await axios.post(
                API_URL + 'rounds', 
                {  
                    course, 
                    courseRating, 
                    slopeRating, 
                    numberOfHoles,
                    date,
                    score
                },
                {
                    headers: authHeader()
                }
            );
            return round.data;
        } catch (error) {
            console.error('RoundService postRound error: ', error);
            throw new Error('Failed to create round.');
        }
    }
}
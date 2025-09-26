import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import UserService from "../Services/UserService";
import { useAuth } from "../Utils/AuthContext";

export function Home() {
    const [username, setUsername] = useState('');
    const [handicap, setHandicap] = useState<number | null>(null);
    const [userError, setUserError] = useState<string | null>(null);
    const {isLoggedIn} = useAuth();

    useEffect(() => {
        if (isLoggedIn) {
            UserService.getUser()
                .then(user => {
                    setUsername(user.username);
                })
                .catch(error => {
                    setUserError("Failed to get username.");
                    console.log(error);
                });
            UserService.getHandicap()
                .then(handicap => {
                    setHandicap(handicap);
                })
                .catch(error => {
                    setHandicap(null);
                    console.log(error);
                })
        }
    }, [isLoggedIn]);
    
    return (
        <div className="p-6 max-w-2xl mx-auto text-center">
            {isLoggedIn ? (
                <div>
                    <h1 className="text-3xl font-bold mb-4">
                        {userError ? userError : "Welcome back " + username}
                    </h1>
                    <p className="text-lg text-gray-700">
                        {!handicap ? "Need at least 3 rounds to get handicap" : "Your handicap: " + handicap.toFixed(1)}
                    </p>
                </div>
            ) : (
                <div className="flex flex-col gap-4 max-w-xl mx-auto p-4">
                    <h1 className="text-3xl font-bold mb-4">Welcome to Handitracker!</h1>
                    <p className="text-lg text-gray-700">
                        Login to view your handicap, enter a round, or view your round history.
                    </p>
                    <Link 
                        className="self-center rounded-md bg-slate-900 text-white hover:bg-slate-800 px-4 py-2" 
                        to='/login'
                        >
                        Login
                    </Link>
                </div>

            )}
        </div>
    )
}
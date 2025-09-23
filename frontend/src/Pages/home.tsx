import { Link } from "react-router-dom"

interface HomeProps {
    isLoggedIn: boolean;
    username?: string;
};

export function Home( {isLoggedIn, username}: HomeProps) {
    return (
        <div className="p-6 max-w-2xl mx-auto text-center">
            {isLoggedIn ? (
                <div>
                    <h1 className="text-3xl font-bold mb-4">Welcome back, {username}!</h1>
                    <p className="text-lg text-gray-700">Your handicap is: NEED LOGIC</p>
                </div>
            ) : (
                <div>
                    <h1 className="text-3xl font-bold mb-4">Welcome to Handitracker!</h1>
                    <p className="text-lg text-gray-700">
                        Login to view your handicap, enter a round, or view your round history: LOGIN.
                    </p>
                    <Link to='/login'>Login</Link>
                </div>

            )}
        </div>
    )
}
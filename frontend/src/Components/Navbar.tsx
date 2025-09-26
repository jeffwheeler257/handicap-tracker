import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Utils/AuthContext";

export function Navbar() {
    const {logout} = useAuth();
    const navigate = useNavigate();
    function handleLogout() {
        logout();
        alert('Logged out');
        navigate('/home', { replace: true });
        
    }
    return (
        <>
            <div className="flex justify-center space-x-12">
                <Link to='/home'>Home</Link>
                <Link to='/roundinput'>Enter Round</Link>
                <Link to='/history'>View History</Link>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </>
    )
}
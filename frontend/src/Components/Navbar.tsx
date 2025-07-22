import { Link } from "react-router-dom"
import "./Navbar.css"

export function Navbar() {
    return (
        <>
            <div className="navbar">
                <Link to='/home'>Home</Link>
                <Link to='/roundinput'>Enter Round</Link>
                <Link to='/history'>View History</Link>
            </div>
        </>
    )
}
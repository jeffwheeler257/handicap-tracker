import { Link } from "react-router-dom"

export function Navbar() {
    return (
        <>
            <div className="flex justify-center space-x-12">
                <Link to='/home'>Home</Link>
                <Link to='/roundinput'>Enter Round</Link>
                <Link to='/history'>View History</Link>
            </div>
        </>
    )
}
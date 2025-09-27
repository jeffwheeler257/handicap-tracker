import { Navbar } from "./Components/Navbar"
import { Outlet } from "react-router-dom"
import { useAuth } from "./Utils/AuthContext"

export function Layout() {
    const { isLoggedIn } = useAuth();
    
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            {isLoggedIn ? (
                <>
                    <Navbar />
                    <main className="max-w-4xl mx-auto p-4">
                        <Outlet />
                    </main>
                </>
            ) : (
                <main className="max-w-4xl mx-auto p-4">
                    <Outlet />
                </main>
            )}
        </div>
    );
}
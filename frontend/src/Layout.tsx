import { Navbar } from "./Components/Navbar"
import { Outlet } from "react-router-dom"

export function Layout() {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            <Navbar/>
            <main className="max-w-4xl mx-auto p-4">
                <Outlet/>
            </main>
        </div>
    )
}
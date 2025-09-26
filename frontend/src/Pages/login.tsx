import LoginForm from "../Components/LoginForm";
import { useAuth } from "../Utils/AuthContext";
import { Navigate } from 'react-router-dom';

export function Login() {
    const { isLoggedIn } = useAuth();
    return (
        <div className="p-6 max-w-2xl mx-auto text-center">
            {isLoggedIn ? (
                <Navigate to='/home' replace />
            ) : (
                <LoginForm />
            )}
            
        </div>
    )
}
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
    exp: number;
    token: string;
}

interface AuthContextType {
    isLoggedIn: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    login: () => {},
    logout: () => {}
});

function isTokenExpired(token: string): boolean {
    const decoded = jwtDecode<JwtPayload>(token);
    const now = Date.now() / 1000;
    return decoded.exp ? decoded.exp < now : true;
}

export const AuthProvider = ({children} : {children: ReactNode}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedToken = localStorage.getItem('user');

        if (storedToken && !isTokenExpired(storedToken)) {
            setIsLoggedIn(true);
        } else {
            localStorage.removeItem('user');
            setIsLoggedIn(false);
        }
    }, [])

    const login = (token: string) => {
        localStorage.setItem('user', token)
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('user');
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{isLoggedIn, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
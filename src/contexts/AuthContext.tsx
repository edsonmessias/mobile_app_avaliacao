import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { isAuthenticated, login as loginService, logout as logoutService } from '../services/auth';

type AuthContextType = {
    isLogged: boolean;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
    isLogged: false,
    login: async () => false,
    logout: async () => { },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        isAuthenticated().then(setIsLogged);
    }, []);

    const login = async (username: string, password: string) => {
        const success = await loginService(username, password);
        setIsLogged(success);
        return success;
    };

    const logout = async () => {
        await logoutService();
        setIsLogged(false);
    };

    return (
        <AuthContext.Provider value={{ isLogged, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

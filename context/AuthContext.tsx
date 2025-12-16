'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'admin' | 'service_manager' | 'financial_analyst';

export interface User {
    username: string;
    name: string;
    email: string;
    role: UserRole;
    title: string;
    brand?: string;
}

interface AuthContextType {
    user: User | null;
    login: (username: string, password: string) => boolean;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users with visible credentials
export const DEMO_USERS: Record<string, { password: string; user: User }> = {
    admin: {
        password: 'admin123',
        user: {
            username: 'admin',
            name: 'System Administrator',
            email: 'admin@tmhna.com',
            role: 'admin',
            title: 'IT Administrator',
        },
    },
    michael: {
        password: 'service123',
        user: {
            username: 'michael',
            name: 'Michael Reynolds',
            email: 'michael.reynolds@tmhna.com',
            role: 'service_manager',
            title: 'Regional Service Operations Manager',
            brand: 'TMH',
        },
    },
    sarah: {
        password: 'finance123',
        user: {
            username: 'sarah',
            name: 'Sarah Martinez',
            email: 'sarah.martinez@tmhna.com',
            role: 'financial_analyst',
            title: 'Senior Financial Planning & Analysis Lead',
            brand: 'Raymond + TMHNA',
        },
    },
};

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check for stored session on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('tmhna_user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setIsAuthenticated(true);
        }
    }, []);

    const login = (username: string, password: string): boolean => {
        const userCredentials = DEMO_USERS[username.toLowerCase()];

        if (userCredentials && userCredentials.password === password) {
            setUser(userCredentials.user);
            setIsAuthenticated(true);
            localStorage.setItem('tmhna_user', JSON.stringify(userCredentials.user));
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('tmhna_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

// Helper to determine which pages a user can access
export function getAccessiblePages(role: UserRole): string[] {
    switch (role) {
        case 'admin':
            return ['/', '/ontology', '/lineage', '/financial', '/factory', '/insights', '/data-management'];
        case 'service_manager':
            return ['/', '/factory', '/ontology'];
        case 'financial_analyst':
            return ['/', '/financial', '/insights', '/data-management'];
        default:
            return ['/'];
    }
}

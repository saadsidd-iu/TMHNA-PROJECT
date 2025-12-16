'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuth();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        // Allow access to login page without authentication
        if (pathname === '/login') {
            return;
        }

        // Redirect to login if not authenticated
        if (!isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, pathname, router]);

    // Show login page if on login route
    if (pathname === '/login') {
        return <>{children}</>;
    }

    // Show loading or nothing while checking auth
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#1C2127]">
                <div className="text-[#ABB3BF]">Loading...</div>
            </div>
        );
    }

    return <>{children}</>;
}

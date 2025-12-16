'use client';

import { usePathname } from 'next/navigation';
import { NavigationBar } from './NavigationBar';

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/login';

    if (isLoginPage) {
        return (
            <main className="flex-1 overflow-auto h-screen">
                {children}
            </main>
        );
    }

    return (
        <div className="flex h-screen overflow-hidden">
            <NavigationBar />
            <main className="flex-1 overflow-auto">
                {children}
            </main>
        </div>
    );
}

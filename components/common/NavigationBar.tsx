'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Network, GitBranch, DollarSign, Factory, TrendingUp, Database, LogOut, User } from 'lucide-react';
import { useAuth, getAccessiblePages } from '@/context/AuthContext';

const allPages = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Ontology', path: '/ontology', icon: Network },
    { name: 'Data Lineage', path: '/lineage', icon: GitBranch },
    { name: 'Financial Intelligence', path: '/financial', icon: DollarSign },
    { name: 'Factory Floor', path: '/factory', icon: Factory },
    { name: 'Enterprise Insights', path: '/insights', icon: TrendingUp },
    { name: 'Data Management', path: '/data-management', icon: Database },
];

export function NavigationBar() {
    const pathname = usePathname();
    const router = useRouter();
    const { user, logout, isAuthenticated } = useAuth();

    if (!isAuthenticated || !user) {
        return null;
    }

    const accessiblePaths = getAccessiblePages(user.role);
    const visiblePages = allPages.filter(page => accessiblePaths.includes(page.path));

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    return (
        <nav className="w-56 h-screen bg-[#252A31] border-r border-[#404854] flex flex-col">
            {/* Navigation Tabs */}
            <div className="flex-1 py-4">
                {visiblePages.map((page) => {
                    const Icon = page.icon;
                    const isActive = pathname === page.path;

                    return (
                        <Link
                            key={page.path}
                            href={page.path}
                            className={`flex items-center gap-3 px-4 py-2.5 mx-2 mb-1 text-xs font-medium transition-colors ${isActive
                                    ? 'bg-[#2D72D2] text-white'
                                    : 'text-[#ABB3BF] hover:text-[#F6F7F9] hover:bg-[#2F343C]'
                                }`}
                        >
                            <Icon className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate">{page.name}</span>
                        </Link>
                    );
                })}
            </div>

            {/* User Info & Logout */}
            <div className="border-t border-[#404854] p-4">
                <div className="flex items-start gap-2 mb-3">
                    <User className="w-3.5 h-3.5 text-[#ABB3BF] flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium text-[#F6F7F9] truncate">{user.name}</div>
                        <div className="text-[10px] text-[#8F99A8] truncate">{user.role.replace('_', ' ')}</div>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-3 py-2 text-xs text-[#ABB3BF] hover:text-[#F6F7F9] hover:bg-[#2F343C] transition-colors"
                >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Logout</span>
                </button>
            </div>
        </nav>
    );
}

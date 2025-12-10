'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Database, GitBranch, Factory, DollarSign, LineChart, FolderOpen } from 'lucide-react';

const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/ontology', label: 'Ontology', icon: Database },
    { path: '/lineage', label: 'Data Lineage', icon: GitBranch },
    { path: '/factory', label: 'Factory Floor', icon: Factory },
    { path: '/financial', label: 'Financial', icon: DollarSign },
    { path: '/insights', label: 'Insights', icon: LineChart },
    { path: '/data-management', label: 'Data Mgmt', icon: FolderOpen },
];

export function NavigationBar() {
    const pathname = usePathname();

    return (
        <nav className="h-[60px] bg-[#252A31] border-b border-[#404854] flex items-center px-6 gap-1">
            {navItems.map(item => {
                const Icon = item.icon;
                const isActive = pathname === item.path;

                return (
                    <Link
                        key={item.path}
                        href={item.path}
                        className={`
              flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors
              ${isActive
                                ? 'bg-[#2D72D2] text-white'
                                : 'text-[#ABB3BF] hover:text-[#F6F7F9] hover:bg-[#2F343C]'
                            }
            `}
                    >
                        <Icon className="w-4 h-4" />
                        {item.label}
                    </Link>
                );
            })}
        </nav>
    );
}

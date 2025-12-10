import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
    title: string;
    value: string | number;
    unit?: string;
    comparison?: {
        value: string;
        trend: 'up' | 'down' | 'neutral';
    };
    icon: LucideIcon;
    className?: string;
}

export function KPICard({ title, value, unit, comparison, icon: Icon, className = '' }: KPICardProps) {
    const getTrendColor = () => {
        if (!comparison) return '';
        switch (comparison.trend) {
            case 'up': return 'text-[#238551]';
            case 'down': return 'text-[#CD4246]';
            default: return 'text-[#ABB3BF]';
        }
    };

    const getTrendIcon = () => {
        if (!comparison) return null;
        switch (comparison.trend) {
            case 'up': return '↑';
            case 'down': return '↓';
            default: return '→';
        }
    };

    return (
        <div
            className={`bg-[#2F343C] border border-[#404854] p-5 shadow-[0_0_0_1px_rgba(16,22,26,0.1),0_1px_1px_rgba(16,22,26,0.2),0_2px_6px_rgba(16,22,26,0.2)] ${className}`}
        >
            <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#ABB3BF] uppercase tracking-wide">{title}</span>
                <Icon className="w-4 h-4 text-[#2D72D2]" />
            </div>
            <div className="flex items-baseline gap-1 mb-1">
                <span className="text-2xl font-semibold text-[#F6F7F9]">{value}</span>
                {unit && <span className="text-sm text-[#ABB3BF]">{unit}</span>}
            </div>
            {comparison && (
                <div className={`text-sm font-medium ${getTrendColor()}`}>
                    {getTrendIcon()} {comparison.value}
                </div>
            )}
        </div>
    );
}

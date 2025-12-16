'use client';

import { useState } from 'react';
import { Card } from '@/components/common/Card';
import { KPICard } from '@/components/common/KPICard';
import { DollarSign, TrendingUp, TrendingDown, Activity, ChevronDown, Calendar } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Full dataset for all brands
const monthlyRevenueData = [
    { month: 'Jan', tmh: 28.5, raymond: 16.8, thd: 2.3 },
    { month: 'Feb', tmh: 27.2, raymond: 16.2, thd: 2.2 },
    { month: 'Mar', tmh: 30.1, raymond: 17.5, thd: 2.5 },
    { month: 'Apr', tmh: 29.5, raymond: 17.1, thd: 2.4 },
    { month: 'May', tmh: 30.8, raymond: 18.0, thd: 2.6 },
    { month: 'Jun', tmh: 29.1, raymond: 16.9, thd: 2.3 },
    { month: 'Jul', tmh: 28.7, raymond: 16.7, thd: 2.2 },
    { month: 'Aug', tmh: 30.5, raymond: 17.8, thd: 2.5 },
    { month: 'Sep', tmh: 29.4, raymond: 17.2, thd: 2.4 },
    { month: 'Oct', tmh: 30.9, raymond: 18.1, thd: 2.7 },
    { month: 'Nov', tmh: 31.2, raymond: 18.4, thd: 2.8 },
    { month: 'Dec', tmh: 32.4, raymond: 19.3, thd: 3.1 },
];

const entityData = [
    { entity: 'TMH', revenue: 350, cogs: 252, grossProfit: 98, opex: 62, ebit: 36 },
    { entity: 'Raymond', revenue: 204, cogs: 143, grossProfit: 61, opex: 41, ebit: 20 },
    { entity: 'THD', revenue: 29, cogs: 22, grossProfit: 7, opex: 6, ebit: 1 },
];

type FilterOption = 'TMHNA' | 'TMH' | 'Raymond' | 'THD';

const filterOptions: FilterOption[] = ['TMHNA', 'TMH', 'Raymond', 'THD'];

// Brand colors
const brandColors = {
    tmh: '#EB0A1E',
    raymond: '#00843D',
    thd: '#0033A0',
};

const brandMixData = [
    { name: 'TMH', value: 60, color: '#EB0A1E' },
    { name: 'Raymond', value: 35, color: '#00843D' },
    { name: 'THD', value: 5, color: '#0033A0' },
];

export default function FinancialPage() {
    const [selectedFilter, setSelectedFilter] = useState<FilterOption>('TMHNA');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [startDate, setStartDate] = useState('2024-01-01');
    const [endDate, setEndDate] = useState('2024-12-31');
    const [showStartCal, setShowStartCal] = useState(false);
    const [showEndCal, setShowEndCal] = useState(false);

    // Filter data based on selection
    const getFilteredKPIs = () => {
        if (selectedFilter === 'TMHNA') {
            return {
                revenue: '$583M',
                revenueTrend: { value: '12% vs LY', trend: 'up' as const },
                margin: '28.4%',
                marginTrend: { value: '1.2 pts vs LY', trend: 'up' as const },
                opex: '$124M',
                opexTrend: { value: '3% vs budget', trend: 'down' as const },
                backlog: '$312M',
                backlogTrend: { value: '8% vs target', trend: 'up' as const },
            };
        } else if (selectedFilter === 'TMH') {
            return {
                revenue: '$350M',
                revenueTrend: { value: '14% vs LY', trend: 'up' as const },
                margin: '28.0%',
                marginTrend: { value: '1.5 pts vs LY', trend: 'up' as const },
                opex: '$77M',
                opexTrend: { value: '2% vs budget', trend: 'down' as const },
                backlog: '$187M',
                backlogTrend: { value: '11% vs target', trend: 'up' as const },
            };
        } else if (selectedFilter === 'Raymond') {
            return {
                revenue: '$204M',
                revenueTrend: { value: '9% vs LY', trend: 'up' as const },
                margin: '29.9%',
                marginTrend: { value: '0.8 pts vs LY', trend: 'up' as const },
                opex: '$41M',
                opexTrend: { value: '1% vs budget', trend: 'up' as const },
                backlog: '$108M',
                backlogTrend: { value: '5% vs target', trend: 'up' as const },
            };
        } else { // THD
            return {
                revenue: '$29M',
                revenueTrend: { value: '5% vs LY', trend: 'up' as const },
                margin: '24.1%',
                marginTrend: { value: '-0.3 pts vs LY', trend: 'down' as const },
                opex: '$6M',
                opexTrend: { value: '4% vs budget', trend: 'up' as const },
                backlog: '$17M',
                backlogTrend: { value: '2% vs target', trend: 'up' as const },
            };
        }
    };

    const getFilteredEntityData = () => {
        if (selectedFilter === 'TMHNA') {
            return entityData;
        }
        return entityData.filter(e => e.entity === selectedFilter);
    };

    const getChartLines = () => {
        if (selectedFilter === 'TMHNA') {
            return (
                <>
                    <Line type="monotone" dataKey="tmh" stroke={brandColors.tmh} strokeWidth={2} name="TMH" />
                    <Line type="monotone" dataKey="raymond" stroke={brandColors.raymond} strokeWidth={2} name="Raymond" />
                    <Line type="monotone" dataKey="thd" stroke={brandColors.thd} strokeWidth={2} name="THD" />
                </>
            );
        } else if (selectedFilter === 'TMH') {
            return <Line type="monotone" dataKey="tmh" stroke={brandColors.tmh} strokeWidth={2} name="TMH" />;
        } else if (selectedFilter === 'Raymond') {
            return <Line type="monotone" dataKey="raymond" stroke={brandColors.raymond} strokeWidth={2} name="Raymond" />;
        } else {
            return <Line type="monotone" dataKey="thd" stroke={brandColors.thd} strokeWidth={2} name="THD" />;
        }
    };

    const kpis = getFilteredKPIs();
    const filteredEntities = getFilteredEntityData();

    return (
        <div className="min-h-screen p-8 space-y-8">
            {/* Header with Filter */}
            <div className="flex items-start justify-between mb-8">
                <div>
                    <h1 className="text-4xl font-semibold text-[#F6F7F9] mb-2">Financial Intelligence</h1>
                    <p className="text-[#ABB3BF]">
                        {selectedFilter === 'TMHNA'
                            ? 'Consolidated P&L and cross-entity financial metrics'
                            : `${selectedFilter} financial performance and metrics`
                        }
                    </p>
                </div>

                {/* Filters Row */}
                <div className="flex items-center gap-4">
                    {/* Date Range Filter */}
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <button
                                onClick={() => { setShowStartCal(!showStartCal); setShowEndCal(false); }}
                                className="flex items-center gap-2 px-3 py-2 bg-[#2F343C] border border-[#404854] hover:border-[#4C90F0] text-[#F6F7F9] transition-colors text-sm"
                            >
                                <Calendar className="w-4 h-4 text-[#ABB3BF]" />
                                <span>{startDate}</span>
                            </button>
                            {showStartCal && (
                                <div className="absolute top-full left-0 mt-2 bg-[#2F343C] border border-[#404854] shadow-lg z-20 p-3">
                                    <input
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => { setStartDate(e.target.value); setShowStartCal(false); }}
                                        className="bg-[#252A31] border border-[#404854] text-[#F6F7F9] px-3 py-2 focus:border-[#4C90F0] focus:outline-none"
                                    />
                                </div>
                            )}
                        </div>
                        <span className="text-[#ABB3BF] text-sm">to</span>
                        <div className="relative">
                            <button
                                onClick={() => { setShowEndCal(!showEndCal); setShowStartCal(false); }}
                                className="flex items-center gap-2 px-3 py-2 bg-[#2F343C] border border-[#404854] hover:border-[#4C90F0] text-[#F6F7F9] transition-colors text-sm"
                            >
                                <Calendar className="w-4 h-4 text-[#ABB3BF]" />
                                <span>{endDate}</span>
                            </button>
                            {showEndCal && (
                                <div className="absolute top-full right-0 mt-2 bg-[#2F343C] border border-[#404854] shadow-lg z-20 p-3">
                                    <input
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => { setEndDate(e.target.value); setShowEndCal(false); }}
                                        className="bg-[#252A31] border border-[#404854] text-[#F6F7F9] px-3 py-2 focus:border-[#4C90F0] focus:outline-none"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Entity Filter Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="flex items-center gap-2 px-4 py-2 bg-[#2F343C] border border-[#404854] hover:border-[#4C90F0] text-[#F6F7F9] transition-colors"
                        >
                            <span className="text-sm font-medium">{selectedFilter}</span>
                            <ChevronDown className="w-4 h-4" />
                        </button>

                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-[#2F343C] border border-[#404854] shadow-lg z-10">
                                {filterOptions.map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => {
                                            setSelectedFilter(option);
                                            setDropdownOpen(false);
                                        }}
                                        className={`w-full text-left px-4 py-2 text-sm transition-colors ${selectedFilter === option
                                            ? 'bg-[#2D72D2] text-[#F6F7F9]'
                                            : 'text-[#ABB3BF] hover:bg-[#252A31] hover:text-[#F6F7F9]'
                                            }`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <KPICard
                    title="YTD Revenue"
                    value={kpis.revenue}
                    comparison={kpis.revenueTrend}
                    icon={DollarSign}
                />
                <KPICard
                    title="Gross Margin"
                    value={kpis.margin}
                    comparison={kpis.marginTrend}
                    icon={TrendingUp}
                />
                <KPICard
                    title="Operating Expense"
                    value={kpis.opex}
                    comparison={kpis.opexTrend}
                    icon={Activity}
                />
                <KPICard
                    title="Backlog Value"
                    value={kpis.backlog}
                    comparison={kpis.backlogTrend}
                    icon={TrendingUp}
                />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-2 gap-4">
                {/* Monthly Revenue Trend */}
                <Card>
                    <h3 className="text-lg font-semibold text-[#F6F7F9] mb-4">
                        {selectedFilter === 'TMHNA' ? 'Monthly Revenue by Entity ($M)' : `${selectedFilter} Monthly Revenue ($M)`}
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={monthlyRevenueData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#404854" />
                            <XAxis dataKey="month" stroke="#ABB3BF" style={{ fontSize: '12px' }} />
                            <YAxis stroke="#ABB3BF" style={{ fontSize: '12px' }} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#2F343C', border: '1px solid #404854', borderRadius: 0 }}
                                labelStyle={{ color: '#F6F7F9' }}
                            />
                            <Legend wrapperStyle={{ fontSize: '12px', color: '#ABB3BF' }} />
                            {getChartLines()}
                        </LineChart>
                    </ResponsiveContainer>
                </Card>

                {/* P&L by Entity */}
                <Card>
                    <h3 className="text-lg font-semibold text-[#F6F7F9] mb-4">
                        {selectedFilter === 'TMHNA' ? 'P&L by Entity ($M)' : `${selectedFilter} P&L ($M)`}
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={filteredEntities}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#404854" />
                            <XAxis dataKey="entity" stroke="#ABB3BF" style={{ fontSize: '12px' }} />
                            <YAxis stroke="#ABB3BF" style={{ fontSize: '12px' }} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#2F343C', border: '1px solid #404854', borderRadius: 0 }}
                                labelStyle={{ color: '#F6F7F9' }}
                                cursor={{ fill: 'rgba(45, 114, 210, 0.1)' }}
                            />
                            <Legend wrapperStyle={{ fontSize: '12px', color: '#ABB3BF' }} />
                            <Bar dataKey="revenue" fill="#2D72D2" name="Revenue" />
                            <Bar dataKey="cogs" fill="#CD4246" name="COGS" />
                            <Bar dataKey="ebit" fill="#238551" name="EBIT" />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
            </div>

            {/* Entity Breakdown Table */}
            <Card>
                <h3 className="text-lg font-semibold text-[#F6F7F9] mb-4">
                    {selectedFilter === 'TMHNA' ? 'Entity Financial Summary' : `${selectedFilter} Financial Summary`}
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-[#404854]">
                                <th className="text-left py-3 text-xs uppercase tracking-wide text-[#ABB3BF]">Entity</th>
                                <th className="text-right py-3 text-xs uppercase tracking-wide text-[#ABB3BF]">Revenue</th>
                                <th className="text-right py-3 text-xs uppercase tracking-wide text-[#ABB3BF]">COGS</th>
                                <th className="text-right py-3 text-xs uppercase tracking-wide text-[#ABB3BF]">Gross Profit</th>
                                <th className="text-right py-3 text-xs uppercase tracking-wide text-[#ABB3BF]">OpEx</th>
                                <th className="text-right py-3 text-xs uppercase tracking-wide text-[#ABB3BF]">EBIT</th>
                                <th className="text-right py-3 text-xs uppercase tracking-wide text-[#ABB3BF]">Margin %</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEntities.map(entity => (
                                <tr key={entity.entity} className="border-b border-[#404854] hover:bg-[#252A31]">
                                    <td className="py-3 font-semibold text-[#F6F7F9]">{entity.entity}</td>
                                    <td className="py-3 text-right text-[#F6F7F9]">${entity.revenue}M</td>
                                    <td className="py-3 text-right text-[#CD4246]">${entity.cogs}M</td>
                                    <td className="py-3 text-right text-[#238551]">${entity.grossProfit}M</td>
                                    <td className="py-3 text-right text-[#C87619]">${entity.opex}M</td>
                                    <td className="py-3 text-right font-semibold text-[#238551]">${entity.ebit}M</td>
                                    <td className="py-3 text-right text-[#ABB3BF]">{((entity.ebit / entity.revenue) * 100).toFixed(1)}%</td>
                                </tr>
                            ))}
                            {selectedFilter === 'TMHNA' && (
                                <tr className="font-semibold">
                                    <td className="py-3 text-[#F6F7F9]">Total</td>
                                    <td className="py-3 text-right text-[#F6F7F9]">$583M</td>
                                    <td className="py-3 text-right text-[#CD4246]">$417M</td>
                                    <td className="py-3 text-right text-[#238551]">$166M</td>
                                    <td className="py-3 text-right text-[#C87619]">$109M</td>
                                    <td className="py-3 text-right text-[#238551]">$57M</td>
                                    <td className="py-3 text-right text-[#ABB3BF]">9.8%</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Revenue Mix and Pipeline Row */}
            <div className="grid grid-cols-2 gap-4">
                {/* Revenue Mix by Brand */}
                <Card>
                    <h3 className="text-lg font-semibold text-[#F6F7F9] mb-4">Revenue Mix by Brand</h3>
                    <ResponsiveContainer width="100%" height={280}>
                        <PieChart>
                            <Pie
                                data={brandMixData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={2}
                                dataKey="value"
                                label={({ name, value }) => `${name} ${value}%`}
                            >
                                {brandMixData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ backgroundColor: '#2F343C', border: '1px solid #404854', borderRadius: 0 }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </Card>

                {/* Pipeline Value Summary */}
                <Card>
                    <h3 className="text-lg font-semibold text-[#F6F7F9] mb-4">Pipeline Summary</h3>
                    <div className="space-y-4">
                        <div className="p-4 bg-[#252A31] border border-[#404854]">
                            <div className="text-sm text-[#ABB3BF]">Total Pipeline Value</div>
                            <div className="text-3xl font-semibold text-[#238551]">$80M</div>
                            <div className="text-xs text-[#72CA9B] mt-1">↑ 12% vs last quarter</div>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            <div className="p-3 bg-[#252A31] border border-[#404854] text-center">
                                <div className="text-lg font-semibold text-[#F6F7F9]">$45M</div>
                                <div className="text-xs text-[#ABB3BF]">High Probability</div>
                            </div>
                            <div className="p-3 bg-[#252A31] border border-[#404854] text-center">
                                <div className="text-lg font-semibold text-[#F6F7F9]">$23M</div>
                                <div className="text-xs text-[#ABB3BF]">Medium Probability</div>
                            </div>
                            <div className="p-3 bg-[#252A31] border border-[#404854] text-center">
                                <div className="text-lg font-semibold text-[#F6F7F9]">$12M</div>
                                <div className="text-xs text-[#ABB3BF]">Early Stage</div>
                            </div>
                        </div>
                        <div className="text-xs text-[#ABB3BF]">
                            3 major opportunities in active pipeline
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}

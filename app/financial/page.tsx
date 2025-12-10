'use client';

import { Card } from '@/components/common/Card';
import { KPICard } from '@/components/common/KPICard';
import { DollarSign, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const monthlyRevenueData = [
    { month: 'Jan', tmh: 28.5, raymond: 16.8, konstant: 2.3 },
    { month: 'Feb', tmh: 27.2, raymond: 16.2, konstant: 2.2 },
    { month: 'Mar', tmh: 30.1, raymond: 17.5, konstant: 2.5 },
    { month: 'Apr', tmh: 29.5, raymond: 17.1, konstant: 2.4 },
    { month: 'May', tmh: 30.8, raymond: 18.0, konstant: 2.6 },
    { month: 'Jun', tmh: 29.1, raymond: 16.9, konstant: 2.3 },
    { month: 'Jul', tmh: 28.7, raymond: 16.7, konstant: 2.2 },
    { month: 'Aug', tmh: 30.5, raymond: 17.8, konstant: 2.5 },
    { month: 'Sep', tmh: 29.4, raymond: 17.2, konstant: 2.4 },
    { month: 'Oct', tmh: 30.9, raymond: 18.1, konstant: 2.7 },
    { month: 'Nov', tmh: 31.2, raymond: 18.4, konstant: 2.8 },
    { month: 'Dec', tmh: 32.4, raymond: 19.3, konstant: 3.1 },
];

const entityData = [
    { entity: 'TMH', revenue: 350, cogs: 252, grossProfit: 98, opex: 62, ebit: 36 },
    { entity: 'Raymond', revenue: 204, cogs: 143, grossProfit: 61, opex: 41, ebit: 20 },
    { entity: 'Konstant', revenue: 29, cogs: 22, grossProfit: 7, opex: 6, ebit: 1 },
];

export default function FinancialPage() {
    return (
        <div className="min-h-screen p-8 space-y-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-semibold text-[#F6F7F9] mb-2">Financial Intelligence</h1>
                <p className="text-[#ABB3BF]">Consolidated P&L and cross-entity financial metrics</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <KPICard
                    title="YTD Revenue"
                    value="$583M"
                    comparison={{ value: '12% vs LY', trend: 'up' }}
                    icon={DollarSign}
                />
                <KPICard
                    title="Gross Margin"
                    value="28.4%"
                    comparison={{ value: '1.2 pts vs LY', trend: 'up' }}
                    icon={TrendingUp}
                />
                <KPICard
                    title="Operating Expense"
                    value="$124M"
                    comparison={{ value: '3% vs budget', trend: 'down' }}
                    icon={Activity}
                />
                <KPICard
                    title="Backlog Value"
                    value="$312M"
                    comparison={{ value: '8% vs target', trend: 'up' }}
                    icon={TrendingUp}
                />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-2 gap-4">
                {/* Monthly Revenue Trend */}
                <Card>
                    <h3 className="text-lg font-semibold text-[#F6F7F9] mb-4">Monthly Revenue by Entity ($M)</h3>
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
                            <Line type="monotone" dataKey="tmh" stroke="#EB0A1E" strokeWidth={2} name="TMH" />
                            <Line type="monotone" dataKey="raymond" stroke="#00843D" strokeWidth={2} name="Raymond" />
                            <Line type="monotone" dataKey="konstant" stroke="#0033A0" strokeWidth={2} name="Konstant" />
                        </LineChart>
                    </ResponsiveContainer>
                </Card>

                {/* P&L by Entity */}
                <Card>
                    <h3 className="text-lg font-semibold text-[#F6F7F9] mb-4">P&L by Entity ($M)</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={entityData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#404854" />
                            <XAxis dataKey="entity" stroke="#ABB3BF" style={{ fontSize: '12px' }} />
                            <YAxis stroke="#ABB3BF" style={{ fontSize: '12px' }} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#2F343C', border: '1px solid #404854', borderRadius: 0 }}
                                labelStyle={{ color: '#F6F7F9' }}
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
                <h3 className="text-lg font-semibold text-[#F6F7F9] mb-4">Entity Financial Summary</h3>
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
                            {entityData.map(entity => (
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
                            <tr className="font-semibold">
                                <td className="py-3 text-[#F6F7F9]">Total</td>
                                <td className="py-3 text-right text-[#F6F7F9]">$583M</td>
                                <td className="py-3 text-right text-[#CD4246]">$417M</td>
                                <td className="py-3 text-right text-[#238551]">$166M</td>
                                <td className="py-3 text-right text-[#C87619]">$109M</td>
                                <td className="py-3 text-right text-[#238551]">$57M</td>
                                <td className="py-3 text-right text-[#ABB3BF]">9.8%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}

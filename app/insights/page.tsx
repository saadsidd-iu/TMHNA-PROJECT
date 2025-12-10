'use client';

import { Card } from '@/components/common/Card';
import { KPICard } from '@/components/common/KPICard';
import { TrendingUp, Users, Package, DollarSign, AlertCircle, CheckCircle } from 'lucide-react';
import { AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const trendData = [
    { quarter: 'Q1 2024', revenue: 135, orders: 4200, customers: 285 },
    { quarter: 'Q2 2024', revenue: 142, orders: 4350, customers: 295 },
    { quarter: 'Q3 2024', revenue: 148, orders: 4500, customers: 302 },
    { quarter: 'Q4 2024', revenue: 158, orders: 4680, customers: 312 },
];

const brandMixData = [
    { name: 'TMH', value: 60, color: '#EB0A1E' },
    { name: 'Raymond', value: 35, color: '#00843D' },
    { name: 'Konstant', value: 5, color: '#0033A0' },
];

const topOpportunities = [
    { title: 'Chicago DC Expansion', value: '$45M', probability: 0.85, impact: 'High', status: 'In Progress' },
    { title: 'Midwest Dealer Network', value: '$23M', probability: 0.72, impact: 'Medium', status: 'Planning' },
    { title: 'Enhanced Telematics', value: '$12M', probability: 0.90, impact: 'Medium', status: 'Approved' },
];

const riskItems = [
    { risk: 'Supply Chain Delays', severity: 'Medium', likelihood: 0.45, mitigation: 'Dual sourcing strategy' },
    { risk: 'Labor Shortage', severity: 'High', likelihood: 0.62, mitigation: 'Automation investment' },
    { risk: 'Competitor Pricing', severity: 'Low', likelihood: 0.30, mitigation: 'Value differentiation' },
];

export default function InsightsPage() {
    return (
        <div className="min-h-screen p-8 space-y-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-semibold text-[#F6F7F9] mb-2">Enterprise Insights</h1>
                <p className="text-[#ABB3BF]">Executive dashboard with strategic metrics and opportunities</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <KPICard
                    title="YTD Growth"
                    value="15.2%"
                    comparison={{ value: '3.2 pts vs target', trend: 'up' }}
                    icon={TrendingUp}
                />
                <KPICard
                    title="Active Customers"
                    value="312"
                    comparison={{ value: '27 new this qtr', trend: 'up' }}
                    icon={Users}
                />
                <KPICard
                    title="Order Backlog"
                    value="4,680"
                    comparison={{ value: '8% vs LQ', trend: 'up' }}
                    icon={Package}
                />
                <KPICard
                    title="Pipeline Value"
                    value="$80M"
                    comparison={{ value: '3 major opps', trend: 'up' }}
                    icon={DollarSign}
                />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-2 gap-4">
                {/* Quarterly Trends */}
                <Card>
                    <h3 className="text-lg font-semibold text-[#F6F7F9] mb-4">Quarterly Trends</h3>
                    <ResponsiveContainer width="100%" height={280}>
                        <AreaChart data={trendData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#404854" />
                            <XAxis dataKey="quarter" stroke="#ABB3BF" style={{ fontSize: '12px' }} />
                            <YAxis stroke="#ABB3BF" style={{ fontSize: '12px' }} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#2F343C', border: '1px solid #404854', borderRadius: 0 }}
                                labelStyle={{ color: '#F6F7F9' }}
                            />
                            <Legend wrapperStyle={{ fontSize: '12px', color: '#ABB3BF' }} />
                            <Area type="monotone" dataKey="revenue" stackId="1" stroke="#2D72D2" fill="#2D72D2" fillOpacity={0.6} name="Revenue ($M)" />
                            <Area type="monotone" dataKey="orders" stackId="2" stroke="#238551" fill="#238551" fillOpacity={0.6} name="Orders" />
                        </AreaChart>
                    </ResponsiveContainer>
                </Card>

                {/* Brand Mix */}
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
                                labelStyle={{ fill: '#F6F7F9', fontSize: '12px' }}
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
            </div>

            {/* Strategic Opportunities */}
            <Card>
                <h3 className="text-lg font-semibold text-[#F6F7F9] mb-4">Top Strategic Opportunities</h3>
                <div className="space-y-3">
                    {topOpportunities.map((opp, idx) => (
                        <div key={idx} className="p-4 bg-[#252A31] border border-[#404854]">
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <div className="font-semibold text-[#F6F7F9]">{opp.title}</div>
                                    <div className="text-sm text-[#ABB3BF] mt-1">
                                        <span className="inline-flex items-center gap-2">
                                            <span className={`px-2 py-0.5 text-xs ${opp.status === 'Approved' ? 'bg-[#238551]/20 text-[#238551]' :
                                                    opp.status === 'In Progress' ? 'bg-[#2D72D2]/20 text-[#4C90F0]' :
                                                        'bg-[#ABB3BF]/20 text-[#ABB3BF]'
                                                }`}>
                                                {opp.status}
                                            </span>
                                            <span>Impact: {opp.impact}</span>
                                        </span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xl font-semibold text-[#238551]">{opp.value}</div>
                                    <div className="text-xs text-[#ABB3BF]">{(opp.probability * 100).toFixed(0)}% probability</div>
                                </div>
                            </div>
                            <div className="mt-2">
                                <div className="text-xs text-[#ABB3BF] mb-1">Probability</div>
                                <div className="h-1.5 bg-[#1C2127]">
                                    <div
                                        className="h-full bg-[#238551]"
                                        style={{ width: `${opp.probability * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Risk Matrix */}
            <Card>
                <h3 className="text-lg font-semibold text-[#F6F7F9] mb-4">Risk Assessment</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-[#404854]">
                                <th className="text-left py-3 text-xs uppercase tracking-wide text-[#ABB3BF]">Risk Factor</th>
                                <th className="text-left py-3 text-xs uppercase tracking-wide text-[#ABB3BF]">Severity</th>
                                <th className="text-left py-3 text-xs uppercase tracking-wide text-[#ABB3BF]">Likelihood</th>
                                <th className="text-left py-3 text-xs uppercase tracking-wide text-[#ABB3BF]">Mitigation Strategy</th>
                                <th className="text-left py-3 text-xs uppercase tracking-wide text-[#ABB3BF]">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {riskItems.map((risk, idx) => (
                                <tr key={idx} className="border-b border-[#404854] hover:bg-[#252A31]">
                                    <td className="py-3 text-[#F6F7F9]">{risk.risk}</td>
                                    <td className="py-3">
                                        <span className={`px-2 py-1 text-xs ${risk.severity === 'High' ? 'bg-[#CD4246]/20 text-[#CD4246]' :
                                                risk.severity === 'Medium' ? 'bg-[#C87619]/20 text-[#C87619]' :
                                                    'bg-[#238551]/20 text-[#238551]'
                                            }`}>
                                            {risk.severity}
                                        </span>
                                    </td>
                                    <td className="py-3 text-[#ABB3BF]">{(risk.likelihood * 100).toFixed(0)}%</td>
                                    <td className="py-3 text-[#ABB3BF]">{risk.mitigation}</td>
                                    <td className="py-3">
                                        <CheckCircle className="w-4 h-4 text-[#238551]" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}

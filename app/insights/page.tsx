'use client';

import { useState } from 'react';
import { Card } from '@/components/common/Card';
import { KPICard } from '@/components/common/KPICard';
import { TrendingUp, Users, Package, Target, AlertCircle, CheckCircle, Zap, BarChart3, AlertTriangle, Sparkles, Database, GitMerge, Lightbulb, SlidersHorizontal } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const trendData = [
    { quarter: 'Q1 2024', orders: 4200, customers: 285, satisfaction: 92 },
    { quarter: 'Q2 2024', orders: 4350, customers: 295, satisfaction: 94 },
    { quarter: 'Q3 2024', orders: 4500, customers: 302, satisfaction: 93 },
    { quarter: 'Q4 2024', orders: 4680, customers: 312, satisfaction: 95 },
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

// Anomaly Detection Data
const anomalyData = [
    { id: 1, type: 'critical', title: 'Unusual spike in warranty claims', detail: 'Model X-200 showing 340% increase in claims', source: 'JD Edwards', detected: '2 hours ago' },
    { id: 2, type: 'warning', title: 'Inventory discrepancy detected', detail: 'Syracuse DC physical count mismatch: 847 units', source: 'SAP ECC', detected: '45 min ago' },
    { id: 3, type: 'info', title: 'Unusual order pattern', detail: 'Region NE orders 65% above seasonal average', source: 'Snowflake', detected: '1 hour ago' },
];

// Entity Resolution Data
const entityResolutionData = {
    mergedThisWeek: 1247,
    conflictsResolved: 89,
    pendingReview: 23,
    systems: [
        { name: 'Customer Records', merged: 412, source: 'SAP + JDE' },
        { name: 'Product Master', merged: 328, source: 'All Systems' },
        { name: 'Supplier Data', merged: 507, source: 'SAP + Snowflake' },
    ]
};

// AI Recommendations Data
const aiRecommendations = [
    { id: 1, priority: 'high', action: 'Increase inventory for Region NE', insight: 'Demand patterns suggest 23% uptick in Q1', impact: '+$2.1M potential revenue', confidence: 0.87 },
    { id: 2, priority: 'medium', action: 'Consolidate supplier contracts', insight: '3 suppliers overlap 78% on parts catalog', impact: '-$340K procurement costs', confidence: 0.79 },
    { id: 3, priority: 'medium', action: 'Preemptive maintenance: Columbus plant', insight: 'Sensor data indicates bearing wear patterns', impact: 'Prevent 12hr downtime', confidence: 0.92 },
];

export default function InsightsPage() {
    const [productionChange, setProductionChange] = useState(0);

    // Simulated impact calculations
    const getSimulatedImpact = (change: number) => {
        const backlogReduction = Math.round(change * 47); // 47 units per 1%
        const leadTimeChange = (change * -0.3).toFixed(1); // -0.3 days per 1%
        const capacityUtil = Math.min(100, 89 + change * 0.8).toFixed(1);
        const laborCostChange = (change * 12000).toLocaleString(); // $12k per 1%
        return { backlogReduction, leadTimeChange, capacityUtil, laborCostChange };
    };

    const impact = getSimulatedImpact(productionChange);

    return (
        <div className="min-h-screen p-8 space-y-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-semibold text-[#F6F7F9] mb-2">Enterprise Insights</h1>
                <p className="text-[#ABB3BF]">Executive dashboard with strategic metrics and opportunities</p>
            </div>

            {/* KPI Cards - Operational Focus */}
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
                    title="Customer Satisfaction"
                    value="95%"
                    comparison={{ value: '2 pts vs target', trend: 'up' }}
                    icon={Target}
                />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-2 gap-4">
                {/* Quarterly Trends - Operational */}
                <Card>
                    <h3 className="text-lg font-semibold text-[#F6F7F9] mb-4">Operational Trends</h3>
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
                            <Area type="monotone" dataKey="orders" stackId="1" stroke="#2D72D2" fill="#2D72D2" fillOpacity={0.6} name="Orders" />
                            <Area type="monotone" dataKey="customers" stackId="2" stroke="#238551" fill="#238551" fillOpacity={0.6} name="Customers" />
                        </AreaChart>
                    </ResponsiveContainer>
                </Card>

                {/* Key Performance Indicators */}
                <Card>
                    <h3 className="text-lg font-semibold text-[#F6F7F9] mb-4">Performance Highlights</h3>
                    <div className="space-y-4">
                        <div className="p-4 bg-[#252A31] border border-[#404854] flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Zap className="w-5 h-5 text-[#4C90F0]" />
                                <div>
                                    <div className="text-sm font-medium text-[#F6F7F9]">Operational Efficiency</div>
                                    <div className="text-xs text-[#ABB3BF]">Manufacturing throughput</div>
                                </div>
                            </div>
                            <div className="text-xl font-semibold text-[#238551]">94.2%</div>
                        </div>
                        <div className="p-4 bg-[#252A31] border border-[#404854] flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <BarChart3 className="w-5 h-5 text-[#4C90F0]" />
                                <div>
                                    <div className="text-sm font-medium text-[#F6F7F9]">On-Time Delivery</div>
                                    <div className="text-xs text-[#ABB3BF]">All facilities combined</div>
                                </div>
                            </div>
                            <div className="text-xl font-semibold text-[#238551]">96.8%</div>
                        </div>
                        <div className="p-4 bg-[#252A31] border border-[#404854] flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-[#4C90F0]" />
                                <div>
                                    <div className="text-sm font-medium text-[#F6F7F9]">First-Pass Quality</div>
                                    <div className="text-xs text-[#ABB3BF]">Production quality rate</div>
                                </div>
                            </div>
                            <div className="text-xl font-semibold text-[#238551]">99.1%</div>
                        </div>
                    </div>
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

            {/* AI-Powered Features Row */}
            <div className="grid grid-cols-2 gap-4">
                {/* Contour-style Anomaly Detection */}
                <Card>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-[#F6F7F9] flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-[#C87619]" />
                            Anomaly Detection
                        </h3>
                        <span className="px-2 py-1 text-xs bg-[#C87619]/20 text-[#C87619]">
                            {anomalyData.length} Active
                        </span>
                    </div>
                    <div className="space-y-3">
                        {anomalyData.map((anomaly) => (
                            <div
                                key={anomaly.id}
                                className={`p-3 border-l-2 ${anomaly.type === 'critical' ? 'bg-[#CD4246]/10 border-[#CD4246]' :
                                        anomaly.type === 'warning' ? 'bg-[#C87619]/10 border-[#C87619]' :
                                            'bg-[#2D72D2]/10 border-[#2D72D2]'
                                    }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <div className="font-medium text-[#F6F7F9] text-sm">{anomaly.title}</div>
                                        <div className="text-xs text-[#ABB3BF] mt-1">{anomaly.detail}</div>
                                    </div>
                                    <span className={`text-xs px-2 py-0.5 ${anomaly.type === 'critical' ? 'bg-[#CD4246]/20 text-[#CD4246]' :
                                            anomaly.type === 'warning' ? 'bg-[#C87619]/20 text-[#C87619]' :
                                                'bg-[#2D72D2]/20 text-[#4C90F0]'
                                        }`}>
                                        {anomaly.type.toUpperCase()}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 mt-2 text-xs text-[#8F99A8]">
                                    <span>Source: {anomaly.source}</span>
                                    <span>•</span>
                                    <span>Detected: {anomaly.detected}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Entity Resolution Monitor */}
                <Card>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-[#F6F7F9] flex items-center gap-2">
                            <GitMerge className="w-5 h-5 text-[#4C90F0]" />
                            Entity Resolution
                        </h3>
                        <span className="text-xs text-[#ABB3BF]">This Week</span>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="p-3 bg-[#252A31] border border-[#404854] text-center">
                            <div className="text-2xl font-semibold text-[#238551]">{entityResolutionData.mergedThisWeek.toLocaleString()}</div>
                            <div className="text-xs text-[#ABB3BF]">Records Merged</div>
                        </div>
                        <div className="p-3 bg-[#252A31] border border-[#404854] text-center">
                            <div className="text-2xl font-semibold text-[#4C90F0]">{entityResolutionData.conflictsResolved}</div>
                            <div className="text-xs text-[#ABB3BF]">Conflicts Resolved</div>
                        </div>
                        <div className="p-3 bg-[#252A31] border border-[#404854] text-center">
                            <div className="text-2xl font-semibold text-[#C87619]">{entityResolutionData.pendingReview}</div>
                            <div className="text-xs text-[#ABB3BF]">Pending Review</div>
                        </div>
                    </div>
                    <div className="space-y-3">
                        {entityResolutionData.systems.map((sys, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                                <div className="w-28 text-sm text-[#F6F7F9]">{sys.name}</div>
                                <div className="flex-1 h-2 bg-[#1C2127]">
                                    <div
                                        className="h-full bg-[#2D72D2]"
                                        style={{ width: `${(sys.merged / entityResolutionData.mergedThisWeek) * 100}%` }}
                                    />
                                </div>
                                <div className="w-16 text-right text-xs text-[#ABB3BF]">{sys.merged}</div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* AI Recommendations */}
            <Card>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-[#F6F7F9] flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-[#9D3F9D]" />
                        AI-Powered Recommendations
                    </h3>
                    <span className="px-2 py-1 text-xs bg-[#9D3F9D]/20 text-[#9D3F9D]">
                        Foundry AI
                    </span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    {aiRecommendations.map((rec) => (
                        <div key={rec.id} className="p-4 bg-[#252A31] border border-[#404854]">
                            <div className="flex items-center justify-between mb-2">
                                <Lightbulb className={`w-4 h-4 ${rec.priority === 'high' ? 'text-[#C87619]' : 'text-[#4C90F0]'}`} />
                                <span className={`text-xs px-2 py-0.5 ${rec.priority === 'high' ? 'bg-[#C87619]/20 text-[#C87619]' : 'bg-[#4C90F0]/20 text-[#4C90F0]'
                                    }`}>
                                    {(rec.confidence * 100).toFixed(0)}% confidence
                                </span>
                            </div>
                            <div className="font-medium text-[#F6F7F9] text-sm mb-2">{rec.action}</div>
                            <div className="text-xs text-[#ABB3BF] mb-3">{rec.insight}</div>
                            <div className="text-sm font-semibold text-[#238551]">{rec.impact}</div>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Scenario Simulator */}
            <Card>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-[#F6F7F9] flex items-center gap-2">
                        <SlidersHorizontal className="w-5 h-5 text-[#2D72D2]" />
                        Scenario Simulator
                    </h3>
                    <span className="text-xs text-[#ABB3BF]">What-if Analysis</span>
                </div>
                <div className="grid grid-cols-2 gap-6">
                    {/* Controls */}
                    <div className="p-4 bg-[#252A31] border border-[#404854]">
                        <div className="text-sm text-[#F6F7F9] mb-4">Production Volume Change</div>
                        <div className="flex items-center gap-4 mb-4">
                            <input
                                type="range"
                                min="-20"
                                max="20"
                                value={productionChange}
                                onChange={(e) => setProductionChange(Number(e.target.value))}
                                className="flex-1 h-2 bg-[#404854] appearance-none cursor-pointer"
                                style={{
                                    background: `linear-gradient(to right, #CD4246 0%, #404854 50%, #238551 100%)`
                                }}
                            />
                            <span className={`text-2xl font-semibold w-20 text-right ${productionChange > 0 ? 'text-[#238551]' : productionChange < 0 ? 'text-[#CD4246]' : 'text-[#ABB3BF]'
                                }`}>
                                {productionChange > 0 ? '+' : ''}{productionChange}%
                            </span>
                        </div>
                        <div className="text-xs text-[#8F99A8]">
                            Adjust production volume to see projected impact on key metrics
                        </div>
                    </div>

                    {/* Projected Impact */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-[#252A31] border border-[#404854]">
                            <div className="text-xs text-[#ABB3BF]">Backlog Change</div>
                            <div className={`text-xl font-semibold ${impact.backlogReduction > 0 ? 'text-[#238551]' : impact.backlogReduction < 0 ? 'text-[#CD4246]' : 'text-[#ABB3BF]'}`}>
                                {impact.backlogReduction > 0 ? '-' : impact.backlogReduction < 0 ? '+' : ''}{Math.abs(impact.backlogReduction)} units
                            </div>
                        </div>
                        <div className="p-3 bg-[#252A31] border border-[#404854]">
                            <div className="text-xs text-[#ABB3BF]">Lead Time</div>
                            <div className={`text-xl font-semibold ${Number(impact.leadTimeChange) < 0 ? 'text-[#238551]' : Number(impact.leadTimeChange) > 0 ? 'text-[#CD4246]' : 'text-[#ABB3BF]'}`}>
                                {Number(impact.leadTimeChange) > 0 ? '+' : ''}{impact.leadTimeChange} days
                            </div>
                        </div>
                        <div className="p-3 bg-[#252A31] border border-[#404854]">
                            <div className="text-xs text-[#ABB3BF]">Capacity Utilization</div>
                            <div className={`text-xl font-semibold ${Number(impact.capacityUtil) > 95 ? 'text-[#CD4246]' : 'text-[#4C90F0]'}`}>
                                {impact.capacityUtil}%
                            </div>
                        </div>
                        <div className="p-3 bg-[#252A31] border border-[#404854]">
                            <div className="text-xs text-[#ABB3BF]">Labor Cost Delta</div>
                            <div className={`text-xl font-semibold ${productionChange > 0 ? 'text-[#C87619]' : productionChange < 0 ? 'text-[#238551]' : 'text-[#ABB3BF]'}`}>
                                {productionChange !== 0 ? (productionChange > 0 ? '+' : '-') : ''}${impact.laborCostChange}
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}


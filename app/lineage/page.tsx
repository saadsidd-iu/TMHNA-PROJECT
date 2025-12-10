'use client';

import { ArrowRight, Database, FileText, Server, Zap } from 'lucide-react';
import { Card } from '@/components/common/Card';

const lineageData = [
    {
        source: 'SAP ECC',
        icon: Database,
        color: '#2D72D2',
        objects: ['Plants', 'Work Orders', 'Inventory'],
        transformations: ['Data Extraction', 'Schema Mapping', 'Validation'],
        destination: 'Snowflake Data Lake',
        frequency: '15 min',
        lastRun: '2 min ago',
        status: 'success'
    },
    {
        source: 'JD Edwards',
        icon: Server,
        color: '#238551',
        objects: ['Financial Transactions', 'GL Accounts'],
        transformations: ['ETL Processing', 'Aggregation'],
        destination: 'Foundry Ontology',
        frequency: '30 min',
        lastRun: '12 min ago',
        status: 'success'
    },
    {
        source: 'Factory IoT Sensors',
        icon: Zap,
        color: '#C87619',
        objects: ['Equipment Metrics', 'Production Counts'],
        transformations: ['Stream Processing', 'Real-time Aggregation'],
        destination: 'Time Series DB',
        frequency: 'Real-time',
        lastRun: 'Streaming',
        status: 'success'
    },
];

export default function LineagePage() {
    return (
        <div className="min-h-screen p-8 space-y-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-semibold text-[#F6F7F9] mb-2">Data Lineage</h1>
                <p className="text-[#ABB3BF]">End-to-end data flow visibility across source systems</p>
            </div>

            {/* Lineage Flows */}
            <div className="space-y-6">
                {lineageData.map((flow, idx) => {
                    const SourceIcon = flow.icon;
                    return (
                        <Card key={idx}>
                            <div className="flex items-center gap-6">
                                {/* Source */}
                                <div className="flex-shrink-0 w-48">
                                    <div className="flex items-center gap-3 mb-2">
                                        <SourceIcon className="w-6 h-6" style={{ color: flow.color }} />
                                        <div>
                                            <div className="font-semibold text-[#F6F7F9]">{flow.source}</div>
                                            <div className="text-xs text-[#ABB3BF]">Source System</div>
                                        </div>
                                    </div>
                                    <div className="space-y-1 mt-3">
                                        {flow.objects.map(obj => (
                                            <div key={obj} className="text-xs px-2 py-1 bg-[#252A31] text-[#ABB3BF]">
                                                {obj}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <ArrowRight className="w-6 h-6 text-[#ABB3BF] flex-shrink-0" />

                                {/* Transformations */}
                                <div className="flex-1">
                                    <div className="font-semibold text-[#F6F7F9] mb-2">Transformations</div>
                                    <div className="grid grid-cols-3 gap-2">
                                        {flow.transformations.map(transform => (
                                            <div
                                                key={transform}
                                                className="text-xs px-3 py-2 bg-[#2D72D2]/10 border border-[#2D72D2]/30 text-[#4C90F0] text-center"
                                            >
                                                {transform}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <ArrowRight className="w-6 h-6 text-[#ABB3BF] flex-shrink-0" />

                                {/* Destination */}
                                <div className="flex-shrink-0 w-48">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Database className="w-6 h-6 text-[#238551]" />
                                        <div>
                                            <div className="font-semibold text-[#F6F7F9]">{flow.destination}</div>
                                            <div className="text-xs text-[#ABB3BF]">Target</div>
                                        </div>
                                    </div>
                                    <div className="space-y-1 mt-3 text-xs">
                                        <div className="flex justify-between">
                                            <span className="text-[#ABB3BF]">Frequency:</span>
                                            <span className="text-[#F6F7F9]">{flow.frequency}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-[#ABB3BF]">Last Run:</span>
                                            <span className="text-[#238551]">{flow.lastRun}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Status Indicator */}
                                <div className="flex-shrink-0">
                                    <div className={`w-3 h-3 rounded-full ${flow.status === 'success' ? 'bg-[#238551]' : 'bg-[#CD4246]'} animate-pulse`}></div>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>

            {/* Lineage Metrics */}
            <div className="grid grid-cols-2 gap-6">
                <Card>
                    <h3 className="text-lg font-semibold text-[#F6F7F9] mb-4">Data Quality Metrics</h3>
                    <div className="space-y-3">
                        {[
                            { label: 'Completeness', value: 98.7, color: '#238551' },
                            { label: 'Accuracy', value: 99.2, color: '#238551' },
                            { label: 'Consistency', value: 96.5, color: '#238551' },
                            { label: 'Timeliness', value: 94.3, color: '#C87619' },
                        ].map(metric => (
                            <div key={metric.label}>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm text-[#ABB3BF]">{metric.label}</span>
                                    <span className="text-sm font-semibold text-[#F6F7F9]">{metric.value}%</span>
                                </div>
                                <div className="h-2 bg-[#252A31]">
                                    <div
                                        className="h-full"
                                        style={{
                                            width: `${metric.value}%`,
                                            backgroundColor: metric.color,
                                        }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card>
                    <h3 className="text-lg font-semibold text-[#F6F7F9] mb-4">Pipeline Health</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-semibold text-[#238551]">12/12</div>
                                <div className="text-sm text-[#ABB3BF]">Active Pipelines</div>
                            </div>
                            <div className="w-12 h-12 rounded-full border-4 border-[#238551] flex items-center justify-center">
                                <span className="text-sm font-semibold text-[#238551]">100%</span>
                            </div>
                        </div>
                        <div className="pt-4 border-t border-[#404854]">
                            <div className="text-sm text-[#ABB3BF] mb-2">Avg Processing Time</div>
                            <div className="text-2xl font-semibold text-[#F6F7F9]">2.3m</div>
                        </div>
                        <div className="pt-4 border-t border-[#404854]">
                            <div className="text-sm text-[#ABB3BF] mb-2">Data Freshness</div>
                            <div className="text-2xl font-semibold text-[#238551]">&lt; 5 min</div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}

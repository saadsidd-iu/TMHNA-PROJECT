'use client';

import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Database, FileText, RefreshCw, CheckCircle, XCircle, Clock, Download } from 'lucide-react';

const dataSources = [
    { name: 'SAP ECC', type: 'ERP', tables: 127, lastSync: '2 min ago', status: 'Connected', records: '2.4M' },
    { name: 'JD Edwards', type: 'ERP', tables: 84, lastSync: '5 min ago', status: 'Connected', records: '1.8M' },
    { name: 'Snowflake', type: 'Data Lake', tables: 342, lastSync: 'Real-time', status: 'Connected', records: '15.2M' },
    { name: 'Factory IoT', type: 'Sensors', tables: 28, lastSync: 'Streaming', status: 'Connected', records: '450K' },
    { name: 'Telematics API', type: 'External', tables: 12, lastSync: '1 min ago', status: 'Connected', records: '890K' },
];

const datasets = [
    { name: 'Plants Master Data', source: 'SAP ECC', records: 5, quality: 0.99, lastUpdated: '2 min ago', owner: 'Operations' },
    { name: 'Distribution Centers', source: 'SAP ECC', records: 2, quality: 0.98, lastUpdated: '2 min ago', owner: 'Logistics' },
    { name: 'Product Catalog', source: 'SAP ECC', records: 1247, quality: 0.96, lastUpdated: '5 min ago', owner: 'Product Mgmt' },
    { name: 'Financial Transactions', source: 'JD Edwards', records: 234567, quality: 0.97, lastUpdated: '5 min ago', owner: 'Finance' },
    { name: 'Customer Master', source: 'Snowflake', records: 312, quality: 0.95, lastUpdated: 'Real-time', owner: 'Sales' },
    { name: 'Equipment Metrics', source: 'Factory IoT', records: 89234, quality: 0.94, lastUpdated: 'Streaming', owner: 'Manufacturing' },
    { name: 'Fleet Telemetry', source: 'Telematics API', records: 15678, quality: 0.92, lastUpdated: '1 min ago', owner: 'Service' },
];

const qualityIssues = [
    { dataset: 'Product Catalog', issue: 'Missing descriptions', count: 23, severity: 'Low' },
    { dataset: 'Customer Master', issue: 'Duplicate records', count: 5, severity: 'Medium' },
    { dataset: 'Equipment Metrics', issue: 'Null values', count: 142, severity: 'Low' },
];

export default function DataManagementPage() {
    return (
        <div className="min-h-screen p-8 space-y-8">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-semibold text-[#F6F7F9] mb-2">Data Management</h1>
                    <p className="text-[#ABB3BF]">Data catalog, quality monitoring, and source connections</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outlined" size="default">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Refresh All
                    </Button>
                    <Button variant="primary" size="default">
                        <Download className="w-4 h-4 mr-2" />
                        Export Catalog
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-4">
                <Card padding={false} className="p-4">
                    <div className="text-2xl font-semibold text-[#F6F7F9]">{dataSources.length}</div>
                    <div className="text-sm text-[#ABB3BF]">Data Sources</div>
                </Card>
                <Card padding={false} className="p-4">
                    <div className="text-2xl font-semibold text-[#F6F7F9]">{datasets.length}</div>
                    <div className="text-sm text-[#ABB3BF]">Datasets</div>
                </Card>
                <Card padding={false} className="p-4">
                    <div className="text-2xl font-semibold text-[#238551]">
                        {(datasets.reduce((sum, d) => sum + d.quality, 0) / datasets.length * 100).toFixed(1)}%
                    </div>
                    <div className="text-sm text-[#ABB3BF]">Avg Data Quality</div>
                </Card>
                <Card padding={false} className="p-4">
                    <div className="text-2xl font-semibold text-[#C87619]">{qualityIssues.length}</div>
                    <div className="text-sm text-[#ABB3BF]">Quality Issues</div>
                </Card>
            </div>

            {/* Data Sources */}
            <Card>
                <h3 className="text-lg font-semibold text-[#F6F7F9] mb-4">Connected Data Sources</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-[#404854]">
                                <th className="text-left py-3 text-xs uppercase tracking-wide text-[#ABB3BF]">Source</th>
                                <th className="text-left py-3 text-xs uppercase tracking-wide text-[#ABB3BF]">Type</th>
                                <th className="text-right py-3 text-xs uppercase tracking-wide text-[#ABB3BF]">Tables</th>
                                <th className="text-right py-3 text-xs uppercase tracking-wide text-[#ABB3BF]">Records</th>
                                <th className="text-left py-3 text-xs uppercase tracking-wide text-[#ABB3BF]">Last Sync</th>
                                <th className="text-left py-3 text-xs uppercase tracking-wide text-[#ABB3BF]">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataSources.map((source, idx) => (
                                <tr key={idx} className="border-b border-[#404854] hover:bg-[#252A31]">
                                    <td className="py-3 font-semibold text-[#F6F7F9]">{source.name}</td>
                                    <td className="py-3">
                                        <span className="px-2 py-1 text-xs bg-[#2D72D2]/20 text-[#4C90F0]">{source.type}</span>
                                    </td>
                                    <td className="py-3 text-right text-[#ABB3BF]">{source.tables}</td>
                                    <td className="py-3 text-right text-[#ABB3BF]">{source.records}</td>
                                    <td className="py-3 text-[#ABB3BF]">{source.lastSync}</td>
                                    <td className="py-3">
                                        <span className="inline-flex items-center gap-2 text-sm text-[#238551]">
                                            <CheckCircle className="w-4 h-4" />
                                            {source.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Datasets Catalog */}
            <Card>
                <h3 className="text-lg font-semibold text-[#F6F7F9] mb-4">Dataset Catalog ({datasets.length})</h3>
                <div className="space-y-2">
                    {datasets.map((dataset, idx) => (
                        <div key={idx} className="p-3 bg-[#252A31] border border-[#404854] hover:bg-[#2F343C] cursor-pointer">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-1">
                                        <FileText className="w-4 h-4 text-[#2D72D2]" />
                                        <div className="font-semibold text-[#F6F7F9]">{dataset.name}</div>
                                        <span className="text-xs px-2 py-0.5 bg-[#ABB3BF]/10 text-[#ABB3BF]">{dataset.source}</span>
                                    </div>
                                    <div className="flex gap-4 text-sm mt-2">
                                        <div className="text-[#ABB3BF]">
                                            Records: <span className="text-[#F6F7F9]">{dataset.records.toLocaleString()}</span>
                                        </div>
                                        <div className="text-[#ABB3BF]">
                                            Owner: <span className="text-[#F6F7F9]">{dataset.owner}</span>
                                        </div>
                                        <div className="text-[#ABB3BF]">
                                            Updated: <span className="text-[#F6F7F9]">{dataset.lastUpdated}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-semibold text-[#238551]">{(dataset.quality * 100).toFixed(0)}%</div>
                                    <div className="text-xs text-[#ABB3BF]">Quality</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Quality Issues */}
            <Card>
                <h3 className="text-lg font-semibold text-[#F6F7F9] mb-4">Data Quality Issues ({qualityIssues.length})</h3>
                <div className="space-y-2">
                    {qualityIssues.map((issue, idx) => (
                        <div key={idx} className="p-3 bg-[#252A31] border border-[#404854] flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <XCircle className={`w-5 h-5 ${issue.severity === 'High' ? 'text-[#CD4246]' :
                                        issue.severity === 'Medium' ? 'text-[#C87619]' :
                                            'text-[#ABB3BF]'
                                    }`} />
                                <div>
                                    <div className="font-semibold text-[#F6F7F9]">{issue.dataset}</div>
                                    <div className="text-sm text-[#ABB3BF]">{issue.issue}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <div className="text-lg font-semibold text-[#F6F7F9]">{issue.count}</div>
                                    <div className="text-xs text-[#ABB3BF]">Occurrences</div>
                                </div>
                                <span className={`px-3 py-1 text-sm ${issue.severity === 'High' ? 'bg-[#CD4246]/20 text-[#CD4246]' :
                                        issue.severity === 'Medium' ? 'bg-[#C87619]/20 text-[#C87619]' :
                                            'bg-[#ABB3BF]/20 text-[#ABB3BF]'
                                    }`}>
                                    {issue.severity}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}

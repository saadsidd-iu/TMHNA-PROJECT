'use client';

import { useState } from 'react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Database, FileText, RefreshCw, CheckCircle, XCircle, Clock, Download, X } from 'lucide-react';

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
    {
        dataset: 'Product Catalog',
        issue: 'Missing descriptions',
        count: 23,
        severity: 'Low',
        source: 'SAP ECC',
        affectedFields: 'product_description, long_text',
        lastDetected: '12 min ago',
        impact: 'Affects product search and customer-facing catalog'
    },
    {
        dataset: 'Customer Master',
        issue: 'Duplicate records',
        count: 5,
        severity: 'Medium',
        source: 'Snowflake',
        affectedFields: 'customer_id, email_address',
        lastDetected: '8 min ago',
        impact: 'May cause incorrect billing and duplicate communications'
    },
    {
        dataset: 'Equipment Metrics',
        issue: 'Null values',
        count: 142,
        severity: 'Low',
        source: 'Factory IoT',
        affectedFields: 'temperature, pressure, vibration',
        lastDetected: '3 min ago',
        impact: 'Gaps in predictive maintenance analytics'
    },
];

// Mock sample data for each dataset (max 50 rows, 6 columns)
const sampleData: Record<string, { columns: string[], rows: any[][] }> = {
    'Plants Master Data': {
        columns: ['Plant ID', 'Name', 'Location', 'Type', 'Capacity', 'Status'],
        rows: [
            ['PLT001', 'Columbus Manufacturing', 'Columbus, IN', 'Manufacturing', '2,500 u/mo', 'Active'],
            ['PLT002', 'Greene Manufacturing', 'Greene, NY', 'Manufacturing', '1,800 u/mo', 'Active'],
            ['PLT003', 'Muscatine Manufacturing', 'Muscatine, IA', 'Manufacturing', '1,200 u/mo', 'Active'],
            ['PLT004', 'East Chicago Mfg', 'East Chicago, IN', 'Manufacturing', '950 u/mo', 'Active'],
            ['PLT005', 'Brantford Manufacturing', 'Brantford, ON', 'Manufacturing', '800 u/mo', 'Active'],
        ]
    },
    'Distribution Centers': {
        columns: ['DC ID', 'Name', 'Location', 'SKUs', 'OTIF Rate', 'Status'],
        rows: [
            ['DC001', 'Syracuse DC', 'Syracuse, NY', '1.8M', '94%', 'Operational'],
            ['DC002', 'Columbus DC', 'Columbus, IN', '1.4M', '96%', 'Operational'],
        ]
    },
    'Product Catalog': {
        columns: ['SKU', 'Product Name', 'Category', 'Brand', 'Unit Price', 'Stock'],
        rows: Array.from({ length: 50 }, (_, i) => [
            `SKU-${String(i + 1).padStart(5, '0')}`,
            `Forklift Model ${['A', 'B', 'C', 'X', 'Z'][i % 5]}${100 + i}`,
            ['Electric', 'Propane', 'Diesel', 'Electric Rider', 'Walkie'][i % 5],
            ['TMH', 'Raymond', 'THD'][i % 3],
            `$${(15000 + (i * 500)).toLocaleString()}`,
            Math.floor(Math.random() * 100 + 10)
        ])
    },
    'Financial Transactions': {
        columns: ['Trans ID', 'Date', 'Type', 'Amount', 'Entity', 'Status'],
        rows: Array.from({ length: 50 }, (_, i) => [
            `TXN-${String(i + 1000).padStart(6, '0')}`,
            `2024-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
            ['Invoice', 'Payment', 'Credit Memo', 'Journal Entry'][i % 4],
            `$${(Math.floor(Math.random() * 50000) + 1000).toLocaleString()}`,
            ['TMH', 'Raymond', 'THD'][i % 3],
            ['Posted', 'Pending', 'Cleared'][i % 3]
        ])
    },
    'Customer Master': {
        columns: ['Cust ID', 'Company Name', 'City', 'State', 'Type', 'Since'],
        rows: Array.from({ length: 50 }, (_, i) => [
            `CUST-${String(i + 100).padStart(5, '0')}`,
            `Customer ${String.fromCharCode(65 + (i % 26))}${i + 1} Corp`,
            ['Chicago', 'Detroit', 'Columbus', 'Atlanta', 'Dallas'][i % 5],
            ['IL', 'MI', 'OH', 'GA', 'TX'][i % 5],
            ['Dealer', 'End User', 'Fleet'][i % 3],
            `${2018 + (i % 6)}`
        ])
    },
    'Equipment Metrics': {
        columns: ['Asset ID', 'Timestamp', 'Temp (°F)', 'Pressure', 'Vibration', 'Status'],
        rows: Array.from({ length: 50 }, (_, i) => [
            `EQ-${String(i + 1).padStart(4, '0')}`,
            `2024-12-11 0${i % 10}:${String((i * 7) % 60).padStart(2, '0')}:00`,
            `${165 + Math.floor(Math.random() * 30)}`,
            `${45 + Math.floor(Math.random() * 15)} psi`,
            `${(Math.random() * 2).toFixed(2)} mm/s`,
            ['Normal', 'Warning', 'Normal', 'Normal'][i % 4]
        ])
    },
    'Fleet Telemetry': {
        columns: ['Unit ID', 'Location', 'Speed', 'Battery', 'Hours', 'Status'],
        rows: Array.from({ length: 50 }, (_, i) => [
            `FLT-${String(i + 1).padStart(4, '0')}`,
            `${(40.7 + Math.random()).toFixed(4)}, ${(-74.0 + Math.random()).toFixed(4)}`,
            `${Math.floor(Math.random() * 8)} mph`,
            `${60 + Math.floor(Math.random() * 40)}%`,
            `${(1000 + i * 23).toLocaleString()}`,
            ['Moving', 'Idle', 'Charging', 'Offline'][i % 4]
        ])
    },
};

export default function DataManagementPage() {
    const [selectedDataset, setSelectedDataset] = useState<string | null>(null);
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
                        <div
                            key={idx}
                            className="p-3 bg-[#252A31] border border-[#404854] hover:bg-[#2F343C] hover:border-[#4C90F0] cursor-pointer transition-colors"
                            onClick={() => setSelectedDataset(dataset.name)}
                        >
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

            {/* Dataset Preview Modal */}
            {selectedDataset && sampleData[selectedDataset] && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => setSelectedDataset(null)}>
                    <div
                        className="bg-[#2F343C] border border-[#404854] shadow-2xl max-w-4xl w-full mx-4 max-h-[80vh] flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-4 border-b border-[#404854]">
                            <div className="flex items-center gap-3">
                                <FileText className="w-5 h-5 text-[#4C90F0]" />
                                <div>
                                    <h3 className="font-semibold text-[#F6F7F9]">{selectedDataset}</h3>
                                    <p className="text-xs text-[#ABB3BF]">
                                        Showing {sampleData[selectedDataset].rows.length} of {datasets.find(d => d.name === selectedDataset)?.records.toLocaleString()} records
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedDataset(null)}
                                className="p-1 hover:bg-[#404854] transition-colors"
                            >
                                <X className="w-5 h-5 text-[#ABB3BF]" />
                            </button>
                        </div>

                        {/* Scrollable Table */}
                        <div className="overflow-auto flex-1 p-4" style={{ maxHeight: '60vh' }}>
                            <table className="w-full text-sm">
                                <thead className="sticky top-0 bg-[#252A31]">
                                    <tr>
                                        {sampleData[selectedDataset].columns.map((col, idx) => (
                                            <th key={idx} className="text-left py-2 px-3 text-xs uppercase tracking-wide text-[#ABB3BF] border-b border-[#404854]">
                                                {col}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {sampleData[selectedDataset].rows.map((row, rowIdx) => (
                                        <tr key={rowIdx} className="border-b border-[#404854]/50 hover:bg-[#252A31]">
                                            {row.map((cell, cellIdx) => (
                                                <td key={cellIdx} className="py-2 px-3 text-[#F6F7F9]">
                                                    {cell}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex items-center justify-between p-4 border-t border-[#404854] bg-[#252A31]">
                            <div className="text-xs text-[#8F99A8]">
                                {sampleData[selectedDataset].columns.length} columns × {sampleData[selectedDataset].rows.length} rows (sample)
                            </div>
                            <Button variant="outlined" size="default" onClick={() => setSelectedDataset(null)}>
                                Close
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Quality Issues */}
            <Card>
                <h3 className="text-lg font-semibold text-[#F6F7F9] mb-4">Data Quality Issues ({qualityIssues.length})</h3>
                <div className="space-y-2">
                    {qualityIssues.map((issue, idx) => (
                        <div key={idx} className="p-3 bg-[#252A31] border border-[#404854] flex items-center justify-between">
                            <div className="flex items-center gap-3 flex-1">
                                <XCircle className={`w-4 h-4 flex-shrink-0 ${issue.severity === 'High' ? 'text-[#CD4246]' :
                                    issue.severity === 'Medium' ? 'text-[#C87619]' :
                                        'text-[#ABB3BF]'
                                    }`} />
                                <div className="flex items-center gap-3 flex-1 text-sm">
                                    <div className="font-semibold text-[#F6F7F9]">{issue.dataset}</div>
                                    <span className="text-xs px-2 py-0.5 bg-[#2D72D2]/20 text-[#4C90F0]">{issue.source}</span>
                                    <div className="text-[#ABB3BF]">{issue.issue}</div>
                                    <div className="text-[#ABB3BF]">•</div>
                                    <div className="text-[#ABB3BF]">Fields: <span className="font-mono text-xs">{issue.affectedFields}</span></div>
                                    <div className="text-[#ABB3BF]">•</div>
                                    <div className="text-[#ABB3BF]">{issue.lastDetected}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 ml-4 flex-shrink-0">
                                <div className="text-right">
                                    <div className="text-xl font-semibold text-[#F6F7F9]">{issue.count}</div>
                                    <div className="text-xs text-[#ABB3BF]">Occurrences</div>
                                </div>
                                <span className={`px-3 py-1 text-xs w-20 text-center ${issue.severity === 'High' ? 'bg-[#CD4246]/20 text-[#CD4246]' :
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

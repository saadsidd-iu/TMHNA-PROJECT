'use client';

import { Card } from '@/components/common/Card';
import { KPICard } from '@/components/common/KPICard';
import { Activity, Gauge, CheckCircle, AlertTriangle, Truck, Timer } from 'lucide-react';

const zones = [
    { id: 'INBOUND', name: 'Inbound Dock', trucks: 2, status: 'Active', color: '#2D72D2' },
    { id: 'RAW', name: 'Raw Storage', inventory: '2,400 units', utilization: 0.48, color: '#238551' },
    { id: 'FAB', name: 'Fabrication', machines: 3, running: 2, color: '#C87619' },
    { id: 'WELD', name: 'Welding', cells: 2, active: 2, color: '#C87619' },
    { id: 'PAINT', name: 'Paint Booth', temp: '385°F', unit: 'TMH-048570', color: '#C87619' },
    { id: 'ASSEMBLY', name: 'Assembly Line', stations: 3, status: 'Running', color: '#238551' },
    { id: 'QC', name: 'Quality Testing', stations: 2, testing: 2, color: '#4C90F0' },
    { id: 'FG', name: 'Finished Goods', units: 3, ready: 3, color: '#238551' },
    { id: 'OUTBOUND', name: 'Outbound Dock', trucks: 2, loading: 2, color: '#2D72D2' },
];

const productionLines = [
    { line: 'Main Assembly Line 1', unitsPerHour: 12, status: 'Active', currentUnit: 'TMH-2025-048573', progress: 0.68 },
    { line: 'Main Assembly Line 2', unitsPerHour: 10, status: 'Active', currentUnit: 'TMH-2025-048574', progress: 0.42 },
];

const machines = [
    { id: 'FAB-001', zone: 'Fabrication', status: 'Running', job: 'Frame Cutting', oee: 0.89 },
    { id: 'FAB-002', zone: 'Fabrication', status: 'Running', job: 'Bracket Formation', oee: 0.91 },
    { id: 'FAB-003', zone: 'Fabrication', status: 'Maintenance', job: null, oee: 0 },
    { id: 'WELD-001', zone: 'Welding', status: 'Running', job: 'TMH-048571', oee: 0.87 },
    { id: 'WELD-002', zone: 'Welding', status: 'Running', job: 'TMH-048572', oee: 0.85 },
];

export default function FactoryPage() {
    const avgOEE = machines.filter(m => m.status === 'Running').reduce((sum, m) => sum + m.oee, 0) / machines.filter(m => m.status === 'Running').length;

    return (
        <div className="min-h-screen p-8 space-y-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-semibold text-[#F6F7F9] mb-2">Factory Floor - Columbus Plant</h1>
                <p className="text-[#ABB3BF]">Real-time production monitoring and equipment status</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                <KPICard
                    title="Overall OEE"
                    value={`${(avgOEE * 100).toFixed(1)}%`}
                    comparison={{ value: '2.3 pts vs target', trend: 'up' }}
                    icon={Gauge}
                />
                <KPICard
                    title="Units/Hour"
                    value="22"
                    comparison={{ value: '92% capacity', trend: 'up' }}
                    icon={Activity}
                />
                <KPICard
                    title="Quality Rate"
                    value="99.2%"
                    comparison={{ value: 'Above target', trend: 'up' }}
                    icon={CheckCircle}
                />
                <KPICard
                    title="Downtime Events"
                    value="1"
                    comparison={{ value: 'FAB-003 maint.', trend: 'neutral' }}
                    icon={AlertTriangle}
                />
                <KPICard
                    title="Inbound Trucks"
                    value="2"
                    comparison={{ value: '1 unloading', trend: 'neutral' }}
                    icon={Truck}
                />
                <KPICard
                    title="Avg Cycle Time"
                    value="3.2m"
                    comparison={{ value: '5% faster', trend: 'up' }}
                    icon={Timer}
                />
            </div>

            {/* Production Lines */}
            <Card>
                <h3 className="text-lg font-semibold text-[#F6F7F9] mb-4">Active Production Lines</h3>
                <div className="space-y-4">
                    {productionLines.map(line => (
                        <div key={line.line} className="p-4 bg-[#252A31] border border-[#404854]">
                            <div className="flex items-center justify-between mb-3">
                                <div>
                                    <div className="font-semibold text-[#F6F7F9]">{line.line}</div>
                                    <div className="text-sm text-[#ABB3BF]">Current: {line.currentUnit}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-semibold text-[#238551]">{line.unitsPerHour}</div>
                                    <div className="text-xs text-[#ABB3BF]">units/hour</div>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#ABB3BF]">Progress</span>
                                    <span className="text-[#F6F7F9]">{(line.progress * 100).toFixed(0)}%</span>
                                </div>
                                <div className="h-2 bg-[#1C2127]">
                                    <div
                                        className="h-full bg-[#238551]"
                                        style={{ width: `${line.progress * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Factory Zones Grid */}
            <div>
                <h3 className="text-lg font-semibold text-[#F6F7F9] mb-4">Production Zones (9)</h3>
                <div className="grid grid-cols-3 gap-4">
                    {zones.map(zone => (
                        <Card
                            key={zone.id}
                            padding={false}
                            className="p-4 border-l-4"
                            style={{ borderLeftColor: zone.color }}
                        >
                            <div className="font-semibold text-[#F6F7F9] mb-2">{zone.name}</div>
                            <div className="text-sm space-y-1">
                                {zone.trucks !== undefined && (
                                    <div className="text-[#ABB3BF]">{zone.trucks} trucks {zone.id === 'OUTBOUND' ? `(${zone.loading} loading)` : ''}</div>
                                )}
                                {zone.inventory !== undefined && (
                                    <>
                                        <div className="text-[#ABB3BF]">Inventory: {zone.inventory}</div>
                                        <div className="text-[#ABB3BF]">Utilization: {(zone.utilization! * 100).toFixed(0)}%</div>
                                    </>
                                )}
                                {zone.machines !== undefined && (
                                    <div className="text-[#ABB3BF]">{zone.running}/{zone.machines} machines running</div>
                                )}
                                {zone.cells !== undefined && (
                                    <div className="text-[#ABB3BF]">{zone.active}/{zone.cells} cells active</div>
                                )}
                                {zone.temp !== undefined && (
                                    <>
                                        <div className="text-[#ABB3BF]">Temp: {zone.temp}</div>
                                        <div className="text-[#ABB3BF]">Unit: {zone.unit}</div>
                                    </>
                                )}
                                {zone.stations !== undefined && (
                                    <div className="text-[#ABB3BF]">{zone.stations} stations {zone.status?.toLowerCase()}</div>
                                )}
                                {zone.testing !== undefined && (
                                    <div className="text-[#ABB3BF]">{zone.testing}/{zone.stations} stations testing</div>
                                )}
                                {zone.units !== undefined && (
                                    <div className="text-[#ABB3BF]">{zone.ready}/{zone.units} units ready to ship</div>
                                )}
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Equipment Status */}
            <Card>
                <h3 className="text-lg font-semibold text-[#F6F7F9] mb-4">Equipment Status ({machines.length} machines)</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-[#404854]">
                                <th className="text-left py-3 text-xs uppercase tracking-wide text-[#ABB3BF]">Machine ID</th>
                                <th className="text-left py-3 text-xs uppercase tracking-wide text-[#ABB3BF]">Zone</th>
                                <th className="text-left py-3 text-xs uppercase tracking-wide text-[#ABB3BF]">Status</th>
                                <th className="text-left py-3 text-xs uppercase tracking-wide text-[#ABB3BF]">Current Job</th>
                                <th className="text-right py-3 text-xs uppercase tracking-wide text-[#ABB3BF]">OEE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {machines.map(machine => (
                                <tr key={machine.id} className="border-b border-[#404854] hover:bg-[#252A31]">
                                    <td className="py-3 font-mono text-sm text-[#F6F7F9]">{machine.id}</td>
                                    <td className="py-3 text-[#ABB3BF]">{machine.zone}</td>
                                    <td className="py-3">
                                        <span className={`inline-flex items-center gap-2 text-sm ${machine.status === 'Running' ? 'text-[#238551]' :
                                                machine.status === 'Maintenance' ? 'text-[#C87619]' : 'text-[#CD4246]'
                                            }`}>
                                            <div className={`w-2 h-2 rounded-full ${machine.status === 'Running' ? 'bg-[#238551]' :
                                                    machine.status === 'Maintenance' ? 'bg-[#C87619]' : 'bg-[#CD4246]'
                                                } animate-pulse`}></div>
                                            {machine.status}
                                        </span>
                                    </td>
                                    <td className="py-3 text-[#ABB3BF]">{machine.job || '—'}</td>
                                    <td className="py-3 text-right font-semibold text-[#F6F7F9]">
                                        {machine.oee > 0 ? `${(machine.oee * 100).toFixed(0)}%` : '—'}
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

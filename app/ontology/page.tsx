'use client';

import { Search, Database, Box, Factory, Truck, MapPin, Users, Wrench } from 'lucide-react';
import { useState } from 'react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';

const objectTypes = [
    { name: 'Plants', icon: Factory, count: 5, color: '#2D72D2', description: 'Manufacturing facilities' },
    { name: 'Distribution Centers', icon: MapPin, count: 2, color: '#4C90F0', description: 'Warehousing and fulfillment' },
    { name: 'Products', icon: Box, count: 1247, color: '#238551', description: 'Forklift models and SKUs' },
    { name: 'Equipment', icon: Wrench, count: 342, color: '#C87619', description: 'Manufacturing equipment' },
    { name: 'Customers', icon: Users, count: 312, color: '#8ABBFF', description: 'Dealers and distributors' },
    { name: 'Shipments', icon: Truck, count: 15234, color: '#32A467', description: 'Logistics and deliveries' },
];

const sampleObjects = [
    { id: 'PLT-001', type: 'Plant', name: 'Columbus Manufacturing', properties: { brand: 'TMH', capacity: 2500, utilization: 0.92 } },
    { id: 'PLT-002', type: 'Plant', name: 'Greene Manufacturing', properties: { brand: 'Raymond', capacity: 1800, utilization: 0.89 } },
    { id: 'DC-001', type: 'Distribution Center', name: 'Syracuse DC', properties: { skus: 1800000, otif: 0.94 } },
    { id: 'PROD-8FGCU25', type: 'Product', name: '8FGCU25 Cushion Forklift', properties: { capacity_lbs: 5000, brand: 'TMH' } },
    { id: 'CUST-DLR-045', type: 'Customer', name: 'Chicago Material Handling', properties: { type: 'Dealer', region: 'Midwest' } },
];

export default function OntologyPage() {
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredObjects = searchQuery
        ? sampleObjects.filter(obj =>
            obj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            obj.id.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : selectedType
            ? sampleObjects.filter(obj => obj.type === selectedType)
            : sampleObjects;

    return (
        <div className="min-h-screen p-8 space-y-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-semibold text-[#F6F7F9] mb-2">Ontology Explorer</h1>
                <p className="text-[#ABB3BF]">Unified data model across TMHNA operations</p>
            </div>

            {/* Object Type Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {objectTypes.map(objType => {
                    const Icon = objType.icon;
                    return (
                        <Card
                            key={objType.name}
                            padding={false}
                            className={`p-4 cursor-pointer transition-all ${selectedType === objType.name ? 'ring-2 ring-[#2D72D2]' : ''
                                }`}
                            onClick={() => setSelectedType(selectedType === objType.name ? null : objType.name)}
                        >
                            <div className="flex flex-col items-center text-center space-y-2">
                                <Icon className="w-8 h-8" style={{ color: objType.color }} />
                                <div>
                                    <div className="text-sm font-semibold text-[#F6F7F9]">{objType.name}</div>
                                    <div className="text-xs text-[#ABB3BF]">{objType.count.toLocaleString()}</div>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>

            {/* Search and Filters */}
            <div className="flex gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#ABB3BF]" />
                    <input
                        type="text"
                        placeholder="Search objects by name or ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-[40px] pl-10 pr-4 bg-[#252A31] border border-[#404854] text-[#F6F7F9] placeholder:text-[#ABB3BF] focus:outline-none focus:border-[#2D72D2] focus:ring-1 focus:ring-[#2D72D2]"
                    />
                </div>
                {selectedType && (
                    <Button variant="outlined" onClick={() => setSelectedType(null)}>
                        Clear Filter
                    </Button>
                )}
            </div>

            {/* Object Browser */}
            <Card>
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-[#F6F7F9]">
                        {selectedType || 'All Objects'} ({filteredObjects.length})
                    </h3>
                </div>

                <div className="space-y-2">
                    {filteredObjects.map(obj => (
                        <div
                            key={obj.id}
                            className="p-4 bg-[#252A31] border border-[#404854] hover:bg-[#2F343C] transition-colors cursor-pointer"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-xs px-2 py-1 bg-[#2D72D2]/20 text-[#4C90F0] font-mono">{obj.id}</span>
                                        <span className="text-xs px-2 py-1 bg-[#ABB3BF]/10 text-[#ABB3BF]">{obj.type}</span>
                                    </div>
                                    <div className="text-base font-medium text-[#F6F7F9] mb-2">{obj.name}</div>
                                    <div className="flex flex-wrap gap-3 text-sm">
                                        {Object.entries(obj.properties).map(([key, value]) => (
                                            <div key={key} className="text-[#ABB3BF]">
                                                <span className="text-[#8F99A8]">{key.replace(/_/g, ' ')}:</span>{' '}
                                                <span className="text-[#F6F7F9]">
                                                    {typeof value === 'number' && value < 1 ? `${(value * 100).toFixed(0)}%` : value.toLocaleString()}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <Database className="w-5 h-5 text-[#ABB3BF]" />
                            </div>
                        </div>
                    ))}
                </div>

                {filteredObjects.length === 0 && (
                    <div className="text-center py-12">
                        <Database className="w-12 h-12 text-[#ABB3BF] mx-auto mb-4" />
                        <p className="text-[#ABB3BF]">No objects found matching your search</p>
                    </div>
                )}
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
                <Card padding={false} className="p-4">
                    <div className="text-2xl font-semibold text-[#F6F7F9]">
                        {objectTypes.reduce((sum, o) => sum + o.count, 0).toLocaleString()}
                    </div>
                    <div className="text-sm text-[#ABB3BF]">Total Objects</div>
                </Card>
                <Card padding={false} className="p-4">
                    <div className="text-2xl font-semibold text-[#F6F7F9]">{objectTypes.length}</div>
                    <div className="text-sm text-[#ABB3BF]">Object Types</div>
                </Card>
                <Card padding={false} className="p-4">
                    <div className="text-2xl font-semibold text-[#238551]">47</div>
                    <div className="text-sm text-[#ABB3BF]">Relationships</div>
                </Card>
                <Card padding={false} className="p-4">
                    <div className="text-2xl font-semibold text-[#2D72D2]">12</div>
                    <div className="text-sm text-[#ABB3BF]">Data Sources</div>
                </Card>
            </div>
        </div>
    );
}

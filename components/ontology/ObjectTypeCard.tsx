'use client';

import { useState } from 'react';
import { LucideIcon, Plus, X } from 'lucide-react';
import * as Icons from 'lucide-react';

interface ObjectTypeCardProps {
    name: string;
    displayName: string;
    icon: string;
    instanceCount: number | null;
    domain: string;
    isHighlighted?: boolean;
    onClick?: () => void;
}

// Mock metadata for detail panel
const objectMetadata: Record<string, { relationships: string[], dataSource: string, lastBackup: string, lastUpdate: string }> = {
    'Plant': { relationships: ['Forklift (1:many)', 'FactoryZone (1:many)'], dataSource: 'SAP ECC', lastBackup: '2 hours ago', lastUpdate: '5 min ago' },
    'DistributionCenter': { relationships: ['PartsInventory (1:many)', 'Plant (many:1)'], dataSource: 'SAP ECC', lastBackup: '2 hours ago', lastUpdate: '10 min ago' },
    'Dealers': { relationships: ['Customer (1:many)', 'ServiceOrder (1:many)'], dataSource: 'Snowflake', lastBackup: '1 hour ago', lastUpdate: '3 min ago' },
    'Forklifts': { relationships: ['Plant (many:1)', 'Equipment (1:1)', 'ServiceOrder (1:many)'], dataSource: 'Factory IoT', lastBackup: '30 min ago', lastUpdate: 'Real-time' },
    'Customers': { relationships: ['Dealer (many:1)', 'Forklift (1:many)', 'ServiceOrder (1:many)'], dataSource: 'Snowflake', lastBackup: '1 hour ago', lastUpdate: '8 min ago' },
    'ServiceOrders': { relationships: ['Customer (many:1)', 'Forklift (many:1)', 'ServiceTechnician (many:1)'], dataSource: 'JD Edwards', lastBackup: '45 min ago', lastUpdate: '2 min ago' },
    'ServiceTechnicians': { relationships: ['ServiceOrder (1:many)', 'Dealer (many:1)'], dataSource: 'JD Edwards', lastBackup: '1 hour ago', lastUpdate: '15 min ago' },
    'PartsInventory': { relationships: ['DistributionCenter (many:1)', 'Supplier (many:1)'], dataSource: 'SAP ECC', lastBackup: '30 min ago', lastUpdate: '1 min ago' },
    'Suppliers': { relationships: ['PartsInventory (1:many)', 'BacklogOrder (1:many)'], dataSource: 'SAP ECC', lastBackup: '2 hours ago', lastUpdate: '20 min ago' },
    'WarrantyClaims': { relationships: ['Forklift (many:1)', 'Customer (many:1)'], dataSource: 'JD Edwards', lastBackup: '1 hour ago', lastUpdate: '12 min ago' },
    'BacklogOrders': { relationships: ['Supplier (many:1)', 'Plant (many:1)'], dataSource: 'SAP ECC', lastBackup: '45 min ago', lastUpdate: '5 min ago' },
    'TelematicsEquipment': { relationships: ['Forklift (1:1)'], dataSource: 'Telematics API', lastBackup: '15 min ago', lastUpdate: 'Real-time' },
    'Alerts': { relationships: ['Plant (many:1)', 'Forklift (many:1)', 'Equipment (many:1)'], dataSource: 'Multiple', lastBackup: 'N/A', lastUpdate: 'Real-time' },
    'FactoryZones': { relationships: ['Plant (many:1)'], dataSource: 'Factory IoT', lastBackup: '1 hour ago', lastUpdate: '30 sec ago' },
};

export function ObjectTypeCard({
    name,
    displayName,
    icon,
    instanceCount,
    domain,
    isHighlighted = false,
    onClick
}: ObjectTypeCardProps) {
    const [showDetails, setShowDetails] = useState(false);

    // Get the icon component from lucide-react
    const IconComponent = (Icons as any)[icon] as LucideIcon || Icons.Box;

    const formatCount = (count: number | null): string => {
        if (count === null) return 'Variable';
        if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
        if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
        return count.toString();
    };

    const metadata = objectMetadata[displayName] || {
        relationships: ['N/A'],
        dataSource: 'Unknown',
        lastBackup: 'Unknown',
        lastUpdate: 'Unknown'
    };

    const handlePlusClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowDetails(!showDetails);
    };

    return (
        <>
            <button
                onClick={onClick}
                className={`relative group bg-[#2F343C] border p-4 hover:border-[#4C90F0] hover:shadow-lg transition-all duration-200 cursor-pointer ${isHighlighted ? 'highlight-pulse border-white' : 'border-[#404854]'
                    }`}
            >
                <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 bg-[#2D72D2]/10 group-hover:bg-[#2D72D2]/20 transition-colors">
                        <IconComponent className="w-6 h-6 text-[#4C90F0]" />
                    </div>
                    <div className="flex-1 text-left">
                        <h4 className="text-sm font-semibold text-[#F6F7F9] group-hover:text-[#4C90F0] transition-colors">
                            {displayName}
                        </h4>
                        <p className="text-xs text-[#ABB3BF] mt-0.5">
                            {formatCount(instanceCount)} objects
                        </p>
                    </div>
                </div>

                <div className="pt-2 border-t border-[#404854]">
                    <span className="text-xs text-[#8F99A8]">{domain}</span>
                </div>

                {/* Plus/X button in bottom right */}
                <div
                    onClick={handlePlusClick}
                    className="absolute bottom-2 right-2 w-5 h-5 flex items-center justify-center bg-[#404854] hover:bg-[#4C90F0] transition-colors cursor-pointer"
                >
                    {showDetails ? (
                        <X className="w-3 h-3 text-[#F6F7F9]" />
                    ) : (
                        <Plus className="w-3 h-3 text-[#F6F7F9]" />
                    )}
                </div>

                {/* Detail Panel (shown when plus is clicked) */}
                {showDetails && (
                    <div
                        className="absolute z-50 left-0 right-0 bg-[#252A31] border border-[#404854] p-3 shadow-xl"
                        style={{ top: '100%', marginTop: '4px' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="space-y-2 text-xs text-left">
                            <div>
                                <div className="text-[#ABB3BF] mb-1">Relationships</div>
                                <div className="flex flex-wrap gap-1">
                                    {metadata.relationships.map((rel, idx) => (
                                        <span key={idx} className="px-2 py-0.5 bg-[#2D72D2]/20 text-[#4C90F0]">{rel}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#404854]">
                                <div>
                                    <div className="text-[#ABB3BF]">Data Source</div>
                                    <div className="text-[#F6F7F9] font-medium">{metadata.dataSource}</div>
                                </div>
                                <div>
                                    <div className="text-[#ABB3BF]">Last Backup</div>
                                    <div className="text-[#F6F7F9] font-medium">{metadata.lastBackup}</div>
                                </div>
                                <div>
                                    <div className="text-[#ABB3BF]">Last Update</div>
                                    <div className="text-[#72CA9B] font-medium">{metadata.lastUpdate}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </button>

            <style jsx>{`
                .highlight-pulse {
                    animation: borderPulse 2s ease-in-out;
                }
                @keyframes borderPulse {
                    0%, 100% { border-color: rgba(255, 255, 255, 0.3); }
                    50% { border-color: rgba(255, 255, 255, 1); box-shadow: 0 0 12px rgba(255, 255, 255, 0.4); }
                }
            `}</style>
        </>
    );
}


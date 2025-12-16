'use client';

import { useState } from 'react';

// ============================================
// TYPE DEFINITIONS
// ============================================

interface Node {
    id: string;
    label: string;
    subtitle?: string;
    type: 'source' | 'integration' | 'semantic' | 'ontology';
    icon: string;
    x: number;
    y: number;
    width: number;
    height: number;
}

interface Connection {
    id: string;
    from: string;
    to: string;
    label?: string;
    refreshRate?: string;
}

// ============================================
// NODE DATA
// ============================================

const nodes: Node[] = [
    // SOURCE SYSTEMS (Column 1) - wider and shorter for better text fit
    { id: 'sap_ecc', label: 'SAP ECC', subtitle: 'TN01 & TN02', type: 'source', icon: '📊', x: 50, y: 50, width: 170, height: 50 },
    { id: 'sap_s4', label: 'SAP S/4HANA', subtitle: 'Public Cloud', type: 'source', icon: '📊', x: 50, y: 125, width: 170, height: 50 },
    { id: 'jd_edwards', label: 'JD Edwards', subtitle: 'Raymond ERP', type: 'source', icon: '📊', x: 50, y: 200, width: 170, height: 50 },
    { id: 'telematics', label: 'Telematics', subtitle: 'IoT Platform', type: 'source', icon: '📡', x: 50, y: 275, width: 170, height: 50 },
    { id: 'dealer_systems', label: 'Dealer Systems', subtitle: 'CRM/DMS', type: 'source', icon: '🏪', x: 50, y: 350, width: 170, height: 50 },

    // INTEGRATION LAYER (Column 2) - wider and shorter
    { id: 'snowflake_raw', label: 'Snowflake Raw', subtitle: '847 tables', type: 'integration', icon: '❄️', x: 280, y: 80, width: 170, height: 50 },
    { id: 'snowflake_enriched', label: 'Snowflake Enriched', subtitle: '234 tables', type: 'integration', icon: '❄️', x: 280, y: 185, width: 170, height: 50 },
    { id: 'streaming', label: 'Streaming', subtitle: 'Kafka/Flink', type: 'integration', icon: '⚡', x: 280, y: 290, width: 170, height: 50 },

    // SEMANTIC LAYER (Column 3) - wider and shorter
    { id: 'financial_objects', label: 'Financial Objects', subtitle: 'GL, AP, AR', type: 'semantic', icon: '💰', x: 510, y: 50, width: 170, height: 50 },
    { id: 'operational_objects', label: 'Operational Objects', subtitle: 'Production, Inv', type: 'semantic', icon: '🏭', x: 510, y: 125, width: 170, height: 50 },
    { id: 'service_objects', label: 'Service Objects', subtitle: 'Orders, Warranty', type: 'semantic', icon: '🔧', x: 510, y: 200, width: 170, height: 50 },
    { id: 'iot_objects', label: 'IoT Objects', subtitle: 'Telematics', type: 'semantic', icon: '📡', x: 510, y: 275, width: 170, height: 50 },

    // ONTOLOGY OBJECTS (Column 4) - wider and shorter
    { id: 'plant', label: 'Plant', subtitle: '5 objects', type: 'ontology', icon: '🏭', x: 740, y: 50, width: 145, height: 45 },
    { id: 'forklift', label: 'Forklift', subtitle: '1.5M objects', type: 'ontology', icon: '🚜', x: 740, y: 115, width: 145, height: 45 },
    { id: 'service_order', label: 'Service Order', subtitle: '890K objects', type: 'ontology', icon: '🔧', x: 740, y: 180, width: 145, height: 45 },
    { id: 'parts_inventory', label: 'Parts Inventory', subtitle: '3.2M objects', type: 'ontology', icon: '📦', x: 740, y: 245, width: 145, height: 45 },
    { id: 'equipment', label: 'Equipment', subtitle: '780K objects', type: 'ontology', icon: '📡', x: 740, y: 310, width: 145, height: 45 },
];

const connections: Connection[] = [
    // Source → Integration
    { id: 'c1', from: 'sap_ecc', to: 'snowflake_raw', label: 'ODP/CDC', refreshRate: '15 min' },
    { id: 'c2', from: 'sap_s4', to: 'snowflake_raw', label: 'API', refreshRate: 'Real-time' },
    { id: 'c3', from: 'jd_edwards', to: 'snowflake_raw', label: 'ETL', refreshRate: '1 hour' },
    { id: 'c4', from: 'telematics', to: 'streaming', label: 'MQTT', refreshRate: 'Real-time' },
    { id: 'c5', from: 'dealer_systems', to: 'snowflake_raw', label: 'API', refreshRate: '4 hours' },

    // Integration → Integration  
    { id: 'c6', from: 'snowflake_raw', to: 'snowflake_enriched', label: 'dbt' },
    { id: 'c7', from: 'streaming', to: 'snowflake_enriched', label: 'Flink' },

    // Integration → Semantic
    { id: 'c8', from: 'snowflake_enriched', to: 'financial_objects' },
    { id: 'c9', from: 'snowflake_enriched', to: 'operational_objects' },
    { id: 'c10', from: 'snowflake_enriched', to: 'service_objects' },
    { id: 'c11', from: 'streaming', to: 'iot_objects' },

    // Semantic → Ontology
    { id: 'c12', from: 'financial_objects', to: 'plant' },
    { id: 'c13', from: 'operational_objects', to: 'forklift' },
    { id: 'c14', from: 'operational_objects', to: 'parts_inventory' },
    { id: 'c15', from: 'service_objects', to: 'service_order' },
    { id: 'c16', from: 'iot_objects', to: 'equipment' },
];

// Node metadata for popup details
const nodeMetadata: Record<string, { fullName: string; version: string; dataType: string; lastUpdate: string; lastBackup: string; recordCount: string; owner: string; }> = {
    'sap_ecc': { fullName: 'SAP ECC 6.0 EHP8', version: '6.0 EHP8', dataType: 'Transactional ERP', lastUpdate: '15 min ago', lastBackup: '2 hours ago', recordCount: '2.4M records', owner: 'Enterprise IT' },
    'sap_s4': { fullName: 'SAP S/4HANA Cloud 2311', version: 'Cloud 2311', dataType: 'Transactional ERP', lastUpdate: 'Real-time', lastBackup: '1 hour ago', recordCount: '1.8M records', owner: 'Cloud Operations' },
    'jd_edwards': { fullName: 'JD Edwards EnterpriseOne 9.2', version: '9.2.7.3', dataType: 'Transactional ERP', lastUpdate: '1 hour ago', lastBackup: '4 hours ago', recordCount: '890K records', owner: 'Raymond IT' },
    'telematics': { fullName: 'TMHNA Telematics Platform', version: '3.4.2', dataType: 'IoT Streaming Data', lastUpdate: 'Real-time', lastBackup: 'N/A (streaming)', recordCount: '156K devices', owner: 'IoT Team' },
    'dealer_systems': { fullName: 'Dealer Management System', version: 'Multi-vendor', dataType: 'CRM/DMS Data', lastUpdate: '4 hours ago', lastBackup: '6 hours ago', recordCount: '312 dealers', owner: 'Dealer Network' },
    'snowflake_raw': { fullName: 'Snowflake Raw Data Layer', version: 'Enterprise Edition', dataType: 'Raw/Staged Data', lastUpdate: '5 min ago', lastBackup: 'Continuous', recordCount: '847 tables', owner: 'Data Engineering' },
    'snowflake_enriched': { fullName: 'Snowflake Enriched Layer', version: 'Enterprise Edition', dataType: 'Curated/Cleansed Data', lastUpdate: '10 min ago', lastBackup: 'Continuous', recordCount: '234 tables', owner: 'Data Engineering' },
    'streaming': { fullName: 'Apache Kafka + Flink', version: 'Kafka 3.6 / Flink 1.18', dataType: 'Real-time Streaming', lastUpdate: 'Real-time', lastBackup: 'N/A', recordCount: '45 topics', owner: 'Streaming Team' },
    'financial_objects': { fullName: 'Financial Semantic Objects', version: 'v2.1', dataType: 'Semantic Layer', lastUpdate: '15 min ago', lastBackup: '30 min ago', recordCount: '12 objects', owner: 'Finance Analytics' },
    'operational_objects': { fullName: 'Operational Semantic Objects', version: 'v2.1', dataType: 'Semantic Layer', lastUpdate: '10 min ago', lastBackup: '30 min ago', recordCount: '18 objects', owner: 'Ops Analytics' },
    'service_objects': { fullName: 'Service Semantic Objects', version: 'v2.0', dataType: 'Semantic Layer', lastUpdate: '12 min ago', lastBackup: '30 min ago', recordCount: '9 objects', owner: 'Service Analytics' },
    'iot_objects': { fullName: 'IoT Semantic Objects', version: 'v1.8', dataType: 'Semantic Layer', lastUpdate: 'Real-time', lastBackup: '15 min ago', recordCount: '7 objects', owner: 'IoT Analytics' },
    'plant': { fullName: 'Plant Ontology Object', version: 'v3.2', dataType: 'Foundry Object', lastUpdate: '20 min ago', lastBackup: '1 hour ago', recordCount: '5 objects', owner: 'Data Platform' },
    'forklift': { fullName: 'Forklift Ontology Object', version: 'v3.5', dataType: 'Foundry Object', lastUpdate: 'Real-time', lastBackup: '30 min ago', recordCount: '1.5M objects', owner: 'Data Platform' },
    'service_order': { fullName: 'Service Order Ontology Object', version: 'v2.8', dataType: 'Foundry Object', lastUpdate: '5 min ago', lastBackup: '1 hour ago', recordCount: '890K objects', owner: 'Data Platform' },
    'parts_inventory': { fullName: 'Parts Inventory Ontology Object', version: 'v2.4', dataType: 'Foundry Object', lastUpdate: '3 min ago', lastBackup: '30 min ago', recordCount: '3.2M objects', owner: 'Data Platform' },
    'equipment': { fullName: 'Equipment Ontology Object', version: 'v2.1', dataType: 'Foundry Object', lastUpdate: 'Real-time', lastBackup: '45 min ago', recordCount: '780K objects', owner: 'Data Platform' },
};

// ============================================
// HELPER FUNCTIONS
// ============================================

const getNode = (id: string): Node | undefined => nodes.find(n => n.id === id);

const getConnectionPath = (fromNode: Node, toNode: Node): string => {
    const startX = fromNode.x + fromNode.width;
    const startY = fromNode.y + fromNode.height / 2;
    const endX = toNode.x;
    const endY = toNode.y + toNode.height / 2;

    const controlX1 = startX + (endX - startX) * 0.5;
    const controlY1 = startY;
    const controlX2 = startX + (endX - startX) * 0.5;
    const controlY2 = endY;

    return `M ${startX} ${startY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${endX} ${endY}`;
};

const getNodeColor = (type: Node['type']): string => {
    switch (type) {
        case 'source': return '#2D72D2';
        case 'integration': return '#238551';
        case 'semantic': return '#C87619';
        case 'ontology': return '#9D3F9D';
        default: return '#5F6B7C';
    }
};

// ============================================
// CONNECTION COMPONENT
// ============================================

function ConnectionLine({ connection }: { connection: Connection }) {
    const fromNode = getNode(connection.from);
    const toNode = getNode(connection.to);

    if (!fromNode || !toNode) return null;

    const path = getConnectionPath(fromNode, toNode);
    const pathId = `path-${connection.id}`;
    const color = getNodeColor(fromNode.type);

    return (
        <g className="connection-group">
            {/* Define the path for animation */}
            <defs>
                <path id={pathId} d={path} />
            </defs>

            {/* Shadow/glow effect */}
            <path
                d={path}
                stroke={color}
                strokeWidth="3"
                fill="none"
                opacity="0.2"
                filter="blur(4px)"
            />

            {/* Main connection line */}
            <path
                d={path}
                stroke={color}
                strokeWidth="2"
                fill="none"
                opacity="0.6"
                className="connection-line"
            />

            {/* Animated flowing dots */}
            {[0, 1, 2, 3].map((i) => (
                <circle key={`${connection.id}-dot-${i}`} r="2" fill="#FFFFFF">
                    <animateMotion
                        dur="3s"
                        repeatCount="indefinite"
                        begin={`${i * 0.75}s`}
                    >
                        <mpath href={`#${pathId}`} />
                    </animateMotion>
                </circle>
            ))}

            {/* Connection endpoint circles */}
            <circle
                cx={fromNode.x + fromNode.width}
                cy={fromNode.y + fromNode.height / 2}
                r="5"
                fill={color}
                className="connection-endpoint"
            />
            <circle
                cx={toNode.x}
                cy={toNode.y + toNode.height / 2}
                r="5"
                fill={color}
                className="connection-endpoint"
            />
        </g>
    );
}

// ============================================
// NODE COMPONENT
// ============================================

function NodeBox({ node, isSelected, onClick }: { node: Node; isSelected: boolean; onClick: () => void }) {
    const color = getNodeColor(node.type);

    return (
        <g className={`node-group ${isSelected ? 'selected' : ''}`} onClick={onClick} style={{ cursor: 'pointer' }}>
            <rect
                x={node.x}
                y={node.y}
                width={node.width}
                height={node.height}
                fill={color}
                stroke={isSelected ? '#FFFFFF' : color}
                strokeWidth={isSelected ? 3 : 1}
                rx="0"
                ry="0"
                className="node-rect"
            />

            <text
                x={node.x + 10}
                y={node.y + node.height / 2 + 1}
                fontSize="14"
                className="node-icon"
            >
                {node.icon}
            </text>

            <text
                x={node.x + 32}
                y={node.y + node.height / 2 - 4}
                fontSize={node.type === 'ontology' ? '10' : '11'}
                fontWeight="600"
                fill="#FFFFFF"
                className="node-label"
            >
                {node.label}
            </text>

            {node.subtitle && (
                <text
                    x={node.x + 32}
                    y={node.y + node.height / 2 + 9}
                    fontSize={node.type === 'ontology' ? '8' : '9'}
                    fill="rgba(255, 255, 255, 0.7)"
                    className="node-subtitle"
                >
                    {node.subtitle}
                </text>
            )}
        </g>
    );
}

// ============================================
// COLUMN HEADERS
// ============================================

function ColumnHeaders() {
    const headers = [
        { x: 50, label: 'SOURCE SYSTEMS' },
        { x: 280, label: 'INTEGRATION' },
        { x: 510, label: 'SEMANTIC LAYER' },
        { x: 740, label: 'ONTOLOGY' },
    ];

    return (
        <g>
            {headers.map((header) => (
                <text
                    key={header.label}
                    x={header.x}
                    y={25}
                    fontSize="11"
                    fontWeight="600"
                    fill="#ABB3BF"
                    letterSpacing="0.5"
                >
                    {header.label}
                </text>
            ))}
        </g>
    );
}

// ============================================
// LEGEND COMPONENT
// ============================================

function Legend() {
    const items = [
        { color: '#2D72D2', label: 'Source Systems' },
        { color: '#238551', label: 'Integration Layer' },
        { color: '#C87619', label: 'Semantic Objects' },
        { color: '#9D3F9D', label: 'Ontology Objects' },
    ];

    return (
        <div className="absolute bottom-4 right-4 bg-[#2F343C] border border-[#404854] p-4 min-w-[180px]">
            <div className="text-xs font-semibold text-[#ABB3BF] tracking-wider mb-3">LEGEND</div>
            {items.map((item) => (
                <div key={item.label} className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4" style={{ backgroundColor: item.color }} />
                    <span className="text-xs text-[#F6F7F9]">{item.label}</span>
                </div>
            ))}
            <div className="mt-3 pt-3 border-t border-[#404854]">
                <div className="flex items-center gap-2 mb-1">
                    <div className="flex gap-1">
                        <div className="w-1 h-1 rounded-full bg-white animate-pulse" />
                        <div className="w-1 h-1 rounded-full bg-white animate-pulse" style={{ animationDelay: '0.3s' }} />
                        <div className="w-1 h-1 rounded-full bg-white animate-pulse" style={{ animationDelay: '0.6s' }} />
                    </div>
                    <span className="text-xs text-[#F6F7F9]">Data Flow</span>
                </div>
            </div>
        </div>
    );
}

// ============================================
// NODE DETAIL POPUP
// ============================================

function NodeDetailPopup({ nodeId, node, onClose }: { nodeId: string; node: Node; onClose: () => void }) {
    const meta = nodeMetadata[nodeId];
    if (!meta) return null;

    const color = getNodeColor(node.type);

    return (
        <div
            className="absolute bg-[#2F343C] border-2 p-4 shadow-xl z-50 min-w-[280px]"
            style={{
                left: node.x + node.width + 20,
                top: node.y,
                borderColor: color,
            }}
        >
            <button
                onClick={onClose}
                className="absolute top-2 right-2 text-[#ABB3BF] hover:text-white text-lg"
            >
                ×
            </button>

            <div className="flex items-center gap-2 mb-3 pr-6">
                <span className="text-lg">{node.icon}</span>
                <div>
                    <div className="font-semibold text-[#F6F7F9]">{meta.fullName}</div>
                    <div className="text-xs" style={{ color: color }}>v{meta.version}</div>
                </div>
            </div>

            <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-[#404854]">
                    <span className="text-[#ABB3BF]">Data Type</span>
                    <span className="text-[#F6F7F9] font-medium">{meta.dataType}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#404854]">
                    <span className="text-[#ABB3BF]">Record Count</span>
                    <span className="text-[#4C90F0] font-medium">{meta.recordCount}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#404854]">
                    <span className="text-[#ABB3BF]">Last Update</span>
                    <span className="text-[#72CA9B] font-medium">{meta.lastUpdate}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#404854]">
                    <span className="text-[#ABB3BF]">Last Backup</span>
                    <span className="text-[#F6F7F9] font-medium">{meta.lastBackup}</span>
                </div>
                <div className="flex justify-between py-1">
                    <span className="text-[#ABB3BF]">Owner</span>
                    <span className="text-[#F6F7F9] font-medium">{meta.owner}</span>
                </div>
            </div>
        </div>
    );
}

// ============================================
// STATUS BAR
// ============================================

function StatusBar() {
    return (
        <div className="flex items-center gap-8 px-6 py-3 bg-[#252A31] border-t border-[#404854] text-xs">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#238551] animate-pulse" />
                <span className="text-[#ABB3BF]">Last sync:</span>
                <span className="text-[#F6F7F9] font-medium">2 minutes ago</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-[#ABB3BF]">Transactions:</span>
                <span className="text-[#72CA9B] font-medium">847</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-[#ABB3BF]">Success Rate:</span>
                <span className="text-[#72CA9B] font-medium">99.7%</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-[#ABB3BF]">Pipelines Active:</span>
                <span className="text-[#F6F7F9] font-medium">16 / 16</span>
            </div>
        </div>
    );
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function DataLineageGraph() {
    const [selectedNode, setSelectedNode] = useState<string | null>(null);

    return (
        <div className="flex flex-col h-full bg-[#1C2127] text-[#F6F7F9]">
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-[#404854] bg-[#252A31]">
                <h1 className="text-xl font-semibold">Data Mapping & Lineage</h1>
                <div className="flex gap-3">
                    <button className="px-4 py-2 text-sm bg-[#383E47] border border-[#404854] hover:bg-[#404854] transition-colors">
                        🔍 Find
                    </button>
                    <button className="px-4 py-2 text-sm bg-[#383E47] border border-[#404854] hover:bg-[#404854] transition-colors">
                        📐 Layout
                    </button>
                    <button className="px-4 py-2 text-sm bg-[#2D72D2] hover:bg-[#215DB0] transition-colors">
                        ▶️ Run Pipeline
                    </button>
                </div>
            </div>

            {/* Main Graph Area */}
            <div className="flex-1 relative overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 1000 550" preserveAspectRatio="xMidYMid meet">
                    {/* Background grid pattern */}
                    <defs>
                        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#2F343C" strokeWidth="0.5" opacity="0.3" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />

                    {/* Column Headers */}
                    <ColumnHeaders />

                    {/* Connections (render first so they're behind nodes) */}
                    <g>
                        {connections.map((conn) => (
                            <ConnectionLine key={conn.id} connection={conn} />
                        ))}
                    </g>

                    {/* Nodes */}
                    <g>
                        {nodes.map((node) => (
                            <NodeBox
                                key={node.id}
                                node={node}
                                isSelected={selectedNode === node.id}
                                onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
                            />
                        ))}
                    </g>
                </svg>

                {/* Legend overlay */}
                <Legend />

                {/* Node Detail Popup */}
                {selectedNode && (
                    <NodeDetailPopup
                        nodeId={selectedNode}
                        node={nodes.find(n => n.id === selectedNode)!}
                        onClose={() => setSelectedNode(null)}
                    />
                )}
            </div>

            {/* Status Bar */}
            <StatusBar />
        </div>
    );
}

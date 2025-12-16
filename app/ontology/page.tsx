'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { DomainSidebar } from '@/components/ontology/DomainSidebar';
import { ObjectTypeCard } from '@/components/ontology/ObjectTypeCard';
import { OBJECT_TYPE_METADATA } from '@/types/ontology-metadata';

export default function OntologyPage() {
    const [selectedObjectType, setSelectedObjectType] = useState<string | null>(null);
    const [highlightedObjectType, setHighlightedObjectType] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const handleObjectTypeHighlight = (objectType: string) => {
        setHighlightedObjectType(objectType);
        // Auto-clear highlight after 2 seconds
        setTimeout(() => {
            setHighlightedObjectType(null);
        }, 2000);
    };

    const objectTypes = Object.entries(OBJECT_TYPE_METADATA);

    const filteredObjectTypes = objectTypes.filter(([name, metadata]) => {
        const matchesSearch = searchQuery === '' ||
            metadata.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
    });

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Domain Sidebar */}
            <DomainSidebar onObjectTypeSelect={handleObjectTypeHighlight} />

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-4xl font-semibold text-[#F6F7F9] mb-2">
                                Ontology Explorer
                            </h1>
                            <p className="text-[#ABB3BF]">
                                Browse and explore the TMHNA semantic data foundation
                            </p>
                        </div>

                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#8F99A8]" />
                            <input
                                type="text"
                                placeholder="Search object types..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 pr-4 py-2 bg-[#252A31] border border-[#404854] text-[#F6F7F9] placeholder-[#8F99A8] focus:border-[#4C90F0] focus:outline-none w-80"
                            />
                        </div>
                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-4 gap-4">
                        <div className="bg-[#2F343C] border border-[#404854] p-4">
                            <div className="text-2xl font-semibold text-[#4C90F0] mb-1">
                                14
                            </div>
                            <div className="text-sm text-[#ABB3BF]">Object Types</div>
                        </div>
                        <div className="bg-[#2F343C] border border-[#404854] p-4">
                            <div className="text-2xl font-semibold text-[#4C90F0] mb-1">
                                6.5M
                            </div>
                            <div className="text-sm text-[#ABB3BF]">Total Objects</div>
                        </div>
                        <div className="bg-[#2F343C] border border-[#404854] p-4">
                            <div className="text-2xl font-semibold text-[#4C90F0] mb-1">
                                17
                            </div>
                            <div className="text-sm text-[#ABB3BF]">Relationships</div>
                        </div>
                        <div className="bg-[#2F343C] border border-[#404854] p-4">
                            <div className="text-2xl font-semibold text-[#4C90F0] mb-1">
                                12
                            </div>
                            <div className="text-sm text-[#ABB3BF]">Data Sources</div>
                        </div>
                    </div>
                </div>

                {/* Object Type Cards Grid */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-[#F6F7F9]">
                            Object Types
                        </h2>
                        <div className="text-sm text-[#ABB3BF]">
                            Showing {filteredObjectTypes.length} of {objectTypes.length} types
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filteredObjectTypes.map(([name, metadata]) => (
                            <ObjectTypeCard
                                key={name}
                                name={name}
                                displayName={metadata.displayName}
                                icon={metadata.icon}
                                instanceCount={metadata.instanceCount}
                                domain={metadata.domain}
                                isHighlighted={highlightedObjectType === metadata.displayName || highlightedObjectType === name}
                                onClick={() => setSelectedObjectType(name)}
                            />
                        ))}
                    </div>

                    {filteredObjectTypes.length === 0 && (
                        <div className="text-center py-12 text-[#8F99A8]">
                            No object types found matching "{searchQuery}"
                        </div>
                    )}
                </div>

                {/* Relationship Summary */}
                <div className="mt-8">
                    <h2 className="text-xl font-semibold text-[#F6F7F9] mb-4">
                        Key Relationships
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="bg-[#2F343C] border border-[#404854] p-4">
                            <div className="flex items-center gap-2 text-sm text-[#F6F7F9] mb-1">
                                <span className="font-medium">Plant</span>
                                <span className="text-[#8F99A8]">→</span>
                                <span className="font-medium">Forklift</span>
                            </div>
                            <div className="text-xs text-[#ABB3BF]">
                                Manufacturing relationship (1:many)
                            </div>
                        </div>
                        <div className="bg-[#2F343C] border border-[#404854] p-4">
                            <div className="flex items-center gap-2 text-sm text-[#F6F7F9] mb-1">
                                <span className="font-medium">Forklift</span>
                                <span className="text-[#8F99A8]">↔</span>
                                <span className="font-medium">Equipment</span>
                            </div>
                            <div className="text-xs text-[#ABB3BF]">
                                Telematics tracking (1:1)
                            </div>
                        </div>
                        <div className="bg-[#2F343C] border border-[#404854] p-4">
                            <div className="flex items-center gap-2 text-sm text-[#F6F7F9] mb-1">
                                <span className="font-medium">Customer</span>
                                <span className="text-[#8F99A8]">→</span>
                                <span className="font-medium">ServiceOrder</span>
                            </div>
                            <div className="text-xs text-[#ABB3BF]">
                                Service relationship (1:many)
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

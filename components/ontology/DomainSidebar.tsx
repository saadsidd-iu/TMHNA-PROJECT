'use client';

import { useState } from 'react';
import { Search, ChevronRight, ChevronDown } from 'lucide-react';
import { ONTOLOGY_DOMAINS } from '@/types/ontology-metadata';

interface DomainSidebarProps {
    onObjectTypeSelect?: (objectType: string) => void;
}

export function DomainSidebar({ onObjectTypeSelect }: DomainSidebarProps) {
    const [expandedDomains, setExpandedDomains] = useState<Set<string>>(
        new Set(["TMHNA Enterprise"]) // Default expand first domain
    );

    const toggleDomain = (domain: string) => {
        const newExpanded = new Set(expandedDomains);
        if (newExpanded.has(domain)) {
            newExpanded.delete(domain);
        } else {
            newExpanded.add(domain);
        }
        setExpandedDomains(newExpanded);
    };

    return (
        <div className="w-64 bg-[#2F343C] border-r border-[#404854] flex flex-col h-screen">
            <div className="p-4 border-b border-[#404854] flex-shrink-0">
                <h3 className="text-sm font-semibold text-[#F6F7F9] uppercase tracking-wide mb-3">
                    Domains
                </h3>
            </div>

            <div className="p-2 flex-1 overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#404854 #2F343C' }}>
                {Object.entries(ONTOLOGY_DOMAINS).map(([domain, objectTypes]) => {
                    const isExpanded = expandedDomains.has(domain);
                    return (
                        <div key={domain} className="mb-1">
                            <button
                                onClick={() => toggleDomain(domain)}
                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#F6F7F9] hover:bg-[#252A31] transition-colors"
                            >
                                {isExpanded ? (
                                    <ChevronDown className="w-4 h-4 flex-shrink-0" />
                                ) : (
                                    <ChevronRight className="w-4 h-4 flex-shrink-0" />
                                )}
                                <span className="font-medium">{domain}</span>
                                <span className="ml-auto text-xs text-[#ABB3BF]">
                                    {objectTypes.length}
                                </span>
                            </button>

                            {isExpanded && (
                                <div className="ml-6 mt-1 space-y-1">
                                    {objectTypes.map((objectType) => (
                                        <button
                                            key={objectType}
                                            onClick={() => onObjectTypeSelect?.(objectType)}
                                            className="w-full text-left px-3 py-1.5 text-sm text-[#ABB3BF] hover:text-[#F6F7F9] hover:bg-[#252A31] transition-colors"
                                        >
                                            {objectType.replace('TMHNA_', '')}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

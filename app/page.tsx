'use client';

import { Factory, TrendingUp, Store, Building2, Package, Wrench } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamic import for Leaflet map (client-side only)
const FacilityMap = dynamic(() => import('@/components/maps/FacilityMap'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-full text-[#ABB3BF]">Loading map...</div>
});

export default function Home() {
  const kpiData = [
    { title: 'OTIF (YTD)', value: '94%', change: '↑ 5pts vs LY', icon: TrendingUp, positive: true },
    { title: 'Monthly Production', value: '6,200', unit: 'units', change: '↑ 8% vs target', icon: Factory, positive: true },
    { title: 'Active Dealers', value: '312', change: '73% active rate', icon: Store, positive: null },
    { title: 'Manufacturing Plants', value: '5', change: '2 countries', icon: Building2, positive: null },
    { title: 'Distribution Centers', value: '2', change: '3.2M SKUs', icon: Package, positive: null },
    { title: 'Open Service Orders', value: '12.4K', change: '78% FTF rate', icon: Wrench, positive: true },
  ];

  return (
    <div className="min-h-screen p-8 space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-semibold text-[#F6F7F9] mb-2">TMHNA Foundry</h1>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div
              key={index}
              className="bg-[#2F343C] border border-[#404854] p-5"
              style={{ borderRadius: 0, boxShadow: '0 1px 1px rgba(16, 22, 26, 0.2), 0 2px 6px rgba(16, 22, 26, 0.2)' }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#ABB3BF] uppercase tracking-wide">{kpi.title}</span>
                <Icon className="w-4 h-4 text-[#2D72D2]" />
              </div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-2xl font-semibold text-[#F6F7F9]">{kpi.value}</span>
                {kpi.unit && <span className="text-sm text-[#ABB3BF]">{kpi.unit}</span>}
              </div>
              <div className={`text-sm font-medium ${kpi.positive === true ? 'text-[#238551]' : kpi.positive === false ? 'text-[#CD4246]' : 'text-[#ABB3BF]'}`}>
                {kpi.change}
              </div>
            </div>
          );
        })}
      </div>

      {/* Map and Facilities */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-[#2F343C] border border-[#404854] overflow-hidden h-[500px]">
          <FacilityMap />
        </div>

        <div className="bg-[#2F343C] border border-[#404854] p-5 h-[500px] flex flex-col">
          <h3 className="text-lg font-semibold text-[#F6F7F9] mb-4">Facilities (7)</h3>
          <div className="overflow-y-auto flex-1 space-y-3 pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#404854 #2F343C' }}>
            {[
              { name: 'Columbus Manufacturing', location: 'Columbus, IN', type: 'plant', brand: 'TMH', capacity: '2,500 u/mo', util: '92%' },
              { name: 'Greene Manufacturing', location: 'Greene, NY', type: 'plant', brand: 'Raymond', capacity: '1,800 u/mo', util: '89%' },
              { name: 'Muscatine Manufacturing', location: 'Muscatine, IA', type: 'plant', brand: 'Raymond', capacity: '1,200 u/mo', util: '85%' },
              { name: 'East Chicago Manufacturing', location: 'East Chicago, IN', type: 'plant', brand: 'THD', capacity: '950 u/mo', util: '88%' },
              { name: 'Brantford Manufacturing', location: 'Brantford, ON', type: 'plant', brand: 'THD', capacity: '800 u/mo', util: '91%' },
              { name: 'Syracuse DC', location: 'Syracuse, NY', type: 'dc', skus: '1.8M SKUs', otif: '94%' },
              { name: 'Columbus DC', location: 'Columbus, IN', type: 'dc', skus: '1.4M SKUs', otif: '96%' },
            ].map((facility, idx) => (
              <div key={idx} className="p-3 bg-[#252A31] border border-[#404854]">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-semibold text-sm text-[#F6F7F9]">{facility.name}</div>
                    <div className="text-xs text-[#ABB3BF]">{facility.location}</div>
                  </div>
                  {facility.type === 'plant' ? (
                    <Factory className="w-4 h-4 text-[#2D72D2]" />
                  ) : (
                    <Package className="w-4 h-4 text-[#4C90F0]" />
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="text-[#ABB3BF]">{facility.type === 'plant' ? 'Capacity' : 'SKUs'}</div>
                    <div className="text-[#F6F7F9]">{facility.type === 'plant' ? facility.capacity : facility.skus}</div>
                  </div>
                  <div>
                    <div className="text-[#ABB3BF]">{facility.type === 'plant' ? 'Utilization' : 'OTIF'}</div>
                    <div className="text-[#F6F7F9]">{facility.type === 'plant' ? facility.util : facility.otif}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alerts and Data Flows */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#2F343C] border border-[#404854] p-5 flex flex-col" style={{ maxHeight: '280px' }}>
          <h3 className="text-lg font-semibold text-[#F6F7F9] mb-4 flex-shrink-0">Active Alerts (12)</h3>
          <div className="space-y-1.5 overflow-y-auto flex-1 pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#404854 #2F343C' }}>
            <div className="py-1.5 px-2 bg-[#C87619]/10 border-l-2 border-[#C87619]">
              <div className="text-xs font-medium text-[#C87619]">⚠ Low Inventory: Hydraulic Pumps</div>
              <div className="text-xs text-[#ABB3BF]">Syracuse DC - 18 days supply</div>
            </div>
            <div className="py-1.5 px-2 bg-[#C87619]/10 border-l-2 border-[#C87619]">
              <div className="text-xs font-medium text-[#C87619]">⚠ Supplier Delay: ABC Steel</div>
              <div className="text-xs text-[#ABB3BF]">Columbus Plant - 3 days behind schedule</div>
            </div>
            <div className="py-1.5 px-2 bg-[#CD4246]/10 border-l-2 border-[#CD4246]">
              <div className="text-xs font-medium text-[#CD4246]">🔴 Equipment Down: Line 3</div>
              <div className="text-xs text-[#ABB3BF]">Greene Plant - Maintenance in progress</div>
            </div>
            <div className="py-1.5 px-2 bg-[#C87619]/10 border-l-2 border-[#C87619]">
              <div className="text-xs font-medium text-[#C87619]">⚠ Quality Hold: Batch #4521</div>
              <div className="text-xs text-[#ABB3BF]">Muscatine Plant - Pending inspection</div>
            </div>
            <div className="py-1.5 px-2 bg-[#CD4246]/10 border-l-2 border-[#CD4246]">
              <div className="text-xs font-medium text-[#CD4246]">🔴 Safety Incident: Near Miss</div>
              <div className="text-xs text-[#ABB3BF]">East Chicago - Investigation required</div>
            </div>
            <div className="py-1.5 px-2 bg-[#C87619]/10 border-l-2 border-[#C87619]">
              <div className="text-xs font-medium text-[#C87619]">⚠ Backlog Alert: Service Orders</div>
              <div className="text-xs text-[#ABB3BF]">312 orders pending &gt; 48 hours</div>
            </div>
            <div className="py-1.5 px-2 bg-[#C87619]/10 border-l-2 border-[#C87619]">
              <div className="text-xs font-medium text-[#C87619]">⚠ Capacity Warning: Line 7</div>
              <div className="text-xs text-[#ABB3BF]">Columbus Plant - 97% utilization</div>
            </div>
            <div className="py-1.5 px-2 bg-[#238551]/10 border-l-2 border-[#238551]">
              <div className="text-xs font-medium text-[#238551]">✓ Resolved: Forklift FL-2847</div>
              <div className="text-xs text-[#ABB3BF]">Telematics reconnected - 5 min ago</div>
            </div>
            <div className="py-1.5 px-2 bg-[#C87619]/10 border-l-2 border-[#C87619]">
              <div className="text-xs font-medium text-[#C87619]">⚠ Warranty Claim Spike</div>
              <div className="text-xs text-[#ABB3BF]">Model X-200 - 23 claims this week</div>
            </div>
            <div className="py-1.5 px-2 bg-[#CD4246]/10 border-l-2 border-[#CD4246]">
              <div className="text-xs font-medium text-[#CD4246]">🔴 Data Sync Failed: JD Edwards</div>
              <div className="text-xs text-[#ABB3BF]">Retry scheduled in 15 min</div>
            </div>
            <div className="py-1.5 px-2 bg-[#C87619]/10 border-l-2 border-[#C87619]">
              <div className="text-xs font-medium text-[#C87619]">⚠ Parts Shortage: Mast Assembly</div>
              <div className="text-xs text-[#ABB3BF]">Brantford Plant - 7 days supply</div>
            </div>
            <div className="py-1.5 px-2 bg-[#C87619]/10 border-l-2 border-[#C87619]">
              <div className="text-xs font-medium text-[#C87619]">⚠ Dealer Inventory Low</div>
              <div className="text-xs text-[#ABB3BF]">Region: Northeast - 15 dealers affected</div>
            </div>
          </div>
        </div>

        <div className="bg-[#2F343C] border border-[#404854] p-5 flex flex-col" style={{ maxHeight: '280px' }}>
          <h3 className="text-lg font-semibold text-[#F6F7F9] mb-4 flex-shrink-0">Live Data Flows</h3>
          <div className="space-y-2 overflow-y-auto flex-1 pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#404854 #2F343C' }}>
            {[
              { id: 'sap', name: 'SAP ECC Pipeline', steps: ['SAP ECC', 'ETL', 'Snowflake', 'Ontology'], color: '#2D72D2' },
              { id: 'tel', name: 'Telematics Stream', steps: ['Telematics', 'Kafka', 'Platform', 'IoT Obj'], color: '#238551' },
              { id: 'jde', name: 'JD Edwards Sync', steps: ['JD Edwards', 'API', 'Snowflake', 'Finance'], color: '#C87619' },
              { id: 'fac', name: 'Factory IoT Feed', steps: ['Factory', 'Flink', 'Enriched', 'Ontology'], color: '#9D3F9D' },
            ].map((flow, flowIdx) => (
              <div
                key={flow.id}
                className="py-2 px-3 border-l-2"
                style={{
                  backgroundColor: `${flow.color}10`,
                  borderLeftColor: flow.color,
                }}
              >
                <div className="text-xs font-medium mb-2" style={{ color: flow.color }}>{flow.name}</div>
                <div className="relative h-6 flex items-center">
                  {/* Connection line */}
                  <div
                    className="absolute left-[24px] right-[24px] top-1/2 h-0.5 -translate-y-1/2"
                    style={{ backgroundColor: flow.color, opacity: 0.3 }}
                  />

                  {/* Animated flowing segment with gradient */}
                  <div
                    className="absolute h-0.5 w-10 -translate-y-1/2 top-1/2 rounded-full"
                    style={{
                      background: `linear-gradient(90deg, transparent 0%, #FFFFFF 40%, #FFFFFF 60%, transparent 100%)`,
                      animation: `flowMove${flowIdx} ${10 + flowIdx * 0.5}s ease-in-out infinite`,
                      boxShadow: '0 0 4px rgba(255,255,255,0.4)',
                    }}
                  />

                  {/* Step nodes */}
                  <div className="relative flex justify-between w-full">
                    {flow.steps.map((step) => (
                      <div key={step} className="flex flex-col items-center w-12">
                        <div
                          className="w-2 h-2 rounded-full z-10 node-pulse"
                          style={{ backgroundColor: flow.color }}
                        />
                        <span className="text-[8px] text-[#ABB3BF] mt-1 text-center">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <style jsx>{`
            @keyframes flowMove0 {
              0%, 5% { left: 0%; }
              28%, 34% { left: 33.33%; }
              56%, 62% { left: 66.66%; }
              90%, 95% { left: calc(100% - 40px); }
              100% { left: 0%; }
            }
            @keyframes flowMove1 {
              0%, 5% { left: 0%; }
              28%, 34% { left: 33.33%; }
              56%, 62% { left: 66.66%; }
              90%, 95% { left: calc(100% - 40px); }
              100% { left: 0%; }
            }
            @keyframes flowMove2 {
              0%, 5% { left: 0%; }
              28%, 34% { left: 33.33%; }
              56%, 62% { left: 66.66%; }
              90%, 95% { left: calc(100% - 40px); }
              100% { left: 0%; }
            }
            @keyframes flowMove3 {
              0%, 5% { left: 0%; }
              28%, 34% { left: 33.33%; }
              56%, 62% { left: 66.66%; }
              90%, 95% { left: calc(100% - 40px); }
              100% { left: 0%; }
            }
            .node-pulse {
              animation: nodePulse 2s ease-in-out infinite;
            }
            @keyframes nodePulse {
              0%, 100% { transform: scale(1); opacity: 1; }
              50% { transform: scale(1.2); opacity: 0.85; }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}

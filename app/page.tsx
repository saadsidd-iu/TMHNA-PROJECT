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
        <h1 className="text-4xl font-semibold text-[#F6F7F9] mb-2">Supply Chain Control Tower</h1>
        <p className="text-[#ABB3BF]">Real-time visibility across TMHNA operations</p>
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

        <div className="bg-[#2F343C] border border-[#404854] p-5 overflow-auto">
          <h3 className="text-lg font-semibold text-[#F6F7F9] mb-4">Facilities (7)</h3>
          <div className="space-y-3">
            {[
              { name: 'Columbus Manufacturing', location: 'Columbus, IN', type: 'plant', capacity: '2,500 u/mo', util: '92%' },
              { name: 'Greene Manufacturing', location: 'Greene, NY', type: 'plant', capacity: '1,800 u/mo', util: '89%' },
              { name: 'Syracuse DC', location: 'Syracuse, NY', type: 'dc', skus: '1.8M SKUs', otif: '94%' },
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
        <div className="bg-[#2F343C] border border-[#404854] p-5">
          <h3 className="text-lg font-semibold text-[#F6F7F9] mb-4">Active Alerts (12)</h3>
          <div className="space-y-2">
            <div className="p-2 bg-[#C87619]/10 border-l-2 border-[#C87619]">
              <div className="text-sm font-medium text-[#C87619]">⚠ Low Inventory: Hydraulic Pumps</div>
              <div className="text-xs text-[#ABB3BF]">Syracuse DC - 18 days supply</div>
            </div>
            <div className="p-2 bg-[#C87619]/10 border-l-2 border-[#C87619]">
              <div className="text-sm font-medium text-[#C87619]">⚠ Supplier Delay: ABC Steel</div>
              <div className="text-xs text-[#ABB3BF]">Columbus Plant - 3 days behind schedule</div>
            </div>
            <div className="p-2 bg-[#CD4246]/10 border-l-2 border-[#CD4246]">
              <div className="text-sm font-medium text-[#CD4246]">🔴 Equipment Down: Line 3</div>
              <div className="text-xs text-[#ABB3BF]">Greene Plant - Maintenance in progress</div>
            </div>
          </div>
        </div>

        <div className="bg-[#2F343C] border border-[#404854] p-5">
          <h3 className="text-lg font-semibold text-[#F6F7F9] mb-4">Live Data Flows</h3>
          <div className="space-y-3">
            {[
              { source: 'SAP ECC → Snowflake', status: 'Last sync: 2 min ago' },
              { source: 'Telematics → Platform', status: 'Real-time stream active' },
              { source: 'JD Edwards → Snowflake', status: 'Last sync: 5 min ago' },
              { source: 'Factory Floor → Ontology', status: 'Streaming updates' },
            ].map((flow, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#238551] rounded-full animate-pulse"></div>
                <div>
                  <div className="text-sm text-[#F6F7F9]">{flow.source}</div>
                  <div className="text-xs text-[#ABB3BF]">{flow.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

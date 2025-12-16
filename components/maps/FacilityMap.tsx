'use client';

import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Facility {
    id: string;
    name: string;
    type: 'plant' | 'dc';
    lat: number;
    lng: number;
    location: string;
    throughput: number;
}

const facilities: Facility[] = [
    { id: 'PLT-001', name: 'Columbus Manufacturing', type: 'plant', lat: 39.2014, lng: -85.9213, location: 'Columbus, IN', throughput: 92 },
    { id: 'PLT-002', name: 'Greene Manufacturing', type: 'plant', lat: 42.3289, lng: -75.7713, location: 'Greene, NY', throughput: 89 },
    { id: 'PLT-003', name: 'Muscatine Manufacturing', type: 'plant', lat: 41.4242, lng: -91.0432, location: 'Muscatine, IA', throughput: 85 },
    { id: 'PLT-004', name: 'East Chicago Heavy Duty', type: 'plant', lat: 41.6392, lng: -87.4548, location: 'East Chicago, IN', throughput: 87 },
    { id: 'PLT-005', name: 'Brantford Manufacturing', type: 'plant', lat: 43.1394, lng: -80.2644, location: 'Brantford, ON', throughput: 78 },
    { id: 'DC-001', name: 'Syracuse DC', type: 'dc', lat: 43.0481, lng: -76.1474, location: 'Syracuse, NY', throughput: 94 },
    { id: 'DC-002', name: 'Columbus DC', type: 'dc', lat: 39.3014, lng: -85.8213, location: 'Columbus, IN', throughput: 96 },
];

function LiveClock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <span style={{ fontFamily: 'monospace', color: '#4C90F0' }}>
            {time.toLocaleTimeString('en-US', { hour12: false })}
        </span>
    );
}

function FacilityTooltip({ facility }: { facility: Facility }) {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{
            padding: '8px 12px',
            minWidth: '180px',
            background: '#2F343C',
            border: '1px solid #404854',
            borderRadius: 0,
        }}>
            <div style={{ fontWeight: 600, color: '#F6F7F9', marginBottom: '8px', fontSize: '14px' }}>
                {facility.name}
            </div>
            <div style={{ fontSize: '12px', color: '#ABB3BF', marginBottom: '4px' }}>
                📍 {facility.location}
            </div>
            <div style={{ fontSize: '12px', color: '#ABB3BF', marginBottom: '4px' }}>
                Throughput: <span style={{ color: facility.throughput >= 90 ? '#72CA9B' : facility.throughput >= 80 ? '#FBB360' : '#FF7373', fontWeight: 600 }}>{facility.throughput}%</span>
            </div>
            <div style={{ fontSize: '12px', color: '#ABB3BF', borderTop: '1px solid #404854', paddingTop: '6px', marginTop: '6px' }}>
                🕐 <span style={{ fontFamily: 'monospace', color: '#4C90F0' }}>
                    {time.toLocaleTimeString('en-US', { hour12: false })}
                </span>
            </div>
        </div>
    );
}

export default function FacilityMap() {
    const mapRef = useRef<any>(null);



    return (
        <MapContainer
            center={[39.8283, -98.5795]}
            zoom={4}
            style={{ height: '100%', width: '100%', borderRadius: 0 }}
            ref={mapRef}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | &copy; <a href="https://carto.com/">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />

            {facilities.map((facility) => (
                <CircleMarker
                    key={facility.id}
                    center={[facility.lat, facility.lng]}
                    radius={8}
                    pathOptions={{
                        fillColor: '#FFFFFF',
                        color: '#DC143C',
                        weight: 1,
                        opacity: 1,
                        fillOpacity: 0.7,
                    }}
                >
                    <Tooltip
                        direction="top"
                        offset={[0, -10]}
                        opacity={1}
                        className="facility-tooltip"
                    >
                        <FacilityTooltip facility={facility} />
                    </Tooltip>
                </CircleMarker>
            ))}

            <style jsx global>{`
                .facility-tooltip {
                    background: transparent !important;
                    border: none !important;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4) !important;
                    padding: 0 !important;
                }
                .facility-tooltip::before {
                    display: none !important;
                }
                .leaflet-tooltip-top::before {
                    display: none !important;
                }
            `}</style>
        </MapContainer>
    );
}

'use client';

import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
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
    brand?: string;
    capacity?: string;
    utilization?: string;
    skus?: string;
    otif?: string;
}

const facilities: Facility[] = [
    { id: 'PLT-001', name: 'Columbus Manufacturing', type: 'plant', lat: 39.2014, lng: -85.9213, brand: 'TMH', capacity: '2,500 u/mo', utilization: '92%' },
    { id: 'PLT-002', name: 'Greene Manufacturing', type: 'plant', lat: 42.3289, lng: -75.7713, brand: 'Raymond', capacity: '1,800 u/mo', utilization: '89%' },
    { id: 'PLT-003', name: 'Muscatine Manufacturing', type: 'plant', lat: 41.4242, lng: -91.0432, brand: 'Raymond', capacity: '1,200 u/mo', utilization: '85%' },
    { id: 'PLT-004', name: 'East Chicago Heavy Duty', type: 'plant', lat: 41.6392, lng: -87.4548, brand: 'TMH', capacity: '400 u/mo', utilization: '87%' },
    { id: 'PLT-005', name: 'Brantford Manufacturing', type: 'plant', lat: 43.1394, lng: -80.2644, brand: 'Konstant', capacity: '100 u/mo', utilization: '78%' },
    { id: 'DC-001', name: 'Syracuse DC', type: 'dc', lat: 43.0481, lng: -76.1474, skus: '1.8M', otif: '94%' },
    { id: 'DC-002', name: 'Columbus DC', type: 'dc', lat: 39.2014, lng: -85.9213, skus: '1.4M', otif: '96%' },
];

const getBrandColor = (brand?: string) => {
    switch (brand?.toLowerCase()) {
        case 'tmh': return '#EB0A1E';
        case 'raymond': return '#00843D';
        case 'konstant': return '#0033A0';
        default: return '#4C90F0';
    }
};

export default function FacilityMap() {
    const mapRef = useRef<any>(null);

    useEffect(() => {
        // Ensure Leaflet CSS is loaded
        if (typeof window !== 'undefined') {
            import('leaflet/dist/leaflet.css');
        }
    }, []);

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
                    radius={facility.type === 'plant' ? 12 : 8}
                    pathOptions={{
                        fillColor: facility.type === 'plant' ? getBrandColor(facility.brand) : '#4C90F0',
                        color: facility.type === 'plant' ? getBrandColor(facility.brand) : '#4C90F0',
                        weight: 2,
                        opacity: 1,
                        fillOpacity: 0.7,
                    }}
                >
                    <Popup>
                        <div style={{ color: '#1C2127', padding: '4px' }}>
                            <div style={{ fontWeight: 600, marginBottom: '4px' }}>{facility.name}</div>
                            {facility.type === 'plant' ? (
                                <div style={{ fontSize: '12px' }}>
                                    <div>Capacity: {facility.capacity}</div>
                                    <div>Utilization: {facility.utilization}</div>
                                    <div>Brand: {facility.brand}</div>
                                </div>
                            ) : (
                                <div style={{ fontSize: '12px' }}>
                                    <div>SKUs: {facility.skus}</div>
                                    <div>OTIF: {facility.otif}</div>
                                </div>
                            )}
                        </div>
                    </Popup>
                </CircleMarker>
            ))}
        </MapContainer>
    );
}

// Sample factory floor data for Columbus plant
export const factoryFloorData = {
    plant_id: "PLT-001",
    plant_name: "Columbus Manufacturing",
    timestamp: "2025-12-10T18:30:00Z",
    production_lines: [
        {
            line_id: "LINE-01",
            name: "Main Assembly Line 1",
            units_per_hour: 12,
            status: "Active",
            current_unit_serial: "TMH-2025-048573",
        },
        {
            line_id: "LINE-02",
            name: "Main Assembly Line 2",
            units_per_hour: 10,
            status: "Active",
            current_unit_serial: "TMH-2025-048574",
        },
    ],
    oee: {
        overall: 0.87,
        availability: 0.92,
        performance: 0.95,
        quality: 0.992,
    },
    zones: [
        {
            zone_id: "ZONE-INBOUND",
            name: "Inbound Dock",
            type: "dock",
            trucks: [
                { truck_id: "TRK-001", supplier: "ABC Steel", status: "Unloading", arrival_time: "07:30", contents: "Sheet Metal" },
                { truck_id: "TRK-002", supplier: "XYZ Hydraulics", status: "Waiting", arrival_time: "08:15", contents: "Hydraulic Components" },
            ],
        },
        {
            zone_id: "ZONE-RAW",
            name: "Raw Storage",
            type: "storage",
            inventory_sensors: [
                { sku: "STEEL-001", qty_on_hand: 2400, min: 2000, max: 5000, days_supply: 45 },
                { sku: "STEEL-002", qty_on_hand: 1850, min: 1500, max: 4000, days_supply: 38 },
            ],
        },
        {
            zone_id: "ZONE-FAB",
            name: "Fabrication Area",
            type: "production",
            machines: [
                { machine_id: "FAB-001", status: "Running", current_job: "Frame Cutting", cycle_time_min: 3.2, oee: 0.89 },
                { machine_id: "FAB-002", status: "Running", current_job: "Bracket Formation", cycle_time_min: 2.8, oee: 0.91 },
                { machine_id: "FAB-003", status: "Maintenance", current_job: null, cycle_time_min: 0, oee: 0 },
            ],
        },
        {
            zone_id: "ZONE-WELD",
            name: "Welding Zone",
            type: "production",
            weld_cells: [
                { cell_id: "WELD-001", operator: "J. Smith", unit_serial: "TMH-2025-048571", completion_percent: 0.68 },
                { cell_id: "WELD-002", operator: "M. Johnson", unit_serial: "TMH-2025-048572", completion_percent: 0.42 },
            ],
        },
        {
            zone_id: "ZONE-PAINT",
            name: "Paint Booth",
            type: "production",
            temperature_f: 385,
            current_unit: "TMH-2025-048570",
            cure_time_remaining_min: 18,
        },
        {
            zone_id: "ZONE-ASSEMBLY",
            name: "Assembly Line",
            type: "production",
            workstations: [
                { station_id: "ASM-001", operator: "K. Williams", task: "Motor Installation", cycle_time_min: 4.5, status: "InProgress" },
                { station_id: "ASM-002", operator: "L. Brown", task: "Hydraulic Assembly", cycle_time_min: 3.8, status: "InProgress" },
                { station_id: "ASM-003", operator: "R. Davis", task: "Electrical Wiring", cycle_time_min: 5.2, status: "InProgress" },
            ],
        },
        {
            zone_id: "ZONE-QC",
            name: "Quality Testing",
            type: "quality",
            test_stations: [
                { station_id: "QC-001", unit_serial: "TMH-2025-048569", test_type: "Hydraulic Pressure", result: "Pass" },
                { station_id: "QC-002", unit_serial: "TMH-2025-048568", test_type: "Electrical Systems", result: "Pass" },
            ],
        },
        {
            zone_id: "ZONE-FG",
            name: "Finished Goods",
            type: "storage",
            completed_units: [
                { serial: "TMH-2025-048525", model: "8FGCU25", destination_dealer: "DLR-045", ship_date: "2025-12-11" },
                { serial: "TMH-2025-048526", model: "8FBCU25", destination_dealer: "DLR-067", ship_date: "2025-12-11" },
                { serial: "TMH-2025-048527", model: "8FGCU30", destination_dealer: "DLR-089", ship_date: "2025-12-12" },
            ],
        },
        {
            zone_id: "ZONE-OUTBOUND",
            name: "Outbound Dock",
            type: "dock",
            departing_trucks: [
                { truck_id: "TRK-OUT-001", destination: "Chicago, IL", units_loaded: 6, departure_time: "14:30", eta: "18:45" },
                { truck_id: "TRK-OUT-002", destination: "Indianapolis, IN", units_loaded: 4, departure_time: "15:00", eta: "16:30" },
            ],
        },
    ],
    conveyors: [
        { conveyor_id: "CONV-001", name: "Main Line 1", throughput_units_hour: 12, speed_percent: 0.95, status: "Running" },
        { conveyor_id: "CONV-002", name: "Main Line 2", throughput_units_hour: 10, speed_percent: 0.92, status: "Running" },
    ],
    agvs: [
        { agv_id: "AGV-001", load: "Frame Assembly", origin: "Fabrication", destination: "Welding", eta_min: 3 },
        { agv_id: "AGV-002", load: "Empty", origin: "Paint", destination: "Raw Storage", eta_min: 5 },
        { agv_id: "AGV-003", load: "Hydraulic Kit", origin: "Kanban", destination: "Assembly", eta_min: 2 },
    ],
};

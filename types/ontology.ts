// ============================================================================
// TMHNA Ontology - Object Type Definitions
// ============================================================================

// Brand/Subsidiary Types
export type Brand = "TMH" | "Raymond" | "THD";
export type BrandOrTMHNA = Brand | "TMHNA";

// Re-export from extended types
export * from './ontology-extended';
export * from './relationships';
export * from './actions';
export * from './functions';
export * from './ontology-metadata';

// ============================================================================
// 1. TMHNA_Plant
// ============================================================================

export interface TMHNA_Plant {
    // Primary Key
    plant_id: string;                          // "PLT-001", "PLT-002", etc.

    // Display
    plant_name: string;                        // Title property - "Columbus Manufacturing"

    // Classification
    brand: Brand;
    facility_type: "Manufacturing Plant" | "Distribution Center";

    // Location
    city: string;
    state_province: string;
    country: "USA" | "Canada";
    street_address: string;
    postal_code: string;
    latitude: number;                          // Decimal degrees
    longitude: number;                         // Decimal degrees

    // Capacity & Operations
    square_footage: number;                    // e.g., 1500000
    production_capacity_units_per_month: number;
    current_utilization_percent: number;       // 0.00 to 1.00
    shift_configuration: "1 Shift" | "2 Shifts" | "3 Shifts";
    num_employees: number;
    num_production_lines: number;

    // Current Metrics
    units_produced_mtd: number;                // Month-to-date production
    units_produced_ytd: number;                // Year-to-date production
    oee_percent: number;                       // Overall Equipment Effectiveness (0-100)
    quality_rate_percent: number;              // Right First Time rate (0-100)

    // Inventory Status
    raw_materials_days_supply: number;
    wip_units: number;                         // Work-in-progress
    finished_goods_units: number;

    // Status
    status: "Operational" | "Maintenance" | "Offline";
    last_updated: string;                      // ISO timestamp
}

// ============================================================================
// 2. TMHNA_DistributionCenter
// ============================================================================

export interface TMHNA_DistributionCenter {
    dc_id: string;                             // "DC-001", "DC-002"
    dc_name: string;                           // Title property
    brand: BrandOrTMHNA;                       // TMHNA = serves all brands

    // Location
    city: string;
    state_province: string;
    country: string;
    latitude: number;
    longitude: number;

    // Capacity
    square_footage: number;
    total_sku_count: number;
    storage_locations: number;

    // Operations
    shipments_per_month: number;
    orders_per_day: number;
    on_time_delivery_percent: number;          // 0-100
    order_accuracy_percent: number;            // 0-100

    // Inventory
    total_inventory_value_usd: number;
    inventory_turns_annual: number;
    backorder_count: number;

    // Status
    status: "Operational" | "Maintenance";
    last_updated: string;
}

// ============================================================================
// 3. TMHNA_Dealer
// ============================================================================

export interface TMHNA_Dealer {
    dealer_id: string;                         // "DLR-001" through "DLR-312"
    dealer_name: string;                       // Title property - company name
    dealer_code: string;                       // Short code used in systems

    // Brand Affiliation
    brand: Brand | "Both";
    dealer_type: "Exclusive" | "Multi-line";
    dealer_tier: "Platinum" | "Gold" | "Silver" | "Bronze";

    // Location
    city: string;
    state_province: string;
    country: "USA" | "Canada";
    region: "Northeast" | "Southeast" | "Midwest" | "Southwest" | "West" | "Canada";
    latitude: number;
    longitude: number;

    // Business Metrics
    annual_unit_sales: number;
    annual_revenue_usd: number;
    annual_service_revenue_usd: number;
    market_share_percent: number;              // In their territory
    yoy_growth_percent: number;

    // Service Capabilities
    service_technicians: number;
    mobile_service_trucks: number;
    certified_trainers: number;
    service_bays: number;

    // Performance
    customer_satisfaction_score: number;       // 0.0 to 5.0
    first_time_fix_rate: number;               // 0-100 percent
    avg_response_time_hours: number;

    // Status
    active: boolean;
    contract_expiration_date: string;          // ISO date
    last_updated: string;
}

// ============================================================================
// 4. TMHNA_Forklift
// ============================================================================

export interface TMHNA_Forklift {
    serial_number: string;                     // Primary key - "TMH-2024-001234"
    model_number: string;                      // "8FGCU25", "R45TT", etc.
    model_name: string;                        // Title - "Core IC Pneumatic Forklift"

    // Classification
    brand: Brand;
    product_line: "IC Forklift" | "Electric Forklift" | "Reach Truck" | "Pallet Jack" | "Order Picker" | "Tow Tractor" | "AGV";
    fuel_type: "LPG" | "Diesel" | "Electric" | "Dual Fuel";

    // Specifications
    capacity_lbs: number;                      // 3000, 5000, 8000, etc.
    lift_height_inches: number;
    vehicle_weight_lbs: number;

    // Manufacturing
    manufacture_date: string;                  // ISO date
    manufacturing_plant_id: string;            // Link to Plant
    production_order_id: string;

    // Ownership Chain
    dealer_id: string;                         // Link to Dealer (sold through)
    customer_id: string;                       // Link to Customer (end user)

    // Telematics
    telematics_enabled: boolean;
    telematics_device_id: string | null;
    total_operating_hours: number;

    // Service Status
    warranty_start_date: string;
    warranty_expiration_date: string;
    warranty_type: "Standard" | "Extended" | "Expired";
    last_service_date: string | null;
    next_service_due_date: string | null;
    service_contract_type: "Full Service" | "Parts Only" | "None";

    // Current Status
    status: "In Production" | "In Transit" | "At Dealer" | "Delivered" | "In Service" | "Out of Service" | "Decommissioned";
    current_location_type: "Plant" | "Dealer" | "Customer Site" | "In Transit";

    last_updated: string;
}

// ============================================================================
// 5. TMHNA_Customer
// ============================================================================

export interface TMHNA_Customer {
    customer_id: string;                       // "CUST-00001"
    customer_name: string;                     // Title - company name

    // Classification
    industry: "Warehousing & Logistics" | "Manufacturing" | "Retail" | "Food & Beverage" | "Automotive" | "Pharmaceutical" | "E-commerce" | "Construction" | "Other";
    company_size: "Enterprise" | "Mid-Market" | "Small Business";

    // Location
    city: string;
    state_province: string;
    country: string;

    // Relationship
    primary_dealer_id: string;                 // Link to Dealer
    account_manager: string;
    relationship_start_date: string;

    // Fleet Information
    fleet_size: number;                        // Total units owned
    fleet_brands: Brand[];                     // ["TMH", "Raymond"]
    annual_operating_hours: number;

    // Contract & Service
    contract_type: "Full Service" | "Parts Only" | "On-Call" | "None";
    contract_value_annual_usd: number;
    contract_expiration_date: string;

    // Spend & Revenue
    lifetime_equipment_purchases_usd: number;
    annual_service_spend_usd: number;
    annual_parts_spend_usd: number;

    // Satisfaction
    nps_score: number;                         // -100 to 100
    last_survey_date: string | null;

    last_updated: string;
}

// ============================================================================
// 6. TMHNA_ServiceOrder
// ============================================================================

export interface TMHNA_ServiceOrder {
    service_order_id: string;                  // "SO-2024-123456"
    service_order_number: string;              // Title - display number

    // Related Objects
    forklift_serial: string;                   // Link to Forklift
    customer_id: string;                       // Link to Customer
    dealer_id: string;                         // Link to Dealer
    technician_id: string | null;              // Link to ServiceTechnician

    // Classification
    order_type: "Preventive Maintenance" | "Repair" | "Warranty" | "Emergency" | "Installation";
    priority: "Low" | "Medium" | "High" | "Critical";
    category: "Engine" | "Hydraulic" | "Electrical" | "Structural" | "Safety" | "Battery" | "Other";

    // Problem Description
    customer_reported_issue: string;
    failure_code: string | null;
    symptom_codes: string[];

    // Timing
    created_date: string;                      // ISO timestamp
    scheduled_date: string | null;
    actual_start_date: string | null;
    completed_date: string | null;
    promised_date: string;

    // Work Details
    labor_hours_estimated: number;
    labor_hours_actual: number | null;
    travel_time_hours: number;

    // Costs
    parts_cost_usd: number;
    labor_cost_usd: number;
    travel_cost_usd: number;
    total_cost_usd: number;
    billable_amount_usd: number;

    // Resolution
    resolution_code: string | null;
    resolution_notes: string | null;
    root_cause: string | null;

    // Quality
    first_time_fix: boolean | null;
    customer_signature_captured: boolean;
    follow_up_required: boolean;

    // Status
    status: "Open" | "Scheduled" | "In Progress" | "Pending Parts" | "Completed" | "Cancelled" | "Invoiced";

    last_updated: string;
}

// ============================================================================
// 7. TMHNA_ServiceTechnician
// ============================================================================

export interface TMHNA_ServiceTechnician {
    technician_id: string;                     // "TECH-001234"
    technician_name: string;                   // Title - full name

    // Employment
    dealer_id: string;                         // Link to Dealer
    employee_id: string;
    hire_date: string;

    // Certification
    certification_level: "Apprentice" | "Certified" | "Senior" | "Master";
    certifications: string[];                  // ["Electric", "IC Engine", "Hydraulic", "Battery"]
    certification_expiration_dates: Record<string, string>;

    // Specializations
    brand_certified: Brand[];
    product_specializations: string[];         // ["Reach Trucks", "Order Pickers"]

    // Contact
    mobile_phone: string;
    email: string;

    // Performance Metrics
    completed_orders_mtd: number;
    completed_orders_ytd: number;
    first_time_fix_rate: number;               // 0-100 percent
    avg_repair_time_hours: number;
    customer_satisfaction_score: number;       // 0.0 to 5.0
    callbacks_30_day: number;                  // Repeat visits within 30 days

    // Current Status
    active_service_orders: number;
    current_location_lat: number | null;
    current_location_lng: number | null;
    status: "Available" | "On Call" | "In Transit" | "At Customer" | "Off Duty" | "On Leave";

    // Vehicle
    service_vehicle_id: string | null;

    last_updated: string;
}

// Continue in next file due to length...

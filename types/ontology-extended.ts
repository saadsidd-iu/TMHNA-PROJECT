// ============================================================================
// TMHNA Ontology - Remaining Object Types (8-14)
// ============================================================================

import { Brand, BrandOrTMHNA } from './ontology';

// ============================================================================
// 8. TMHNA_PartsInventory
// ============================================================================

export interface TMHNA_PartsInventory {
    sku_id: string;                            // Primary key - "SKU-12345678"
    part_number: string;                       // Manufacturer part number
    part_description: string;                  // Title

    // Classification
    brand: BrandOrTMHNA;
    category: "Engine" | "Hydraulic" | "Electrical" | "Structural" | "Safety" | "Battery" | "Tire" | "Filter" | "Consumable" | "Other";
    subcategory: string;

    // Compatibility
    compatible_models: string[];               // Model numbers this part fits
    supersedes_part: string | null;            // Previous part number
    superseded_by: string | null;              // Replacement part number

    // Inventory Location
    distribution_center_id: string;            // Link to DC
    warehouse_location: string;                // Bin/slot location

    // Quantities
    quantity_on_hand: number;
    quantity_reserved: number;                 // Allocated to orders
    quantity_available: number;                // on_hand - reserved
    quantity_on_order: number;                 // Incoming from supplier

    // Inventory Planning
    reorder_point: number;
    safety_stock: number;
    economic_order_quantity: number;
    days_of_supply: number;

    // Costs & Pricing
    unit_cost_usd: number;
    list_price_usd: number;
    dealer_price_usd: number;

    // Supply Chain
    supplier_id: string;                       // Link to Supplier
    lead_time_days: number;

    // Activity
    last_receipt_date: string | null;
    last_issue_date: string | null;
    annual_demand_units: number;
    velocity_code: "A" | "B" | "C" | "D";      // A=fast moving, D=slow

    // Status
    status: "Active" | "Discontinued" | "Superseded" | "New";

    last_updated: string;
}

// ============================================================================
// 9. TMHNA_Supplier
// ============================================================================

export interface TMHNA_Supplier {
    supplier_id: string;                       // "SUP-001234"
    supplier_name: string;                     // Title

    // Classification
    supplier_type: "Tier 1" | "Tier 2" | "Tier 3";
    supplier_category: "Steel" | "Electronics" | "Hydraulics" | "Batteries" | "Tires" | "Paint" | "Fasteners" | "Castings" | "Machined Parts" | "Other";
    critical_supplier: boolean;

    // Location
    headquarters_city: string;
    headquarters_country: string;
    manufacturing_locations: string[];

    // Relationship
    primary_contact_name: string;
    primary_contact_email: string;
    contract_start_date: string;
    contract_expiration_date: string;

    // Commercial
    annual_spend_usd: number;
    payment_terms: string;                     // "Net 30", "Net 60", etc.

    // Performance Metrics
    on_time_delivery_percent: number;          // 0-100
    quality_score: number;                     // 0.0 to 5.0
    defect_rate_ppm: number;                   // Parts per million
    lead_time_days_avg: number;
    lead_time_reliability_percent: number;     // How often they hit quoted lead time

    // Risk Assessment
    financial_risk_score: number;              // 1-10 (10=highest risk)
    geographic_risk_score: number;             // 1-10
    single_source_risk: boolean;
    alternate_suppliers: string[];             // Other supplier_ids
    overall_risk_score: number;                // 1-10 composite

    // Status
    status: "Active" | "Probation" | "Inactive" | "New";

    last_updated: string;
}

// ============================================================================
// 10. TMHNA_WarrantyClaim
// ============================================================================

export interface TMHNA_WarrantyClaim {
    claim_id: string;                          // "WC-2024-123456"
    claim_number: string;                      // Title - display number

    // Related Objects
    forklift_serial: string;                   // Link to Forklift
    customer_id: string;                       // Link to Customer
    dealer_id: string;                         // Link to Dealer
    service_order_id: string | null;           // Link to ServiceOrder that created claim
    manufacturing_plant_id: string;            // Link to Plant where unit was built

    // Claim Details
    claim_type: "Parts" | "Labor" | "Parts and Labor" | "Goodwill" | "Policy";
    failure_date: string;
    claim_date: string;

    // Failure Information
    failure_code: string;
    failure_description: string;
    operating_hours_at_failure: number;
    days_since_manufacture: number;

    // Parts & Labor
    failed_parts: Array<{ part_number: string; description: string; quantity: number }>;
    labor_hours: number;

    // Costs
    parts_claim_amount_usd: number;
    labor_claim_amount_usd: number;
    total_claim_amount_usd: number;
    approved_amount_usd: number | null;

    // Resolution
    root_cause: string | null;
    root_cause_category: "Manufacturing Defect" | "Component Failure" | "Customer Misuse" | "Installation Error" | "Design Issue" | "Unknown";
    corrective_action: string | null;

    // Processing
    submitted_date: string;
    reviewed_date: string | null;
    resolved_date: string | null;
    reviewer_id: string | null;

    // Status
    status: "Draft" | "Submitted" | "Under Review" | "Approved" | "Partially Approved" | "Denied" | "Paid" | "Closed";
    denial_reason: string | null;

    last_updated: string;
}

// ============================================================================
// 11. TMHNA_BacklogOrder
// ============================================================================

export interface TMHNA_BacklogOrder {
    order_id: string;                          // "BO-2024-123456"
    order_number: string;                      // Title - display number

    // Related Objects
    customer_id: string;                       // Link to Customer
    dealer_id: string;                         // Link to Dealer
    manufacturing_plant_id: string;            // Link to Plant (where it will be built)

    // Product Details
    model_number: string;
    model_name: string;
    brand: Brand;
    product_line: string;
    configuration_code: string;                // Custom options/specs
    quantity: number;

    // Pricing
    unit_price_usd: number;
    total_order_value_usd: number;
    discount_percent: number;

    // Dates
    order_date: string;
    requested_delivery_date: string;
    acknowledged_delivery_date: string | null;
    scheduled_production_date: string | null;
    estimated_completion_date: string | null;
    actual_ship_date: string | null;

    // Time Metrics
    days_in_backlog: number;
    days_until_requested_date: number;
    on_time_status: "On Track" | "At Risk" | "Late";

    // Production Status
    production_status: "Not Started" | "Materials Staging" | "In Production" | "Quality Check" | "Complete";
    production_line: string | null;

    // Priority
    priority: "Standard" | "Expedite" | "Critical";
    expedite_reason: string | null;

    // Status
    order_status: "Pending" | "Confirmed" | "Scheduled" | "In Production" | "Complete" | "Shipped" | "Cancelled" | "On Hold";
    hold_reason: string | null;

    last_updated: string;
}

// ============================================================================
// 12. TMHNA_Equipment (Telematics)
// ============================================================================

export interface TMHNA_Equipment {
    equipment_id: string;                      // "EQ-12345678"
    forklift_serial: string;                   // Link to Forklift - one-to-one
    telematics_device_id: string;              // Hardware device ID

    // Device Info
    device_type: string;                       // "T-Matics 3.0", etc.
    firmware_version: string;
    installation_date: string;

    // Owner
    customer_id: string;                       // Link to Customer
    customer_site_name: string;

    // Current Location
    current_location_lat: number;
    current_location_lng: number;
    location_accuracy_meters: number;
    geofence_name: string | null;              // Named area if within one

    // Real-time Status
    ignition_status: "On" | "Off";
    motion_status: "Moving" | "Idle" | "Parked";
    last_ping_timestamp: string;

    // Today's Metrics
    operating_hours_today: number;
    idle_time_minutes_today: number;
    distance_traveled_feet_today: number;

    // Battery/Fuel (varies by unit type)
    fuel_type: "LPG" | "Diesel" | "Electric";
    battery_level_percent: number | null;      // Electric only
    fuel_level_percent: number | null;         // IC only
    charge_status: "Charging" | "Not Charging" | "N/A";

    // Usage Metrics
    operating_hours_lifetime: number;
    operating_hours_30d: number;
    utilization_percent_30d: number;           // Hours used / hours available
    avg_daily_hours_30d: number;

    // Safety Events
    impact_events_30d: number;
    hard_brake_events_30d: number;
    speeding_events_30d: number;
    seatbelt_violations_30d: number;

    // Maintenance
    maintenance_due: boolean;
    maintenance_due_reason: string | null;
    next_pm_date: string | null;
    hours_until_next_pm: number | null;

    // Alerts
    active_alerts: Array<{ alert_id: string; severity: string; message: string }>;
    alert_status: "Normal" | "Warning" | "Critical";

    last_updated: string;
}

// ============================================================================
// 13. TMHNA_Alert
// ============================================================================

export interface TMHNA_Alert {
    alert_id: string;                          // "ALT-2024-123456"

    // Classification
    alert_type: "Equipment" | "Inventory" | "Production" | "Quality" | "Safety" | "Supplier" | "Service" | "System";
    alert_category: string;                    // More specific category
    severity: "Info" | "Warning" | "Critical";

    // Source
    source_object_type: string;                // "TMHNA_Equipment", "TMHNA_PartsInventory", etc.
    source_object_id: string;                  // The specific object's ID
    source_object_name: string;                // Human-readable name

    // Alert Details
    alert_title: string;                       // Title - short description
    alert_description: string;                 // Full description
    recommended_action: string | null;

    // Context
    plant_id: string | null;                   // Link to Plant if applicable
    dealer_id: string | null;                  // Link to Dealer if applicable
    brand: BrandOrTMHNA;

    // Timeline
    created_timestamp: string;
    triggered_by: string;                      // Rule/condition that triggered

    // Response
    acknowledged: boolean;
    acknowledged_by: string | null;
    acknowledged_timestamp: string | null;
    acknowledgment_notes: string | null;

    resolved: boolean;
    resolved_by: string | null;
    resolved_timestamp: string | null;
    resolution_notes: string | null;

    // Status
    status: "Active" | "Acknowledged" | "In Progress" | "Resolved" | "Dismissed";

    last_updated: string;
}

// ============================================================================
// 14. TMHNA_FactoryZone
// ============================================================================

export interface TMHNA_FactoryZone {
    zone_id: string;                           // "ZONE-001"
    zone_name: string;                         // Title - "Inbound Dock", "Welding Area"
    plant_id: string;                          // Link to Plant (always PLT-001 Columbus)

    // Layout
    zone_type: "Dock" | "Storage" | "Fabrication" | "Welding" | "Paint" | "Assembly" | "Testing" | "Staging" | "Kanban" | "Maintenance" | "Office";
    floor_area_sqft: number;
    position_x: number;                        // For UI placement (0-100 grid)
    position_y: number;
    width: number;
    height: number;

    // Operations
    shift_operation: "All Shifts" | "Day Only" | "As Needed";
    num_workstations: number;
    num_employees_per_shift: number;

    // Current Status
    status: "Operational" | "Idle" | "Maintenance" | "Offline";
    current_throughput_units_per_hour: number;
    target_throughput_units_per_hour: number;
    current_wip_units: number;

    // Equipment in Zone
    equipment_count: number;
    equipment_types: string[];                 // ["Conveyor", "Robot", "Press", etc.]

    // Metrics
    oee_percent: number;
    quality_rate_percent: number;
    downtime_minutes_today: number;

    // Alerts
    active_alerts: number;
    alert_status: "Normal" | "Warning" | "Critical";

    last_updated: string;
}

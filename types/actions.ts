// ============================================================================
// TMHNA Ontology - Action Type Definitions
// ============================================================================

export interface ActionParameter {
    name: string;
    type: 'string' | 'number' | 'boolean' | 'date' | 'datetime' | 'enum';
    required: boolean;
    values?: string[];                       // For enum types
    description?: string;
}

export interface ActionType {
    name: string;
    description: string;
    target_object_type: string;
    parameters: ActionParameter[];
    validation_rules: string[];
    write_back_operations: string[];
    required_permissions: string[];
}

// All 8 governed actions
export const ONTOLOGY_ACTIONS: ActionType[] = [
    {
        name: "allocate_inventory",
        description: "Transfer parts between distribution centers",
        target_object_type: "TMHNA_PartsInventory",
        parameters: [
            { name: "sku_id", type: "string", required: true },
            { name: "source_dc_id", type: "string", required: true },
            { name: "destination_dc_id", type: "string", required: true },
            { name: "quantity", type: "number", required: true },
            { name: "reason", type: "string", required: true }
        ],
        validation_rules: [
            "quantity must be > 0",
            "quantity must be <= source DC available quantity",
            "source_dc_id must be different from destination_dc_id",
            "SKU must exist at source DC"
        ],
        write_back_operations: [
            "Decrease quantity at source DC",
            "Increase quantity at destination DC",
            "Create inventory movement record",
            "Log audit trail"
        ],
        required_permissions: ["inventory_manager", "dc_supervisor"]
    },

    {
        name: "prioritize_backlog_order",
        description: "Change production priority of a backlog order",
        target_object_type: "TMHNA_BacklogOrder",
        parameters: [
            { name: "order_id", type: "string", required: true },
            { name: "new_priority", type: "enum", values: ["Standard", "Expedite", "Critical"], required: true },
            { name: "justification", type: "string", required: true },
            { name: "requested_date_change", type: "date", required: false }
        ],
        validation_rules: [
            "Order must be in Pending, Confirmed, or Scheduled status",
            "Critical priority requires manager approval",
            "Justification must be at least 20 characters"
        ],
        write_back_operations: [
            "Update order priority",
            "Recalculate production schedule",
            "Notify plant scheduler",
            "Update estimated completion date",
            "Log priority change history"
        ],
        required_permissions: ["order_manager", "production_scheduler"]
    },

    {
        name: "dispatch_technician",
        description: "Assign a service technician to a service order",
        target_object_type: "TMHNA_ServiceOrder",
        parameters: [
            { name: "service_order_id", type: "string", required: true },
            { name: "technician_id", type: "string", required: true },
            { name: "scheduled_date", type: "datetime", required: true },
            { name: "estimated_duration_hours", type: "number", required: true },
            { name: "special_instructions", type: "string", required: false }
        ],
        validation_rules: [
            "Technician must be available on scheduled date",
            "Technician must be certified for equipment type",
            "Technician must be employed by servicing dealer",
            "Service order must be in Open or Scheduled status"
        ],
        write_back_operations: [
            "Update service order with technician assignment",
            "Update technician schedule/calendar",
            "Send notification to technician",
            "Send confirmation to customer",
            "Update service order status to Scheduled"
        ],
        required_permissions: ["service_dispatcher", "dealer_admin"]
    },

    {
        name: "escalate_warranty_claim",
        description: "Flag a warranty claim for management review",
        target_object_type: "TMHNA_WarrantyClaim",
        parameters: [
            { name: "claim_id", type: "string", required: true },
            { name: "escalation_reason", type: "enum", values: ["High Value", "Repeat Failure", "Safety Concern", "Customer Escalation", "Root Cause Unknown"], required: true },
            { name: "escalation_notes", type: "string", required: true },
            { name: "requested_action", type: "string", required: true }
        ],
        validation_rules: [
            "Claim must be in Under Review status",
            "Escalation notes must be at least 50 characters",
            "Cannot re-escalate within 24 hours"
        ],
        write_back_operations: [
            "Update claim escalation status",
            "Create escalation record",
            "Notify warranty manager",
            "Add to management review queue",
            "Set escalation timer/SLA"
        ],
        required_permissions: ["warranty_analyst", "service_manager"]
    },

    {
        name: "acknowledge_alert",
        description: "Acknowledge an operational alert",
        target_object_type: "TMHNA_Alert",
        parameters: [
            { name: "alert_id", type: "string", required: true },
            { name: "acknowledgment_notes", type: "string", required: true },
            { name: "planned_action", type: "string", required: false },
            { name: "estimated_resolution_time", type: "datetime", required: false }
        ],
        validation_rules: [
            "Alert must be in Active status",
            "User must have permissions for alert type"
        ],
        write_back_operations: [
            "Update alert acknowledged fields",
            "Log acknowledgment with timestamp and user",
            "Update alert status to Acknowledged"
        ],
        required_permissions: ["alert_responder"]
    },

    {
        name: "resolve_alert",
        description: "Mark an alert as resolved",
        target_object_type: "TMHNA_Alert",
        parameters: [
            { name: "alert_id", type: "string", required: true },
            { name: "resolution_notes", type: "string", required: true },
            { name: "root_cause", type: "string", required: false },
            { name: "preventive_action", type: "string", required: false }
        ],
        validation_rules: [
            "Alert must be in Acknowledged or In Progress status",
            "Resolution notes must be at least 20 characters"
        ],
        write_back_operations: [
            "Update alert resolved fields",
            "Log resolution with timestamp and user",
            "Update alert status to Resolved",
            "Update source object if applicable"
        ],
        required_permissions: ["alert_responder"]
    },

    {
        name: "create_service_order",
        description: "Create a new service order for a forklift",
        target_object_type: "TMHNA_Forklift",
        parameters: [
            { name: "forklift_serial", type: "string", required: true },
            { name: "order_type", type: "enum", values: ["Preventive Maintenance", "Repair", "Warranty", "Emergency"], required: true },
            { name: "priority", type: "enum", values: ["Low", "Medium", "High", "Critical"], required: true },
            { name: "reported_issue", type: "string", required: true },
            { name: "requested_date", type: "date", required: true }
        ],
        validation_rules: [
            "Forklift must exist in system",
            "Forklift must not have open Critical service order already",
            "Customer must have active service contract or pay-per-service"
        ],
        write_back_operations: [
            "Create new service order record",
            "Associate with forklift, customer, dealer",
            "Add to service dispatch queue",
            "Send customer confirmation"
        ],
        required_permissions: ["service_coordinator", "dealer_service"]
    },

    {
        name: "update_equipment_status",
        description: "Manually update telematics equipment status",
        target_object_type: "TMHNA_Equipment",
        parameters: [
            { name: "equipment_id", type: "string", required: true },
            { name: "new_status", type: "enum", values: ["Normal", "Warning", "Critical", "Offline"], required: true },
            { name: "reason", type: "string", required: true },
            { name: "expected_resolution", type: "datetime", required: false }
        ],
        validation_rules: [
            "Equipment must exist",
            "Reason must be provided for status changes"
        ],
        write_back_operations: [
            "Update equipment status",
            "Create/update associated alert if needed",
            "Log status change"
        ],
        required_permissions: ["fleet_manager", "telematics_admin"]
    }
];

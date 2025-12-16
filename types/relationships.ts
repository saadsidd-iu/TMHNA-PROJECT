// ============================================================================
// TMHNA Ontology - Relationship/Link Type Definitions
// ============================================================================

export type Cardinality = 'one-to-one' | 'one-to-many' | 'many-to-one' | 'many-to-many';

export interface LinkType {
    name: string;
    from: string;                            // Source object type
    to: string;                              // Target object type
    cardinality: Cardinality;
    description: string;
    inverse_name?: string;                   // Name when traversing backwards
}

// All 17 relationship types
export const ONTOLOGY_LINKS: LinkType[] = [
    // Manufacturing Chain
    {
        name: "manufactures",
        from: "TMHNA_Plant",
        to: "TMHNA_Forklift",
        cardinality: "one-to-many",
        description: "Plant manufactures forklifts",
        inverse_name: "manufactured_at"
    },
    {
        name: "has_zone",
        from: "TMHNA_Plant",
        to: "TMHNA_FactoryZone",
        cardinality: "one-to-many",
        description: "Plant contains factory zones",
        inverse_name: "belongs_to_plant"
    },

    // Distribution Chain
    {
        name: "supplies_parts_to",
        from: "TMHNA_DistributionCenter",
        to: "TMHNA_Dealer",
        cardinality: "many-to-many",
        description: "DC supplies parts to dealers",
        inverse_name: "supplied_by_dc"
    },
    {
        name: "stocks",
        from: "TMHNA_DistributionCenter",
        to: "TMHNA_PartsInventory",
        cardinality: "one-to-many",
        description: "DC holds parts inventory",
        inverse_name: "stocked_at"
    },

    // Sales Chain
    {
        name: "sold_through",
        from: "TMHNA_Forklift",
        to: "TMHNA_Dealer",
        cardinality: "many-to-one",
        description: "Forklift was sold through dealer",
        inverse_name: "sold"
    },
    {
        name: "serves",
        from: "TMHNA_Dealer",
        to: "TMHNA_Customer",
        cardinality: "many-to-many",
        description: "Dealer serves customers",
        inverse_name: "served_by"
    },
    {
        name: "employs",
        from: "TMHNA_Dealer",
        to: "TMHNA_ServiceTechnician",
        cardinality: "one-to-many",
        description: "Dealer employs technicians",
        inverse_name: "employed_by"
    },

    // Ownership
    {
        name: "owns",
        from: "TMHNA_Customer",
        to: "TMHNA_Forklift",
        cardinality: "one-to-many",
        description: "Customer owns forklifts",
        inverse_name: "owned_by"
    },
    {
        name: "placed",
        from: "TMHNA_Customer",
        to: "TMHNA_BacklogOrder",
        cardinality: "one-to-many",
        description: "Customer placed backlog orders",
        inverse_name: "placed_by"
    },

    // Service
    {
        name: "has_service_order",
        from: "TMHNA_Forklift",
        to: "TMHNA_ServiceOrder",
        cardinality: "one-to-many",
        description: "Forklift has service orders",
        inverse_name: "services"
    },
    {
        name: "assigned_to",
        from: "TMHNA_ServiceOrder",
        to: "TMHNA_ServiceTechnician",
        cardinality: "many-to-one",
        description: "Service order assigned to technician",
        inverse_name: "assigned_orders"
    },
    {
        name: "generated",
        from: "TMHNA_ServiceOrder",
        to: "TMHNA_WarrantyClaim",
        cardinality: "one-to-one",
        description: "Service order may generate warranty claim",
        inverse_name: "generated_by"
    },

    // Warranty
    {
        name: "has_warranty_claim",
        from: "TMHNA_Forklift",
        to: "TMHNA_WarrantyClaim",
        cardinality: "one-to-many",
        description: "Forklift has warranty claims",
        inverse_name: "claim_for"
    },
    {
        name: "built_at",
        from: "TMHNA_WarrantyClaim",
        to: "TMHNA_Plant",
        cardinality: "many-to-one",
        description: "Claim references manufacturing plant",
        inverse_name: "warranty_claims"
    },

    // Telematics
    {
        name: "tracked_by",
        from: "TMHNA_Forklift",
        to: "TMHNA_Equipment",
        cardinality: "one-to-one",
        description: "Forklift tracked by telematics device",
        inverse_name: "tracks"
    },

    // Supply Chain
    {
        name: "supplies",
        from: "TMHNA_Supplier",
        to: "TMHNA_PartsInventory",
        cardinality: "one-to-many",
        description: "Supplier provides parts",
        inverse_name: "supplied_by"
    },
    {
        name: "supplies_to",
        from: "TMHNA_Supplier",
        to: "TMHNA_Plant",
        cardinality: "many-to-many",
        description: "Supplier provides components to plants",
        inverse_name: "supplied_by_suppliers"
    },

    // Production
    {
        name: "scheduled_at",
        from: "TMHNA_BacklogOrder",
        to: "TMHNA_Plant",
        cardinality: "many-to-one",
        description: "Order scheduled at plant",
        inverse_name: "has_scheduled_orders"
    },
];

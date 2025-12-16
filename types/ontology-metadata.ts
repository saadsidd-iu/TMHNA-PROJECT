// ============================================================================
// Domain Groupings for Ontology Explorer
// ============================================================================

export const ONTOLOGY_DOMAINS = {
    "TMHNA Enterprise": ["TMHNA_Plant", "TMHNA_DistributionCenter"],
    "Manufacturing": ["TMHNA_Forklift", "TMHNA_BacklogOrder", "TMHNA_FactoryZone"],
    "Supply Chain": ["TMHNA_PartsInventory", "TMHNA_Supplier"],
    "Sales & Customers": ["TMHNA_Dealer", "TMHNA_Customer"],
    "Service & Support": ["TMHNA_ServiceOrder", "TMHNA_ServiceTechnician", "TMHNA_WarrantyClaim"],
    "Telematics & IoT": ["TMHNA_Equipment"],
    "Operations": ["TMHNA_Alert"]
};

// Object type metadata
export const OBJECT_TYPE_METADATA = {
    TMHNA_Plant: { icon: "Factory", displayName: "Plants", instanceCount: 5, domain: "TMHNA Enterprise" },
    TMHNA_DistributionCenter: { icon: "Warehouse", displayName: "Distribution Centers", instanceCount: 2, domain: "TMHNA Enterprise" },
    TMHNA_Dealer: { icon: "Store", displayName: "Dealers", instanceCount: 312, domain: "Sales & Customers" },
    TMHNA_Forklift: { icon: "Truck", displayName: "Forklifts", instanceCount: 1500000, domain: "Manufacturing" },
    TMHNA_Customer: { icon: "Building2", displayName: "Customers", instanceCount: 10000, domain: "Sales & Customers" },
    TMHNA_ServiceOrder: { icon: "Wrench", displayName: "Service Orders", instanceCount: 890000, domain: "Service & Support" },
    TMHNA_ServiceTechnician: { icon: "UserCog", displayName: "Service Technicians", instanceCount: 2300, domain: "Service & Support" },
    TMHNA_PartsInventory: { icon: "Box", displayName: "Parts Inventory", instanceCount: 3200000, domain: "Supply Chain" },
    TMHNA_Supplier: { icon: "PackageCheck", displayName: "Suppliers", instanceCount: 500, domain: "Supply Chain" },
    TMHNA_WarrantyClaim: { icon: "Shield", displayName: "Warranty Claims", instanceCount: 156000, domain: "Service & Support" },
    TMHNA_BacklogOrder: { icon: "ClipboardList", displayName: "Backlog Orders", instanceCount: 42000, domain: "Manufacturing" },
    TMHNA_Equipment: { icon: "Radio", displayName: "Telematics Equipment", instanceCount: 780000, domain: "Telematics & IoT" },
    TMHNA_Alert: { icon: "Bell", displayName: "Alerts", instanceCount: null, domain: "Operations" },
    TMHNA_FactoryZone: { icon: "LayoutGrid", displayName: "Factory Zones", instanceCount: 12, domain: "Manufacturing" }
};

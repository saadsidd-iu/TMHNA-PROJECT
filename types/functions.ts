// ============================================================================
// TMHNA Ontology - Business Logic Function Definitions
// ============================================================================

export interface FunctionInput {
    name: string;
    type: string;
    description: string;
}

export interface FunctionOutput {
    name: string;
    type: string;
    description: string;
}

export interface OntologyFunction {
    name: string;
    description: string;
    inputs: FunctionInput[];
    outputs: FunctionOutput[];
    logic_description: string;
    example_usage: string;
}

// All 7 business logic functions
export const ONTOLOGY_FUNCTIONS: OntologyFunction[] = [
    {
        name: "calculateOptimalDistribution",
        description: "Determine optimal allocation of finished goods from plants to distribution centers based on demand forecast and capacity constraints",
        inputs: [
            { name: "production_forecast", type: "Record<string, number>", description: "Units by plant for next 30 days" },
            { name: "dc_capacity", type: "Record<string, number>", description: "Available capacity by DC" },
            { name: "demand_by_region", type: "Record<string, number>", description: "Forecasted demand by region" }
        ],
        outputs: [
            { name: "allocation_matrix", type: "Record<string, Record<string, number>>", description: "Quantity to send from each plant to each DC" },
            { name: "transportation_cost", type: "number", description: "Total estimated shipping cost" },
            { name: "coverage_metrics", type: "Record<string, number>", description: "Demand coverage percentage by region" }
        ],
        logic_description: "Uses linear optimization to minimize transportation costs while meeting regional demand. Considers plant proximity to DCs, DC capacity limits, and regional demand patterns. Outputs a matrix showing how many units from each plant should go to each DC.",
        example_usage: "calculateOptimalDistribution({ 'PLT-001': 2500, 'PLT-002': 1800 }, { 'DC-001': 10000, 'DC-002': 8000 }, { 'Northeast': 3000, 'Midwest': 2500 })"
    },

    {
        name: "forecastDemand",
        description: "Predict regional demand for forklifts over the next 30/60/90 days using historical data and seasonality",
        inputs: [
            { name: "historical_sales", type: "Array<{ date: string; region: string; units: number }>", description: "Last 24 months of sales by region" },
            { name: "seasonality_factors", type: "Record<number, number>", description: "Month-over-month adjustment factors" },
            { name: "economic_indicators", type: "{ gdp_growth: number; manufacturing_index: number }", description: "GDP growth, manufacturing index, etc." },
            { name: "forecast_horizon_days", type: "number", description: "30, 60, or 90" }
        ],
        outputs: [
            { name: "demand_forecast", type: "Record<string, Record<string, number>>", description: "Predicted demand by region and product line" },
            { name: "confidence_interval", type: "{ lower: Record<string, number>; upper: Record<string, number> }", description: "Upper and lower bounds" },
            { name: "key_drivers", type: "Array<string>", description: "Factors most influencing the forecast" }
        ],
        logic_description: "Applies time-series decomposition with seasonal adjustment. Incorporates external economic indicators as regression variables. Outputs point forecasts with confidence intervals.",
        example_usage: "forecastDemand(historicalSalesData, seasonFactors, econIndicators, 60)"
    },

    {
        name: "assessSupplierRisk",
        description: "Calculate composite risk score for a supplier based on delivery, quality, and financial factors",
        inputs: [
            { name: "supplier_id", type: "string", description: "Supplier to assess" },
            { name: "lookback_months", type: "number", description: "How many months of history to analyze" }
        ],
        outputs: [
            { name: "risk_score", type: "number", description: "Overall risk score 1-10 (10=highest risk)" },
            { name: "risk_factors", type: "{ delivery: number; quality: number; financial: number; geographic: number }", description: "Breakdown by category" },
            { name: "trend", type: "'Improving' | 'Stable' | 'Declining'", description: "Risk trend direction" },
            { name: "recommendations", type: "Array<string>", description: "Suggested actions" }
        ],
        logic_description: "Calculates weighted score based on: on-time delivery rate (30%), quality defect rate (25%), financial stability indicators (25%), geographic concentration risk (20%). Compares against historical baselines and peer suppliers.",
        example_usage: "assessSupplierRisk('SUP-001234', 12)"
    },

    {
        name: "runScenarioSimulation",
        description: "What-if analysis for supply chain disruption scenarios",
        inputs: [
            { name: "scenario_type", type: "'Plant Shutdown' | 'Supplier Disruption' | 'Demand Surge' | 'Transportation Delay' | 'Quality Issue'", description: "Type of disruption" },
            { name: "affected_entity_ids", type: "Array<string>", description: "IDs of plants, suppliers, or regions affected" },
            { name: "duration_days", type: "number", description: "How long the disruption lasts" },
            { name: "severity", type: "'Partial' | 'Full'", description: "Extent of disruption" }
        ],
        outputs: [
            { name: "impact_summary", type: "{ production_impact: number; revenue_impact: number; customer_impact: number }", description: "High-level impacts" },
            { name: "timeline", type: "Array<{ day: number; production_shortfall: number; backlog_growth: number }>", description: "Day-by-day impact projection" },
            { name: "mitigation_options", type: "Array<{ action: string; cost: number; benefit: number }>", description: "Possible responses with cost/benefit" },
            { name: "recovery_estimate", type: "{ days_to_recovery: number; recovery_cost: number }", description: "Time and cost to return to normal" }
        ],
        logic_description: "Models the ripple effects through the supply chain network. Uses graph traversal to identify downstream dependencies. Calculates production shortfalls, backlog growth, and revenue impact. Suggests alternative suppliers, overtime production, or inventory drawdown as mitigations.",
        example_usage: "runScenarioSimulation('Plant Shutdown', ['PLT-001'], 14, 'Full')"
    },

    {
        name: "calculateServiceCapacity",
        description: "Determine available service capacity by region based on technician availability and workload",
        inputs: [
            { name: "region", type: "string", description: "Region to analyze" },
            { name: "date_range", type: "{ start: string; end: string }", description: "Start and end dates" },
            { name: "service_type", type: "string", description: "PM, Repair, Emergency, etc." }
        ],
        outputs: [
            { name: "total_capacity_hours", type: "number", description: "Total available technician hours" },
            { name: "utilized_hours", type: "number", description: "Already scheduled hours" },
            { name: "available_hours", type: "number", description: "Remaining capacity" },
            { name: "technician_breakdown", type: "Array<{ tech_id: string; name: string; available_hours: number }>", description: "Availability by technician" }
        ],
        logic_description: "Aggregates technician availability calendars, subtracts scheduled work, accounts for travel time based on customer locations. Returns capacity at regional and individual technician level.",
        example_usage: "calculateServiceCapacity('Northeast', { start: '2024-01-01', end: '2024-01-31' }, 'Repair')"
    },

    {
        name: "identifyAtRiskParts",
        description: "Find parts inventory that requires attention based on supply/demand analysis",
        inputs: [
            { name: "threshold_days_supply", type: "number", description: "Minimum acceptable days of supply" },
            { name: "include_on_order", type: "boolean", description: "Whether to count incoming inventory" }
        ],
        outputs: [
            { name: "at_risk_parts", type: "Array<{ sku_id: string; part_description: string; days_supply: number; recommended_order_qty: number }>", description: "Parts below threshold with details" },
            { name: "total_value_at_risk", type: "number", description: "Dollar value of potential stockouts" },
            { name: "recommended_orders", type: "Array<{ sku_id: string; supplier_id: string; quantity: number; estimated_cost: number }>", description: "Suggested reorder quantities" }
        ],
        logic_description: "Compares current inventory plus on-order against demand forecast. Identifies parts that will fall below safety stock. Calculates economic order quantities for replenishment.",
        example_usage: "identifyAtRiskParts(30, true)"
    },

    {
        name: "calculateBacklogHealth",
        description: "Analyze backlog orders and identify delivery risks",
        inputs: [
            { name: "plant_id", type: "string | null", description: "Optional - filter to specific plant" },
            { name: "brand", type: "string | null", description: "Optional - filter to specific brand" }
        ],
        outputs: [
            { name: "total_orders", type: "number", description: "Number of orders in backlog" },
            { name: "total_value", type: "number", description: "Dollar value of backlog" },
            { name: "on_time_forecast", type: "number", description: "Percentage expected to ship on time" },
            { name: "at_risk_orders", type: "Array<{ order_id: string; customer: string; days_overdue: number; value: number }>", description: "Orders likely to be late" },
            { name: "aging_breakdown", type: "Record<string, number>", description: "Orders by days in backlog (<30, 30-60, 60-90, >90)" }
        ],
        logic_description: "Compares promised delivery dates against production capacity and current schedule. Flags orders at risk of missing dates. Provides aging analysis showing how long orders have been in queue.",
        example_usage: "calculateBacklogHealth('PLT-001', 'TMH')"
    }
];

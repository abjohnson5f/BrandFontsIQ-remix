// Widget Registry - Central registration for all widget types

import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  Table2, 
  Type, 
  Filter,
  Calendar,
  TrendingUp
} from "lucide-react";
import type { WidgetRegistryEntry, WidgetType } from "./types";

// Import widget components (to be created)
// import { MetricCardWidget } from "~/components/widgets/metric-card";
// import { LineChartWidget } from "~/components/widgets/line-chart";
// etc...

// Placeholder components for now
const PlaceholderWidget = ({ config }: any) => (
  <div className="h-full w-full flex items-center justify-center text-gray-400">
    {config.type} widget
  </div>
);

class WidgetRegistry {
  private widgets: Map<WidgetType, WidgetRegistryEntry> = new Map();

  register(entry: WidgetRegistryEntry) {
    this.widgets.set(entry.type, entry);
  }

  get(type: WidgetType): WidgetRegistryEntry | undefined {
    return this.widgets.get(type);
  }

  getAll(): WidgetRegistryEntry[] {
    return Array.from(this.widgets.values());
  }

  getByCategory(category: string): WidgetRegistryEntry[] {
    // Can be extended to support categories
    return this.getAll();
  }
}

// Create singleton instance
export const widgetRegistry = new WidgetRegistry();

// Register all available widgets
widgetRegistry.register({
  type: 'metric-card',
  name: 'Metric Card',
  description: 'Display a single metric with optional trend',
  icon: TrendingUp,
  component: PlaceholderWidget, // Will be replaced with actual component
  defaultSize: { width: 3, height: 2 },
  defaultSettings: {
    format: 'number',
    showTrend: true,
    trendPeriod: '30d'
  },
  settingsSchema: {
    fields: [
      {
        key: 'label',
        label: 'Label',
        type: 'text',
        required: true
      },
      {
        key: 'format',
        label: 'Number Format',
        type: 'select',
        defaultValue: 'number',
        options: [
          { label: 'Number', value: 'number' },
          { label: 'Currency', value: 'currency' },
          { label: 'Percentage', value: 'percentage' }
        ]
      },
      {
        key: 'showTrend',
        label: 'Show Trend',
        type: 'boolean',
        defaultValue: true
      }
    ]
  }
});

widgetRegistry.register({
  type: 'line-chart',
  name: 'Line Chart',
  description: 'Visualize trends over time',
  icon: LineChart,
  component: PlaceholderWidget,
  defaultSize: { width: 6, height: 4 },
  defaultSettings: {
    xAxis: { label: 'Date' },
    yAxis: { label: 'Value' },
    showLegend: true,
    showGrid: true
  }
});

widgetRegistry.register({
  type: 'bar-chart',
  name: 'Bar Chart',
  description: 'Compare values across categories',
  icon: BarChart3,
  component: PlaceholderWidget,
  defaultSize: { width: 6, height: 4 },
  defaultSettings: {
    orientation: 'vertical',
    showValues: true,
    showLegend: true
  }
});

widgetRegistry.register({
  type: 'pie-chart',
  name: 'Pie Chart',
  description: 'Show proportions of a whole',
  icon: PieChart,
  component: PlaceholderWidget,
  defaultSize: { width: 4, height: 4 },
  defaultSettings: {
    showLabels: true,
    showLegend: true,
    donut: false
  }
});

widgetRegistry.register({
  type: 'data-table',
  name: 'Data Table',
  description: 'Display data in a tabular format',
  icon: Table2,
  component: PlaceholderWidget,
  defaultSize: { width: 8, height: 6 },
  defaultSettings: {
    pageSize: 10,
    showPagination: true,
    sortable: true,
    filterable: true
  }
});

widgetRegistry.register({
  type: 'text-block',
  name: 'Text Block',
  description: 'Add custom text or markdown',
  icon: Type,
  component: PlaceholderWidget,
  defaultSize: { width: 4, height: 2 },
  defaultSettings: {
    content: '',
    markdown: true
  }
});

widgetRegistry.register({
  type: 'filter-dropdown',
  name: 'Filter Dropdown',
  description: 'Add a dropdown filter',
  icon: Filter,
  component: PlaceholderWidget,
  defaultSize: { width: 3, height: 1 },
  defaultSettings: {
    placeholder: 'Select...',
    multiple: false
  }
});

widgetRegistry.register({
  type: 'date-range-picker',
  name: 'Date Range Picker',
  description: 'Select a date range',
  icon: Calendar,
  component: PlaceholderWidget,
  defaultSize: { width: 3, height: 1 },
  defaultSettings: {
    defaultRange: '30d',
    showPresets: true
  }
});
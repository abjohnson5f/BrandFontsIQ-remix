// Widget System Type Definitions

export type WidgetType = 
  | 'metric-card'
  | 'line-chart'
  | 'bar-chart'
  | 'pie-chart'
  | 'data-table'
  | 'text-block'
  | 'filter-dropdown'
  | 'date-range-picker';

export interface WidgetSize {
  width: number;  // Grid columns (1-12)
  height: number; // Grid rows (1-12)
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
}

export interface WidgetPosition {
  x: number; // Grid column position
  y: number; // Grid row position
}

export interface WidgetDataBinding {
  dataSource: string; // ID of the data source
  fields: Record<string, string>; // Mapping of widget fields to data fields
  filters?: Record<string, any>; // Applied filters
  refreshInterval?: number; // Auto-refresh in milliseconds
}

export interface WidgetConfig {
  id: string;
  type: WidgetType;
  title?: string;
  position: WidgetPosition;
  size: WidgetSize;
  dataBinding?: WidgetDataBinding;
  settings: Record<string, any>; // Widget-specific settings
  locked?: boolean; // Prevent editing/moving
}

export interface DashboardLayout {
  id: string;
  name: string;
  description?: string;
  widgets: WidgetConfig[];
  globalFilters?: Record<string, any>;
  gridCols?: number; // Default 12
  gridRows?: number; // Default auto
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

// Widget Component Props
export interface BaseWidgetProps {
  config: WidgetConfig;
  data?: any;
  isEditing?: boolean;
  onUpdate?: (config: WidgetConfig) => void;
  onRemove?: () => void;
}

// Widget Registry Entry
export interface WidgetRegistryEntry {
  type: WidgetType;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  component: React.ComponentType<BaseWidgetProps>;
  defaultSize: WidgetSize;
  defaultSettings: Record<string, any>;
  settingsSchema?: WidgetSettingsSchema;
}

// Settings Schema for Widget Configuration
export interface WidgetSettingsSchema {
  fields: WidgetSettingField[];
}

export interface WidgetSettingField {
  key: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'color' | 'boolean' | 'date';
  defaultValue?: any;
  options?: { label: string; value: any }[]; // For select type
  min?: number; // For number type
  max?: number; // For number type
  required?: boolean;
}
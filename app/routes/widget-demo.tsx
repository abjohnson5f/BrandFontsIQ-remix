import { useState, useEffect } from "react";
import { DashboardGrid } from "~/components/widget-system/dashboard-grid";
import { widgetRegistry } from "~/lib/widget-system/registry";
import type { WidgetConfig } from "~/lib/widget-system/types";
import { Plus, Edit3, Save, X } from "lucide-react";

// Generate a simple ID
let widgetIdCounter = 0;
const generateId = () => `widget-${++widgetIdCounter}`;

// Initial demo widgets
const initialWidgets: WidgetConfig[] = [
  {
    id: generateId(),
    type: 'metric-card',
    title: 'Total Revenue',
    position: { x: 0, y: 0 },
    size: { width: 3, height: 2 },
    settings: {
      label: 'Total Revenue',
      value: 7842000,
      format: 'currency',
      showTrend: true,
      trend: { value: 12.3, label: 'vs last period' }
    }
  },
  {
    id: generateId(),
    type: 'metric-card',
    title: 'Typography ROI',
    position: { x: 3, y: 0 },
    size: { width: 3, height: 2 },
    settings: {
      label: 'Typography ROI',
      value: '10,874x',
      format: 'text',
      showTrend: true,
      trend: { value: 18.5 }
    }
  },
  {
    id: generateId(),
    type: 'line-chart',
    title: 'Font Usage Trend',
    position: { x: 6, y: 0 },
    size: { width: 6, height: 4 },
    settings: {}
  },
  {
    id: generateId(),
    type: 'data-table',
    title: 'Font Inventory',
    position: { x: 0, y: 2 },
    size: { width: 6, height: 4 },
    settings: {}
  },
  {
    id: generateId(),
    type: 'pie-chart',
    title: 'Font Distribution',
    position: { x: 6, y: 4 },
    size: { width: 4, height: 4 },
    settings: {}
  }
];

export default function WidgetDemo() {
  const [widgets, setWidgets] = useState<WidgetConfig[]>(initialWidgets);
  const [isEditing, setIsEditing] = useState(false);
  const [showWidgetLibrary, setShowWidgetLibrary] = useState(false);

  // Force light mode for this demo
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    document.body.classList.remove('dark', 'bg-background', 'text-foreground', 'bg-gradient-mesh');
    
    return () => {
      // Restore dark mode when leaving the page
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark', 'bg-background', 'text-foreground', 'bg-gradient-mesh');
    };
  }, []);

  const handleAddWidget = (type: string) => {
    const registryEntry = widgetRegistry.get(type as any);
    if (!registryEntry) return;

    const newWidget: WidgetConfig = {
      id: generateId(),
      type: type as any,
      title: registryEntry.name,
      position: { x: 0, y: 0 }, // Will be placed at top-left
      size: registryEntry.defaultSize,
      settings: registryEntry.defaultSettings
    };

    setWidgets([...widgets, newWidget]);
    setShowWidgetLibrary(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Widget Dashboard Demo</h1>
              <p className="text-sm text-gray-500 mt-1">
                Drag and drop widgets to build your custom dashboard
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setShowWidgetLibrary(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Widget
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Save Layout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    console.log('Edit button clicked');
                    setIsEditing(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit Dashboard
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Grid */}
      <div className="p-6">
        {/* Debug info */}
        {isEditing && (
          <div className="mb-4 p-2 bg-blue-100 text-blue-800 rounded">
            Edit mode is active - You can now drag widgets
          </div>
        )}
        
        <DashboardGrid
          widgets={widgets}
          isEditing={isEditing}
          onLayoutChange={setWidgets}
        />
      </div>

      {/* Widget Library Modal */}
      {showWidgetLibrary && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Widget Library</h2>
              <button
                onClick={() => setShowWidgetLibrary(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
              <div className="grid grid-cols-3 gap-4">
                {widgetRegistry.getAll().map(widget => {
                  const Icon = widget.icon;
                  return (
                    <button
                      key={widget.type}
                      onClick={() => handleAddWidget(widget.type)}
                      className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all text-left"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <Icon className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{widget.name}</h3>
                          <p className="text-sm text-gray-500 mt-1">{widget.description}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      {isEditing && (
        <div className="fixed bottom-6 left-6 bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-sm">
          <h3 className="font-medium text-blue-900 mb-2">Editing Mode</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Drag widgets to reposition them</li>
            <li>• Use resize handle in bottom-right corner</li>
            <li>• Click "Add Widget" to add new widgets</li>
            <li>• Click "Save Layout" when done</li>
          </ul>
        </div>
      )}
    </div>
  );
}
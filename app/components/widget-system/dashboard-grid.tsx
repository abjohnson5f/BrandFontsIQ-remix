import { useState, useCallback, useRef } from "react";
import type { WidgetConfig } from "~/lib/widget-system/types";
import { widgetRegistry } from "~/lib/widget-system/registry";
import { cn } from "~/lib/utils";

interface DashboardGridProps {
  widgets: WidgetConfig[];
  isEditing: boolean;
  onLayoutChange?: (widgets: WidgetConfig[]) => void;
  gridCols?: number;
  gridGap?: number;
}

export function DashboardGrid({
  widgets,
  isEditing,
  onLayoutChange,
  gridCols = 12,
  gridGap = 16
}: DashboardGridProps) {
  const [draggingWidget, setDraggingWidget] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const gridRef = useRef<HTMLDivElement>(null);

  const handleDragStart = useCallback((e: React.DragEvent, widgetId: string) => {
    if (!isEditing) return;
    
    setDraggingWidget(widgetId);
    const widget = widgets.find(w => w.id === widgetId);
    if (widget) {
      // Store the offset of where the user clicked within the widget
      const rect = e.currentTarget.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
    
    e.dataTransfer.effectAllowed = 'move';
  }, [isEditing, widgets]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    
    if (!draggingWidget || !gridRef.current) return;
    
    const gridRect = gridRef.current.getBoundingClientRect();
    const cellWidth = gridRect.width / gridCols;
    const cellHeight = 80; // Base cell height
    
    // Calculate new grid position
    const newX = Math.floor((e.clientX - gridRect.left - dragOffset.x) / cellWidth);
    const newY = Math.floor((e.clientY - gridRect.top - dragOffset.y) / cellHeight);
    
    // Update widget position
    const updatedWidgets = widgets.map(widget => {
      if (widget.id === draggingWidget) {
        return {
          ...widget,
          position: {
            x: Math.max(0, Math.min(newX, gridCols - widget.size.width)),
            y: Math.max(0, newY)
          }
        };
      }
      return widget;
    });
    
    onLayoutChange?.(updatedWidgets);
    setDraggingWidget(null);
  }, [draggingWidget, gridCols, dragOffset, widgets, onLayoutChange]);

  const handleResize = useCallback((widgetId: string, newSize: { width: number; height: number }) => {
    const updatedWidgets = widgets.map(widget => {
      if (widget.id === widgetId) {
        return {
          ...widget,
          size: {
            ...widget.size,
            width: Math.max(1, Math.min(newSize.width, gridCols)),
            height: Math.max(1, newSize.height)
          }
        };
      }
      return widget;
    });
    
    onLayoutChange?.(updatedWidgets);
  }, [widgets, gridCols, onLayoutChange]);

  // Calculate grid dimensions
  const maxRow = Math.max(...widgets.map(w => w.position.y + w.size.height), 8);

  return (
    <div
      ref={gridRef}
      className="relative w-full"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
        gridTemplateRows: `repeat(${maxRow}, 80px)`,
        gap: `${gridGap}px`,
        minHeight: `${maxRow * 80 + (maxRow - 1) * gridGap}px`
      }}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {widgets.map(widget => {
        const registryEntry = widgetRegistry.get(widget.type);
        if (!registryEntry) return null;
        
        const WidgetComponent = registryEntry.component;
        
        return (
          <div
            key={widget.id}
            className={cn(
              "relative bg-white rounded-lg shadow-sm border",
              isEditing ? "border-blue-400 cursor-move hover:shadow-lg transition-all" : "border-gray-200",
              draggingWidget === widget.id && "opacity-50"
            )}
            style={{
              gridColumn: `${widget.position.x + 1} / span ${widget.size.width}`,
              gridRow: `${widget.position.y + 1} / span ${widget.size.height}`
            }}
            draggable={isEditing}
            onDragStart={(e) => handleDragStart(e, widget.id)}
          >
            {/* Widget Header */}
            {widget.title && (
              <div className="px-4 py-2 border-b border-gray-200">
                <h3 className="text-sm font-medium text-gray-900">{widget.title}</h3>
              </div>
            )}
            
            {/* Widget Content */}
            <div className="p-4 h-full">
              <WidgetComponent
                config={widget}
                isEditing={isEditing}
                onUpdate={(updatedConfig) => {
                  const updatedWidgets = widgets.map(w =>
                    w.id === widget.id ? updatedConfig : w
                  );
                  onLayoutChange?.(updatedWidgets);
                }}
                onRemove={() => {
                  const updatedWidgets = widgets.filter(w => w.id !== widget.id);
                  onLayoutChange?.(updatedWidgets);
                }}
              />
            </div>
            
            {/* Resize Handle */}
            {isEditing && (
              <div
                className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
                onMouseDown={(e) => {
                  e.preventDefault();
                  const startX = e.clientX;
                  const startY = e.clientY;
                  const startWidth = widget.size.width;
                  const startHeight = widget.size.height;
                  
                  const handleMouseMove = (e: MouseEvent) => {
                    const cellWidth = gridRef.current!.offsetWidth / gridCols;
                    const deltaX = Math.round((e.clientX - startX) / cellWidth);
                    const deltaY = Math.round((e.clientY - startY) / 80);
                    
                    handleResize(widget.id, {
                      width: startWidth + deltaX,
                      height: startHeight + deltaY
                    });
                  };
                  
                  const handleMouseUp = () => {
                    document.removeEventListener('mousemove', handleMouseMove);
                    document.removeEventListener('mouseup', handleMouseUp);
                  };
                  
                  document.addEventListener('mousemove', handleMouseMove);
                  document.addEventListener('mouseup', handleMouseUp);
                }}
              >
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17 17h-3v2h3c1.1 0 2-.9 2-2v-3h-2v3zM3 17v-3H1v3c0 1.1.9 2 2 2h3v-2H3z"/>
                </svg>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
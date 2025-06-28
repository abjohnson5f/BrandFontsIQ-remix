import { lazy, Suspense } from "react";

// Lazy load the client-only component
const WidgetDemoClient = lazy(() => import("./widget-demo.client"));

export default function WidgetDemo() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900">Widget Dashboard Demo</h1>
                  <p className="text-sm text-gray-500 mt-1">Loading widget system...</p>
                </div>
              </div>
            </div>
          </header>
          <div className="p-6 flex items-center justify-center">
            <div className="text-gray-500">Loading...</div>
          </div>
        </div>
      }
    >
      <WidgetDemoClient />
    </Suspense>
  );
}
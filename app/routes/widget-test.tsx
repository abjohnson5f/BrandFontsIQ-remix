import { useState } from "react";

export default function WidgetTest() {
  const [count, setCount] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Simple Widget Test</h1>
      
      <div className="space-y-4">
        <div>
          <button 
            onClick={() => setCount(count + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Count: {count}
          </button>
        </div>
        
        <div>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Edit Mode: {isEditing ? 'ON' : 'OFF'}
          </button>
        </div>
        
        {isEditing && (
          <div className="p-4 bg-yellow-100 rounded">
            Edit mode is active!
          </div>
        )}
      </div>
    </div>
  );
}
import { Link } from "@remix-run/react";
import { Search, Grid3X3, HelpCircle, ChevronDown } from "lucide-react";

export function ThoughtSpotHeader() {
  return (
    <header className="ts-header fixed top-0 left-0 right-0 z-50 h-14">
      <div className="h-full px-4 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
              <span className="text-[hsl(var(--ts-header))] font-bold text-sm">BF</span>
            </div>
            <span className="text-white font-medium">BrandFontsIQ</span>
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Search Icon */}
          <button className="w-9 h-9 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors">
            <Search className="w-5 h-5 text-white" />
          </button>
          
          {/* Grid Icon */}
          <button className="w-9 h-9 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors">
            <Grid3X3 className="w-5 h-5 text-white" />
          </button>
          
          {/* Help Icon */}
          <button className="w-9 h-9 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors">
            <HelpCircle className="w-5 h-5 text-white" />
          </button>
          
          {/* Sales Dropdown */}
          <button className="flex items-center gap-1 px-3 py-1.5 rounded-md hover:bg-white/10 transition-colors">
            <span className="text-white text-sm font-medium">Sales</span>
            <ChevronDown className="w-4 h-4 text-white" />
          </button>
          
          {/* User Avatar */}
          <button className="w-9 h-9 rounded-full bg-[#4a90e2] flex items-center justify-center text-white font-medium text-sm">
            AJ
          </button>
        </div>
      </div>
    </header>
  );
}
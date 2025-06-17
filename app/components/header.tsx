import { Link } from "@remix-run/react";
import { Upload } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800/50 glass-header">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              BrandFontsIQ
            </span>
            <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs font-semibold rounded uppercase tracking-wide">
              Enterprise
            </span>
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white rounded-lg transition-all">
              <span className="text-sm">Glossary</span>
            </button>
            
            {/* Avatar placeholder */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold">
              AJ
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
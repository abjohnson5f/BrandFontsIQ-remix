import { Link, useParams } from "@remix-run/react";
import { Users, FileText, Shield, TrendingUp, Home } from "lucide-react";

const personas = [
  { id: 'executive', name: 'Executive', icon: TrendingUp },
  { id: 'brand-marketing', name: 'Brand & Marketing', icon: Users },
  { id: 'creative-design', name: 'Creative & Design', icon: FileText },
  { id: 'legal-technical', name: 'Legal & Technical', icon: Shield }
];

interface PersonaSidebarProps {
  companyName: string;
  stats?: {
    totalValue?: string;
    roi?: string;
    fontInstances?: number;
  };
}

export function PersonaSidebar({ companyName, stats = {} }: PersonaSidebarProps) {
  const params = useParams();
  const currentPersona = params.persona;

  return (
    <aside className="w-64 glass-header border-r border-gray-800/50 h-full">
      <div className="p-6">
        {/* Company Name */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
          >
            <Home className="w-4 h-4" />
            <span className="text-sm">All Companies</span>
          </Link>
          <h2 className="text-xl font-bold text-white">{companyName}</h2>
          <p className="text-sm text-gray-400 mt-1">Typography Analysis</p>
        </div>

        {/* Persona Navigation */}
        <nav className="space-y-2">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Views</p>
          {personas.map((persona) => {
            const Icon = persona.icon;
            const isActive = currentPersona === persona.id;
            
            return (
              <Link
                key={persona.id}
                to={`/dashboard/${params.company}/${persona.id}`}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                  ${isActive 
                    ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/20' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{persona.name}</span>
                {persona.id !== 'executive' && (
                  <span className="ml-auto text-xs text-gray-500">Coming Soon</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Stats Summary */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-4">Quick Stats</p>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Total Value</span>
              <span className="text-white font-medium">{stats.totalValue || '$7.84B'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">ROI Multiple</span>
              <span className="text-white font-medium">{stats.roi || '10,874x'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Font Instances</span>
              <span className="text-white font-medium">{stats.fontInstances || 263}</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
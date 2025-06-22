import { Link } from "@remix-run/react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, AlertCircle, CheckCircle, MoreVertical } from "lucide-react";
import type { ReactNode } from "react";

interface CompanyStats {
  total_instances: number;
  unique_fonts: number;
  web_fonts: number;
  mobile_fonts: number;
  enrichment_percentage: number;
}

interface CompanyCardProps {
  company: {
    schema_name: string;
    display_name: string;
    industry: string;
    stats: CompanyStats;
  };
  index: number;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

function MetricItem({ label, value, color = "text-gray-400" }: { label: string; value: string | number; color?: string }) {
  return (
    <div className="flex justify-between items-center py-1">
      <span className="text-xs text-gray-500">{label}</span>
      <span className={`text-sm font-medium ${color}`}>{value}</span>
    </div>
  );
}

function StatusIcon({ percentage }: { percentage: number }) {
  if (percentage >= 80) {
    return <CheckCircle className="w-4 h-4 text-green-500" />;
  } else if (percentage >= 60) {
    return <TrendingUp className="w-4 h-4 text-blue-500" />;
  } else {
    return <AlertCircle className="w-4 h-4 text-yellow-500" />;
  }
}

export function CompanyCard({ company, index, isHovered, onHoverStart, onHoverEnd }: CompanyCardProps) {
  const riskScore = Math.round(85 - (100 - company.stats.enrichment_percentage) * 0.3);
  const costSavingPotential = Math.round(company.stats.unique_fonts * 0.15); // 15% potential savings per unique font
  
  return (
    <Link
      to={`/dashboard/${company.schema_name}/executive`}
      className="block"
    >
      <motion.div
        whileHover={{ y: -4, scale: 1.02 }}
        onHoverStart={onHoverStart}
        onHoverEnd={onHoverEnd}
        className="relative group cursor-pointer h-full"
      >
        {/* Card container with Replit-style border and background */}
        <div className="relative h-full rounded-xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm overflow-hidden transition-all duration-300 group-hover:border-gray-700 group-hover:bg-gray-900/70">
          {/* Gradient accent line at top */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 opacity-60 group-hover:opacity-100 transition-opacity" />
          
          {/* Card header */}
          <div className="p-4 pb-3">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className="font-semibold text-white text-lg leading-tight">
                  {company.display_name}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">{company.industry}</p>
              </div>
              <div className="flex items-center gap-2">
                <StatusIcon percentage={company.stats.enrichment_percentage} />
              </div>
            </div>
            
            {/* Main metric */}
            <div className="mt-3">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {company.stats.total_instances.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500">font instances</div>
            </div>
          </div>
          
          {/* Metrics section */}
          <div className="px-4 pb-4 space-y-0.5">
            <MetricItem 
              label="Unique fonts" 
              value={company.stats.unique_fonts.toLocaleString()}
              color="text-blue-400"
            />
            <MetricItem 
              label="Enrichment" 
              value={`${company.stats.enrichment_percentage}%`}
              color={company.stats.enrichment_percentage >= 80 ? "text-green-400" : "text-yellow-400"}
            />
            <MetricItem 
              label="Risk score" 
              value={`${riskScore}%`}
              color={riskScore >= 80 ? "text-green-400" : "text-orange-400"}
            />
          </div>
          
          {/* Bottom action area */}
          <div className="px-4 pb-3 pt-2 border-t border-gray-800">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">
                ${costSavingPotential}K potential savings
              </span>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="text-xs text-blue-400 font-medium"
              >
                View →
              </motion.div>
            </div>
          </div>
          
          {/* Mini visualization */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${company.stats.enrichment_percentage}%` }}
              transition={{ duration: 1, delay: index * 0.1 }}
            />
          </div>
        </div>
        
        {/* Hover tooltip with additional details */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute left-1/2 -translate-x-1/2 -bottom-24 bg-gray-900 border border-gray-700 rounded-lg p-3 z-20 whitespace-nowrap shadow-xl"
            >
              <div className="text-xs space-y-1">
                <div className="flex gap-4">
                  <div>
                    <span className="text-gray-500">Web fonts:</span>
                    <span className="text-gray-300 ml-1">{company.stats.web_fonts}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Mobile fonts:</span>
                    <span className="text-gray-300 ml-1">{company.stats.mobile_fonts}</span>
                  </div>
                </div>
                <div className="text-center text-gray-400 pt-1">
                  Click to view detailed analytics
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Link>
  );
}
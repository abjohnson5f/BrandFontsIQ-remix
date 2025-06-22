import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useParams, Link } from "@remix-run/react";
import { companiesData } from "~/lib/companies-data";
import { 
  ArrowLeft, 
  Clock, 
  ArrowUpIcon, 
  ArrowDownIcon, 
  InfoIcon, 
  TrendingUp,
  DollarSign,
  Zap,
  Shield,
  Activity,
  Target,
  CheckCircle,
  CircleDollarSign,
  Gauge,
  FileText
} from "lucide-react";
import { AnimatedCounter } from "~/components/animated-counter";

// Import our executive dashboard components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";

export async function loader({ params }: LoaderFunctionArgs) {
  const { company: companySlug, persona } = params;

  if (!companySlug || !persona) {
    throw new Response("Not found", { status: 404 });
  }

  // For now, use the hardcoded data
  const company = companiesData.find(c => c.schema_name === companySlug);
  
  if (!company) {
    throw new Response("Company not found", { status: 404 });
  }

  // Validate persona
  const validPersonas = ['executive', 'brand-marketing', 'creative-design', 'legal-technical'];
  if (!validPersonas.includes(persona)) {
    throw new Response("Invalid persona", { status: 404 });
  }

  return json({ company, persona });
}

// Hardcoded values for UI testing
const MOCK_DATA = {
  totalValueCreated: {
    value: 7842000000, // $7.842B
    improvement: 12.3,
    breakdown: {
      economic: 6960000000,
      efficiency: 582000000,
      risk: 300000000
    }
  },
  roi: {
    value: 10874,
    paybackMonths: 1.2
  },
  brandStrength: {
    current: 42,
    potential: 78,
    improvement: 36
  },
  marketPosition: {
    differentiation: 90,
    competitiveAdvantage: "Premium"
  }
};

// Enhanced Metric Card Component with glass morphism
const MetricCard = ({ 
  title, 
  value, 
  format, 
  improvement, 
  subtitle, 
  trend = "up",
  emphasis = false,
  icon: Icon,
  color = "primary"
}: any) => {
  const TrendIcon = trend === "up" ? ArrowUpIcon : ArrowDownIcon;
  const trendColor = trend === "up" ? "text-emerald-400" : "text-red-400";
  const bgTrendColor = trend === "up" ? "bg-emerald-500/10" : "bg-red-500/10";
  
  const colorClasses = {
    primary: "from-blue-500/20 to-purple-500/20 border-blue-500/20",
    success: "from-emerald-500/20 to-green-500/20 border-emerald-500/20",
    warning: "from-amber-500/20 to-orange-500/20 border-amber-500/20",
    danger: "from-red-500/20 to-pink-500/20 border-red-500/20"
  };
  
  
  return (
    <div className={`relative ${emphasis ? 'md:col-span-2' : ''}`}>
      <div className={`glass relative overflow-hidden rounded-xl border ${colorClasses[color]} bg-gradient-to-br ${emphasis ? 'p-8' : 'p-6'} transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}>
        {/* Background decoration */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
        <div className={`absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${colorClasses[color]} blur-3xl opacity-20`} />
        
        <div className="relative">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              {Icon && (
                <div className={`p-2 rounded-lg bg-gradient-to-br ${colorClasses[color]}`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
              )}
              <div>
                <p className="text-sm text-gray-400 font-medium">{title}</p>
                {subtitle && (
                  <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
                )}
              </div>
            </div>
            <InfoIcon className="h-4 w-4 text-gray-500 cursor-help hover:text-gray-400 transition-colors" />
          </div>
          
          <div className="flex items-end justify-between">
            <div>
              <div className={`${emphasis ? 'text-5xl' : 'text-4xl'} font-bold text-white tracking-tight`}>
                <AnimatedCounter 
                  value={value} 
                  format={format}
                  decimals={format === 'currency' ? 2 : 0}
                />
              </div>
            </div>
            
            {improvement && (
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${bgTrendColor}`}>
                <TrendIcon className={`h-4 w-4 ${trendColor}`} />
                <span className={`text-sm font-semibold ${trendColor}`}>
                  {trend === "up" ? "+" : ""}{improvement}%
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Value Stream Card Component
const ValueStreamCard = ({ 
  title, 
  value, 
  metrics, 
  icon: Icon, 
  color
}: any) => {
  const colorClasses = {
    green: "from-emerald-500/20 to-green-500/20 border-emerald-500/20",
    blue: "from-blue-500/20 to-cyan-500/20 border-blue-500/20",
    purple: "from-purple-500/20 to-pink-500/20 border-purple-500/20"
  };
  
  const iconColors = {
    green: "text-emerald-400",
    blue: "text-blue-400",
    purple: "text-purple-400"
  };
  
  return (
    <div className="h-full">
      <div className={`glass rounded-xl border ${colorClasses[color]} bg-gradient-to-br p-6 h-full transition-all duration-300 hover:shadow-xl`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-gradient-to-br ${colorClasses[color]}`}>
              <Icon className={`h-5 w-5 ${iconColors[color]}`} />
            </div>
            <h3 className="font-semibold text-white">{title}</h3>
          </div>
          <p className="text-2xl font-bold text-white">{value}</p>
        </div>
        
        <div className="space-y-4">
          {metrics.map((metric: any, index: number) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">{metric.name}</span>
                <span className={`text-sm font-medium ${
                  metric.status === 'positive' ? 'text-emerald-400' : 
                  metric.status === 'neutral' ? 'text-gray-300' : 'text-red-400'
                }`}>
                  {metric.value}
                </span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  style={{ width: `${metric.progress}%` }}
                  className={`h-full rounded-full bg-gradient-to-r transition-all duration-700 ${
                    color === 'green' ? 'from-emerald-500 to-green-400' :
                    color === 'blue' ? 'from-blue-500 to-cyan-400' :
                    'from-purple-500 to-pink-400'
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Executive Dashboard Component
function ExecutiveDashboard({ company }: { company: any }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Gradient background effect */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
      
      <div className="relative z-10 p-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Executive Typography Analysis</h1>
              <p className="text-gray-400 text-lg">
                Strategic value creation through typography optimization for {company.display_name || company.name}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="glass px-6 py-3 rounded-lg border border-gray-700 hover:border-gray-600 transition-all flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span className="text-sm font-medium">Export Report</span>
              </button>
              <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all flex items-center gap-2">
                <Target className="h-4 w-4" />
                <span className="text-sm">View Actions</span>
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Value Created"
            value={MOCK_DATA.totalValueCreated.value}
            format="currency"
            improvement={MOCK_DATA.totalValueCreated.improvement}
            subtitle="Annual recurring impact"
            emphasis={true}
            icon={CircleDollarSign}
            color="success"
          />
          
          <MetricCard
            title="Typography ROI"
            value={MOCK_DATA.roi.value}
            format="multiple"
            subtitle={`${MOCK_DATA.roi.paybackMonths} month payback`}
            icon={TrendingUp}
            color="primary"
          />
          
          <MetricCard
            title="Brand Strength"
            value={MOCK_DATA.brandStrength.improvement}
            format="percentage"
            improvement={null}
            subtitle="Potential uplift"
            icon={Gauge}
            color="warning"
          />
        </div>

        {/* Value Streams Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Value Creation Breakdown</h2>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Activity className="h-4 w-4" />
              <span>Real-time analysis</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ValueStreamCard
              title="Economic Value"
              value="$6.96B"
              icon={DollarSign}
              color="green"
              metrics={[
                { name: "Customer Lifetime Value", value: "+18%", progress: 75, status: "positive" },
                { name: "Conversion Rate", value: "+3.2%", progress: 45, status: "positive" },
                { name: "Brand Premium", value: "+12%", progress: 60, status: "positive" },
                { name: "Market Share Growth", value: "+8.5%", progress: 52, status: "positive" }
              ]}
            />
            
            <ValueStreamCard
              title="Efficiency Value"
              value="$582M"
              icon={Zap}
              color="blue"
              metrics={[
                { name: "Page Load Performance", value: "+42%", progress: 85, status: "positive" },
                { name: "Mobile Optimization", value: "+28%", progress: 70, status: "positive" },
                { name: "Bandwidth Reduction", value: "-35%", progress: 55, status: "positive" },
                { name: "Core Web Vitals", value: "+65%", progress: 78, status: "positive" }
              ]}
            />
            
            <ValueStreamCard
              title="Risk Mitigation"
              value="$300M"
              icon={Shield}
              color="purple"
              metrics={[
                { name: "License Compliance", value: "100%", progress: 100, status: "positive" },
                { name: "WCAG Compliance", value: "AA+", progress: 95, status: "positive" },
                { name: "Brand Consistency", value: "88%", progress: 88, status: "neutral" },
                { name: "Legal Exposure", value: "Low", progress: 92, status: "positive" }
              ]}
            />
          </div>
        </div>

        {/* Investment Summary */}
        <div>
          <div className="glass rounded-xl p-8 bg-gradient-to-br from-gray-900/50 to-gray-800/50 border border-gray-700 transition-all duration-300 hover:border-gray-600">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <p className="text-sm text-gray-400 mb-2">Total Investment Required</p>
                <div className="text-3xl font-bold text-white">
                  <AnimatedCounter value={720} prefix="$" suffix="K" />
                </div>
                <p className="text-sm text-gray-500 mt-1">One-time + Annual</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-2">Implementation Timeline</p>
                <div className="text-3xl font-bold text-white">
                  <AnimatedCounter value={14} />
                </div>
                <p className="text-sm text-gray-500 mt-1">Weeks to full value</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-2">Net Annual Value</p>
                <div className="text-3xl font-bold text-emerald-400">
                  <AnimatedCounter value={7841} format="currency" decimals={3} />
                </div>
                <p className="text-sm text-gray-500 mt-1">After all costs</p>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-700 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <CheckCircle className="h-5 w-5 text-emerald-400" />
                <span className="text-sm text-gray-300">Analysis confidence: 85% based on 263 font instances</span>
              </div>
              <Link 
                to="#" 
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                View calculation methodology →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Original Coming Soon Component
function ComingSoon({ company, persona, personaName }: any) {
  const params = useParams();
  
  return (
    <main className="container mx-auto px-4 py-20">
      <div className="max-w-2xl mx-auto text-center">
        <div className="glass rounded-2xl p-12">
          <Clock className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">Coming Soon</h2>
          <p className="text-gray-400 mb-8">
            We're building tailored insights specifically for {personaName.toLowerCase()}.
            This view will provide customized metrics, visualizations, and recommendations
            based on your role's unique needs.
          </p>
          <Link
            to={`/dashboard/${params.company}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function PersonaView() {
  const { company, persona } = useLoaderData<typeof loader>();
  const params = useParams();

  const personaNames: Record<string, string> = {
    'executive': 'Executive View',
    'brand-marketing': 'Brand & Marketing View',
    'creative-design': 'Creative & Design View',
    'legal-technical': 'Legal & Technical View'
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                to={`/dashboard/${params.company}`} 
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white">{company.name}</h1>
                <p className="text-sm text-gray-400">{personaNames[persona]}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Show Executive Dashboard for executive persona, Coming Soon for others */}
      {persona === 'executive' ? (
        <ExecutiveDashboard company={company} />
      ) : (
        <ComingSoon company={company} persona={persona} personaName={personaNames[persona]} />
      )}
    </div>
  );
}
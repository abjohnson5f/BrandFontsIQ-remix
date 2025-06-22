import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useParams, Link } from "@remix-run/react";
import { companiesData } from "~/lib/companies-data";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, ArrowUpIcon, ArrowDownIcon, InfoIcon, TrendingUp } from "lucide-react";

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

// Metric Card Component
const MetricCard = ({ 
  title, 
  value, 
  format, 
  improvement, 
  subtitle, 
  trend = "up",
  emphasis = false,
  breakdown
}: any) => {
  const TrendIcon = trend === "up" ? ArrowUpIcon : ArrowDownIcon;
  const trendColor = trend === "up" ? "text-green-500" : "text-red-500";
  
  return (
    <Card className={`relative overflow-hidden ${emphasis ? 'ring-2 ring-primary shadow-lg' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <InfoIcon className="h-4 w-4 text-muted-foreground/50 cursor-help" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-baseline justify-between">
            <span className={`${emphasis ? 'text-4xl' : 'text-3xl'} font-bold`}>
              {format === 'currency' ? `$${(value / 1000000000).toFixed(3)}B` : 
               format === 'multiple' ? `${value.toFixed(1)}x` :
               format === 'percentage' ? `${value}%` : value}
            </span>
            {improvement && (
              <div className={`flex items-center gap-1 ${trendColor}`}>
                <TrendIcon className="h-4 w-4" />
                <span className="text-sm font-semibold">+{improvement}%</span>
              </div>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
          {breakdown && (
            <div className="mt-3 space-y-1">
              {Object.entries(breakdown).map(([key, value]: [string, any]) => (
                <div key={key} className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground capitalize">{key}:</span>
                  <span className="font-medium">${(value / 1000000000).toFixed(2)}B</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
      {emphasis && (
        <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8">
          <div className="absolute inset-0 bg-primary/5 rounded-full blur-2xl" />
        </div>
      )}
    </Card>
  );
};

// Executive Dashboard Component
function ExecutiveDashboard({ company }: { company: any }) {
  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Executive Typography Analysis</h1>
          <p className="text-muted-foreground mt-1">
            Strategic value creation through typography optimization
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 text-sm border rounded-lg hover:bg-accent">
            Export Executive Report
          </button>
          <button className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
            View Recommendations
          </button>
        </div>
      </div>

      {/* Key Metrics Grid - 3 primary metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Total Value Created"
          value={MOCK_DATA.totalValueCreated.value}
          format="currency"
          improvement={MOCK_DATA.totalValueCreated.improvement}
          subtitle="Annual impact across all value streams"
          emphasis={true}
          breakdown={MOCK_DATA.totalValueCreated.breakdown}
        />
        
        <MetricCard
          title="Typography ROI"
          value={MOCK_DATA.roi.value}
          format="multiple"
          improvement={null}
          subtitle={`${MOCK_DATA.roi.paybackMonths} month payback period`}
        />
        
        <MetricCard
          title="Brand Strength Uplift"
          value={MOCK_DATA.brandStrength.improvement}
          format="percentage"
          improvement={null}
          subtitle={`From ${MOCK_DATA.brandStrength.current}% to ${MOCK_DATA.brandStrength.potential}%`}
        />
      </div>

      {/* Value Creation Breakdown */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Value Creation Analysis</CardTitle>
              <CardDescription>
                How typography optimization drives business value
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Confidence Level:</span>
              <div className="flex items-center gap-1">
                <Progress value={85} className="w-20 h-2" />
                <span className="font-medium">85%</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Economic Value */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  Economic Value
                </h3>
                <span className="text-2xl font-bold">$6.96B</span>
              </div>
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Customer Lifetime Value</span>
                    <span className="font-medium">+18%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Conversion Rate</span>
                    <span className="font-medium">+3.2%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Brand Premium</span>
                    <span className="font-medium">+12%</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
              </div>
            </div>

            {/* Efficiency Value */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full" />
                  Efficiency Value
                </h3>
                <span className="text-2xl font-bold">$582M</span>
              </div>
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Page Load Performance</span>
                    <span className="font-medium">+42%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Mobile Optimization</span>
                    <span className="font-medium">+28%</span>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Bandwidth Savings</span>
                    <span className="font-medium">-35%</span>
                  </div>
                  <Progress value={55} className="h-2" />
                </div>
              </div>
            </div>

            {/* Risk Value */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full" />
                  Risk Mitigation
                </h3>
                <span className="text-2xl font-bold">$300M</span>
              </div>
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>License Compliance</span>
                    <span className="font-medium text-green-600">Protected</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>WCAG Compliance</span>
                    <span className="font-medium">+95%</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Brand Consistency</span>
                    <span className="font-medium">+88%</span>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>
              </div>
            </div>
          </div>

          {/* Investment Overview */}
          <div className="mt-6 pt-6 border-t">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Investment Required</p>
                <p className="text-2xl font-bold">$720K</p>
                <p className="text-xs text-muted-foreground mt-1">Implementation + Annual Licensing</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Net Value Creation</p>
                <p className="text-2xl font-bold text-green-600">$7.841B</p>
                <p className="text-xs text-muted-foreground mt-1">First year impact</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Original Coming Soon Component
function ComingSoon({ company, persona, personaName }: any) {
  const params = useParams();
  
  return (
    <main className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto text-center"
      >
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
      </motion.div>
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
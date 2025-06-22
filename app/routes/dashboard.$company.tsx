import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useParams, Outlet } from "@remix-run/react";
import { ArrowLeft, Users, FileText, Shield, TrendingUp } from "lucide-react";
import { Link } from "@remix-run/react";
import { companiesData } from "~/lib/companies-data";
import { Header } from "~/components/header";
import { useCountUp } from "~/hooks/useCountUp";

export async function loader({ params }: LoaderFunctionArgs) {
  const { company: companySlug } = params;

  if (!companySlug) {
    throw new Response("Company not found", { status: 404 });
  }

  // Find company from our temporary data
  const company = companiesData.find(c => c.schema_name === companySlug);
  
  if (!company) {
    throw new Response("Company not found", { status: 404 });
  }

  // TODO: Replace with real font data from Supabase
  // For now, return the company with stats
  return json({ 
    company,
    fontUsage: [],
    metrics: []
  });
}

export default function CompanyDashboard() {
  const { company, fontUsage, metrics } = useLoaderData<typeof loader>();
  const params = useParams();
  
  // Check if we're on a persona route
  const isPersonaRoute = params.persona !== undefined;

  // Use stats from company data
  const uniqueFonts = company.stats.unique_fonts;
  const totalInstances = company.stats.total_instances;
  const enrichmentPercentage = company.stats.enrichment_percentage;
  
  // Placeholder calculations - will be replaced with real calculation engine
  const economicImpact = Math.round(totalInstances * 50 * (enrichmentPercentage / 100));
  const efficiencyGain = Math.round(uniqueFonts * 10 * (enrichmentPercentage / 100));
  const riskScore = Math.round(85 - (100 - enrichmentPercentage) * 0.3);

  const personas = [
    { id: 'executive', name: 'Executive', icon: TrendingUp },
    { id: 'brand-marketing', name: 'Brand & Marketing', icon: Users },
    { id: 'creative-design', name: 'Creative & Design', icon: FileText },
    { id: 'legal-technical', name: 'Legal & Technical', icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Show Outlet for persona routes, otherwise show company dashboard */}
      {isPersonaRoute ? (
        <Outlet />
      ) : (
        <>
          {/* Page Header */}
          <header className="border-b border-gray-800 mt-16">
            <div className="container mx-auto px-4 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                  </Link>
                  <div>
                    <h1 className="text-2xl font-bold text-white">{company.display_name}</h1>
                    <p className="text-sm text-gray-400">{company.industry}</p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="container mx-auto px-4 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div
            className="glass rounded-xl p-6 transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="text-sm text-gray-400 mb-2">Economic Impact</div>
            <div className="text-3xl font-bold text-white">{useCountUp({ end: economicImpact, duration: 2000, prefix: '$' })}</div>
            <div className="text-xs text-gray-500 mt-1">Annual value generated</div>
          </div>

          <div
            className="glass rounded-xl p-6 transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="text-sm text-gray-400 mb-2">Efficiency Gains</div>
            <div className="text-3xl font-bold text-white">{useCountUp({ end: efficiencyGain, duration: 2000 })}</div>
            <div className="text-xs text-gray-500 mt-1">Hours saved per year</div>
          </div>

          <div
            className="glass rounded-xl p-6 transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="text-sm text-gray-400 mb-2">Risk Mitigation Score</div>
            <div className="text-3xl font-bold text-white">{useCountUp({ end: riskScore, duration: 2000, suffix: '%' })}</div>
            <div className="text-xs text-gray-500 mt-1">Compliance & protection</div>
          </div>
        </div>

        {/* Font Overview */}
        <div
          className="glass rounded-xl p-6 mb-8"
        >
          <h2 className="text-xl font-semibold text-white mb-4">Font Portfolio Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-2xl font-bold text-blue-400">{uniqueFonts}</div>
              <div className="text-sm text-gray-400">Unique Fonts</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">{totalInstances}</div>
              <div className="text-sm text-gray-400">Total Instances</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">{company.stats.web_fonts}</div>
              <div className="text-sm text-gray-400">Web Fonts</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-400">{enrichmentPercentage}%</div>
              <div className="text-sm text-gray-400">Enrichment Rate</div>
            </div>
          </div>
        </div>

        {/* Persona Views */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Persona Views</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {personas.map((persona, index) => (
              <Link
                key={persona.id}
                to={`/dashboard/${params.company}/${persona.id}`}
                className="block"
              >
                <div
                  className="glass-card rounded-xl p-6 cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  <persona.icon className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-semibold text-white mb-2">{persona.name}</h3>
                  <p className="text-sm text-gray-400">View tailored insights</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
        </>
      )}
    </div>
  );
}
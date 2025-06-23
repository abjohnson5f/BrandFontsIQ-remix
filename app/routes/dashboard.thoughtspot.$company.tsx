import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Outlet } from "@remix-run/react";
import { ThoughtSpotHeader } from "~/components/thoughtspot-header";
import { ThoughtSpotTabs } from "~/components/thoughtspot-tabs";
import { ThoughtSpotMetricCard } from "~/components/thoughtspot-metric-card";
import { companiesData } from "~/lib/companies-data";
import { Star } from "lucide-react";

export async function loader({ params }: LoaderFunctionArgs) {
  const { company: companySlug } = params;

  if (!companySlug) {
    throw new Response("Not found", { status: 404 });
  }

  const company = companiesData.find(c => c.schema_name === companySlug);
  
  if (!company) {
    throw new Response("Company not found", { status: 404 });
  }

  return json({ company });
}

export default function ThoughtSpotDashboard() {
  const { company } = useLoaderData<typeof loader>();
  
  const tabs = [
    { name: "Bookings", href: `/dashboard/thoughtspot/${company.schema_name}/bookings` },
    { name: "Scorecard", href: `/dashboard/thoughtspot/${company.schema_name}/scorecard` },
    { name: "Adoption", href: `/dashboard/thoughtspot/${company.schema_name}/adoption` },
  ];
  
  return (
    <div className="min-h-screen">
      <ThoughtSpotHeader />
      
      <div className="pt-14">
        {/* Company Title Section */}
        <div className="px-6 py-4 border-b border-[hsl(var(--ts-border))]">
          <div className="flex items-center gap-2">
            <button className="text-[hsl(var(--ts-accent-blue))]">
              <Star className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-semibold text-[hsl(var(--ts-text-primary))]">
              {company.display_name || company.name} Overview
            </h1>
          </div>
        </div>
        
        {/* Tabs */}
        <ThoughtSpotTabs tabs={tabs} />
        
        {/* Main Content Area */}
        <div className="p-6">
          {/* Filter Section */}
          <div className="flex gap-3 mb-6">
            <select className="ts-filter">
              <option>Region: Americas, EMEA, APAC</option>
            </select>
            <select className="ts-filter">
              <option>Segment: SMB, Mid-Market, Enterprise</option>
            </select>
          </div>
          
          {/* Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <ThoughtSpotMetricCard
              label="Total Font Instances"
              value={company.stats.total_instances}
              change={{ value: 12.3, label: "vs last period" }}
              format="number"
            />
            <ThoughtSpotMetricCard
              label="Typography ROI"
              value="10,874x"
              subLabel="1.2 month payback"
              change={{ value: 18.5 }}
            />
            <ThoughtSpotMetricCard
              label="Brand Strength"
              value={36}
              format="percentage"
              change={{ value: -2.1, label: "vs benchmark" }}
            />
          </div>
          
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Update Card */}
            <div className="lg:col-span-1">
              <div className="bg-[#1a2332] text-white rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Weekly Update</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-2xl font-bold">
                      Font efficiency increased by 30%
                    </p>
                    <p className="text-sm text-gray-300 mt-1">in 1 week</p>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-700">
                    <p className="text-sm font-medium mb-2">Major contributing factors -</p>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>• Web font optimization</li>
                      <li>• License consolidation</li>
                      <li>• WCAG compliance</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Chart Placeholder */}
            <div className="lg:col-span-2">
              <div className="ts-card h-full">
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Font Usage Trend</h3>
                  <div className="h-64 flex items-center justify-center text-[hsl(var(--ts-text-secondary))]">
                    Chart visualization will go here
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
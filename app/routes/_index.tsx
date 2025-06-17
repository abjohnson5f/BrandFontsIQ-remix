import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { Header } from "~/components/header";
import { companiesData } from "~/lib/companies-data";

export async function loader({ request }: LoaderFunctionArgs) {
  console.log('Loading companies data (temporary hardcoded)');
  return json({ companies: companiesData });
}

export default function Index() {
  const { companies } = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Typography Intelligence
              </span>
              <br />
              <span className="text-white">
                for Modern Enterprises
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Transform your font data into actionable insights. Manage licensing, 
              track usage, and optimize your typography strategy with AI-powered analytics.
            </p>
          </div>
        </div>
      </section>

      {/* Company Showcase */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Live Dataset: Typography Patterns Across Industries
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Analyzing real font data from {companies.length} major companies to showcase the potential of typography intelligence
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {companies.map((company) => (
              <Link
                key={company.schema_name}
                to={`/dashboard/${company.schema_name}`}
                className="block"
              >
                <div className="relative group cursor-pointer transform hover:scale-105 transition-transform">
                  <div className="glass-card rounded-2xl p-6 text-center">
                    <div className="text-4xl font-bold mb-2 text-blue-400">
                      {company.stats.total_instances.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-400 mb-2">font instances</div>
                    <div className="font-medium text-white">{company.display_name}</div>
                    <div className="text-xs text-gray-500 mt-1">{company.industry}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
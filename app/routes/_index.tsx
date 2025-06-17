import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { motion, LazyMotion, domAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "@remix-run/react";
import { companiesData } from "~/lib/companies-data";

export async function loader({ request }: LoaderFunctionArgs) {
  // TODO: Replace with real Supabase data once gateway functions are accessible
  // For now, using hardcoded data that matches the executive brief
  console.log('Loading companies data (temporary hardcoded)');
  
  return json({ companies: companiesData });
}

import { Header } from "~/components/header";
import { Upload } from "lucide-react";
import { Button } from "~/components/ui/button";

export default function Index() {
  const { companies } = useLoaderData<typeof loader>();
  const [animatedCounts, setAnimatedCounts] = useState<number[]>(companies.map(() => 0));
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const intervals = companies.map((company, index) => {
      const targetCount = company.stats.total_instances;
      const increment = Math.ceil(targetCount / 50);
      let current = 0;

      return setInterval(() => {
        current = Math.min(current + increment, targetCount);
        setAnimatedCounts(prev => {
          const newCounts = [...prev];
          newCounts[index] = current;
          return newCounts;
        });

        if (current >= targetCount) {
          clearInterval(intervals[index]);
        }
      }, 30);
    });

    return () => intervals.forEach(clearInterval);
  }, [companies]);

  const totalFonts = companies.reduce((sum, c) => sum + c.stats.unique_fonts, 0);
  const totalInstances = companies.reduce((sum, c) => sum + c.stats.total_instances, 0);

  return (
    <LazyMotion features={domAnimation} strict>
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              delay: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Typography Intelligence
                </span>
                <br />
                <motion.span
                  className="text-foreground"
                  initial={{ opacity: mounted ? 1 : 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  for Modern Enterprises
                </motion.span>
              </h1>
            </div>

            <motion.p
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              initial={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Transform your font data into actionable insights. Manage licensing, 
              track usage, and optimize your typography strategy with AI-powered analytics.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Upload Data Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-8 text-center"
          >
            <h2 className="text-2xl font-bold mb-4">Get Started with Your Font Data</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Upload your font inventory data to create a personalized typography intelligence dashboard 
              and unlock insights specific to your organization.
            </p>
            <Button size="lg" className="transform hover:scale-105 btn-glow">
              <Upload className="w-5 h-5" />
              <span>Upload Data & Create Dashboard</span>
            </Button>
            <p className="mt-6 text-sm text-gray-500">
              Supports Excel, CSV, and JSON formats • Secure processing • No data stored
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Showcase */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Live Dataset: Typography Patterns Across Industries
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Analyzing real font data from {companies.length} major companies to showcase the potential of typography intelligence
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {companies.map((company, index) => (
              <Link
                key={company.schema_name}
                to={`/dashboard/${company.schema_name}`}
                className="block"
              >
                <motion.div
                  initial={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  className="relative group cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300" />
                  <div className="relative glass-card rounded-2xl p-6 text-center transition-all duration-300">
                    <motion.div
                      className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
                    >
                      {animatedCounts[index]?.toLocaleString() || "0"}
                    </motion.div>
                    <div className="text-sm text-gray-400 mb-2">font instances</div>
                    <div className="font-medium text-white">{company.display_name}</div>
                    <div className="text-xs text-gray-500 mt-1">{company.industry}</div>
                    
                    {/* Hover stats */}
                    {hoveredIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute left-1/2 -translate-x-1/2 -bottom-20 bg-gray-900 border border-gray-700 rounded-lg p-3 z-10 whitespace-nowrap"
                      >
                        <div className="text-xs text-gray-400">
                          <div>Unique fonts: {company.stats.unique_fonts.toLocaleString()}</div>
                          <div>Total instances: {company.stats.total_instances.toLocaleString()}</div>
                          <div>Enriched: {company.stats.enrichment_percentage}%</div>
                        </div>
                      </motion.div>
                    )}
                    
                    {/* Mini trend indicator */}
                    <div className="mt-3 flex items-center justify-center gap-1">
                      <div className="w-1 h-3 bg-blue-500/30 rounded-full" />
                      <div className="w-1 h-4 bg-blue-500/50 rounded-full" />
                      <div className="w-1 h-6 bg-blue-500/70 rounded-full" />
                      <div className="w-1 h-5 bg-purple-500/70 rounded-full" />
                      <div className="w-1 h-7 bg-purple-500 rounded-full animate-pulse" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          <motion.div
            initial={{ opacity: mounted ? 1 : 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-8 space-y-2"
          >
            <div className="text-sm text-gray-500">
              Live insights from {totalInstances.toLocaleString()} font instances
            </div>
            <div className="text-xs text-gray-600">
              {totalFonts.toLocaleString()} unique fonts across {companies.length} enterprise datasets
            </div>
          </motion.div>
        </div>
      </section>
    </div>
    </LazyMotion>
  );
}

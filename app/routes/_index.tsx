import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "@remix-run/react";
import { companiesData } from "~/lib/companies-data";
import { Header } from "~/components/header";
import { Upload } from "lucide-react";
import { Button } from "~/components/ui/button";
import { FeaturesGrid } from "~/components/features-grid";
import { CompanyCard } from "~/components/company-card";

export async function loader({ request }: LoaderFunctionArgs) {
  // TODO: Replace with real Supabase data once gateway functions are accessible
  // For now, using hardcoded data that matches the executive brief
  console.log('Loading companies data (temporary hardcoded)');
  
  return json({ companies: companiesData });
}

export default function Index() {
  const { companies } = useLoaderData<typeof loader>();
  const [animatedCounts, setAnimatedCounts] = useState<number[]>(companies.map(() => 0));
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    // Delay the count animation slightly so it's more noticeable
    const timeout = setTimeout(() => {
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
    }, 1000); // Wait 1 second before starting count animation

    return () => clearTimeout(timeout);
  }, [companies, isClient]);

  const totalFonts = companies.reduce((sum, c) => sum + c.stats.unique_fonts, 0);
  const totalInstances = companies.reduce((sum, c) => sum + c.stats.total_instances, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
          {isClient && (
            <>
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
            </>
          )}
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Typography Intelligence
              </span>
              <br />
              <motion.span
                className="text-foreground"
                initial={isClient ? { scale: 0.8, filter: 'blur(10px)' } : {}}
                animate={isClient ? { scale: 1, filter: 'blur(0px)' } : {}}
                transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                style={{ willChange: 'auto', zIndex: 1, display: 'inline-block' }}
              >
                for Modern Enterprises
              </motion.span>
            </h1>

            <motion.p
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              initial={isClient ? { scale: 0.8, y: 40, filter: 'blur(10px)' } : {}}
              animate={isClient ? { scale: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
              style={{ willChange: 'auto', zIndex: 1 }}
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
            initial={isClient ? { scale: 0.8, y: 40, filter: 'blur(10px)' } : {}}
            animate={isClient ? { scale: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            style={{ willChange: 'auto', zIndex: 1 }}
            className="glass-card rounded-2xl p-8 text-center"
          >
            <h2 className="text-2xl font-bold mb-4">Get Started with Your Font Data</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Upload your font inventory data to create a personalized typography intelligence dashboard 
              and unlock insights specific to your organization.
            </p>
            <Button size="lg" className="transform hover:scale-105 btn-glow transition-transform duration-200">
              <Upload className="w-5 h-5" />
              <span>Upload Data & Create Dashboard</span>
            </Button>
            <p className="mt-6 text-sm text-gray-500">
              Supports Excel, CSV, and JSON formats • Secure processing • No data stored
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <FeaturesGrid />

      {/* Company Showcase */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={isClient ? { scale: 0.8, filter: 'blur(10px)' } : {}}
            animate={isClient ? { scale: 1, filter: 'blur(0px)' } : {}}
            transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
            style={{ willChange: 'auto', zIndex: 1 }}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((company, index) => (
              <CompanyCard
                key={company.schema_name}
                company={company}
                index={index}
                isHovered={hoveredIndex === index}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
              />
            ))}
          </div>

          <motion.div
            initial={isClient ? { scale: 0.8, filter: 'blur(10px)' } : {}}
            animate={isClient ? { scale: 1, filter: 'blur(0px)' } : {}}
            transition={{ delay: 2.5, duration: 0.8, ease: "easeOut" }}
            style={{ willChange: 'auto', zIndex: 1 }}
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
  );
}
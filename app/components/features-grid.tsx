import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    title: "ROI Analytics",
    description: "Quantify font licensing costs and identify consolidation opportunities worth $35K+ annually",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Compliance Tracking",
    description: "Automated license verification reduces legal risk by 72% and prevents costly violations",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    title: "Cost Optimization",
    description: "Identify redundant licenses and negotiate volume discounts based on actual usage data",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Smart Recommendations",
    description: "AI-powered insights suggest font consolidation strategies proven to save 30-40% on licensing",
    gradient: "from-orange-500 to-red-500",
  },
  {
    title: "Font Discovery",
    description: "Automatically catalog fonts across 1000s of domains, identifying unlicensed usage instantly",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    title: "Enterprise Scale",
    description: "Manage typography across subsidiaries, brands, and regions from a single dashboard",
    gradient: "from-teal-500 to-green-500",
  },
];

export function FeaturesGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          ref={ref}
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Typography Intelligence Features
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Comprehensive tools to transform your font management into a strategic advantage
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ 
                duration: 0.6,
                delay: index * 0.1,
              }}
            >
              <motion.div
                className="glass-card rounded-2xl p-6 h-full relative overflow-hidden group"
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Gradient accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} opacity-70`} />
                
                <div className="pt-2">
                  <h3 className="text-lg font-semibold mb-3 text-white">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Subtle hover gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`} />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
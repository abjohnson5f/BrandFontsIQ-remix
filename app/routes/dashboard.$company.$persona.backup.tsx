import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useParams, Link } from "@remix-run/react";
import { supabase } from "~/lib/supabase";
import { motion } from "framer-motion";
import { ArrowLeft, Clock } from "lucide-react";

export async function loader({ params }: LoaderFunctionArgs) {
  const { company: companySlug, persona } = params;

  if (!companySlug || !persona) {
    throw new Response("Not found", { status: 404 });
  }

  // Fetch company data
  const { data: company, error } = await supabase
    .from('companies')
    .select('*')
    .eq('slug', companySlug)
    .single();

  if (error || !company) {
    throw new Response("Company not found", { status: 404 });
  }

  // Validate persona
  const validPersonas = ['executive', 'brand-marketing', 'creative-design', 'legal-technical'];
  if (!validPersonas.includes(persona)) {
    throw new Response("Invalid persona", { status: 404 });
  }

  return json({ company, persona });
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

      {/* Coming Soon Content */}
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
              We're building tailored insights specifically for {personaNames[persona].toLowerCase()}.
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
    </div>
  );
}

import { createClient } from '@supabase/supabase-js';

// Server-side Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Type definitions for our multi-tenant architecture
export interface Company {
  schema_name: string;
  display_name: string;
  parent_company?: string;
}

export interface FontInstance {
  original_font_name: string;
  standardized_font_name: string;
  use_case: string;
  environment: string;
  confidence_score: number;
}

export interface CompanyFontStats {
  total_instances: number;
  unique_fonts: number;
  web_fonts: number;
  mobile_fonts: number;
  enrichment_percentage: number;
}

// Gateway functions to access multi-tenant data
export async function getActiveCompanies(): Promise<Company[]> {
  const { data, error } = await supabaseAdmin.rpc('get_active_companies');
  
  if (error) {
    console.error('Error fetching companies:', error);
    throw new Error(`Failed to fetch companies: ${error.message}`);
  }
  
  return data || [];
}

export async function getCompanyFontStats(schemaName: string): Promise<CompanyFontStats> {
  // Get all font instances for the company
  const { data: fontData, error } = await supabaseAdmin.rpc('get_company_font_data', {
    p_schema_name: schemaName
  });
  
  if (error) {
    console.error(`Error fetching font data for ${schemaName}:`, error);
    throw new Error(`Failed to fetch font data: ${error.message}`);
  }
  
  if (!fontData || fontData.length === 0) {
    return {
      total_instances: 0,
      unique_fonts: 0,
      web_fonts: 0,
      mobile_fonts: 0,
      enrichment_percentage: 0
    };
  }
  
  // Calculate statistics
  const totalInstances = fontData.length;
  const uniqueFonts = new Set(fontData.map((f: FontInstance) => f.standardized_font_name)).size;
  const webFonts = fontData.filter((f: FontInstance) => f.use_case === 'Web Font').length;
  const mobileFonts = fontData.filter((f: FontInstance) => 
    f.environment === 'Mobile' || f.use_case === 'Mobile App Font'
  ).length;
  
  // Calculate enrichment percentage (fonts with confidence score > 0)
  const enrichedFonts = fontData.filter((f: FontInstance) => f.confidence_score && f.confidence_score > 0).length;
  const enrichmentPercentage = totalInstances > 0 ? Math.round((enrichedFonts / totalInstances) * 100) : 0;
  
  return {
    total_instances: totalInstances,
    unique_fonts: uniqueFonts,
    web_fonts: webFonts,
    mobile_fonts: mobileFonts,
    enrichment_percentage: enrichmentPercentage
  };
}

// Get detailed font data for a specific company
export async function getCompanyFontDetails(schemaName: string) {
  const { data, error } = await supabaseAdmin.rpc('get_company_font_data', {
    p_schema_name: schemaName
  });
  
  if (error) {
    console.error(`Error fetching font details for ${schemaName}:`, error);
    throw new Error(`Failed to fetch font details: ${error.message}`);
  }
  
  return data || [];
}
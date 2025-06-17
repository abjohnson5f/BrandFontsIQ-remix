import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'placeholder-anon-key';

if (supabaseUrl === 'https://placeholder.supabase.co') {
  console.warn('Missing Supabase environment variables - using placeholder client');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions for our data
export interface Company {
  id: string;
  name: string;
  slug: string;
  logo_url?: string;
  industry?: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface FontUsage {
  id: string;
  company_id: string;
  font_name: string;
  font_family?: string;
  font_provider?: string;
  usage_category?: string;
  is_primary?: boolean;
  created_at: string;
  updated_at: string;
}

export interface Metric {
  id: string;
  company_id: string;
  metric_name: string;
  metric_value: number;
  metric_unit?: string;
  metric_category?: string;
  source?: string;
  date_recorded?: string;
  created_at: string;
  updated_at: string;
}

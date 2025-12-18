
export interface AdVariation {
  id: string;
  platform: 'Google' | 'Meta' | 'TikTok' | 'LinkedIn' | 'Generic';
  headline: string;
  body: string;
  cta: string;
  persuasionPoints: string[];
}

export interface GeneratorConfig {
  productName: string;
  description: string;
  audience: string;
  tone: 'Professional' | 'Bold' | 'Witty' | 'Luxury';
  goal: 'Sales' | 'Leads' | 'Awareness';
}

export interface VerificationResult {
  statut: string;
  score_certitude: number;
  analyse_narrative: string;
  sources?: Array<{ url: string; titre: string; score?: number }>;
  metadonnees?: {
    recherches_effectuees?: string[];
    image_analyse?: boolean;
    cycles_recherche?: number;
  };
  performance?: {
    latence_totale_secondes?: number;
    total_appels_api?: number;
    chemin_execution?: string[];
  };
  journal_agents?: Array<{
    agent: string;
    score_confiance?: number;
    iteration: number;
    questions?: string[];
  }>;
}

export type HistoryItem = {
  id?: number;
  verification_id?: number;
  contenu?: string;
  statut?: string;
  score_certitude?: number;
  created_at?: string;
  date?: string;
  analyse_narrative?: string;
  [key: string]: unknown;
};

export type Profile = {
  id?: number;
  nom?: string;
  prenom?: string;
  email?: string;
  date_creation?: string;
};

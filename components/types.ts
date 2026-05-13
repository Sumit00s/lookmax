// Shared types for the analysis result
export interface AnalysisMetric {
  score: number;
  description: string;
}

export interface AnalysisResult {
  overall_score: number;
  rating_label: string;
  summary: string;
  metrics: {
    symmetry: AnalysisMetric;
    facial_thirds: AnalysisMetric;
    eye_area: AnalysisMetric;
    nose_harmony: AnalysisMetric;
    lip_proportions: AnalysisMetric;
    jawline: AnalysisMetric;
    chin: AnalysisMetric;
    cheekbone_structure: AnalysisMetric;
    skin_texture: AnalysisMetric;
    hairline: AnalysisMetric;
    grooming: AnalysisMetric;
    overall_harmony: AnalysisMetric;
  };
  photogenic_potential: AnalysisMetric;
  strengths: string[];
  improvements: { rank: number; title: string; description: string }[];
  photo_tips: string[];
  error: string | null;
  message?: string;
}

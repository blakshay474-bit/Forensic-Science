export interface ForensicService {
  id: string;
  refNo: string;
  title: string;
  icon: string;
  accent: 'primary' | 'secondary' | 'tertiary' | 'evidence-green';
  tagline: string;
  description: string;
  technologies: string[];
  capabilities: string[];
  courtroomAdmissibility: string;
  turnaroundAvg: string;
}

export interface CaseCategory {
  id: string;
  code: string;
  title: string;
  casesAnalyzed: string;
  casesCount: number;
  description: string;
  tags: string[];
  threatLevel: 'Low' | 'Medium' | 'High' | 'Critical' | 'Elevated';
  sampleCaseRef: string;
  leadAnalyst: string;
  keyVectors: string[];
  evidenceTypes: string[];
  status?: 'ACTIVE' | 'ARCHIVED' | 'CRITICAL';
  createdAt?: string;
}

export interface ModusOperandi {
  id: string;
  index: string;
  title: string;
  riskRating: 'Low Risk' | 'Medium Risk' | 'High Risk' | 'Critical Risk';
  riskColor: string;
  tag: string;
  description: string;
  behavioralTraits: string[];
  detectionDifficulty: 'Low' | 'Moderate' | 'High' | 'Extremely High';
  counterMeasures: string[];
}

export interface TeamMember {
  id: string;
  initials: string;
  name: string;
  role: string;
  credentials: string;
  bio: string;
  specialties: string[];
  publicationsCount: number;
  experienceYears: number;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  initials: string;
  designation: string;
  organization: string;
  badge: string;
}

export interface HotspotZone {
  rank: number;
  name: string;
  incidents: number;
  dominantTypes: string;
  riskLevel: 'Elevated' | 'High' | 'Severe' | 'Critical';
  coordinates: string;
  activeSurveillance: boolean;
}

export interface EvidenceArtifact {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  sha256Checksum: string;
  uploadedAt: string;
  filePath: string;
  notes?: string;
}

export interface IntakeSubmission {
  caseRef: string;
  fullName: string;
  agency: string;
  email: string;
  phone: string;
  caseType: string;
  urgency: string;
  details: string;
  status: 'PENDING_REVIEW' | 'ANALYST_ASSIGNED' | 'IN_PROCESSING' | 'COMPLETED';
  assignedLeadAnalyst: string;
  sha256CipherLock: string;
  submittedAt: string;
  evidenceArtifacts: EvidenceArtifact[];
}

export interface TrendDataPoint {
  period: string;
  solved: number;
  active: number;
  intake: number;
}

export interface AnnualResolution {
  year: string;
  total: number;
  resolved: number;
  rate: number;
}

export interface RadarCapability {
  discipline: string;
  precision: number;
  throughput: number;
  courtAdmissibility: number;
}

export interface SystemStats {
  casesAnalyzed: number;
  accuracyRate: number;
  expertAnalysts: number;
  countriesServed: number;
  activeInvestigations: number;
  pendingIntakeTickets: number;
  systemStatus: 'OPERATIONAL' | 'DEGRADED' | 'MAINTENANCE';
  timestamp: string;
}

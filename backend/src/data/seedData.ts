import type {
  ForensicService,
  CaseCategory,
  ModusOperandi,
  TeamMember,
  Testimonial,
  HotspotZone,
  AnnualResolution,
  TrendDataPoint,
  RadarCapability
} from '../types/index.ts';

export const INITIAL_SERVICES: ForensicService[] = [
  {
    id: 'biometrics',
    refNo: 'SVC-BIO-01',
    title: 'Fingerprint & Biometric Analysis',
    icon: 'fingerprint',
    accent: 'primary',
    tagline: 'Latent Print Processing & Automated AFIS Cross-Matching',
    description: 'Advanced latent fingerprint processing utilizing automated AFIS integration, micro-ridge detail analysis, palm and foot print comparison, and biometric cross-referencing with national and international security databases.',
    technologies: ['AFIS Database Engine', 'Cyanoacrylate Fuming', 'Vacuum Metal Deposition', 'Multi-Spectral Imaging'],
    capabilities: [
      'Latent print recovery from porous & non-porous surfaces',
      'High-resolution minutiae point verification',
      'Palm & partial print digital reconstruction',
      'Biometric facial landmark correlation'
    ],
    courtroomAdmissibility: '100% Daubert Standard Compliant',
    turnaroundAvg: '24-48 Hours'
  },
  {
    id: 'digital-cyber',
    refNo: 'SVC-CYB-02',
    title: 'Digital & Cyber Forensics',
    icon: 'terminal',
    accent: 'tertiary',
    tagline: 'Deep Memory, Cloud & Hardware Evidence Extraction',
    description: 'Complete digital evidence recovery from workstations, mobile smartphones, IoT appliances, darknet nodes, and virtual cloud storage. Comprehensive network intrusion analysis, zero-day malware disassembly, and illicit crypto asset tracing.',
    technologies: ['EnCase Certified', 'Cellebrite UFED Ultimate', 'Volatility Memory Framework', 'Chainalysis Reactor'],
    capabilities: [
      'Chip-off & JTAG physical mobile extractions',
      'Volatile RAM memory capture & decryption',
      'Ransomware reverse-engineering & IOC extraction',
      'Cryptocurrency multi-hop mixing attribution'
    ],
    courtroomAdmissibility: 'ISO/IEC 27037 Digital Evidence Admissible',
    turnaroundAvg: '12-36 Hours'
  },
  {
    id: 'dna-biological',
    refNo: 'SVC-DNA-03',
    title: 'DNA & Biological Evidence',
    icon: 'dna',
    accent: 'secondary',
    tagline: 'Next-Gen STR Profiling & Investigative Genetic Genealogy',
    description: 'Ultra-sensitive STR profiling, touch DNA recovery from micro-surfaces, mitochondrial DNA sequencing, forensic genetic genealogy, CODIS database searching, and clean-room contamination-free biological evidence processing.',
    technologies: ['ThermoFisher SeqStudio', 'Illumina MiSeq FGx', 'CODIS Core STRs', 'GEDmatch Pro'],
    capabilities: [
      'Touch DNA recovery down to 5 picograms',
      'Mitochondrial DNA analysis for degraded bone samples',
      'Kinship & distant genealogical ancestor mapping',
      'Y-STR profiling for mixed sexual assault evidence'
    ],
    courtroomAdmissibility: 'FBI QAS & ISO 17025 Certified',
    turnaroundAvg: '48-72 Hours'
  },
  {
    id: 'toxicology-chem',
    refNo: 'SVC-TOX-04',
    title: 'Toxicology & Analytical Chemistry',
    icon: 'science',
    accent: 'evidence-green',
    tagline: 'Mass Spectrometry Trace Identification & Poison Screening',
    description: 'High-precision drug screening, lethal poison detection, blood alcohol concentration (BAC) analysis, gunshot residue (GSR) particle characterization, accelerant fingerprinting, and trace chemical profiling with GC-MS and LC-MS/MS instruments.',
    technologies: ['Agilent 7890B GC-MS', 'Sciex Triple Quad LC-MS/MS', 'SEM-EDX for GSR', 'FTIR Spectrophotometry'],
    capabilities: [
      'Synthetic opioid & fentanyl analogue profiling',
      'Post-mortem toxicology tissue screening',
      'Gunshot residue (GSR) spherical primer detection',
      'Arson fire accelerant signature matching'
    ],
    courtroomAdmissibility: 'ABFT Accredited Analytical Methodologies',
    turnaroundAvg: '24-48 Hours'
  },
  {
    id: 'crime-scene-recon',
    refNo: 'SVC-REC-05',
    title: 'Crime Scene Reconstruction',
    icon: 'view_in_ar',
    accent: 'primary',
    tagline: '3D Spatial LiDAR Scanning & Bloodstain Trajectory Physics',
    description: 'Millimeter-accurate 3D LiDAR point cloud scene scanning, bloodstain pattern analysis (BPA), ballistic trajectory angle calculation, chronometric event sequencing, and immersive virtual reality courtroom scene reconstructions.',
    technologies: ['FARO Focus 3D Laser Scanner', 'Leica Cyclone LiDAR', 'HemoSpat BPA Software', 'Unreal Engine 5 VR HUD'],
    capabilities: [
      '3D Point-cloud spatial scene preservation',
      'Blood spatter velocity & area-of-origin calculation',
      'Bullet trajectory & line-of-fire vectoring',
      'Chronological timeline event sequencing'
    ],
    courtroomAdmissibility: 'IABPA & AFTE Standardized Validations',
    turnaroundAvg: '3-5 Days'
  },
  {
    id: 'document-handwriting',
    refNo: 'SVC-DOC-06',
    title: 'Document & Handwriting Analysis',
    icon: 'history_edu',
    accent: 'tertiary',
    tagline: 'Questioned Document Examination & Spectral Ink Verification',
    description: 'Microscopic questioned document examination, dynamic handwriting comparison, signature authenticity verification, hyperspectral ink dating, paper fiber composition profiling, and advanced detection of erased, altered, or forged instruments.',
    technologies: ['Foster+Freeman VSC 8000', 'ESDA Indented Writing Device', 'Stereomicroscopy', 'Raman Spectroscopy'],
    capabilities: [
      'Indented impression recovery on multi-page pads',
      'Hyperspectral ink age & chemical formulation testing',
      'Signature biomechanical velocity analysis',
      'Counterfeit banknote & security paper validation'
    ],
    courtroomAdmissibility: 'SWGDOC Recommended Standards Compliant',
    turnaroundAvg: '24-48 Hours'
  }
];

export const INITIAL_CASES: CaseCategory[] = [
  {
    id: 'homicide-violent',
    code: 'CAT-01-HOM',
    title: 'Homicide & Violent Crime',
    casesAnalyzed: '2,840+',
    casesCount: 2840,
    description: 'Investigation of homicides, aggravated assaults, serial offenses, and violent encounters. Comprehensive autopsy consultation, lethal wound pattern matching, ballistic firearm matching, and chronological timeline reconstruction.',
    tags: ['Bloodstain Analysis', 'Wound Patterns', 'Weapon ID', 'Time of Death', 'Ballistics'],
    threatLevel: 'Critical',
    sampleCaseRef: 'CASE #FS-2048-H',
    leadAnalyst: 'Marcus Kowalski, M.D.',
    keyVectors: ['Sharp force trauma', 'Blunt impact spatter', 'Close-contact gunshot', 'Defensive wounds'],
    evidenceTypes: ['Biological blood spatter', 'Striated bullet casings', 'Sub-dermal bruising patterns', 'Scene LiDAR map'],
    status: 'ACTIVE'
  },
  {
    id: 'cybercrime-breach',
    code: 'CAT-02-CYB',
    title: 'Cybercrime & Data Breach',
    casesAnalyzed: '4,200+',
    casesCount: 4200,
    description: 'Deep-dive investigation of ransomware campaigns, state-sponsored cyber intrusions, corporate data exfiltration, dark web botnets, credential harvesting, and high-frequency wire fraud. Complete digital lifecycle preservation.',
    tags: ['Network Forensics', 'Malware Analysis', 'Data Recovery', 'IP Tracing', 'Crypto Flow'],
    threatLevel: 'Critical',
    sampleCaseRef: 'CASE #FS-8829-C',
    leadAnalyst: 'James Mitchell (Former FBI Cyber)',
    keyVectors: ['Spear phishing vector', 'Zero-day exploit', 'C2 beaconing', 'Memory-only payload'],
    evidenceTypes: ['Volatile RAM dumps', 'Pcap packet captures', 'Encrypted database artifacts', 'Bitcoin ledger traces'],
    status: 'ACTIVE'
  },
  {
    id: 'financial-fraud',
    code: 'CAT-03-FRD',
    title: 'Financial Fraud & White-Collar',
    casesAnalyzed: '3,150+',
    casesCount: 3150,
    description: 'Forensic accounting, offshore shell entity disentanglement, multi-million dollar embezzlement, securities manipulation, Ponzi architecture, and commercial ledger manipulation with court-ready transactional exhibits.',
    tags: ['Forensic Accounting', 'Crypto Tracing', 'Document Forgery', 'Shell Companies', 'Audit Trail'],
    threatLevel: 'High',
    sampleCaseRef: 'CASE #FS-4412-F',
    leadAnalyst: 'Dr. Sarah Patel',
    keyVectors: ['Fictitious vendor billing', 'Layered offshore wire transfers', 'Forged executive sign-offs', 'Algorithmic skimming'],
    evidenceTypes: ['SWIFT transaction logs', 'Altered accounting ledgers', 'Decrypted executive emails', 'Offshore banking registry'],
    status: 'ACTIVE'
  },
  {
    id: 'narcotics-trafficking',
    code: 'CAT-04-NAR',
    title: 'Narcotics & Drug Trafficking',
    casesAnalyzed: '2,600+',
    casesCount: 2600,
    description: 'Chemical purity profiling of seized illicit substances, synthetic drug signature mapping, clandestine synthesis lab detection, and cartel distribution network topology analysis via encrypted burner telemetry.',
    tags: ['GC-MS Analysis', 'Network Mapping', 'Precursor Tracking', 'Lab Profiling', 'Purity Testing'],
    threatLevel: 'High',
    sampleCaseRef: 'CASE #FS-6190-N',
    leadAnalyst: 'Dr. Rachel Winters',
    keyVectors: ['Contraband concealment', 'Precursor chemical acquisition', 'Encrypted app communications', 'Logistics smuggling'],
    evidenceTypes: ['Spectrometry mass spectra', 'Packaged brick fingerprint stamps', 'Burner phone tower dumps', 'Residue swab assays'],
    status: 'ACTIVE'
  },
  {
    id: 'arson-fire',
    code: 'CAT-05-ARS',
    title: 'Arson & Fire Investigation',
    casesAnalyzed: '1,180+',
    casesCount: 1180,
    description: 'Determining exact origin and burn acceleration patterns in commercial and residential blazes. Chemical identification of volatile hydrocarbon accelerants, electrical fault arc mapping, and explosive blast residue testing.',
    tags: ['Accelerant Detection', 'Burn Patterns', 'Fire Modeling', 'Debris Analysis', 'Arc Mapping'],
    threatLevel: 'Medium',
    sampleCaseRef: 'CASE #FS-3091-A',
    leadAnalyst: 'Dr. Rachel Winters',
    keyVectors: ['Pour pattern ignitable liquid', 'Delayed timer ignition', 'Electrical bypass arcing', 'Multi-point origin setting'],
    evidenceTypes: ['GC-MS accelerant peak profiles', 'Char depth measurements', 'Copper wire melt beads', 'Oxygen depletion models'],
    status: 'ACTIVE'
  },
  {
    id: 'cold-cases-missing',
    code: 'CAT-06-CLD',
    title: 'Cold Cases & Missing Persons',
    casesAnalyzed: '980+',
    casesCount: 980,
    description: 'Re-examination of unsolved cold homicides and long-term missing individuals leveraging modern forensic breakthroughs: investigative genetic genealogy (IGG), isotope geographic sourcing, and 3D skull facial reconstruction.',
    tags: ['Genealogy', 'Facial Recon', 'Isotope Analysis', 'Evidence Review', 'STR Re-analysis'],
    threatLevel: 'Elevated',
    sampleCaseRef: 'CASE #FS-1014-X',
    leadAnalyst: 'Dr. Sarah Patel',
    keyVectors: ['Degraded touch evidence', 'Unidentified skeletal remains', 'Distant relative matching', 'Water isotope geographic path'],
    evidenceTypes: ['Next-Gen DNA SNP microarray', 'Enamel strontium isotope ratio', '3D reconstructed digital bust', 'Archive evidence logs'],
    status: 'ACTIVE'
  }
];

export const INITIAL_MODUS_OPERANDI: ModusOperandi[] = [
  {
    id: 'mo-01',
    index: 'MO Category 01',
    title: 'Premeditated & Planned Operations',
    riskRating: 'High Risk',
    riskColor: 'text-primary border-primary/30 bg-primary/10',
    tag: 'Low Detection Rate · High Planning',
    description: 'Highly organized crimes involving multi-week planning, target reconnaissance, and deliberate anti-forensic precautions. Perpetrators demonstrate disciplined composure and intentional counter-surveillance tactics.',
    behavioralTraits: [
      'Extensive pre-operational surveillance of target',
      'Use of disposable burner hardware and disguises',
      'Deliberate deployment of chemical bleach / scene cleaning',
      'Calculated escape routing avoiding city CCTV corridors'
    ],
    detectionDifficulty: 'High',
    counterMeasures: [
      'Macro-pattern telemetry across geographic jurisdictions',
      'Sub-microscopic touch DNA collection on indirect contact zones',
      'Time-series cellular anomaly detection algorithms'
    ]
  },
  {
    id: 'mo-02',
    index: 'MO Category 02',
    title: 'Opportunistic & Impulse Crimes',
    riskRating: 'Medium Risk',
    riskColor: 'text-scientific-ice border-scientific-ice/30 bg-scientific-ice/10',
    tag: 'High Evidence Trail · Emotional Trigger',
    description: 'Crimes committed without pre-existing forethought, sparked by sudden opportunity, financial desperation, or emotional escalation. Perpetrators leave substantial physical forensic traces due to hasty execution.',
    behavioralTraits: [
      'Zero scene preparation or cleanup attempted',
      'Immediate proximity to perpetrator residence or workplace',
      'Chaotic physical damage and mixed weapon types',
      'Unstructured discard of stolen goods or murder instruments'
    ],
    detectionDifficulty: 'Low',
    counterMeasures: [
      'Rapid latent fingerprint dusting and AFIS direct lookup',
      'Immediate blood spatter and biological DNA swabbing',
      'Neighborhood CCTV optical recognition scans'
    ]
  },
  {
    id: 'mo-03',
    index: 'MO Category 03',
    title: 'Serial & Repeat Offenders',
    riskRating: 'Critical Risk',
    riskColor: 'text-critical-red border-critical-red/30 bg-critical-red/10',
    tag: 'Pattern-Based · Escalating Severity',
    description: 'Chronic recurring criminal patterns exhibiting evolving sophistication and signature psychological rituals. Involves serial violent offenders, recurring commercial burglars, or habitual fraud operatives.',
    behavioralTraits: [
      'Consistent signature or psychological trophy-taking',
      'Progressive refinement in evading investigative detection',
      'Geographic hunting zones centered around anchor points',
      'Interval cooling-off periods between crime incidents'
    ],
    detectionDifficulty: 'Extremely High',
    counterMeasures: [
      'Rossmo geographic spatial profiling algorithms',
      'Psychological signature matrix correlation',
      'National serial crime cross-jurisdiction data linkage'
    ]
  },
  {
    id: 'mo-04',
    index: 'MO Category 04',
    title: 'Technology-Enabled Crimes',
    riskRating: 'Critical Risk',
    riskColor: 'text-tertiary border-tertiary/30 bg-tertiary/10',
    tag: 'Rapidly Evolving · High Complexity',
    description: 'Operations engineered through sophisticated cyber toolchains—ransomware-as-a-service (RaaS), AI voice/video deepfakes, dark web cryptocurrency tumbling, automated credential stuffing, and IoT network exploitation.',
    behavioralTraits: [
      'Automated script execution with multi-stage payloads',
      'Routing traffic through Tor, bulletproof proxies, and VPNs',
      'Decentralized affiliate payout networks via Monero/Tornado',
      'Deployment of zero-day exploits targeting enterprise infrastructure'
    ],
    detectionDifficulty: 'Extremely High',
    counterMeasures: [
      'Real-time network memory capture and kernel debugging',
      'Cryptocurrency multi-hop heuristic transaction graph analysis',
      'Compiler fingerprinting and code author attribution'
    ]
  },
  {
    id: 'mo-05',
    index: 'MO Category 05',
    title: 'Organized Crime Syndicates',
    riskRating: 'High Risk',
    riskColor: 'text-primary border-primary/30 bg-primary/10',
    tag: 'Multi-Jurisdictional · Cell Structure',
    description: 'Hierarchically coordinated criminal syndicates managing cross-border narcotics logistics, counterfeit goods, human trafficking, and industrial extortion. Uses compartmentalized cells and military-grade encryption.',
    behavioralTraits: [
      'Compartmentalized communication channels with ephemeral keys',
      'Use of legitimate corporate logistics fronts and freight routes',
      'Internal discipline enforcement and counter-intelligence protocols',
      'Systematic corruption and coercion of port and transit nodes'
    ],
    detectionDifficulty: 'High',
    counterMeasures: [
      'Social network link analysis and graph centrality metrics',
      'Cross-border customs manifest anomalies and cargo spectrometry',
      'Financial entity reconciliation via corporate registries'
    ]
  },
  {
    id: 'mo-06',
    index: 'MO Category 06',
    title: 'Insider Threat & Espionage',
    riskRating: 'High Risk',
    riskColor: 'text-amber-glow border-amber-glow/30 bg-amber-glow/10',
    tag: 'Hard to Detect · Privileged Access',
    description: 'Trusted personnel exploiting authorized administrative credentials to steal proprietary intellectual property, tamper with integrity records, or leak confidential state or enterprise intelligence.',
    behavioralTraits: [
      'Off-hours anomalous database access and mass file exports',
      'Unsanctioned use of encrypted USB storage or cloud staging',
      'Behavioral indicators: sudden lifestyle changes, foreign travel',
      'Attempts to wipe event viewer logs and SIEM audit records'
    ],
    detectionDifficulty: 'Extremely High',
    counterMeasures: [
      'User and Entity Behavior Analytics (UEBA) telemetry',
      'File integrity monitoring with immutable cryptographic logs',
      'Shadow copy and unallocated drive sector data carving'
    ]
  }
];

export const INITIAL_HOTSPOTS: HotspotZone[] = [
  {
    rank: 1,
    name: 'Metro District Central',
    incidents: 1240,
    dominantTypes: 'Cybercrime + Wire Fraud dominant',
    riskLevel: 'Critical',
    coordinates: '40.7128° N, 74.0060° W',
    activeSurveillance: true
  },
  {
    rank: 2,
    name: 'Industrial Corridor East',
    incidents: 980,
    dominantTypes: 'Narcotics + Commercial Arson dominant',
    riskLevel: 'Severe',
    coordinates: '40.7484° N, 73.9857° W',
    activeSurveillance: true
  },
  {
    rank: 3,
    name: 'Harbor Zone South',
    incidents: 845,
    dominantTypes: 'Trafficking + Cargo Smuggling dominant',
    riskLevel: 'High',
    coordinates: '40.6892° N, 74.0445° W',
    activeSurveillance: true
  },
  {
    rank: 4,
    name: 'Residential Suburbs North',
    incidents: 620,
    dominantTypes: 'Burglary + Domestic Disputes dominant',
    riskLevel: 'Elevated',
    coordinates: '40.7829° N, 73.9654° W',
    activeSurveillance: false
  },
  {
    rank: 5,
    name: 'Financial District West',
    incidents: 510,
    dominantTypes: 'White-Collar + Identity Exfiltration',
    riskLevel: 'Elevated',
    coordinates: '40.7077° N, 74.0083° W',
    activeSurveillance: true
  }
];

export const INITIAL_CORRELATION_MATRIX = {
  crimeTypes: ['Cybercrime', 'Fraud', 'Narcotics', 'Homicide', 'Arson', 'Burglary'],
  matrix: [
    [1.00, 0.84, 0.42, 0.18, 0.12, 0.31],
    [0.84, 1.00, 0.51, 0.22, 0.29, 0.45],
    [0.42, 0.51, 1.00, 0.76, 0.63, 0.58],
    [0.18, 0.22, 0.76, 1.00, 0.48, 0.35],
    [0.12, 0.29, 0.63, 0.48, 1.00, 0.27],
    [0.31, 0.45, 0.58, 0.35, 0.27, 1.00],
  ]
};

export const INITIAL_TEAM: TeamMember[] = [
  {
    id: 'rachel-winters',
    initials: 'DR',
    name: 'Dr. Rachel Winters',
    role: 'Chief Forensic Scientist',
    credentials: 'Ph.D. Forensic Chemistry (MIT) · ISO Senior Assessor',
    bio: '22+ years leading accredited high-containment forensics laboratories. Internationally recognized authority in trace spectroscopy, mass spectrometry, and biological chemical evidence profiling. Published 50+ peer-reviewed papers.',
    specialties: ['Trace Mass Spectrometry', 'Toxicology Profiles', 'Courtroom Testimony', 'ISO 17025 Accreditation'],
    publicationsCount: 54,
    experienceYears: 22
  },
  {
    id: 'james-mitchell',
    initials: 'JM',
    name: 'James Mitchell',
    role: 'Digital Forensics Lead',
    credentials: 'Former FBI Cyber Division · CFCE & EnCE Certified',
    bio: '16+ years investigating complex state-level hacking intrusions, ransomware syndicates, and deep web money laundering schemes. Expert in zero-day exploit attribution and chip-off memory acquisition.',
    specialties: ['Malware Reverse-Engineering', 'Mobile JTAG Extraction', 'Blockchain Tracing', 'Ransomware Attribution'],
    publicationsCount: 28,
    experienceYears: 16
  },
  {
    id: 'sarah-patel',
    initials: 'SP',
    name: 'Dr. Sarah Patel',
    role: 'Crime Analytics Director',
    credentials: 'Ph.D. Criminal Justice (Cambridge) · AI Lead',
    bio: 'Specializes in spatial crime pattern modeling, machine learning behavior classification algorithms, and high-dimensional predictive policing frameworks utilized by federal task forces globally.',
    specialties: ['Predictive Spatial Models', 'Pattern Correlation Engines', 'Hotspot Heatmaps', 'Modus Operandi Taxonomy'],
    publicationsCount: 39,
    experienceYears: 14
  },
  {
    id: 'marcus-kowalski',
    initials: 'MK',
    name: 'Marcus Kowalski',
    role: 'Forensic Pathologist',
    credentials: 'M.D. Board-Certified Pathologist · AFTE Fellow',
    bio: 'Over 18 years performing complex death investigations and wound ballistics analysis. Testified as certified expert medical witness in over 300 major homicide criminal trials worldwide.',
    specialties: ['Wound Ballistics', 'Bloodstain Pattern Analysis (BPA)', 'LiDAR Scene Recon', 'Time-of-Death Estimation'],
    publicationsCount: 42,
    experienceYears: 18
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-01',
    quote: "ForenSolve's crime pattern analysis was instrumental in connecting three cold cases spanning 15 years. Their AI-driven correlation engine identified non-obvious links our investigative task force had missed entirely.",
    author: 'Det. David Harris',
    initials: 'DH',
    designation: 'Lead Investigator',
    organization: 'NYPD Major Crimes Division',
    badge: 'COLD CASE SOLVED'
  },
  {
    id: 'test-02',
    quote: "Their digital forensics team recovered critical volatile memory evidence from encrypted drives that proved pivotal in our high-stakes corporate espionage prosecution. Exceptional technical precision and courtroom poise.",
    author: 'Laura Stevens, Esq.',
    initials: 'LS',
    designation: 'Senior Partner',
    organization: 'Sterling & Associates Law Firm',
    badge: 'FEDERAL LITIGATION'
  },
  {
    id: 'test-03',
    quote: "The predictive analytics dashboard has transformed how our regional command allocates tactical resources. Crime incidents in targeted high-risk zones dropped 34% within the first quarter of deployment.",
    author: 'Chief Robert Chen',
    initials: 'RC',
    designation: 'Chief of Police',
    organization: 'Metro Police Department',
    badge: '34% INCIDENT REDUCTION'
  }
];

export const INITIAL_ANNUAL_RESOLUTIONS: AnnualResolution[] = [
  { year: '2020', total: 1850, resolved: 1780, rate: 96.2 },
  { year: '2021', total: 2240, resolved: 2185, rate: 97.5 },
  { year: '2022', total: 2790, resolved: 2740, rate: 98.2 },
  { year: '2023', total: 3310, resolved: 3265, rate: 98.6 },
  { year: '2024', total: 3950, resolved: 3915, rate: 99.1 },
  { year: '2025', total: 4200, resolved: 4170, rate: 99.3 },
];

export const TIMEFRAME_TRENDS: Record<string, TrendDataPoint[]> = {
  '24H': [
    { period: '00:00', solved: 4, active: 8, intake: 5 },
    { period: '04:00', solved: 2, active: 6, intake: 3 },
    { period: '08:00', solved: 9, active: 14, intake: 11 },
    { period: '12:00', solved: 15, active: 18, intake: 16 },
    { period: '16:00', solved: 18, active: 20, intake: 19 },
    { period: '20:00', solved: 12, active: 15, intake: 10 },
  ],
  '30D': [
    { period: 'Week 1', solved: 85, active: 92, intake: 88 },
    { period: 'Week 2', solved: 94, active: 98, intake: 102 },
    { period: 'Week 3', solved: 110, active: 105, intake: 115 },
    { period: 'Week 4', solved: 122, active: 112, intake: 128 },
  ],
  '1Y': [
    { period: 'Jan', solved: 320, active: 290, intake: 340 },
    { period: 'Feb', solved: 310, active: 280, intake: 330 },
    { period: 'Mar', solved: 360, active: 310, intake: 380 },
    { period: 'Apr', solved: 345, active: 295, intake: 360 },
    { period: 'May', solved: 390, active: 320, intake: 410 },
    { period: 'Jun', solved: 420, active: 350, intake: 440 },
    { period: 'Jul', solved: 450, active: 370, intake: 470 },
    { period: 'Aug', solved: 430, active: 360, intake: 450 },
    { period: 'Sep', solved: 480, active: 390, intake: 500 },
    { period: 'Oct', solved: 510, active: 410, intake: 530 },
    { period: 'Nov', solved: 495, active: 405, intake: 515 },
    { period: 'Dec', solved: 540, active: 430, intake: 560 },
  ],
  'ALL': [
    { period: '2020', solved: 1780, active: 140, intake: 1850 },
    { period: '2021', solved: 2185, active: 180, intake: 2240 },
    { period: '2022', solved: 2740, active: 210, intake: 2790 },
    { period: '2023', solved: 3265, active: 240, intake: 3310 },
    { period: '2024', solved: 3915, active: 280, intake: 3950 },
    { period: '2025', solved: 4170, active: 310, intake: 4200 },
  ]
};

export const RADAR_CAPABILITIES: RadarCapability[] = [
  { discipline: 'Biometrics & AFIS', precision: 99.4, throughput: 95.0, courtAdmissibility: 100.0 },
  { discipline: 'Digital & Cyber', precision: 98.8, throughput: 92.5, courtAdmissibility: 99.2 },
  { discipline: 'DNA & Genomics', precision: 99.9, throughput: 88.0, courtAdmissibility: 100.0 },
  { discipline: 'Toxicology & Chem', precision: 99.1, throughput: 94.2, courtAdmissibility: 99.5 },
  { discipline: 'LiDAR Crime Scene', precision: 97.9, throughput: 90.0, courtAdmissibility: 98.7 },
  { discipline: 'Document Analysis', precision: 98.2, throughput: 91.0, courtAdmissibility: 99.0 },
];

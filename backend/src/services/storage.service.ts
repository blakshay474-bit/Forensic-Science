import fs from 'node:fs';
import path from 'node:path';
import { config } from '../config/index.ts';
import type {
  ForensicService,
  CaseCategory,
  ModusOperandi,
  HotspotZone,
  TeamMember,
  Testimonial,
  IntakeSubmission
} from '../types/index.ts';
import {
  INITIAL_SERVICES,
  INITIAL_CASES,
  INITIAL_MODUS_OPERANDI,
  INITIAL_HOTSPOTS,
  INITIAL_TEAM,
  INITIAL_TESTIMONIALS
} from '../data/seedData.ts';

export class StorageService {
  private static isInitialized = false;

  private static services: ForensicService[] = [];
  private static cases: CaseCategory[] = [];
  private static modusOperandi: ModusOperandi[] = [];
  private static hotspots: HotspotZone[] = [];
  private static team: TeamMember[] = [];
  private static testimonials: Testimonial[] = [];
  private static intakeTickets: IntakeSubmission[] = [];

  /**
   * Initializes data directories and seeds default storage files if not present
   */
  public static init(): void {
    if (this.isInitialized) return;

    if (!fs.existsSync(config.dataDir)) {
      fs.mkdirSync(config.dataDir, { recursive: true });
    }

    if (!fs.existsSync(config.uploadDir)) {
      fs.mkdirSync(config.uploadDir, { recursive: true });
    }

    this.services = this.loadOrSeed('services.json', INITIAL_SERVICES);
    this.cases = this.loadOrSeed('cases.json', INITIAL_CASES);
    this.modusOperandi = this.loadOrSeed('modus_operandi.json', INITIAL_MODUS_OPERANDI);
    this.hotspots = this.loadOrSeed('hotspots.json', INITIAL_HOTSPOTS);
    this.team = this.loadOrSeed('team.json', INITIAL_TEAM);
    this.testimonials = this.loadOrSeed('testimonials.json', INITIAL_TESTIMONIALS);
    this.intakeTickets = this.loadOrSeed('intake_tickets.json', []);

    this.isInitialized = true;
    console.log('[StorageService] Persistent storage initialized successfully in', config.dataDir);
  }

  private static loadOrSeed<T>(filename: string, defaultData: T): T {
    const filePath = path.join(config.dataDir, filename);
    if (!fs.existsSync(filePath)) {
      this.atomicWrite(filePath, defaultData);
      return defaultData;
    }

    try {
      const raw = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(raw) as T;
    } catch (err) {
      console.error(`[StorageService] Error loading ${filename}, re-seeding:`, err);
      this.atomicWrite(filePath, defaultData);
      return defaultData;
    }
  }

  private static atomicWrite(filePath: string, data: any): void {
    const tempPath = `${filePath}.${Date.now()}.tmp`;
    const json = JSON.stringify(data, null, 2);
    fs.writeFileSync(tempPath, json, 'utf-8');
    fs.renameSync(tempPath, filePath);
  }

  // --- Services ---
  public static getServices(): ForensicService[] {
    return [...this.services];
  }

  public static getServiceById(id: string): ForensicService | undefined {
    return this.services.find(s => s.id === id);
  }

  // --- Cases ---
  public static getCases(): CaseCategory[] {
    return [...this.cases];
  }

  public static getCaseById(id: string): CaseCategory | undefined {
    return this.cases.find(c => c.id === id || c.code.toLowerCase() === id.toLowerCase());
  }

  public static addCase(newCase: CaseCategory): CaseCategory {
    this.cases.push(newCase);
    this.atomicWrite(path.join(config.dataDir, 'cases.json'), this.cases);
    return newCase;
  }

  // --- Modus Operandi ---
  public static getModusOperandi(): ModusOperandi[] {
    return [...this.modusOperandi];
  }

  // --- Hotspots ---
  public static getHotspots(): HotspotZone[] {
    return [...this.hotspots];
  }

  // --- Team & Testimonials ---
  public static getTeam(): TeamMember[] {
    return [...this.team];
  }

  public static getTestimonials(): Testimonial[] {
    return [...this.testimonials];
  }

  // --- Intake Submissions ---
  public static getIntakeTickets(): IntakeSubmission[] {
    return [...this.intakeTickets];
  }

  public static getIntakeTicketByRef(caseRef: string): IntakeSubmission | undefined {
    return this.intakeTickets.find(t => t.caseRef.toUpperCase() === caseRef.toUpperCase());
  }

  public static saveIntakeTicket(ticket: IntakeSubmission): IntakeSubmission {
    const index = this.intakeTickets.findIndex(t => t.caseRef === ticket.caseRef);
    if (index >= 0) {
      this.intakeTickets[index] = ticket;
    } else {
      this.intakeTickets.unshift(ticket);
    }
    this.atomicWrite(path.join(config.dataDir, 'intake_tickets.json'), this.intakeTickets);
    return ticket;
  }
}

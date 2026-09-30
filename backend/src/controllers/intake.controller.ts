import type { Request, Response, NextFunction } from 'express';
import fs from 'node:fs';
import { StorageService } from '../services/storage.service.ts';
import { CryptoService } from '../services/crypto.service.ts';
import type { IntakeSubmission, EvidenceArtifact } from '../types/index.ts';

export class IntakeController {
  /**
   * Submit a new confidential forensic case inquiry
   */
  public static async submitIntake(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { fullName, agency, email, phone, caseType, urgency, details } = req.body;

      const caseRef = CryptoService.generateCaseRef(caseType);
      const submittedAt = new Date().toISOString();
      const assignedLeadAnalyst = CryptoService.assignLeadAnalyst(caseType);

      const cipherLock = CryptoService.generateCipherLock({
        caseRef,
        fullName,
        agency,
        email,
        caseType,
        urgency,
        details,
        submittedAt
      });

      const ticket: IntakeSubmission = {
        caseRef,
        fullName,
        agency,
        email,
        phone,
        caseType,
        urgency,
        details,
        status: 'PENDING_REVIEW',
        assignedLeadAnalyst,
        sha256CipherLock: cipherLock,
        submittedAt,
        evidenceArtifacts: []
      };

      StorageService.saveIntakeTicket(ticket);

      res.status(201).json({
        success: true,
        message: 'Forensic intake consultation registered securely',
        data: ticket
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * Retrieve all intake tickets
   */
  public static async getIntakeTickets(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { status, caseType } = req.query;
      let tickets = StorageService.getIntakeTickets();

      if (status) {
        tickets = tickets.filter(t => t.status.toLowerCase() === String(status).toLowerCase());
      }
      if (caseType) {
        tickets = tickets.filter(t => t.caseType.toLowerCase().includes(String(caseType).toLowerCase()));
      }

      res.json({
        success: true,
        total: tickets.length,
        data: tickets
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * Retrieve a specific intake ticket by Case Reference ID
   */
  public static async getIntakeTicketByRef(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { caseRef } = req.params;
      const ticket = StorageService.getIntakeTicketByRef(caseRef);

      if (!ticket) {
        res.status(404).json({
          success: false,
          error: {
            message: `Forensic case ticket ${caseRef} not found in secure registry`,
            statusCode: 404
          }
        });
        return;
      }

      res.json({
        success: true,
        data: ticket
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * Upload forensic evidence files associated with a case reference
   */
  public static async uploadEvidence(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { caseRef } = req.params;
      const file = req.file;

      if (!file) {
        res.status(400).json({
          success: false,
          error: {
            message: 'No evidence file received in multipart payload',
            statusCode: 400
          }
        });
        return;
      }

      const ticket = StorageService.getIntakeTicketByRef(caseRef);
      if (!ticket) {
        res.status(404).json({
          success: false,
          error: {
            message: `Cannot attach evidence: Case ticket ${caseRef} does not exist`,
            statusCode: 404
          }
        });
        return;
      }

      // Compute SHA-256 for the uploaded file
      const fileBuffer = fs.readFileSync(file.path);
      const sha256Checksum = CryptoService.computeFileChecksum(fileBuffer);

      const evidenceArtifact: EvidenceArtifact = {
        id: `EVD-${Date.now()}`,
        filename: file.filename,
        originalName: file.originalname,
        mimeType: file.mimetype,
        sizeBytes: file.size,
        sha256Checksum,
        uploadedAt: new Date().toISOString(),
        filePath: `/uploads/${file.filename}`,
        notes: (req.body && req.body.notes) || 'Standard evidence intake ingest'
      };

      ticket.evidenceArtifacts.push(evidenceArtifact);
      StorageService.saveIntakeTicket(ticket);

      res.status(201).json({
        success: true,
        message: 'Forensic evidence artifact attached with SHA-256 checksum',
        data: evidenceArtifact
      });
    } catch (err) {
      next(err);
    }
  }
}

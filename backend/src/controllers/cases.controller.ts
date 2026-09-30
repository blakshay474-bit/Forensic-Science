import type { Request, Response, NextFunction } from 'express';
import { StorageService } from '../services/storage.service.ts';
import type { CaseCategory } from '../types/index.ts';

export class CasesController {
  /**
   * Get all case categories with search and threat filtering
   */
  public static async getCases(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { q, threat } = req.query;
      let cases = StorageService.getCases();

      if (q && typeof q === 'string') {
        const query = q.toLowerCase();
        cases = cases.filter(c =>
          c.title.toLowerCase().includes(query) ||
          c.description.toLowerCase().includes(query) ||
          c.code.toLowerCase().includes(query) ||
          c.tags.some(t => t.toLowerCase().includes(query)) ||
          c.keyVectors.some(v => v.toLowerCase().includes(query))
        );
      }

      if (threat && typeof threat === 'string' && threat.toUpperCase() !== 'ALL') {
        cases = cases.filter(c => c.threatLevel.toUpperCase() === threat.toUpperCase());
      }

      res.json({
        success: true,
        total: cases.length,
        data: cases
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * Get a single case category by ID or Code
   */
  public static async getCaseById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const caseItem = StorageService.getCaseById(id);

      if (!caseItem) {
        res.status(404).json({
          success: false,
          error: {
            message: `Case category '${id}' not found in forensics catalog`,
            statusCode: 404
          }
        });
        return;
      }

      res.json({
        success: true,
        data: caseItem
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * Register a new case dossier category
   */
  public static async createCase(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const body = req.body;
      const count = StorageService.getCases().length + 1;
      const id = body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const code = `CAT-0${count}-${body.title.substring(0, 3).toUpperCase()}`;

      const newCase: CaseCategory = {
        id,
        code,
        title: body.title,
        casesAnalyzed: '10+',
        casesCount: 10,
        description: body.description,
        tags: body.tags || [],
        threatLevel: body.threatLevel || 'Medium',
        sampleCaseRef: `CASE #FS-${Math.floor(1000 + Math.random() * 9000)}-${code.slice(-3)}`,
        leadAnalyst: body.leadAnalyst || 'Senior Forensic Investigator',
        keyVectors: body.keyVectors || [],
        evidenceTypes: body.evidenceTypes || [],
        status: 'ACTIVE',
        createdAt: new Date().toISOString()
      };

      const saved = StorageService.addCase(newCase);

      res.status(201).json({
        success: true,
        message: 'New forensic case dossier registered',
        data: saved
      });
    } catch (err) {
      next(err);
    }
  }
}

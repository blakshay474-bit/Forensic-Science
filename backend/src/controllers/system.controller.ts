import type { Request, Response, NextFunction } from 'express';
import os from 'node:os';
import { StorageService } from '../services/storage.service.ts';
import type { SystemStats } from '../types/index.ts';

const START_TIME = Date.now();

export class SystemController {
  /**
   * Health check endpoint
   */
  public static async getHealth(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const uptimeSeconds = Math.floor((Date.now() - START_TIME) / 1000);
      const freeMemMB = Math.round(os.freemem() / 1024 / 1024);
      const totalMemMB = Math.round(os.totalmem() / 1024 / 1024);

      res.json({
        success: true,
        service: 'ForenSolve Forensic Intelligence Engine',
        status: 'ONLINE',
        uptime: `${uptimeSeconds}s`,
        nodeVersion: process.version,
        environment: process.env.NODE_ENV || 'development',
        memory: {
          freeMB: freeMemMB,
          totalMB: totalMemMB,
          usagePercent: `${(((totalMemMB - freeMemMB) / totalMemMB) * 100).toFixed(1)}%`
        },
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * Return real-time command center summary & hero counters
   */
  public static async getSystemStats(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const cases = StorageService.getCases();
      const intakeTickets = StorageService.getIntakeTickets();
      const totalCases = cases.reduce((acc, c) => acc + c.casesCount, 0);

      const stats: SystemStats = {
        casesAnalyzed: totalCases,
        accuracyRate: 99.2,
        expertAnalysts: 48,
        countriesServed: 42,
        activeInvestigations: cases.filter(c => c.status === 'ACTIVE').length,
        pendingIntakeTickets: intakeTickets.filter(t => t.status === 'PENDING_REVIEW').length,
        systemStatus: 'OPERATIONAL',
        timestamp: new Date().toISOString()
      };

      res.json({
        success: true,
        data: stats
      });
    } catch (err) {
      next(err);
    }
  }
}

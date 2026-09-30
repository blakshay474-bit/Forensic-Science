import type { Request, Response, NextFunction } from 'express';
import {
  TIMEFRAME_TRENDS,
  INITIAL_ANNUAL_RESOLUTIONS,
  RADAR_CAPABILITIES
} from '../data/seedData.ts';
import { StorageService } from '../services/storage.service.ts';

export class AnalyticsController {
  /**
   * Return high-level KPI cards data
   */
  public static async getKpis(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const cases = StorageService.getCases();
      const totalAnalyzed = cases.reduce((acc, curr) => acc + curr.casesCount, 0);

      res.json({
        success: true,
        data: {
          totalCasesAnalyzed: {
            value: totalAnalyzed,
            formatted: '14,950+',
            trend: '+14.2% YoY Volume',
            isPositive: true
          },
          resolutionRate: {
            value: 99.2,
            formatted: '99.2%',
            standard: 'Daubert Court Admissibility',
            isPositive: true
          },
          averageTurnaroundHours: {
            value: 28.4,
            formatted: '28.4h',
            comparison: '-6.8h vs Federal Standard',
            isPositive: true
          },
          globalJurisdictions: {
            value: 42,
            formatted: '42 NATIONS',
            partners: '600+ Partner Agencies',
            isPositive: true
          }
        }
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * Return time-series trends by timeframe (24H, 30D, 1Y, ALL)
   */
  public static async getTrends(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const tf = (String(req.query.timeframe || '1Y')).toUpperCase();
      const trends = TIMEFRAME_TRENDS[tf] || TIMEFRAME_TRENDS['1Y'];

      res.json({
        success: true,
        timeframe: tf,
        data: trends
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * Return annual resolution historical data
   */
  public static async getResolutionHistory(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.json({
        success: true,
        data: INITIAL_ANNUAL_RESOLUTIONS
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * Return forensic discipline capability radar data
   */
  public static async getRadarCapabilities(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.json({
        success: true,
        data: RADAR_CAPABILITIES
      });
    } catch (err) {
      next(err);
    }
  }
}

import type { Request, Response, NextFunction } from 'express';
import { StorageService } from '../services/storage.service.ts';
import { INITIAL_CORRELATION_MATRIX } from '../data/seedData.ts';

export class PatternsController {
  /**
   * Return 24-hour temporal crime density heatmap
   * 7 days (Mon-Sun) x 24 hours
   */
  public static async getHeatmap(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      const hours = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`);

      // Seeded deterministic matrix with peak crime density during night / weekend hours
      const matrix = days.map((day, dIdx) => {
        return hours.map((_, hIdx) => {
          const isWeekend = dIdx >= 5;
          const isLateNight = hIdx >= 22 || hIdx <= 4;
          const isEvening = hIdx >= 18 && hIdx < 22;

          let intensity = 0.15;
          if (isWeekend && isLateNight) intensity = 0.85 + Math.sin(hIdx + dIdx) * 0.1;
          else if (isLateNight) intensity = 0.65 + Math.cos(hIdx) * 0.15;
          else if (isEvening) intensity = 0.55 + Math.sin(dIdx) * 0.1;
          else if (hIdx >= 9 && hIdx <= 17) intensity = 0.35 + (hIdx % 3) * 0.08;

          return Math.min(1.0, Math.max(0.05, parseFloat(intensity.toFixed(2))));
        });
      });

      res.json({
        success: true,
        data: {
          days,
          hours,
          densityMatrix: matrix
        }
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * Return Pearson correlation matrix across primary crime categories
   */
  public static async getCorrelationMatrix(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.json({
        success: true,
        data: INITIAL_CORRELATION_MATRIX
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * Return top crime hotspot zones
   */
  public static async getHotspots(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const hotspots = StorageService.getHotspots();
      res.json({
        success: true,
        total: hotspots.length,
        data: hotspots
      });
    } catch (err) {
      next(err);
    }
  }
}

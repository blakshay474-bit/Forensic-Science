import type { Request, Response, NextFunction } from 'express';
import { StorageService } from '../services/storage.service.ts';

export class TeamController {
  /**
   * Return expert forensic team personnel profiles
   */
  public static async getTeam(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const team = StorageService.getTeam();
      res.json({
        success: true,
        total: team.length,
        data: team
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * Return client agency testimonials
   */
  public static async getTestimonials(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const testimonials = StorageService.getTestimonials();
      res.json({
        success: true,
        total: testimonials.length,
        data: testimonials
      });
    } catch (err) {
      next(err);
    }
  }
}

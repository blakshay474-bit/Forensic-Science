import type { Request, Response, NextFunction } from 'express';
import { StorageService } from '../services/storage.service.ts';

export class ServicesController {
  /**
   * Return all forensic service capabilities
   */
  public static async getServices(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const services = StorageService.getServices();
      res.json({
        success: true,
        total: services.length,
        data: services
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * Return single forensic service by ID or refNo
   */
  public static async getServiceById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const service = StorageService.getServiceById(id) ||
        StorageService.getServices().find(s => s.refNo.toLowerCase() === id.toLowerCase());

      if (!service) {
        res.status(404).json({
          success: false,
          error: {
            message: `Forensic service '${id}' not found`,
            statusCode: 404
          }
        });
        return;
      }

      res.json({
        success: true,
        data: service
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * Return Modus Operandi categories
   */
  public static async getModusOperandi(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const mos = StorageService.getModusOperandi();
      res.json({
        success: true,
        total: mos.length,
        data: mos
      });
    } catch (err) {
      next(err);
    }
  }
}

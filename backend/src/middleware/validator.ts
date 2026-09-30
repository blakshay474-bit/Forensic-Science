import type { Request, Response, NextFunction } from 'express';
import { z, type ZodSchema } from 'zod';

export const validateBody = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        success: false,
        error: {
          message: 'Invalid forensic intake payload',
          statusCode: 400,
          issues: result.error.issues,
          timestamp: new Date().toISOString()
        }
      });
      return;
    }
    req.body = result.data;
    next();
  };
};

export const intakeSubmissionSchema = z.object({
  fullName: z.string().min(2, 'Full name is required (min 2 characters)'),
  agency: z.string().min(2, 'Agency/Law firm is required (min 2 characters)'),
  email: z.string().email('Valid official email address is required'),
  phone: z.string().min(7, 'Valid contact phone number is required'),
  caseType: z.string().default('Homicide Investigation'),
  urgency: z.string().default('Standard (48-72h Turnaround)'),
  details: z.string().min(10, 'Case brief / evidence summary must be at least 10 characters long')
});

export const newCaseSchema = z.object({
  title: z.string().min(3),
  threatLevel: z.enum(['Low', 'Medium', 'High', 'Critical', 'Elevated']),
  description: z.string().min(10),
  tags: z.array(z.string()).default([]),
  leadAnalyst: z.string().default('Senior Forensic Analyst'),
  keyVectors: z.array(z.string()).default([]),
  evidenceTypes: z.array(z.string()).default([])
});

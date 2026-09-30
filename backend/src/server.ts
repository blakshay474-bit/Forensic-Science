import express, { type Request, type Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './config/index.ts';
import { StorageService } from './services/storage.service.ts';
import { errorHandler } from './middleware/errorHandler.ts';

// Route imports
import intakeRoutes from './routes/intake.routes.ts';
import casesRoutes from './routes/cases.routes.ts';
import analyticsRoutes from './routes/analytics.routes.ts';
import patternsRoutes from './routes/patterns.routes.ts';
import servicesRoutes from './routes/services.routes.ts';
import teamRoutes from './routes/team.routes.ts';
import systemRoutes from './routes/system.routes.ts';

const app = express();

// Initialize persistent storage and seeds
StorageService.init();

// Security and utility middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
app.use(morgan(config.nodeEnv === 'development' ? 'dev' : 'combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static route for uploaded forensic evidence
app.use('/uploads', express.static(config.uploadDir));

// System health check shortcuts
app.get('/api/health', (req, res, next) => {
  systemRoutes(req, res, next);
});

// Mount modular API routes
app.use('/api/system', systemRoutes);
app.use('/api/intake', intakeRoutes);
app.use('/api/cases', casesRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/patterns', patternsRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/team', teamRoutes);

// Discovery index route
app.get('/', (_req: Request, res: Response) => {
  res.json({
    name: 'ForenSolve Forensic Intelligence API',
    version: '1.0.0',
    status: 'ACTIVE',
    documentation: {
      health: '/api/system/health',
      stats: '/api/system/stats',
      intake: '/api/intake',
      cases: '/api/cases',
      analytics: '/api/analytics/trends?timeframe=1Y',
      patterns: '/api/patterns/heatmap',
      services: '/api/services',
      team: '/api/team'
    }
  });
});

// 404 handler for unknown routes
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: {
      message: `Endpoint ${req.method} ${req.originalUrl} not found in ForenSolve API`,
      statusCode: 404
    }
  });
});

// Centralized error handler
app.use(errorHandler);

// Start server if not running inside tests
if (process.env.NODE_ENV !== 'test') {
  app.listen(config.port, () => {
    console.log(`=======================================================`);
    console.log(`🛡️  FORENSOLVE FORENSIC INTELLIGENCE BACKEND READY`);
    console.log(`📡  Server active: http://localhost:${config.port}`);
    console.log(`🏥  Health check:  http://localhost:${config.port}/api/system/health`);
    console.log(`=======================================================`);
  });
}

export default app;

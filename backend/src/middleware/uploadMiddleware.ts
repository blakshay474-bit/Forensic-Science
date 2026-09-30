import multer from 'multer';
import path from 'node:path';
import fs from 'node:fs';
import { config } from '../config/index.ts';

// Ensure upload directory exists
if (!fs.existsSync(config.uploadDir)) {
  fs.mkdirSync(config.uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, config.uploadDir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `evidence-${uniqueSuffix}${ext}`);
  }
});

const fileFilter = (
  _req: any,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (config.allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Unsupported evidence format: ${file.mimetype}. Allowed: Images, PDF, TXT, JSON, ZIP.`));
  }
};

export const evidenceUpload = multer({
  storage,
  limits: {
    fileSize: config.maxFileSizeMB * 1024 * 1024
  },
  fileFilter
});

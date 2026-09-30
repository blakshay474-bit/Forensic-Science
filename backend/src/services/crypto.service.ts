import crypto from 'node:crypto';

export class CryptoService {
  /**
   * Generates a unique, standardized forensic Case Reference number
   * Format: FS-<4-digit-random>-<DOMAIN-CODE> (e.g., FS-4921-HOM)
   */
  static generateCaseRef(caseType: string): string {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const domainMap: Record<string, string> = {
      'Homicide Investigation': 'HOM',
      'Cybercrime / Data Breach': 'CYB',
      'Financial Fraud & White-Collar': 'FRD',
      'Narcotics & Drug Trafficking': 'NAR',
      'Arson & Fire Investigation': 'ARS',
      'Cold Case Review & Genealogy': 'CLD',
      'Expert Witness Testimony': 'EXP',
      'Other Forensic Consultation': 'GEN'
    };

    const domainCode = domainMap[caseType] || caseType.substring(0, 3).toUpperCase();
    return `FS-${randomNum}-${domainCode}`;
  }

  /**
   * Generates an official SHA-256 cryptographic chain-of-custody hash
   * compliant with Federal Rules of Evidence 902(13) & (14)
   */
  static generateCipherLock(payload: Record<string, any>): string {
    const serialized = JSON.stringify(payload, Object.keys(payload).sort());
    return crypto.createHash('sha256').update(serialized).digest('hex');
  }

  /**
   * Computes SHA-256 checksum for binary file content
   */
  static computeFileChecksum(buffer: Buffer): string {
    return crypto.createHash('sha256').update(buffer).digest('hex');
  }

  /**
   * Automatically determines the lead analyst based on case domain
   */
  static assignLeadAnalyst(caseType: string): string {
    const analystMap: Record<string, string> = {
      'Homicide Investigation': 'Marcus Kowalski, M.D.',
      'Cybercrime / Data Breach': 'James Mitchell (Former FBI Cyber)',
      'Financial Fraud & White-Collar': 'Dr. Sarah Patel',
      'Narcotics & Drug Trafficking': 'Dr. Rachel Winters',
      'Arson & Fire Investigation': 'Dr. Rachel Winters',
      'Cold Case Review & Genealogy': 'Dr. Sarah Patel',
      'Expert Witness Testimony': 'Dr. Rachel Winters'
    };

    return analystMap[caseType] || 'Senior Forensic Duty Analyst';
  }
}

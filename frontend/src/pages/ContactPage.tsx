import React, { useState } from 'react';
import { DossierCard } from '../components/ui/DossierCard';
import { Modal } from '../components/ui/Modal';
import { forensicApi, IntakeTicketResponse, EvidenceArtifact } from '../services/api';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    agency: '',
    caseType: 'Homicide Investigation',
    urgency: 'Standard (48-72h Turnaround)',
    details: '',
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submittedTicket, setSubmittedTicket] = useState<IntakeTicketResponse | null>(null);
  const [uploadedEvidence, setUploadedEvidence] = useState<EvidenceArtifact | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      // 1. Submit confidential case intake
      const ticket = await forensicApi.submitIntake(formData);

      // 2. Upload evidence file if selected
      if (selectedFile) {
        try {
          const evidence = await forensicApi.uploadEvidence(ticket.caseRef, selectedFile, 'Initial consultation evidence ingest');
          setUploadedEvidence(evidence);
        } catch (uploadErr) {
          console.warn('Evidence file upload warning:', uploadErr);
        }
      }

      setSubmittedTicket(ticket);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to submit case intake. Please verify connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 py-10 space-y-12 pb-20">
      {/* Header */}
      <div className="border-b border-outline-variant pb-8">
        <div className="font-data-mono text-xs text-slate-muted mb-2 tracking-widest">
          08 // SECURE_INTAKE_PROTOCOL
        </div>
        <h1 className="font-display-lg text-3xl sm:text-4xl font-bold text-on-surface mb-3">
          Contact ForenSolve Experts
        </h1>
        <p className="font-body-md text-on-surface-variant max-w-3xl leading-relaxed">
          Submit case evidence for lab examination, schedule accredited expert witness testimony, or dispatch our emergency mobile crime scene response unit.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Information & Hotline Dossier */}
        <div className="space-y-6">
          <DossierCard
            refNo="HQ_LOC: DC-01"
            badge="OPERATIONAL 24/7"
            badgeColor="text-evidence-green border-evidence-green/30 bg-evidence-green/10"
            title="Headquarters & Laboratory"
            interactive={false}
          >
            <div className="space-y-4 text-xs font-data-mono text-on-surface-variant">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-lg">apartment</span>
                <div>
                  <div className="text-on-surface font-bold">ForenSolve Experts Inc.</div>
                  <div>1247 Forensic Boulevard, Suite 800</div>
                  <div>Washington, D.C. 20001, USA</div>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-outline-variant/60">
                <span className="material-symbols-outlined text-critical-red text-lg">emergency</span>
                <div>
                  <div className="text-critical-red font-bold">24/7 EMERGENCY DISPATCH</div>
                  <div className="text-primary font-bold text-sm">+1 (800) 555-0911</div>
                  <div className="text-[10px] text-slate-muted">Direct Mobile Rapid-Lab Response</div>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-outline-variant/60">
                <span className="material-symbols-outlined text-tertiary text-lg">mail</span>
                <div>
                  <div className="text-on-surface font-bold">ENCRYPTED INTAKE:</div>
                  <div className="text-tertiary">inquiries@forensolve.com</div>
                  <div className="text-tertiary">cases@forensolve.com</div>
                </div>
              </div>
            </div>
          </DossierCard>

          {/* Chain-of-Custody Notice */}
          <div className="p-5 bg-surface-dim border border-primary/30 space-y-2">
            <div className="flex items-center gap-2 font-label-caps text-xs text-primary font-bold">
              <span className="material-symbols-outlined text-base">verified_user</span>
              <span>CHAIN-OF-CUSTODY GUARANTEE</span>
            </div>
            <p className="font-body-md text-xs text-slate-muted leading-relaxed">
              All electronic submissions and physical transfers are logged with cryptographic timestamps conforming to ISO/IEC 17025 and Federal Rules of Evidence 902.
            </p>
          </div>
        </div>

        {/* Interactive Case Submission Form (2 cols) */}
        <div className="lg:col-span-2">
          <DossierCard
            refNo="INTAKE_FORM // REV_4"
            badge="AES-256 ENCRYPTED"
            badgeColor="text-tertiary border-tertiary/30 bg-tertiary/10"
            title="Initiate Case Telemetry & Evidence Consultation"
            interactive={false}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-data-mono text-xs">
                <div>
                  <label className="block text-slate-muted mb-1.5 font-label-caps text-[11px]">
                    FULL NAME / TITLE *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Det. Sarah Connor"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-surface-elevated border border-outline-variant text-on-surface focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-slate-muted mb-1.5 font-label-caps text-[11px]">
                    OFFICIAL AGENCY / LAW FIRM *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. State Police Department / Law LLC"
                    value={formData.agency}
                    onChange={(e) => setFormData({ ...formData, agency: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-surface-elevated border border-outline-variant text-on-surface focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-data-mono text-xs">
                <div>
                  <label className="block text-slate-muted mb-1.5 font-label-caps text-[11px]">
                    OFFICIAL EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="investigator@agency.gov"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-surface-elevated border border-outline-variant text-on-surface focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-slate-muted mb-1.5 font-label-caps text-[11px]">
                    SECURE PHONE NUMBER *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 019-2834"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-surface-elevated border border-outline-variant text-on-surface focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-data-mono text-xs">
                <div>
                  <label className="block text-slate-muted mb-1.5 font-label-caps text-[11px]">
                    CASE DOMAIN / TYPE *
                  </label>
                  <select
                    value={formData.caseType}
                    onChange={(e) => setFormData({ ...formData, caseType: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-surface-elevated border border-outline-variant text-on-surface focus:outline-none focus:border-primary transition-colors"
                  >
                    <option>Homicide Investigation</option>
                    <option>Cybercrime / Data Breach</option>
                    <option>Financial Fraud & White-Collar</option>
                    <option>Narcotics & Drug Trafficking</option>
                    <option>Arson & Fire Investigation</option>
                    <option>Cold Case Review & Genealogy</option>
                    <option>Expert Witness Testimony</option>
                    <option>Other Forensic Consultation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-muted mb-1.5 font-label-caps text-[11px]">
                    RESPONSE URGENCY *
                  </label>
                  <select
                    value={formData.urgency}
                    onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-surface-elevated border border-outline-variant text-on-surface focus:outline-none focus:border-primary transition-colors"
                  >
                    <option>Standard (48-72h Turnaround)</option>
                    <option>Expedited (24-48h Turnaround)</option>
                    <option>Critical Emergency (&lt;12h Direct Dispatch)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-muted mb-1.5 font-label-caps text-[11px]">
                  CONFIDENTIAL CASE BRIEF & EVIDENCE SUMMARY *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Summarize evidence artifacts, preliminary facts, required testing disciplines, and court timeline deadlines..."
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-surface-elevated border border-outline-variant text-on-surface focus:outline-none focus:border-primary transition-colors font-data-mono text-xs"
                />
              </div>

              {/* Optional Forensic Evidence Attachment */}
              <div className="p-4 bg-surface-elevated border border-dashed border-outline-variant hover:border-primary/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <label className="font-label-caps text-[11px] text-slate-muted flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm text-tertiary">attach_file</span>
                    ATTACH DIGITAL EVIDENCE ARTIFACT (OPTIONAL)
                  </label>
                  <span className="font-data-mono text-[10px] text-slate-muted">MAX 25MB · SHA-256 HASHED</span>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    id="evidence-upload"
                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                    className="hidden"
                    accept=".jpg,.jpeg,.png,.webp,.pdf,.txt,.json,.zip"
                  />
                  <label
                    htmlFor="evidence-upload"
                    className="cursor-pointer px-3 py-1.5 bg-surface-dim border border-outline-variant hover:border-primary text-[11px] font-data-mono text-on-surface flex items-center gap-2 transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">upload_file</span>
                    {selectedFile ? 'Change File' : 'Select Evidence File'}
                  </label>

                  {selectedFile ? (
                    <div className="flex items-center gap-2 text-xs font-data-mono text-evidence-green">
                      <span>✓ {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)</span>
                      <button
                        type="button"
                        onClick={() => setSelectedFile(null)}
                        className="text-critical-red hover:underline text-[10px]"
                      >
                        ✕ Remove
                      </button>
                    </div>
                  ) : (
                    <span className="text-[11px] font-data-mono text-slate-muted">
                      No evidence artifact attached (Images, Logs, PDF, ZIP)
                    </span>
                  )}
                </div>
              </div>

              {errorMessage && (
                <div className="p-3 bg-critical-red/10 border border-critical-red/40 text-critical-red font-data-mono text-xs flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">error</span>
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-black font-label-caps text-xs py-3.5 hover:bg-primary-container transition-colors flex items-center justify-center gap-2 btn-glow font-bold disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="material-symbols-outlined text-base animate-spin">refresh</span>
                    ENCRYPTING & DISPATCHING TO FORENSIC INTAKE...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-base">send</span>
                    SUBMIT CONFIDENTIAL CASE INQUIRY
                  </>
                )}
              </button>
            </form>
          </DossierCard>
        </div>
      </div>

      {/* Confirmation Modal */}
      {submittedTicket && (
        <Modal
          isOpen={!!submittedTicket}
          onClose={() => {
            setSubmittedTicket(null);
            setUploadedEvidence(null);
            setSelectedFile(null);
          }}
          title="CASE INTAKE TICKET GENERATED"
          refNo={submittedTicket.caseRef}
        >
          <div className="space-y-5 text-xs font-data-mono">
            <div className="p-4 bg-surface-dim border border-evidence-green text-evidence-green flex items-center gap-3">
              <span className="material-symbols-outlined text-2xl">check_circle</span>
              <div>
                <div className="font-bold text-sm">TRANSMISSION CONFIRMED & VERIFIED</div>
                <div className="text-[11px]">Assigned Tracking Reference: {submittedTicket.caseRef}</div>
              </div>
            </div>

            <p className="text-on-surface leading-relaxed">
              Thank you, <span className="text-primary font-bold">{submittedTicket.fullName}</span> ({submittedTicket.agency}). Your case submission has been securely ingested by our command center intake protocol. Assigned Lead Analyst: <span className="text-primary font-bold">{submittedTicket.assignedLeadAnalyst}</span>.
            </p>

            <div className="p-3.5 bg-surface-dim border border-outline-variant space-y-2 text-slate-muted">
              <div>DOMAIN: <span className="text-on-surface font-semibold">{submittedTicket.caseType}</span></div>
              <div>PRIORITY: <span className="text-tertiary">{submittedTicket.urgency}</span></div>
              <div>TIMESTAMP: <span className="text-on-surface">{new Date(submittedTicket.submittedAt).toLocaleString()}</span></div>
              <div className="break-all pt-1 border-t border-outline-variant/60">
                <span className="text-slate-muted block text-[10px] mb-0.5">SHA-256 CHAIN-OF-CUSTODY CIPHER LOCK:</span>
                <span className="text-evidence-green font-bold text-[11px] select-all">{submittedTicket.sha256CipherLock}</span>
              </div>
            </div>

            {uploadedEvidence && (
              <div className="p-3.5 bg-surface-elevated border border-tertiary/40 space-y-1.5 text-slate-muted">
                <div className="text-tertiary font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">verified</span>
                  EVIDENCE ARTIFACT VERIFIED & STORED
                </div>
                <div>FILE: <span className="text-on-surface font-semibold">{uploadedEvidence.originalName}</span> ({(uploadedEvidence.sizeBytes / 1024).toFixed(1)} KB)</div>
                <div className="break-all">
                  <span className="text-[10px] text-slate-muted block">CHECKSUM:</span>
                  <span className="text-primary text-[10px] select-all">{uploadedEvidence.sha256Checksum}</span>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

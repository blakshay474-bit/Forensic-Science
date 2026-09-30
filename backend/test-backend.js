import assert from 'node:assert/strict';
import test from 'node:test';

const BASE_URL = 'http://localhost:5000';

test('ForenSolve API Test Suite', async (t) => {
  await t.test('GET /api/system/health - health check responds OK', async () => {
    const res = await fetch(`${BASE_URL}/api/system/health`);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.success, true);
    assert.equal(body.status, 'ONLINE');
    assert.ok(body.uptime);
  });

  await t.test('GET /api/system/stats - hero counters exist', async () => {
    const res = await fetch(`${BASE_URL}/api/system/stats`);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.success, true);
    assert.ok(body.data.casesAnalyzed > 0);
    assert.equal(body.data.accuracyRate, 99.2);
  });

  await t.test('GET /api/services - returns all forensic services', async () => {
    const res = await fetch(`${BASE_URL}/api/services`);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.success, true);
    assert.ok(body.data.length >= 6);
  });

  await t.test('GET /api/cases - supports threat filtering', async () => {
    const res = await fetch(`${BASE_URL}/api/cases?threat=CRITICAL`);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.success, true);
    assert.ok(body.data.length > 0);
    body.data.forEach((c) => assert.equal(c.threatLevel.toUpperCase(), 'CRITICAL'));
  });

  await t.test('POST /api/intake - registers case and computes SHA-256 lock', async () => {
    const payload = {
      fullName: 'Special Agent Scully',
      agency: 'FBI Forensic Science Division',
      email: 'scully@fbi.gov',
      phone: '+1 (555) 019-7482',
      caseType: 'Cold Case Review & Genealogy',
      urgency: 'Expedited (24-48h Turnaround)',
      details: 'Cold case STR re-analysis for unidentified skeletal specimen excavated in Sector 4.'
    };

    const res = await fetch(`${BASE_URL}/api/intake`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    assert.equal(res.status, 201);
    const body = await res.json();
    assert.equal(body.success, true);
    assert.ok(body.data.caseRef.startsWith('FS-'));
    assert.equal(body.data.sha256CipherLock.length, 64);
    assert.equal(body.data.status, 'PENDING_REVIEW');
  });

  await t.test('GET /api/analytics/trends - returns timeframe telemetry', async () => {
    const res = await fetch(`${BASE_URL}/api/analytics/trends?timeframe=24H`);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.success, true);
    assert.equal(body.timeframe, '24H');
    assert.ok(body.data.length > 0);
  });

  await t.test('GET /api/patterns/heatmap - returns 24h density matrix', async () => {
    const res = await fetch(`${BASE_URL}/api/patterns/heatmap`);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.success, true);
    assert.equal(body.data.days.length, 7);
    assert.equal(body.data.hours.length, 24);
  });

  await t.test('GET /api/patterns/hotspots - returns hotspot zones', async () => {
    const res = await fetch(`${BASE_URL}/api/patterns/hotspots`);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.success, true);
    assert.ok(body.data.length >= 5);
  });
});

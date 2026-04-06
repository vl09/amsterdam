/**
 * Run: node test-buurten-sync.mjs
 * Verifies Firestore doc id encoding round-trips (same logic as index.html).
 */
import assert from 'node:assert/strict';

function toFirestoreDocId(featureId) {
  return encodeURIComponent(String(featureId));
}

function fromFirestoreDocId(docId) {
  return decodeURIComponent(docId);
}

const samples = [
  'abc-def-123',
  'naam met spaties',
  'unicode-??',
  'slash/slash',
  '100%_test'
];

for (const s of samples) {
  assert.equal(fromFirestoreDocId(toFirestoreDocId(s)), s);
}

console.log('test-buurten-sync.mjs: ok');

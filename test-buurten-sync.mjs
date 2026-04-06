#!/usr/bin/env node
/**
 * Run: node test-vote-logic.mjs
 * Mirrors vote toggle math used in index.html (shared Firestore voting).
 */
import assert from 'node:assert/strict';

function talliesFromVoters(voters) {
  let up = 0;
  let down = 0;
  for (const v of Object.values(voters)) {
    if (v === 1) up += 1;
    else if (v === -1) down += 1;
  }
  return { up, down };
}

function computeNextVote(prev, direction) {
  if (direction === 'up') {
    if (prev === 1) return 0;
    return 1;
  }
  if (prev === -1) return 0;
  return -1;
}

assert.equal(computeNextVote(0, 'up'), 1);
assert.equal(computeNextVote(1, 'up'), 0);
assert.equal(computeNextVote(-1, 'up'), 1);
assert.equal(computeNextVote(0, 'down'), -1);
assert.equal(computeNextVote(-1, 'down'), 0);
assert.equal(computeNextVote(1, 'down'), -1);

const t1 = talliesFromVoters({ a: 1, b: 1, c: -1 });
assert.equal(t1.up, 2);
assert.equal(t1.down, 1);

console.log('test-vote-logic.mjs: ok');

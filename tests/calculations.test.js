'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { parseFiniteNumber, parseNumberInRange, clamp } = require('../assets/js/shared.js');

test('parseFiniteNumber distinguishes zero from an empty value', () => {
  assert.equal(parseFiniteNumber('0'), 0);
  assert.equal(parseFiniteNumber(''), null);
  assert.equal(parseFiniteNumber('Infinity'), null);
});

test('parseNumberInRange enforces inclusive bounds', () => {
  assert.equal(parseNumberInRange('0.3', { min: 0.3, max: 20 }), 0.3);
  assert.equal(parseNumberInRange('0.29', { min: 0.3, max: 20 }), null);
  assert.equal(parseNumberInRange('21', { min: 0.3, max: 20 }), null);
});

test('clamp confines a value to the requested interval', () => {
  assert.equal(clamp(-1, 0, 10), 0);
  assert.equal(clamp(5, 0, 10), 5);
  assert.equal(clamp(11, 0, 10), 10);
});

test('scale conversion remains reversible', () => {
  const toM = { km: 1000, m: 1, cm: 0.01, mm: 0.001, in: 0.0254 };
  const fromM = { km: 0.001, m: 1, cm: 100, mm: 1000, in: 39.37007874015748 };
  const scale = 100;
  const planMillimetres = (1 * toM.m / scale) * fromM.mm;
  const realMetres = (planMillimetres * toM.mm * scale) * fromM.m;
  assert.equal(planMillimetres, 10);
  assert.equal(realMetres, 1);
});

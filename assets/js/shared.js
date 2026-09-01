(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.NSUtils = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  function parseFiniteNumber(value) {
    if (value === '' || value === null || value === undefined) return null;
    const number = Number(value);
    return Number.isFinite(number) ? number : null;
  }

  function parseNumberInRange(value, options) {
    const settings = options || {};
    const min = settings.min === undefined ? -Infinity : settings.min;
    const max = settings.max === undefined ? Infinity : settings.max;
    const number = parseFiniteNumber(value);
    return number !== null && number >= min && number <= max ? number : null;
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function setFieldError(input, message) {
    if (!input) return;
    input.setAttribute('aria-invalid', message ? 'true' : 'false');
    const errorId = input.getAttribute('aria-errormessage');
    const error = errorId ? document.getElementById(errorId) : null;
    if (error) error.textContent = message || '';
  }

  return { parseFiniteNumber, parseNumberInRange, clamp, setFieldError };
});

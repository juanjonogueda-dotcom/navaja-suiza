'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');

function createElement(value = '') {
  return {
    value,
    innerHTML: '',
    textContent: '',
    placeholder: '',
    style: {},
    dataset: {},
    offsetWidth: 1,
    classList: { add() {}, remove() {}, toggle() {} },
    setAttribute() {},
    getAttribute() { return null; },
    querySelector() { return null; },
    getBoundingClientRect() { return {}; }
  };
}

function loadStairCalculator(values) {
  const elements = {};
  const ids = [
    'btn-tipo-recta', 'btn-tipo-helicoidal', 'field-a-block', 'block-L',
    'block-ancho', 'block-diam-ext', 'block-diam-int', 'block-giro',
    'block-sentido', 'btn-sentido-horario', 'btn-sentido-antihorario',
    'unit-h', 'unit-a', 'unit-L', 'result-zone', 'hint-zone',
    'diagrams-zone', 'norm-table', 'inp-h', 'inp-a', 'inp-H', 'inp-L',
    'inp-ancho', 'inp-diam-ext', 'inp-diam-int', 'inp-giro'
  ];
  for (const id of ids) elements[id] = createElement(values[id] || '');

  const document = {
    documentElement: {},
    getElementById(id) { return elements[id] || (elements[id] = createElement()); },
    querySelectorAll() { return []; }
  };
  const context = {
    document,
    localStorage: { getItem() { return null; }, setItem() {} },
    getComputedStyle() { return { getPropertyValue() { return '#000'; } }; },
    setTimeout() {},
    console
  };
  context.globalThis = context;
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(root, 'assets/js/shared.js'), 'utf8'), context);

  const html = fs.readFileSync(path.join(root, 'escaleras.html'), 'utf8');
  const inlineScripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)];
  vm.runInContext(inlineScripts.at(-1)[1], context);
  return elements;
}

test('a standard straight stair is generated when the restored width is empty', () => {
  const elements = loadStairCalculator({
    'inp-h': '17.5',
    'inp-H': '2.80',
    'inp-ancho': '',
    'inp-diam-ext': '1.20',
    'inp-diam-int': '0.10',
    'inp-giro': '360'
  });

  assert.match(elements['result-zone'].innerHTML, /16<\/span><span class="unit-sm"> escalones/);
  assert.match(elements['diagrams-zone'].innerHTML, /representación gráfica/);
  assert.match(elements['diagrams-zone'].innerHTML, /ancho 1\.20 m/);
});

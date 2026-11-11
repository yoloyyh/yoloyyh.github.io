const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
test('train layer follows castle image crop after resize', () => {
  const values = {};
  let onResize;
  let backgroundPositionX = "0%, 0%, 50%";
  const world = { style: { setProperty(k, v) { values[k] = parseFloat(v); } } };
  const sky = { offsetWidth: 1670, offsetHeight: 941, querySelector() { return world; } };
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', 'castle-scene.js'), 'utf8'), {
    document: { querySelector(selector) { return selector === '.castle-portal-world' ? world : sky; } },
    window: { addEventListener(_type, fn) { onResize = fn; } },
    getComputedStyle() { return { backgroundPositionX }; }
  });
  assert.equal(values['--world-scale'], 1);
  assert.equal(values['--world-x'], 0);
  sky.offsetWidth = 1000; sky.offsetHeight = 941;
  onResize();
  assert.ok(Math.abs(values['--world-x'] - (1000 - 1670) * 0.5) < .001);
  backgroundPositionX = '61%';
  sky.offsetWidth = 500; sky.offsetHeight = 941;
  onResize();
  assert.equal(values['--world-scale'], 1);
  assert.ok(Math.abs(values['--world-x'] - (500 - 1670) * 0.61) < .001);
});

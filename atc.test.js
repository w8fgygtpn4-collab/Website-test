const test=require('node:test');const assert=require('node:assert/strict');const vm=require('node:vm');const fs=require('node:fs');
const context=vm.createContext({module:{exports:{}},document:{addEventListener(){}}});
vm.runInContext(fs.readFileSync(require.resolve('./atc.js'),'utf8'),context);
const {radioScenarios,evaluateRadio}=context.module.exports;
test('Radio examples include every scenario key element',()=>{assert.equal(radioScenarios.length,6);for(const s of radioScenarios){assert.ok(evaluateRadio(s,s.model).every(r=>r.matched),s.title);assert.ok(evaluateRadio(s,'').every(r=>!r.matched),s.title);}});
test('Hold-short feedback distinguishes a missing or incorrect runway',()=>{const s=radioScenarios[1];assert.equal(evaluateRadio(s,'Runway 27, via Alpha, Cessna N172SP').find(r=>r.label.startsWith('Explicit')).matched,false);assert.equal(evaluateRadio(s,'Hold short of runway 19, Cessna N172SP').find(r=>r.label.startsWith('Explicit')).matched,false);assert.equal(evaluateRadio(s,'Hold short of runway 18, Cessna N172SP').find(r=>r.label.startsWith('Explicit')).matched,true);});

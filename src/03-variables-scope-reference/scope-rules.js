import assert from 'node:assert/strict';

function createFunctionScopeValues() {
  // function の中で宣言した値は、基本的にその function の外から直接参照できない。
  const functionScopedConst = 'function内のconst';

  if (true) {
    const blockScopedConst = 'block内のconst';
    let blockScopedLet = 'block内のlet';

    // var は block scope ではなく function scope になる。
    // そのため、if ブロックの外側、ただし同じ function の中からは参照できる。
    var functionScopedVar = 'block内で宣言したvar';

    blockScopedLet = 'block内で再代入したlet';

    console.log('block内のconst:', blockScopedConst);
    console.log('block内のlet:', blockScopedLet);
  }

  return {
    functionScopedConst,
    functionScopedVar,
  };
}

function captureError(callback) {
  try {
    callback();
  } catch (error) {
    return error;
  }

  return null;
}

export function runScopeRulesExamples() {
  const blockScopeError = captureError(() => {
    // let / const は block scope を持つ。
    // block の外側から block 内の const を参照すると ReferenceError になる。
    Function(`
      "use strict";
      if (true) {
        const blockOnlyValue = "block";
      }

      return blockOnlyValue;
    `)();
  });

  console.log('block外からconstを参照したエラー:', blockScopeError?.name);

  const functionScopeValues = createFunctionScopeValues();

  console.log('function scopeで返した値:', functionScopeValues);

  // ES Modules では、ファイル直下の let / const / var は module scope に属する。
  // Node.js の ES Modules では、ファイル直下の var も globalThis のプロパティにはならない。
  const moduleLevelConst = 'module scopeのconst';
  var moduleLevelVar = 'module scopeのvar';

  const moduleScopeResults = {
    moduleLevelConst,
    moduleLevelVar,
    globalConst: globalThis.moduleLevelConst,
    globalVar: globalThis.moduleLevelVar,
  };

  console.log('ES Modulesのmodule scope確認:', moduleScopeResults);

  globalThis.__unit03TemporaryValue = '明示的なglobalThisの値';

  const explicitGlobalValue = globalThis.__unit03TemporaryValue;

  delete globalThis.__unit03TemporaryValue;

  console.log('明示的にglobalThisへ置いた値:', explicitGlobalValue);

  assert.equal(blockScopeError instanceof ReferenceError, true);
  assert.deepEqual(functionScopeValues, {
    functionScopedConst: 'function内のconst',
    functionScopedVar: 'block内で宣言したvar',
  });
  assert.deepEqual(moduleScopeResults, {
    moduleLevelConst: 'module scopeのconst',
    moduleLevelVar: 'module scopeのvar',
    globalConst: undefined,
    globalVar: undefined,
  });
  assert.equal(explicitGlobalValue, '明示的なglobalThisの値');
}

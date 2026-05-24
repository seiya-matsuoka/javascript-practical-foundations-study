import assert from 'node:assert/strict';

function executeSnippet(source) {
  try {
    // hoisting や TDZ は、同じファイル内に直接書くと実行全体が止まりやすい。
    // ここではコード片として実行し、結果とエラー名だけを観察する。
    return {
      ok: true,
      value: Function(source)(),
      errorName: null,
    };
  } catch (error) {
    return {
      ok: false,
      value: null,
      errorName: error.name,
    };
  }
}

export function runHoistingAndTdzExamples() {
  // var は hoisting され、宣言より前で参照すると undefined になる。
  const varHoistingResult = executeSnippet(`
    "use strict";
    const beforeDeclaration = legacyValue;
    var legacyValue = "declared by var";

    return {
      beforeDeclaration,
      afterDeclaration: legacyValue,
    };
  `);

  console.log('varのhoisting結果:', varHoistingResult);

  // let / const は、宣言前に参照すると temporal dead zone により ReferenceError になる。
  const letTdzResult = executeSnippet(`
    "use strict";
    const beforeDeclaration = blockValue;
    let blockValue = "declared by let";

    return beforeDeclaration;
  `);

  const constTdzResult = executeSnippet(`
    "use strict";
    const beforeDeclaration = fixedValue;
    const fixedValue = "declared by const";

    return beforeDeclaration;
  `);

  console.log('letのTDZ結果:', letTdzResult);
  console.log('constのTDZ結果:', constTdzResult);

  const functionHoistingResult = executeSnippet(`
    "use strict";

    const beforeDeclaration = createMessage("JavaScript");

    function createMessage(name) {
      return "Hello, " + name;
    }

    return beforeDeclaration;
  `);

  console.log('function宣言のhoisting結果:', functionHoistingResult);

  const functionExpressionTdzResult = executeSnippet(`
    "use strict";

    const beforeDeclaration = createMessage("JavaScript");

    const createMessage = function (name) {
      return "Hello, " + name;
    };

    return beforeDeclaration;
  `);

  console.log('function式のTDZ結果:', functionExpressionTdzResult);

  assert.deepEqual(varHoistingResult, {
    ok: true,
    value: {
      beforeDeclaration: undefined,
      afterDeclaration: 'declared by var',
    },
    errorName: null,
  });
  assert.deepEqual(letTdzResult, { ok: false, value: null, errorName: 'ReferenceError' });
  assert.deepEqual(constTdzResult, { ok: false, value: null, errorName: 'ReferenceError' });
  assert.deepEqual(functionHoistingResult, {
    ok: true,
    value: 'Hello, JavaScript',
    errorName: null,
  });
  assert.deepEqual(functionExpressionTdzResult, {
    ok: false,
    value: null,
    errorName: 'ReferenceError',
  });
}

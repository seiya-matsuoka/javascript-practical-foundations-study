import assert from 'node:assert/strict';

// function declaration は、名前付き関数を直接宣言する書き方。
// ファイルや function の中で、主要な処理として定義したい関数に使われることが多い。
function createMessageByDeclaration(name) {
  return `Hello, ${name}`;
}

// function expression は、関数を値として作り、変数に代入する書き方。
// 関数を値として扱う感覚は、callback や factory function につながる。
const createMessageByExpression = function (name) {
  return `Hi, ${name}`;
};

// 関数式にも名前を付けられる。
// 変数名とは別に関数自身の名前を持てるため、エラー調査時に役立つ場合がある。
const namedFunctionExpression = function createDetailedMessage(name, role) {
  return `${name} is ${role}`;
};

// エラーになる挙動をそのまま書くと、Unit 全体の実行が途中で止まる。
// callback として渡された処理を実行し、発生したエラーだけを値として返す補助関数。
function captureError(callback) {
  try {
    callback();
  } catch (error) {
    return error;
  }

  return null;
}

export function runFunctionDeclarationAndExpressionExamples() {
  // function declaration は、function キーワードで名前付き関数を宣言する書き方。
  // hoisting されるため、宣言より前から呼べる性質がある。
  const declarationResult = createMessageByDeclaration('JavaScript');

  console.log('関数宣言の結果:', declarationResult);

  // function expression は、関数を値として作り、変数へ代入する書き方。
  // 変数に入るため、const / let のスコープや TDZ の影響を受ける。
  const expressionResult = createMessageByExpression('Node.js');

  console.log('関数式の結果:', expressionResult);

  // named function expression は、関数式自体にも名前を付ける書き方。
  // スタックトレースや再帰処理などで名前が役立つ場合がある。
  const namedExpressionResult = namedFunctionExpression('Alice', 'admin');

  console.log('名前付き関数式の結果:', namedExpressionResult);

  // function declaration は、宣言より前に呼び出しても動く。
  // ただし、読みやすさのためには、関数定義が呼び出し元から見つけやすい位置にある方がよい。
  const declarationHoistingResult = callBeforeDeclaration();

  function callBeforeDeclaration() {
    return 'function declaration は宣言前から呼べる';
  }

  console.log('関数宣言のhoisting結果:', declarationHoistingResult);

  const expressionBeforeDeclarationError = captureError(() => {
    // function expression を const に代入する場合、宣言前の参照は TDZ により失敗する。
    // function declaration と function expression は、見た目だけでなく初期化タイミングも異なる。
    Function(`
      "use strict";

      const result = createMessage("JavaScript");

      const createMessage = function (name) {
        return "Hello, " + name;
      };

      return result;
    `)();
  });

  console.log('関数式を宣言前に呼んだエラー:', expressionBeforeDeclarationError?.name);

  assert.equal(declarationResult, 'Hello, JavaScript');
  assert.equal(expressionResult, 'Hi, Node.js');
  assert.equal(namedExpressionResult, 'Alice is admin');
  assert.equal(declarationHoistingResult, 'function declaration は宣言前から呼べる');
  assert.equal(expressionBeforeDeclarationError instanceof ReferenceError, true);
}

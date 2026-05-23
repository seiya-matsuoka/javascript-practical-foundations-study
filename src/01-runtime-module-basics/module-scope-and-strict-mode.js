import assert from 'node:assert/strict';

// ES Modules のトップレベル this は undefined になる。
// 関数の中で this を確認すると、呼び出し方によって値が変わるため、
// 「モジュールトップレベルの this」を確認したい場合は、ファイル直下で取得する。
const moduleTopLevelThis = this;

const modulePrivateValue = 'この値はmodule-scope-and-strict-mode.jsの中だけで直接参照できる';

function tryAssigningUndeclaredVariable() {
  try {
    // ES Modules は自動的に strict mode で実行される。
    // strict mode では、宣言していない変数へ代入すると ReferenceError になる。
    // これは「うっかりグローバル変数を作ってしまう」事故を防ぐ動きでもある。
    // eslint-disable-next-line no-undef
    undeclaredValueForStrictModeDemo = 'strict modeでは代入できない';
  } catch (error) {
    return error;
  }

  return null;
}

export function runModuleScopeAndStrictModeExamples() {
  console.log('モジュール内の値:', modulePrivateValue);

  // modulePrivateValue はこのファイルのモジュールスコープにある。
  // const で宣言したからといって、globalThis に自動で生えるわけではない。
  const globalLookupResult = globalThis.modulePrivateValue;

  console.log('globalThis.modulePrivateValue:', globalLookupResult);

  const strictModeError = tryAssigningUndeclaredVariable();

  console.log('未宣言変数への代入結果:', strictModeError?.name);
  console.log('エラーメッセージ:', strictModeError?.message);
  console.log('ES Modulesのトップレベルthisはundefined:', moduleTopLevelThis === undefined);

  assert.equal(globalLookupResult, undefined);
  assert.equal(strictModeError instanceof ReferenceError, true);
  assert.equal(moduleTopLevelThis, undefined);
}

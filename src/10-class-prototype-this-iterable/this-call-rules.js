import assert from 'node:assert/strict';

const moduleTopLevelThis = this;

function createPlainFunctionThisType() {
  return this;
}

export function runThisCallRulesExamples() {
  // JavaScript の this は、関数がどこで定義されたかではなく、基本的に「どう呼び出されたか」で決まる。
  // Java の instance method の this と同じ感覚で読むと誤解しやすい。
  const user = {
    id: 1,
    name: 'Alice',
    createLabel() {
      return `${this.id}: ${this.name}`;
    },
  };

  const methodCallResult = user.createLabel();

  console.log('メソッド呼び出し時のthis:', methodCallResult);

  // method を変数に取り出してから呼び出すと、呼び出し元 object との結びつきが失われる。
  // ES Modules は strict mode で実行されるため、通常の関数呼び出しの this は undefined になる。
  const detachedCreateLabel = user.createLabel;
  let detachedCallErrorMessage = null;

  try {
    detachedCreateLabel();
  } catch (error) {
    detachedCallErrorMessage = error.message;
  }

  console.log('取り出したメソッド呼び出しのエラー:', detachedCallErrorMessage);

  const plainFunctionThis = createPlainFunctionThisType();

  console.log('通常の関数呼び出し時のthis:', plainFunctionThis);
  console.log('ES Modulesのトップレベルthis:', moduleTopLevelThis);

  // arrow function は自分自身の this を持たない。
  // object literal の method として this を使う目的では、通常の method shorthand の方が分かりやすい。
  const counter = {
    count: 10,
    readByMethod() {
      return this.count;
    },
    readByArrow: () => {
      return this;
    },
  };

  const methodThisResult = counter.readByMethod();
  const arrowThisResult = counter.readByArrow();

  console.log('method shorthandのthis結果:', methodThisResult);
  console.log('arrow functionのthis結果:', arrowThisResult);

  // callback として method をそのまま渡すと、呼び出し側がどのように実行するかで this が変わる。
  // this を使う method を callback に渡す場合は、bind するか、arrow function で包む必要がある。
  function executeCallback(callback) {
    return callback();
  }

  let callbackErrorMessage = null;

  try {
    executeCallback(user.createLabel);
  } catch (error) {
    callbackErrorMessage = error.message;
  }

  const wrappedCallbackResult = executeCallback(() => user.createLabel());

  console.log('callbackでthisを失ったエラー:', callbackErrorMessage);
  console.log('arrow functionで包んだcallback結果:', wrappedCallbackResult);

  assert.equal(methodCallResult, '1: Alice');
  assert.equal(typeof detachedCallErrorMessage, 'string');
  assert.equal(plainFunctionThis, undefined);
  assert.equal(moduleTopLevelThis, undefined);
  assert.equal(methodThisResult, 10);
  assert.equal(arrowThisResult, undefined);
  assert.equal(typeof callbackErrorMessage, 'string');
  assert.equal(wrappedCallbackResult, '1: Alice');
}

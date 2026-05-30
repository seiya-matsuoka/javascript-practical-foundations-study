import assert from 'node:assert/strict';

// Error を継承すると、失敗の種類を独自の型として表せる。
// validation 失敗、未検出、権限不足などを同じ Error としてまとめすぎないための入口になる。
class ValidationError extends Error {
  constructor(message, details) {
    super(message);

    // custom error では、name を分けておくと catch 側で種類を判定しやすい。
    this.name = 'ValidationError';
    this.details = details;
  }
}

// NotFoundError は、存在しないリソースを扱うための custom error。
// resourceName と resourceId を持たせると、ログや呼び出し元の分岐で使いやすい。
class NotFoundError extends Error {
  constructor(resourceName, resourceId) {
    super(`${resourceName}が見つからない。`);

    this.name = 'NotFoundError';
    this.resourceName = resourceName;
    this.resourceId = resourceId;
  }
}

// 入力値の検証では、どの field がなぜ失敗したのかを details として残す。
// 画面表示や API response へ変換するとき、単一 message より扱いやすくなる。
function validateUserInput(input) {
  const details = [];

  if (input.name === '') {
    details.push({ field: 'name', message: '名前は必須。' });
  }

  if (!Number.isInteger(input.age) || input.age < 0) {
    details.push({ field: 'age', message: '年齢は0以上の整数で指定する。' });
  }

  if (details.length > 0) {
    throw new ValidationError('入力値が不正。', details);
  }

  return {
    name: input.name,
    age: input.age,
  };
}

// 存在しないデータは、undefined のまま後続へ流すより、ここで NotFoundError に変換する。
// どの関数が「存在すること」を保証するのかを明確にするため。
function findBookById(bookId) {
  const books = new Map([
    [1, { id: 1, title: 'JavaScript Basics' }],
    [2, { id: 2, title: 'Node.js Guide' }],
  ]);

  const book = books.get(bookId);

  if (book === undefined) {
    throw new NotFoundError('Book', bookId);
  }

  return book;
}

// catch 側では、error の種類に応じてアプリで扱いやすい形へ変換する。
// instanceof による分岐は、custom error を使う代表的な理由の 1 つ。
function handleError(error) {
  if (error instanceof ValidationError) {
    return {
      kind: 'validation',
      message: error.message,
      details: error.details,
    };
  }

  if (error instanceof NotFoundError) {
    return {
      kind: 'notFound',
      message: error.message,
      resourceName: error.resourceName,
      resourceId: error.resourceId,
    };
  }

  return {
    kind: 'unknown',
    message: '想定外のエラーが発生した。',
  };
}

export function runCustomErrorExamples() {
  // 正常系と失敗系を並べて、custom error がどのように処理結果へ変換されるかを確認する。
  const validUser = validateUserInput({ name: 'Alice', age: 20 });
  const foundBook = findBookById(1);

  let validationErrorResult = null;
  let notFoundErrorResult = null;

  try {
    validateUserInput({ name: '', age: -1 });
  } catch (error) {
    validationErrorResult = handleError(error);
  }

  try {
    findBookById(999);
  } catch (error) {
    notFoundErrorResult = handleError(error);
  }

  console.log('正常なuser:', validUser);
  console.log('見つかったbook:', foundBook);
  console.log('ValidationErrorの処理結果:', validationErrorResult);
  console.log('NotFoundErrorの処理結果:', notFoundErrorResult);

  assert.deepEqual(validUser, { name: 'Alice', age: 20 });
  assert.deepEqual(foundBook, { id: 1, title: 'JavaScript Basics' });
  assert.deepEqual(validationErrorResult, {
    kind: 'validation',
    message: '入力値が不正。',
    details: [
      { field: 'name', message: '名前は必須。' },
      { field: 'age', message: '年齢は0以上の整数で指定する。' },
    ],
  });
  assert.deepEqual(notFoundErrorResult, {
    kind: 'notFound',
    message: 'Bookが見つからない。',
    resourceName: 'Book',
    resourceId: 999,
  });
}

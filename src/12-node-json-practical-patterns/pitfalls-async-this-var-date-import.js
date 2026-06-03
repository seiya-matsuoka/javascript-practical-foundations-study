import assert from 'node:assert/strict';

async function waitAndReturn(value) {
  return value;
}

async function demonstrateForEachAsyncPitfall() {
  const results = [];

  // forEach は callback の Promise を待たない。
  // async callback を渡しても、この関数自身は forEach 内の await を待たずに次へ進む。
  [1, 2, 3].forEach(async (value) => {
    const result = await waitAndReturn(value * 2);

    results.push(result);
  });

  // この時点の snapshot を返すことで、forEach が async callback の完了を待っていないことを確認する。
  return [...results];
}

async function demonstrateForOfAsync() {
  const results = [];

  // 逐次実行したい場合は for...of と await を組み合わせると意図が明確になる。
  for (const value of [1, 2, 3]) {
    const result = await waitAndReturn(value * 2);

    results.push(result);
  }

  return results;
}

function demonstrateVarHoisting() {
  // var は function scope で、宣言が巻き上げられる。
  // 現代のコードでは基本的に let / const を使い、var は既存コードを読むために理解する。
  // eslint の no-var ルールがある環境では、観察用コードとして扱う。
  var message = 'varはfunction scope';

  if (true) {
    var message = 'blockを越えて再宣言される';
  }

  return message;
}

async function demonstratePromiseErrorHandling() {
  const rejectedPromise = Promise.reject(new Error('Promiseのエラー'));

  // Promise の rejection は catch しないと呼び出し元へ漏れる。
  // async / await では try-catch と組み合わせて扱うと読みやすい。
  try {
    await rejectedPromise;
  } catch (error) {
    return error.message;
  }

  return 'no error';
}

export async function runPitfallsAsyncThisVarDateImportExamples() {
  const forEachResults = await demonstrateForEachAsyncPitfall();
  const forOfResults = await demonstrateForOfAsync();
  const varResult = demonstrateVarHoisting();
  const promiseErrorMessage = await demonstratePromiseErrorHandling();

  const user = {
    name: 'Alice',
    createNameGetter() {
      return function getName() {
        return this?.name ?? 'thisなし';
      };
    },
  };

  const detachedGetter = user.createNameGetter();
  const thisResult = detachedGetter();

  // Date は timezone の影響を受ける API がある。
  // toISOString は UTC 表現、toLocaleString は locale / timezone を指定して表示用に整える。
  const date = new Date('2026-05-31T00:00:00.000Z');
  const isoText = date.toISOString();
  const tokyoText = date.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });

  // import/export の混乱は、default export と named export の取り違えで起きやすい。
  // このリポジトリでは named export を基本にして、読み手が import 名を追いやすいようにしている。
  const importExportPolicy = {
    preferNamedExport: true,
    reason: '関数名とimport名を一致させやすいため',
  };

  console.log('forEach + asyncの直後の結果:', forEachResults);
  console.log('for...of + awaitの結果:', forOfResults);
  console.log('var hoistingの例:', varResult);
  console.log('thisが失われた関数呼び出し:', thisResult);
  console.log('Promise rejectionをcatchした結果:', promiseErrorMessage);
  console.log('DateのUTC表現:', isoText);
  console.log('Dateの東京表示:', tokyoText);
  console.log('import/export方針の例:', importExportPolicy);

  assert.deepEqual(forEachResults, []);
  assert.deepEqual(forOfResults, [2, 4, 6]);
  assert.equal(varResult, 'blockを越えて再宣言される');
  assert.equal(thisResult, 'thisなし');
  assert.equal(promiseErrorMessage, 'Promiseのエラー');
  assert.equal(isoText, '2026-05-31T00:00:00.000Z');
  assert.equal(tokyoText.length > 0, true);
  assert.deepEqual(importExportPolicy, {
    preferNamedExport: true,
    reason: '関数名とimport名を一致させやすいため',
  });
}

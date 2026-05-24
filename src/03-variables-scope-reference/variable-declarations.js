import assert from 'node:assert/strict';

function captureError(callback) {
  try {
    callback();
  } catch (error) {
    return error;
  }

  return null;
}

export function runVariableDeclarationsExamples() {
  // let は、再代入できる変数を宣言する。
  // 値が変わること自体に意味がある場合だけ使うと、コードを読む側も意図を追いやすい。
  let currentStatus = 'draft';

  console.log('letで宣言した直後の値:', currentStatus);

  currentStatus = 'published';

  console.log('letで再代入した後の値:', currentStatus);

  // const は、変数への再代入を禁止する。
  // Java の final と似て見えるが、object の中身まで不変にするわけではない。
  const createdBy = 'system';

  console.log('constで宣言した値:', createdBy);

  const constReassignmentError = captureError(() => {
    // const への再代入は TypeError になる。
    // 直接書くとファイル全体の実行が止まるため、ここでは小さなコード片として実行する。
    Function(`
      "use strict";
      const role = "admin";
      role = "user";
    `)();
  });

  console.log('constへの再代入エラー:', constReassignmentError?.name);
  console.log('constへの再代入エラーメッセージ:', constReassignmentError?.message);

  // var は古い宣言方法。
  // function scope、hoisting など、let / const とは違う挙動を持つため、既存コードを読むために知っておく必要がある。
  // 新しく書くコードでは、基本的に let / const を使う。
  var legacyCount = 1;

  legacyCount = 2;

  console.log('varで宣言した値:', legacyCount);

  const tags = ['javascript', 'nodejs'];

  tags.push('browser');

  console.log('constで宣言した配列を変更した結果:', tags);

  assert.equal(currentStatus, 'published');
  assert.equal(createdBy, 'system');
  assert.equal(constReassignmentError instanceof TypeError, true);
  assert.equal(legacyCount, 2);
  assert.deepEqual(tags, ['javascript', 'nodejs', 'browser']);
}

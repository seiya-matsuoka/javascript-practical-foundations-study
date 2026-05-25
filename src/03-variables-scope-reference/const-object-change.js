import assert from 'node:assert/strict';

function captureError(callback) {
  try {
    callback();
  } catch (error) {
    return error;
  }

  return null;
}

export function runConstObjectChangeExamples() {
  const user = {
    id: 1,
    name: 'Alice',
    preferences: {
      theme: 'light',
    },
  };

  // const は、変数 user が別の値を指し直すことを禁止する。
  // ただし、user が指している object の中身は変更できる。
  user.name = 'Bob';
  user.preferences.theme = 'dark';

  console.log('constで宣言したobjectを変更した結果:', user);

  const reassignmentError = captureError(() => {
    // const 変数そのものへの再代入はできない。
    Function(`
      "use strict";
      const user = { id: 1 };
      user = { id: 2 };
    `)();
  });

  console.log('const objectへの再代入エラー:', reassignmentError?.name);

  assert.deepEqual(user, {
    id: 1,
    name: 'Bob',
    preferences: {
      theme: 'dark',
    },
  });
  assert.equal(reassignmentError instanceof TypeError, true);
}

import assert from 'node:assert/strict';

function createTask(input) {
  // guard clause は、不正な条件や処理できない条件を先に返す書き方。
  // 正常系を深い if の中に閉じ込めず、読みやすく保てる。
  if (input == null || typeof input !== 'object') {
    return { ok: false, error: 'inputはobjectで指定する。' };
  }

  if (typeof input.title !== 'string' || input.title.trim() === '') {
    return { ok: false, error: 'titleは必須。' };
  }

  if (!['todo', 'doing', 'done'].includes(input.status)) {
    return { ok: false, error: 'statusが不正。' };
  }

  // early return により、ここから下は「必要な値が揃っている」前提で読める。
  return {
    ok: true,
    value: {
      title: input.title.trim(),
      status: input.status,
    },
  };
}

export function runEarlyReturnGuardClauseExamples() {
  const nullResult = createTask(null);
  const emptyTitleResult = createTask({ title: ' ', status: 'todo' });
  const invalidStatusResult = createTask({ title: '確認する', status: 'archived' });
  const successResult = createTask({ title: 'guard clauseを確認する', status: 'todo' });

  console.log('null入力の結果:', nullResult);
  console.log('空titleの結果:', emptyTitleResult);
  console.log('不正statusの結果:', invalidStatusResult);
  console.log('正常入力の結果:', successResult);

  assert.deepEqual(nullResult, { ok: false, error: 'inputはobjectで指定する。' });
  assert.deepEqual(emptyTitleResult, { ok: false, error: 'titleは必須。' });
  assert.deepEqual(invalidStatusResult, { ok: false, error: 'statusが不正。' });
  assert.deepEqual(successResult, {
    ok: true,
    value: {
      title: 'guard clauseを確認する',
      status: 'todo',
    },
  });
}

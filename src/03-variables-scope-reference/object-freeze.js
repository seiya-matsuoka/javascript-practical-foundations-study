import assert from 'node:assert/strict';

function captureError(callback) {
  try {
    callback();
  } catch (error) {
    return error;
  }

  return null;
}

export function runObjectFreezeExamples() {
  const statusLabels = Object.freeze({
    draft: '下書き',
    published: '公開済み',
  });

  // Object.freeze は、object のプロパティ追加・変更・削除を防ぐ。
  // ES Modules は strict mode で実行されるため、freeze 済み object の変更は TypeError になる。
  const frozenChangeError = captureError(() => {
    statusLabels.draft = '編集中';
  });

  console.log('freeze済みobject:', statusLabels);
  console.log('freeze済みobjectの変更エラー:', frozenChangeError?.name);

  const nestedSettings = Object.freeze({
    theme: 'light',
    layout: {
      sidebar: 'expanded',
    },
  });

  // Object.freeze は shallow。
  // ネストした object までは自動で freeze されない。
  nestedSettings.layout.sidebar = 'collapsed';

  console.log('ネストしたobjectを持つfreeze結果:', nestedSettings);

  assert.deepEqual(statusLabels, {
    draft: '下書き',
    published: '公開済み',
  });
  assert.equal(frozenChangeError instanceof TypeError, true);
  assert.deepEqual(nestedSettings, {
    theme: 'light',
    layout: {
      sidebar: 'collapsed',
    },
  });
  assert.equal(Object.isFrozen(statusLabels), true);
  assert.equal(Object.isFrozen(nestedSettings), true);
  assert.equal(Object.isFrozen(nestedSettings.layout), false);
}

import assert from 'node:assert/strict';

export function runLogicalOperatorsExamples() {
  // || は、左辺が truthy なら左辺を返し、falsy なら右辺を返す。
  // default 値の指定に使われることがあるが、0、空文字、false も右辺に置き換わる点に注意する。
  const orResults = {
    emptyString: '' || 'default',
    zero: 0 || 100,
    falseValue: false || true,
    nullValue: null || 'fallback',
    validText: 'JavaScript' || 'default',
  };

  console.log('||による値の選択:', orResults);

  // ?? は、左辺が null または undefined のときだけ右辺を返す。
  // 0、空文字、false を有効な値として残したい場合は ?? が向いている。
  const nullishResults = {
    emptyString: '' ?? 'default',
    zero: 0 ?? 100,
    falseValue: false ?? true,
    nullValue: null ?? 'fallback',
    undefinedValue: undefined ?? 'fallback',
    validText: 'JavaScript' ?? 'default',
  };

  console.log('??による値の選択:', nullishResults);

  // && は、左辺が falsy なら左辺を返し、truthy なら右辺を返す。
  // 条件付きの値生成や、短い条件分岐として使われることがある。
  const andResults = {
    activeLabel: true && '有効',
    inactiveLabel: false && '有効',
    emptyString: '' && '表示する',
    userName: 'Alice' && 'ユーザー名あり',
  };

  console.log('&&による値の選択:', andResults);

  // フォーム入力や API レスポンスでは、0 や空文字が有効な値になることがある。
  // その場合、|| で default 値を入れると意図せず値が置き換わる。
  const formValues = {
    displayName: '',
    retryCount: 0,
    receiveMail: false,
  };

  const fallbackByOr = {
    displayName: formValues.displayName || '匿名',
    retryCount: formValues.retryCount || 3,
    receiveMail: formValues.receiveMail || true,
  };

  const fallbackByNullish = {
    displayName: formValues.displayName ?? '匿名',
    retryCount: formValues.retryCount ?? 3,
    receiveMail: formValues.receiveMail ?? true,
  };

  console.log('||でdefault値を入れた結果:', fallbackByOr);
  console.log('??でdefault値を入れた結果:', fallbackByNullish);

  assert.deepEqual(orResults, {
    emptyString: 'default',
    zero: 100,
    falseValue: true,
    nullValue: 'fallback',
    validText: 'JavaScript',
  });
  assert.deepEqual(nullishResults, {
    emptyString: '',
    zero: 0,
    falseValue: false,
    nullValue: 'fallback',
    undefinedValue: 'fallback',
    validText: 'JavaScript',
  });
  assert.deepEqual(andResults, {
    activeLabel: '有効',
    inactiveLabel: false,
    emptyString: '',
    userName: 'ユーザー名あり',
  });
  assert.deepEqual(fallbackByOr, {
    displayName: '匿名',
    retryCount: 3,
    receiveMail: true,
  });
  assert.deepEqual(fallbackByNullish, {
    displayName: '',
    retryCount: 0,
    receiveMail: false,
  });
}

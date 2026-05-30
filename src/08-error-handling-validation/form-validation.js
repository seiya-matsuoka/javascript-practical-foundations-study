import assert from 'node:assert/strict';

// required validation は、多くの form で使う最小単位の検証。
// fieldLabel を受け取ることで、同じ関数を複数 field で使い回せる。
function validateRequired(value, fieldLabel) {
  if (value.trim() === '') {
    return `${fieldLabel}は必須。`;
  }

  return null;
}

// 最大文字数のような validation は、条件を引数にすると汎用化しやすい。
// エラーメッセージも関数内で作ることで、呼び出し側の重複を減らせる。
function validateMaxLength(value, maxLength, fieldLabel) {
  if (value.length > maxLength) {
    return `${fieldLabel}は${maxLength}文字以内で入力する。`;
  }

  return null;
}

// form 入力値は文字列として入ってくるため、数値として使う前に文字列段階の検証を行う。
// 空文字、数値変換、範囲チェックを順に分けると、エラー理由を返しやすい。
function validateAge(value) {
  if (value.trim() === '') {
    return '年齢は必須。';
  }

  const parsedAge = Number(value);

  if (!Number.isInteger(parsedAge)) {
    return '年齢は整数で入力する。';
  }

  if (parsedAge < 0) {
    return '年齢は0以上で入力する。';
  }

  return null;
}

// 各 validator は、エラーがなければ null、あれば message を返す。
// collectErrors で null を除外すると、field ごとの errors 配列を作りやすい。
function collectErrors(...errors) {
  return errors.filter((error) => error !== null);
}

// field ごとの validation 結果をまとめ、form 全体の result object に変換する。
// UI では、この errors を field ごとの表示に接続することが多い。
function validateProfileForm(input) {
  const nameErrors = collectErrors(
    validateRequired(input.name, '名前'),
    validateMaxLength(input.name, 20, '名前'),
  );

  const ageErrors = collectErrors(validateAge(input.age));

  const errors = {
    name: nameErrors,
    age: ageErrors,
  };

  if (nameErrors.length > 0 || ageErrors.length > 0) {
    return {
      ok: false,
      value: null,
      errors,
    };
  }

  return {
    ok: true,
    value: {
      name: input.name.trim(),
      age: Number(input.age),
    },
    errors,
  };
}

export function runFormValidationExamples() {
  // form 入力値は、基本的に文字列として入ってくる。
  // 数値として使う値も、まず文字列を検証してから Number へ変換する流れにすると読みやすい。
  const validResult = validateProfileForm({
    name: '  Alice  ',
    age: '20',
  });

  const invalidResult = validateProfileForm({
    name: '',
    age: '-1',
  });

  const invalidNumberResult = validateProfileForm({
    name: 'Bob',
    age: 'twenty',
  });

  console.log('正常なform検証結果:', validResult);
  console.log('不正なform検証結果:', invalidResult);
  console.log('数値変換できないform検証結果:', invalidNumberResult);

  assert.deepEqual(validResult, {
    ok: true,
    value: {
      name: 'Alice',
      age: 20,
    },
    errors: {
      name: [],
      age: [],
    },
  });
  assert.deepEqual(invalidResult, {
    ok: false,
    value: null,
    errors: {
      name: ['名前は必須。'],
      age: ['年齢は0以上で入力する。'],
    },
  });
  assert.deepEqual(invalidNumberResult, {
    ok: false,
    value: null,
    errors: {
      name: [],
      age: ['年齢は整数で入力する。'],
    },
  });
}

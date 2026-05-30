import assert from 'node:assert/strict';

// form 入力のような想定内の失敗は、throw ではなく result object で返すと扱いやすい。
// ここでは ok / value / errors の形をそろえ、呼び出し元の分岐を単純にする。
function validateEmail(value) {
  if (value === '') {
    return {
      ok: false,
      value: null,
      errors: ['メールアドレスは必須。'],
    };
  }

  if (!value.includes('@')) {
    return {
      ok: false,
      value: null,
      errors: ['メールアドレスの形式が不正。'],
    };
  }

  return {
    ok: true,
    value,
    errors: [],
  };
}

// 1 つの field に複数の validation error が出ることもある。
// errors 配列に積み上げると、画面側で複数メッセージを表示しやすい。
function validatePassword(value) {
  const errors = [];

  if (value.length < 8) {
    errors.push('パスワードは8文字以上。');
  }

  if (!/[0-9]/.test(value)) {
    errors.push('パスワードには数字を含める。');
  }

  if (errors.length > 0) {
    return {
      ok: false,
      value: null,
      errors,
    };
  }

  return {
    ok: true,
    value,
    errors: [],
  };
}

// field ごとの validation 結果をまとめ、form 全体として成功か失敗かを返す。
// 個別 validator と form validator を分けると、関数の責務が読みやすい。
function validateSignupForm(input) {
  const emailResult = validateEmail(input.email);
  const passwordResult = validatePassword(input.password);

  const errors = {
    email: emailResult.errors,
    password: passwordResult.errors,
  };

  if (!emailResult.ok || !passwordResult.ok) {
    return {
      ok: false,
      value: null,
      errors,
    };
  }

  return {
    ok: true,
    value: {
      email: emailResult.value,
      password: passwordResult.value,
    },
    errors,
  };
}

export function runValidationResultObjectExamples() {
  // 想定内の入力エラーは、必ずしも throw で扱う必要はない。
  // form validation のように「失敗内容を画面へ返したい」場合は、result object が読みやすい。
  const validResult = validateSignupForm({
    email: 'alice@example.com',
    password: 'password1',
  });

  const invalidResult = validateSignupForm({
    email: 'alice.example.com',
    password: 'short',
  });

  console.log('成功したvalidation結果:', validResult);
  console.log('失敗したvalidation結果:', invalidResult);

  assert.deepEqual(validResult, {
    ok: true,
    value: {
      email: 'alice@example.com',
      password: 'password1',
    },
    errors: {
      email: [],
      password: [],
    },
  });
  assert.deepEqual(invalidResult, {
    ok: false,
    value: null,
    errors: {
      email: ['メールアドレスの形式が不正。'],
      password: ['パスワードは8文字以上。', 'パスワードには数字を含める。'],
    },
  });
}

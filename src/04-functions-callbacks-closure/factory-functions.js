import assert from 'node:assert/strict';

function createTextFormatter({ prefix = '', suffix = '' }) {
  // factory function は、目的に応じた関数や object を作って返す関数。
  // 設定値を閉じ込めて、呼び出し側が毎回同じ設定を渡さなくてよい形にできる。
  return function formatText(value) {
    return `${prefix}${value}${suffix}`;
  };
}

// minimumLength を閉じ込めた validator を作る。
// 呼び出し側は、毎回 minimumLength を渡さずに validation 関数として扱える。
function createMinimumLengthValidator(minimumLength) {
  return function validate(value) {
    return value.length >= minimumLength;
  };
}

// locale ごとの表示ラベルを選び、その設定を閉じ込めた presenter を返す。
// UI 表示用の整形処理を作る factory function の例。
function createUserPresenter(locale) {
  const labels = {
    ja: { active: '有効', inactive: '無効' },
    en: { active: 'Active', inactive: 'Inactive' },
  };

  // 未対応の locale が来た場合は日本語ラベルに fallback する。
  // Unit 02 で扱った nullish coalescing の実務的な使い方でもある。
  const currentLabels = labels[locale] ?? labels.ja;

  return function presentUser(user) {
    const statusLabel = user.active ? currentLabels.active : currentLabels.inactive;

    return `${user.name}: ${statusLabel}`;
  };
}

export function runFactoryFunctionExamples() {
  const decorateAsStrong = createTextFormatter({ prefix: '**', suffix: '**' });
  const decorateAsCode = createTextFormatter({ prefix: '`', suffix: '`' });

  const formattedTexts = [decorateAsStrong('JavaScript'), decorateAsCode('const')];

  console.log('factory functionで作ったformatter:', formattedTexts);

  const validateAtLeast3 = createMinimumLengthValidator(3);
  const validateAtLeast8 = createMinimumLengthValidator(8);

  const validationResults = {
    jsAtLeast3: validateAtLeast3('JS'),
    javascriptAtLeast3: validateAtLeast3('JavaScript'),
    passwordAtLeast8: validateAtLeast8('password'),
  };

  console.log('factory functionで作ったvalidator:', validationResults);

  const presentJapaneseUser = createUserPresenter('ja');
  const presentEnglishUser = createUserPresenter('en');

  const presentedUsers = [
    presentJapaneseUser({ name: 'Alice', active: true }),
    presentEnglishUser({ name: 'Bob', active: false }),
  ];

  console.log('factory functionで作ったpresenter:', presentedUsers);

  assert.deepEqual(formattedTexts, ['**JavaScript**', '`const`']);
  assert.deepEqual(validationResults, {
    jsAtLeast3: false,
    javascriptAtLeast3: true,
    passwordAtLeast8: true,
  });
  assert.deepEqual(presentedUsers, ['Alice: 有効', 'Bob: Inactive']);
}

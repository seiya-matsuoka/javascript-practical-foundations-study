import assert from 'node:assert/strict';

export function runObjectHasOwnExamples() {
  const defaultSettings = {
    theme: 'light',
    pageSize: 20,
  };

  const userSettings = Object.create(defaultSettings);

  userSettings.theme = 'dark';

  // in 演算子は、prototype chain 上の property も含めて存在確認する。
  // Object.hasOwn は、対象 object 自身が持つ property かどうかを判定する。
  const propertyChecks = {
    themeInUserSettings: 'theme' in userSettings,
    pageSizeInUserSettings: 'pageSize' in userSettings,
    ownTheme: Object.hasOwn(userSettings, 'theme'),
    ownPageSize: Object.hasOwn(userSettings, 'pageSize'),
  };

  console.log('inとObject.hasOwnの違い:', propertyChecks);

  const input = {
    name: 'Alice',
    email: undefined,
  };

  // value が undefined であることと、property 自体が存在しないことは別の話。
  // API レスポンスやフォーム入力を扱うときに、この違いが重要になる。
  const inputChecks = {
    hasName: Object.hasOwn(input, 'name'),
    hasEmail: Object.hasOwn(input, 'email'),
    hasRole: Object.hasOwn(input, 'role'),
    emailValue: input.email,
    roleValue: input.role,
  };

  console.log('undefined値とproperty存在確認:', inputChecks);

  assert.deepEqual(propertyChecks, {
    themeInUserSettings: true,
    pageSizeInUserSettings: true,
    ownTheme: true,
    ownPageSize: false,
  });
  assert.deepEqual(inputChecks, {
    hasName: true,
    hasEmail: true,
    hasRole: false,
    emailValue: undefined,
    roleValue: undefined,
  });
}

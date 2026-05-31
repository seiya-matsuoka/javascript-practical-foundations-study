import assert from 'node:assert/strict';

export function runJsonStringifyParseExamples() {
  const user = {
    id: 1,
    name: 'Alice',
    roles: ['admin', 'editor'],
    profile: {
      displayName: 'Alice A.',
    },
    deletedAt: null,
  };

  // JSON はデータ交換用の文字列表現。
  // JavaScript object とは別物で、ファイル保存や API 通信では文字列として扱う。
  const compactJsonText = JSON.stringify(user);
  const prettyJsonText = JSON.stringify(user, null, 2);

  console.log('1行のJSON文字列:', compactJsonText);
  console.log('整形したJSON文字列:', prettyJsonText);

  const parsedUser = JSON.parse(compactJsonText);

  console.log('JSON.parseで戻したobject:', parsedUser);

  // JSON.stringify では undefined や function は通常のデータとして残らない。
  // API に送るデータや保存するデータでは、JSON として表現できる値に揃える必要がある。
  const valueWithUnsupportedTypes = {
    id: 1,
    name: undefined,
    callback: () => 'ignored',
    active: true,
  };

  const unsupportedTypesJsonText = JSON.stringify(valueWithUnsupportedTypes);
  const unsupportedTypesParsed = JSON.parse(unsupportedTypesJsonText);

  console.log('JSONに残らない値の例:', unsupportedTypesParsed);

  assert.equal(compactJsonText.includes('\n'), false);
  assert.equal(prettyJsonText.includes('\n'), true);
  assert.deepEqual(parsedUser, user);
  assert.deepEqual(unsupportedTypesParsed, {
    id: 1,
    active: true,
  });
}

import assert from 'node:assert/strict';

export function runJsonDifferenceExamples() {
  const user = {
    id: 1,
    name: 'Alice',
    active: true,
    birthday: new Date('2000-01-02T00:00:00.000Z'),
    nickname: undefined,
    formatName() {
      return this.name.toUpperCase();
    },
  };

  // JSON はデータ交換形式であり、JavaScript object そのものではない。
  // JSON.stringify では、function や undefined の property は落ち、Date は文字列になる。
  const jsonText = JSON.stringify(user);
  const parsedUser = JSON.parse(jsonText);

  console.log('JSON.stringifyの結果:', jsonText);
  console.log('JSON.parseの結果:', parsedUser);

  const jsonDifferences = {
    hasNickname: Object.hasOwn(parsedUser, 'nickname'),
    hasFormatName: Object.hasOwn(parsedUser, 'formatName'),
    birthdayType: typeof parsedUser.birthday,
    originalBirthdayIsDate: user.birthday instanceof Date,
  };

  console.log('JSON化による違い:', jsonDifferences);

  // JSON.parse で戻る値は plain object。
  // Date や method が必要な場合は、parse 後に変換処理を明示する必要がある。
  const restoredUser = {
    ...parsedUser,
    birthday: new Date(parsedUser.birthday),
  };

  console.log('Dateを復元したuser:', restoredUser);

  assert.equal(
    jsonText,
    '{"id":1,"name":"Alice","active":true,"birthday":"2000-01-02T00:00:00.000Z"}',
  );
  assert.deepEqual(parsedUser, {
    id: 1,
    name: 'Alice',
    active: true,
    birthday: '2000-01-02T00:00:00.000Z',
  });
  assert.deepEqual(jsonDifferences, {
    hasNickname: false,
    hasFormatName: false,
    birthdayType: 'string',
    originalBirthdayIsDate: true,
  });
  assert.equal(restoredUser.birthday instanceof Date, true);
  assert.equal(restoredUser.birthday.toISOString(), '2000-01-02T00:00:00.000Z');
}

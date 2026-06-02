import assert from 'node:assert/strict';

const users = [
  {
    id: 1,
    name: 'Alice',
    profile: {
      address: {
        city: 'Tokyo',
      },
    },
  },
  {
    id: 2,
    name: 'Bob',
    profile: null,
  },
  {
    id: 3,
    name: 'Carol',
  },
];

export function runNestedNullishDataExamples() {
  // API レスポンスでは、ネストした object の途中が null や undefined になることがある。
  // そのまま user.profile.address.city のように読むと、途中が null の場合にエラーになる。
  const cityLabels = users.map((user) => {
    const city = user.profile?.address?.city ?? '未設定';

    return `${user.name}: ${city}`;
  });

  console.log('null混じりのネストデータから作った表示:', cityLabels);

  const usersWithoutProfile = users.filter((user) => user.profile == null);

  console.log('profileがないuser:', usersWithoutProfile);

  // == は原則避ける方針だが、value == null は null と undefined の両方をまとめて判定できる。
  // Unit 12 の落とし穴まとめでは、== の扱いを改めて整理する。
  assert.deepEqual(cityLabels, ['Alice: Tokyo', 'Bob: 未設定', 'Carol: 未設定']);
  assert.deepEqual(
    usersWithoutProfile.map((user) => user.name),
    ['Bob', 'Carol'],
  );
}

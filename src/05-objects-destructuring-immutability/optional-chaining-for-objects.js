import assert from 'node:assert/strict';

export function runOptionalChainingForObjectsExamples() {
  const user = {
    id: 1,
    name: 'Alice',
    profile: {
      address: {
        city: 'Tokyo',
      },
    },
  };

  const userWithoutProfile = {
    id: 2,
    name: 'Bob',
    profile: null,
  };

  // optional chaining は、途中の値が null または undefined の場合に undefined を返す。
  // ネストした object を読むときに TypeError を避けられる。
  const city = user.profile?.address?.city;
  const missingCity = userWithoutProfile.profile?.address?.city;

  console.log('存在するcity:', city);
  console.log('存在しないcity:', missingCity);

  // bracket 記法とも組み合わせられる。
  // 動的なキーで nested object を読む場合に使える。
  const sectionKey = 'profile';
  const nestedKey = 'address';
  const dynamicCity = user[sectionKey]?.[nestedKey]?.city;

  console.log('bracket記法とoptional chaining:', dynamicCity);

  // optional chaining は、値が存在しない可能性をコードに表すためのもの。
  // 必ず存在すべき設定にまで付けすぎると、データ不整合を見逃しやすい。
  const cityLabel = userWithoutProfile.profile?.address?.city ?? '未設定';

  console.log('nullish coalescingと組み合わせた表示用ラベル:', cityLabel);

  const config = {
    api: {
      retry: {
        count: 0,
      },
    },
  };

  // ?? と組み合わせると、0 や false を有効な値として残せる。
  const retryCount = config.api?.retry?.count ?? 3;

  console.log('optional chainingで読んだretryCount:', retryCount);

  assert.equal(city, 'Tokyo');
  assert.equal(missingCity, undefined);
  assert.equal(dynamicCity, 'Tokyo');
  assert.equal(cityLabel, '未設定');
  assert.equal(retryCount, 0);
}

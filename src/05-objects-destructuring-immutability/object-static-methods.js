import assert from 'node:assert/strict';

export function runObjectStaticMethodsExamples() {
  const user = {
    id: 1,
    name: 'Alice',
    role: 'admin',
    active: true,
  };

  // Object.keys は property name の配列を返す。
  // object の中身を一覧表示したいときや、入力値の validation でよく使う。
  const keys = Object.keys(user);

  // Object.values は property value の配列を返す。
  // 値だけをまとめて処理したい場合に使える。
  const values = Object.values(user);

  // Object.entries は [key, value] の配列を返す。
  // object を配列処理に乗せたい場合に便利。
  const entries = Object.entries(user);

  console.log('Object.keysの結果:', keys);
  console.log('Object.valuesの結果:', values);
  console.log('Object.entriesの結果:', entries);

  const labelByKey = {
    id: 'ID',
    name: '名前',
    role: '権限',
    active: '有効状態',
  };

  const displayRows = Object.entries(user).map(([key, value]) => ({
    key,
    label: labelByKey[key],
    value,
  }));

  console.log('Object.entriesから表示行を作った結果:', displayRows);

  // Object.fromEntries は [key, value] の配列から object を作る。
  // entries に変換して map / filter した後、object に戻す流れでよく使う。
  const publicUser = Object.fromEntries(Object.entries(user).filter(([key]) => key !== 'active'));

  console.log('Object.fromEntriesで作ったobject:', publicUser);

  const upperKeyUser = Object.fromEntries(
    Object.entries(user).map(([key, value]) => [key.toUpperCase(), value]),
  );

  console.log('keyを変換して作ったobject:', upperKeyUser);

  assert.deepEqual(keys, ['id', 'name', 'role', 'active']);
  assert.deepEqual(values, [1, 'Alice', 'admin', true]);
  assert.deepEqual(entries, [
    ['id', 1],
    ['name', 'Alice'],
    ['role', 'admin'],
    ['active', true],
  ]);
  assert.deepEqual(displayRows, [
    { key: 'id', label: 'ID', value: 1 },
    { key: 'name', label: '名前', value: 'Alice' },
    { key: 'role', label: '権限', value: 'admin' },
    { key: 'active', label: '有効状態', value: true },
  ]);
  assert.deepEqual(publicUser, {
    id: 1,
    name: 'Alice',
    role: 'admin',
  });
  assert.deepEqual(upperKeyUser, {
    ID: 1,
    NAME: 'Alice',
    ROLE: 'admin',
    ACTIVE: true,
  });
}

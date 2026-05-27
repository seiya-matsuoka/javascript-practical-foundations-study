import assert from 'node:assert/strict';

export function runNestedDestructuringAndDefaultsExamples() {
  const response = {
    data: {
      user: {
        id: 1,
        name: 'Alice',
        profile: {
          role: 'admin',
          location: 'Tokyo',
        },
      },
    },
  };

  // ネストした分割代入では、深い位置のプロパティを一度に取り出せる。
  // ただし、構造が深くなると読みづらくなりやすいため、無理に 1 行で取り出さない判断も重要。
  const {
    data: {
      user: {
        id,
        name,
        profile: { role, location },
      },
    },
  } = response;

  console.log('ネストした分割代入で取り出した値:', {
    id,
    name,
    role,
    location,
  });

  const userWithMissingProfile = {
    id: 2,
    name: 'Bob',
  };

  // ネストした object が存在しない可能性がある場合は、分割代入側で default object を用意する。
  // profile = {} がないと、undefined から role を取り出そうとして TypeError になる。
  const { profile: { role: missingRole = 'reader', location: missingLocation = '未設定' } = {} } =
    userWithMissingProfile;

  console.log('ネストしたdefault値:', {
    missingRole,
    missingLocation,
  });

  const userWithNullProfile = {
    id: 3,
    name: 'Carol',
    profile: null,
  };

  // default 値は undefined の場合だけ使われる。
  // profile が null の場合は default object に置き換わらないため、optional chaining で読む方が安全な場面もある。
  const roleFromNullProfile = userWithNullProfile.profile?.role ?? 'reader';

  console.log('nullのprofileをoptional chainingで読んだ結果:', roleFromNullProfile);

  const settings = {
    theme: undefined,
    pageSize: 0,
    receiveMail: false,
  };

  // 分割代入の default 値も undefined の場合だけ使われる。
  // 0 や false は有効な値として残る。
  const { theme = 'light', pageSize = 20, receiveMail = true } = settings;

  console.log('分割代入のdefault値とfalsy値:', {
    theme,
    pageSize,
    receiveMail,
  });

  assert.deepEqual(
    { id, name, role, location },
    {
      id: 1,
      name: 'Alice',
      role: 'admin',
      location: 'Tokyo',
    },
  );
  assert.deepEqual(
    { missingRole, missingLocation },
    {
      missingRole: 'reader',
      missingLocation: '未設定',
    },
  );
  assert.equal(roleFromNullProfile, 'reader');
  assert.deepEqual(
    { theme, pageSize, receiveMail },
    {
      theme: 'light',
      pageSize: 0,
      receiveMail: false,
    },
  );
}

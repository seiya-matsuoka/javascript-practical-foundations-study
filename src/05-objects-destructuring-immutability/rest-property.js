import assert from 'node:assert/strict';

export function runRestPropertyExamples() {
  const user = {
    id: 1,
    name: 'Alice',
    email: 'alice@example.com',
    passwordHash: 'hashed-password',
    active: true,
  };

  // rest property は、分割代入で取り出さなかった残りのプロパティを新しい object にまとめる。
  // API レスポンスから画面に渡したくない情報を除外する、などの場面で使える。
  const { passwordHash, ...publicUser } = user;

  console.log('除外したpasswordHash:', passwordHash);
  console.log('公開用user:', publicUser);

  const article = {
    id: 101,
    title: 'Object patterns',
    body: '本文',
    authorId: 1,
    createdAt: '2026-05-26T09:00:00.000Z',
    updatedAt: '2026-05-26T10:00:00.000Z',
  };

  const { id, title, ...metadata } = article;

  console.log('主要プロパティ:', { id, title });
  console.log('残りのmetadata:', metadata);

  // rest property で作られる object は shallow copy。
  // ネストした object がある場合、その中身まで深くコピーされるわけではない。
  const settings = {
    theme: 'light',
    layout: {
      sidebar: 'expanded',
    },
    version: 1,
  };

  const { version, ...settingsWithoutVersion } = settings;

  settingsWithoutVersion.layout.sidebar = 'collapsed';

  console.log('rest property後の元settings:', settings);
  console.log('rest propertyで作ったsettings:', settingsWithoutVersion);

  assert.equal(passwordHash, 'hashed-password');
  assert.deepEqual(publicUser, {
    id: 1,
    name: 'Alice',
    email: 'alice@example.com',
    active: true,
  });
  assert.equal(id, 101);
  assert.equal(title, 'Object patterns');
  assert.deepEqual(metadata, {
    body: '本文',
    authorId: 1,
    createdAt: '2026-05-26T09:00:00.000Z',
    updatedAt: '2026-05-26T10:00:00.000Z',
  });
  assert.equal(version, 1);
  assert.notEqual(settings, settingsWithoutVersion);
  assert.equal(settings.layout, settingsWithoutVersion.layout);
  assert.deepEqual(settings.layout, { sidebar: 'collapsed' });
}

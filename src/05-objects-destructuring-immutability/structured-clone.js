import assert from 'node:assert/strict';

export function runStructuredCloneExamples() {
  const originalUser = {
    id: 1,
    name: 'Alice',
    profile: {
      language: 'ja',
      theme: 'light',
    },
    tags: ['javascript', 'react'],
    lastLoginAt: new Date('2026-05-01T10:00:00.000Z'),
  };

  // structuredClone は、対応している値を deep clone するための標準 API。
  // nested object や array も別参照として clone される。
  const clonedUser = structuredClone(originalUser);

  clonedUser.profile.theme = 'dark';
  clonedUser.tags.push('typescript');
  clonedUser.lastLoginAt.setUTCFullYear(2027);

  console.log('structuredClone後の元user:', originalUser);
  console.log('structuredCloneしたuser:', clonedUser);

  // structuredClone は万能ではない。
  // function など clone できない値もあるため、設定 object やデータ object の clone に向く。
  let functionCloneError;

  try {
    structuredClone({ formatter: () => 'text' });
  } catch (error) {
    functionCloneError = error;
  }

  console.log('functionをstructuredCloneしたエラー:', functionCloneError?.name);

  assert.notEqual(clonedUser, originalUser);
  assert.notEqual(clonedUser.profile, originalUser.profile);
  assert.notEqual(clonedUser.tags, originalUser.tags);
  assert.notEqual(clonedUser.lastLoginAt, originalUser.lastLoginAt);
  assert.deepEqual(originalUser, {
    id: 1,
    name: 'Alice',
    profile: {
      language: 'ja',
      theme: 'light',
    },
    tags: ['javascript', 'react'],
    lastLoginAt: new Date('2026-05-01T10:00:00.000Z'),
  });
  assert.deepEqual(clonedUser, {
    id: 1,
    name: 'Alice',
    profile: {
      language: 'ja',
      theme: 'dark',
    },
    tags: ['javascript', 'react', 'typescript'],
    lastLoginAt: new Date('2027-05-01T10:00:00.000Z'),
  });
  assert.equal(functionCloneError instanceof DOMException, true);
}

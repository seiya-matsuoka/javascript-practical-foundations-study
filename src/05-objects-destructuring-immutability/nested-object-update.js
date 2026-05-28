import assert from 'node:assert/strict';

function updateUserTheme(user, theme) {
  // nested object update では、変更する階層まで copy する。
  // outer object だけ copy して nested object を直接変更すると、元データにも影響する。
  return {
    ...user,
    settings: {
      ...user.settings,
      theme,
    },
  };
}

function updateNotificationChannel(user, channel, enabled) {
  return {
    ...user,
    settings: {
      ...user.settings,
      notifications: {
        ...user.settings.notifications,
        [channel]: enabled,
      },
    },
  };
}

export function runNestedObjectUpdateExamples() {
  const user = {
    id: 1,
    name: 'Alice',
    settings: {
      theme: 'light',
      language: 'ja',
      notifications: {
        email: true,
        push: false,
      },
    },
  };

  const themeUpdatedUser = updateUserTheme(user, 'dark');
  const notificationUpdatedUser = updateNotificationChannel(user, 'push', true);

  console.log('元のuser:', user);
  console.log('themeを更新したuser:', themeUpdatedUser);
  console.log('notificationを更新したuser:', notificationUpdatedUser);

  // 同じ値を持つ階層でも、copy した階層は別参照になる。
  // どの参照が維持され、どの参照が新しくなったかを見ると、更新範囲を確認しやすい。
  const referenceChecks = {
    themeUserIsNew: user !== themeUpdatedUser,
    themeSettingsIsNew: user.settings !== themeUpdatedUser.settings,
    themeNotificationsIsShared:
      user.settings.notifications === themeUpdatedUser.settings.notifications,
    notificationUserIsNew: user !== notificationUpdatedUser,
    notificationSettingsIsNew: user.settings !== notificationUpdatedUser.settings,
    notificationObjectIsNew:
      user.settings.notifications !== notificationUpdatedUser.settings.notifications,
  };

  console.log('nested updateの参照確認:', referenceChecks);

  assert.deepEqual(user, {
    id: 1,
    name: 'Alice',
    settings: {
      theme: 'light',
      language: 'ja',
      notifications: {
        email: true,
        push: false,
      },
    },
  });
  assert.deepEqual(themeUpdatedUser, {
    id: 1,
    name: 'Alice',
    settings: {
      theme: 'dark',
      language: 'ja',
      notifications: {
        email: true,
        push: false,
      },
    },
  });
  assert.deepEqual(notificationUpdatedUser, {
    id: 1,
    name: 'Alice',
    settings: {
      theme: 'light',
      language: 'ja',
      notifications: {
        email: true,
        push: true,
      },
    },
  });
  assert.deepEqual(referenceChecks, {
    themeUserIsNew: true,
    themeSettingsIsNew: true,
    themeNotificationsIsShared: true,
    notificationUserIsNew: true,
    notificationSettingsIsNew: true,
    notificationObjectIsNew: true,
  });
}

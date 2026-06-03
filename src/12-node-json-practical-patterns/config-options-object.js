import assert from 'node:assert/strict';

const defaultConfig = {
  locale: 'ja-JP',
  timezone: 'Asia/Tokyo',
  pageSize: 20,
  features: {
    showCompleted: true,
    enableDebugLog: false,
  },
};

function createAppConfig(userConfig = {}) {
  // config object は、アプリ全体や機能単位の設定をまとめる object。
  // nested object を merge する場合、shallow copy だけでは内側の設定が丸ごと上書きされる点に注意する。
  return {
    ...defaultConfig,
    ...userConfig,
    features: {
      ...defaultConfig.features,
      ...userConfig.features,
    },
  };
}

function createListOptions(options = {}) {
  // options object は、関数の任意設定をまとめるために使う。
  // 引数が増えても呼び出し側で意味を読み取りやすい。
  const { page = 1, pageSize = 10, sort = 'createdAt' } = options;

  return {
    page,
    pageSize,
    sort,
  };
}

export function runConfigOptionsExamples() {
  const appConfig = createAppConfig({
    pageSize: 50,
    features: {
      enableDebugLog: true,
    },
  });

  const defaultListOptions = createListOptions();
  const customListOptions = createListOptions({ page: 2, sort: 'priority' });

  console.log('config objectで作った設定:', appConfig);
  console.log('defaultのoptions object:', defaultListOptions);
  console.log('custom options object:', customListOptions);

  assert.deepEqual(appConfig, {
    locale: 'ja-JP',
    timezone: 'Asia/Tokyo',
    pageSize: 50,
    features: {
      showCompleted: true,
      enableDebugLog: true,
    },
  });
  assert.deepEqual(defaultListOptions, { page: 1, pageSize: 10, sort: 'createdAt' });
  assert.deepEqual(customListOptions, { page: 2, pageSize: 10, sort: 'priority' });
}

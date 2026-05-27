import assert from 'node:assert/strict';

function createRequestConfig({
  method = 'GET',
  timeoutMs = 5000,
  headers = {},
  retry = { count: 0 },
} = {}) {
  // options object は、任意項目が多い関数でよく使われる。
  // 引数の順番に依存せず、呼び出し側で意味のある名前を付けて渡せる。
  return {
    method,
    timeoutMs,
    headers,
    retry,
  };
}

function createFeatureConfig(environment) {
  const baseConfig = {
    logging: true,
    cache: true,
    debug: false,
  };

  if (environment === 'development') {
    return {
      ...baseConfig,
      debug: true,
    };
  }

  return baseConfig;
}

export function runConfigAndOptionsObjectExamples() {
  const defaultRequestConfig = createRequestConfig();
  const postRequestConfig = createRequestConfig({
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
  });

  console.log('defaultのrequest config:', defaultRequestConfig);
  console.log('指定ありのrequest config:', postRequestConfig);

  const developmentConfig = createFeatureConfig('development');
  const productionConfig = createFeatureConfig('production');

  console.log('development向けconfig:', developmentConfig);
  console.log('production向けconfig:', productionConfig);

  // options object / config object は、TypeScript では型定義と組み合わせることが多い。
  // JavaScript の段階でも、object の shape を意識しておくと後で型に移行しやすい。
  const requestSummary = {
    method: postRequestConfig.method,
    contentType: postRequestConfig.headers['content-type'],
    retryCount: postRequestConfig.retry.count,
  };

  console.log('config objectから必要な値を取り出したsummary:', requestSummary);

  assert.deepEqual(defaultRequestConfig, {
    method: 'GET',
    timeoutMs: 5000,
    headers: {},
    retry: { count: 0 },
  });
  assert.deepEqual(postRequestConfig, {
    method: 'POST',
    timeoutMs: 5000,
    headers: {
      'content-type': 'application/json',
    },
    retry: { count: 0 },
  });
  assert.deepEqual(developmentConfig, {
    logging: true,
    cache: true,
    debug: true,
  });
  assert.deepEqual(productionConfig, {
    logging: true,
    cache: true,
    debug: false,
  });
  assert.deepEqual(requestSummary, {
    method: 'POST',
    contentType: 'application/json',
    retryCount: 0,
  });
}

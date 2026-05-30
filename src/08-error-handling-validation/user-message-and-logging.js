import assert from 'node:assert/strict';

// 内部で発生したエラーには、調査に使いたい code や requestId が付くことがある。
// これらはログには有用だが、ユーザーにそのまま見せる情報ではない。
function createSystemError() {
  const error = new Error('database connection timeout');

  error.code = 'DB_TIMEOUT';
  error.requestId = 'req-001';

  return error;
}

function toUserMessage(error) {
  // ユーザーに見せるメッセージは、内部実装の詳細を出しすぎない。
  // DB 名、stack trace、内部 ID などをそのまま見せると、分かりにくいだけでなく情報漏えいにもつながる。
  if (error.code === 'DB_TIMEOUT') {
    return '一時的に処理に時間がかかっています。時間をおいて再度お試しください。';
  }

  return 'エラーが発生しました。';
}

function toLogEntry(error, context) {
  // ログには、調査に必要な情報を残す。
  // 一方で、パスワードや token などの秘密情報は入れない方針にする。
  return {
    level: 'error',
    message: error.message,
    code: error.code ?? 'UNKNOWN',
    requestId: error.requestId ?? context.requestId,
    operation: context.operation,
  };
}

// ログや表示に個人情報を含める場合は、必要に応じてマスクする。
// ここではメールアドレスの一部だけを残す単純な例として扱う。
function maskEmail(email) {
  const [account, domain] = email.split('@');

  return `${account.slice(0, 2)}***@${domain}`;
}

export function runUserMessageAndLoggingExamples() {
  // 同じ error object から、ユーザー向け message とログ用 entry を別々に作る。
  // 失敗を扱うときは「誰が読む情報か」を分けて考える。
  const error = createSystemError();

  const userMessage = toUserMessage(error);
  const logEntry = toLogEntry(error, {
    requestId: 'fallback-request-id',
    operation: 'createOrder',
  });
  const maskedEmail = maskEmail('alice@example.com');

  console.log('ユーザー向けメッセージ:', userMessage);
  console.log('ログ用の情報:', logEntry);
  console.log('マスクしたメールアドレス:', maskedEmail);

  assert.equal(userMessage, '一時的に処理に時間がかかっています。時間をおいて再度お試しください。');
  assert.deepEqual(logEntry, {
    level: 'error',
    message: 'database connection timeout',
    code: 'DB_TIMEOUT',
    requestId: 'req-001',
    operation: 'createOrder',
  });
  assert.equal(maskedEmail, 'al***@example.com');
}

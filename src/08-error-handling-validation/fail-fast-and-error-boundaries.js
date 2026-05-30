import assert from 'node:assert/strict';

function createOrder({ userId, items }) {
  // fail fast は、処理を続けても意味がない条件を早い段階で検出して止める考え方。
  // 失敗を後ろへ流すほど、原因の場所が分かりにくくなる。
  if (userId === null || userId === undefined) {
    throw new Error('userIdは必須。');
  }

  if (!Array.isArray(items)) {
    throw new Error('itemsは配列で指定する必要がある。');
  }

  if (items.length === 0) {
    throw new Error('itemsは1件以上必要。');
  }

  return {
    userId,
    items,
    totalPrice: items.reduce((total, item) => total + item.price, 0),
  };
}

// 境界に近い関数では、内部の throw を response 風の値へ変換する。
// Web API や UI では、このように内部エラーを外側の表現へ変換する層が必要になる。
function handleRequest(input) {
  try {
    const order = createOrder(input);

    return {
      status: 200,
      body: order,
    };
  } catch (error) {
    // 呼び出し元で処理すべきエラーは、境界に近い場所でまとめて扱う。
    // Web API であれば response、UI であれば画面表示用 state などに変換する。
    return {
      status: 400,
      body: {
        message: error.message,
      },
    };
  }
}

function normalizeName(value) {
  if (typeof value !== 'string') {
    throw new Error('nameは文字列で指定する必要がある。');
  }

  // その場で処理すべき失敗は、その関数の中で扱う。
  // trim して空になる場合は、呼び出し元に失敗として返した方が読みやすい。
  const trimmedValue = value.trim();

  if (trimmedValue === '') {
    throw new Error('nameは空にできない。');
  }

  return trimmedValue;
}

export function runFailFastAndErrorBoundaryExamples() {
  // 成功時と失敗時を同じ境界関数で処理し、throw された Error が外向きの値へ変換される流れを見る。
  const successResponse = handleRequest({
    userId: 1,
    items: [
      { id: 101, name: 'Book', price: 1200 },
      { id: 102, name: 'Pen', price: 200 },
    ],
  });

  const failureResponse = handleRequest({
    userId: null,
    items: [],
  });

  let normalizedName = null;
  let normalizeErrorMessage = null;

  try {
    normalizedName = normalizeName('  Alice  ');
    normalizeName('   ');
  } catch (error) {
    normalizeErrorMessage = error.message;
  }

  console.log('成功時の境界処理:', successResponse);
  console.log('失敗時の境界処理:', failureResponse);
  console.log('正規化された名前:', normalizedName);
  console.log('名前正規化エラー:', normalizeErrorMessage);

  assert.deepEqual(successResponse, {
    status: 200,
    body: {
      userId: 1,
      items: [
        { id: 101, name: 'Book', price: 1200 },
        { id: 102, name: 'Pen', price: 200 },
      ],
      totalPrice: 1400,
    },
  });
  assert.deepEqual(failureResponse, {
    status: 400,
    body: {
      message: 'userIdは必須。',
    },
  });
  assert.equal(normalizedName, 'Alice');
  assert.equal(normalizeErrorMessage, 'nameは空にできない。');
}

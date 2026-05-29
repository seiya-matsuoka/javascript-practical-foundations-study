import assert from 'node:assert/strict';

export function runStringOperationExamples() {
  const userName = 'Alice';
  const unreadCount = 5;

  // template literal は、文字列の中に式を埋め込める。
  // 複数の値から表示用文字列を作るときに読みやすい。
  const notificationMessage = `${userName}さん、未読メッセージが${unreadCount}件あります。`;

  console.log('template literal の結果:', notificationMessage);

  const articleTitle = 'JavaScript standard built-in objects';

  const searchResults = {
    includesScript: articleTitle.includes('Script'),
    startsWithJava: articleTitle.startsWith('Java'),
    endsWithObjects: articleTitle.endsWith('objects'),
  };

  console.log('includes / startsWith / endsWith の結果:', searchResults);

  // slice は開始位置と終了位置を指定して部分文字列を取り出す。
  // 元の文字列は変更されない。
  const titlePrefix = articleTitle.slice(0, 10);
  const titleSuffix = articleTitle.slice(-7);

  console.log('slice の結果:', {
    titlePrefix,
    titleSuffix,
  });

  const csvLine = 'book,JavaScript Primer,3200';
  const [category, title, priceText] = csvLine.split(',');

  console.log('split で分割した結果:', {
    category,
    title,
    priceText,
  });

  // replace は最初に一致した部分だけを置換する。
  // replaceAll は一致したすべての部分を置換する。
  const routePath = '/users/:userId/books/:bookId';
  const firstReplacedPath = routePath.replace(':userId', '10');
  const allReplacedText = 'draft draft published'.replaceAll('draft', '下書き');

  console.log('replace / replaceAll の結果:', {
    firstReplacedPath,
    allReplacedText,
  });

  // trim は入力値の前後空白を落とす。
  // padStart / padEnd は、注文番号や固定幅ラベルのような表示用整形で使う。
  const rawInput = '  JS  ';
  const trimmedInput = rawInput.trim();
  const paddedOrderId = String(42).padStart(6, '0');
  const paddedLabel = 'OK'.padEnd(5, '.');

  console.log('trim / padStart / padEnd の結果:', {
    trimmedInput,
    paddedOrderId,
    paddedLabel,
  });

  assert.equal(notificationMessage, 'Aliceさん、未読メッセージが5件あります。');
  assert.deepEqual(searchResults, {
    includesScript: true,
    startsWithJava: true,
    endsWithObjects: true,
  });
  assert.deepEqual(
    { titlePrefix, titleSuffix },
    {
      titlePrefix: 'JavaScript',
      titleSuffix: 'objects',
    },
  );
  assert.deepEqual(
    { category, title, priceText },
    {
      category: 'book',
      title: 'JavaScript Primer',
      priceText: '3200',
    },
  );
  assert.deepEqual(
    {
      firstReplacedPath,
      allReplacedText,
    },
    {
      firstReplacedPath: '/users/10/books/:bookId',
      allReplacedText: '下書き 下書き published',
    },
  );
  assert.deepEqual(
    {
      trimmedInput,
      paddedOrderId,
      paddedLabel,
    },
    {
      trimmedInput: 'JS',
      paddedOrderId: '000042',
      paddedLabel: 'OK...',
    },
  );
}

import assert from 'node:assert/strict';

export function runDateAndIntlExamples() {
  // Date は、特定の時点を表す object。
  // 内部的には 1970-01-01T00:00:00.000Z からの経過ミリ秒で扱われる。
  const createdAt = new Date('2026-05-29T12:34:56.000Z');

  const timestamp = createdAt.getTime();
  const isoString = createdAt.toISOString();

  console.log('Date の timestamp と ISO 文字列:', {
    timestamp,
    isoString,
  });

  const nextDay = new Date('2026-05-30T00:00:00.000Z');
  const previousDay = new Date('2026-05-28T00:00:00.000Z');

  const dateComparisonResults = {
    createdBeforeNextDay: createdAt < nextDay,
    createdAfterPreviousDay: createdAt > previousDay,
    sameTime: createdAt.getTime() === new Date('2026-05-29T12:34:56.000Z').getTime(),
  };

  console.log('Date の比較:', dateComparisonResults);

  // timezone は Date で特に注意しやすい点。
  // ISO 文字列の末尾 Z は UTC を表す。
  // 表示するときは Intl.DateTimeFormat に timeZone を指定すると、意図した timezone で表示しやすい。
  const tokyoDateFormatter = new Intl.DateTimeFormat('ja-JP', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Tokyo',
  });

  const utcDateFormatter = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'UTC',
  });

  const formattedTokyoDate = tokyoDateFormatter.format(createdAt);
  const formattedUtcDate = utcDateFormatter.format(createdAt);

  console.log('Intl.DateTimeFormat による日付表示:', {
    formattedTokyoDate,
    formattedUtcDate,
  });

  // Intl.NumberFormat は、数値を locale に合わせた表示文字列へ変換する。
  // 金額や件数など、画面表示用の整形でよく使う。
  const yenFormatter = new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
  });

  const percentFormatter = new Intl.NumberFormat('ja-JP', {
    style: 'percent',
    maximumFractionDigits: 1,
  });

  const formattedPrice = yenFormatter.format(123456);
  const formattedRate = percentFormatter.format(0.1234);

  console.log('Intl.NumberFormat による数値表示:', {
    formattedPrice,
    formattedRate,
  });

  // Date の年月日は、local timezone の影響を受ける API と UTC 系 API がある。
  // 日付だけを扱いたい処理では、どの timezone で解釈するかを明確にすることが重要。
  const utcParts = {
    year: createdAt.getUTCFullYear(),
    month: createdAt.getUTCMonth() + 1,
    date: createdAt.getUTCDate(),
    hour: createdAt.getUTCHours(),
  };

  console.log('UTC 系 API で取り出した日時部品:', utcParts);

  assert.equal(timestamp, 1780058096000);
  assert.equal(isoString, '2026-05-29T12:34:56.000Z');
  assert.deepEqual(dateComparisonResults, {
    createdBeforeNextDay: true,
    createdAfterPreviousDay: true,
    sameTime: true,
  });
  assert.equal(formattedTokyoDate.includes('2026'), true);
  assert.equal(formattedUtcDate.includes('2026'), true);
  assert.equal(formattedPrice, '￥123,456');
  assert.equal(formattedRate, '12.3%');
  assert.deepEqual(utcParts, {
    year: 2026,
    month: 5,
    date: 29,
    hour: 12,
  });
}

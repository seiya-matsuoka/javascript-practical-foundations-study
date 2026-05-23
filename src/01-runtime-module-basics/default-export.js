// default export は、そのモジュールの代表となる値を 1 つ公開する方法。
// import する側では任意の名前を付けられるため便利だが、名前が揺れると読みづらくなる場合もある。
export default function createUnitSummary({ title, focus, keywords }) {
  return {
    title,
    focus,
    keywordCount: keywords.length,
    summary: `${title}では、${focus}を中心に確認する。`,
  };
}

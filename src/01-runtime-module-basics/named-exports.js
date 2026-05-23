// named export は、名前付きで複数の値や関数を公開する方法。
// import する側では、同じ名前を {} で指定して読み込む。
export const moduleStyle = 'ES Modules';

export function createRuntimeLabel(runtimeName) {
  return `${runtimeName}で動くJavaScript`;
}

export function formatFeatureOwner({ featureName, owner }) {
  return `${featureName} は ${owner} に属する機能`;
}

// 配列やオブジェクトも export できる。
// 実務では、定数、設定値、選択肢、変換用のマップなどを別ファイルに切り出すことがある。
export const learningKeywords = ['ECMAScript', 'JavaScript', 'Node.js', 'Web API', 'ES Modules'];

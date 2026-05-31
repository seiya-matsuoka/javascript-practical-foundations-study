export function setupUrlSearchParamsPanel() {
  // URL と URLSearchParams を使い、現在の URL を構造化して読み書きする。
  // React Router や検索条件付き画面でも、query parameter の考え方はよく使う。
  // 生成した URL 情報を表示する要素を取得する。
  // DOM 操作では、表示先を先に特定してから値を流し込む。
  const output = document.querySelector('[data-url-output]');

  // URL は文字列の URL を構造化して扱うための標準 API。
  // window.location.href を元にすると、現在開いているページの URL を安全に組み立て直せる。
  const currentUrl = new URL(window.location.href);

  // URLSearchParams は query parameter を読み書きする API。
  // 文字列結合で ?filter=active&page=1 を作るより、encode の扱いを任せられる。
  // searchParams.set は、既存の query parameter を更新し、なければ追加する。
  // 文字列連結で ? や & を扱わなくてよい点が重要。
  currentUrl.searchParams.set('filter', 'active');
  currentUrl.searchParams.set('page', '1');

  // URLSearchParams は URL から取り出した search 文字列だけでも作れる。
  // get / set / has などの method で query parameter を扱える。
  const params = new URLSearchParams(currentUrl.search);

  // 表示用の文字列配列を作り、最後に改行で結合して pre 要素へ表示する。
  // textContent を使うため、URL 文字列は HTML として解釈されない。
  const outputLines = [
    `origin: ${currentUrl.origin}`,
    `pathname: ${currentUrl.pathname}`,
    `filter: ${params.get('filter')}`,
    `page: ${params.get('page')}`,
    `generatedUrl: ${currentUrl.toString()}`,
  ];

  output.textContent = outputLines.join('\n');
}

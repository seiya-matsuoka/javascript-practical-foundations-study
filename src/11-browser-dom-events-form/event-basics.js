export function setupFilterButtons({ onFilterChange }) {
  // filter button 群の click を受け取り、main.js に filter 変更を通知する。
  // DOM event の取得と、アプリ側の状態更新を callback で分けている。
  const filterButtonContainer = document.querySelector('[data-filter-buttons]');

  // addEventListener は、DOM 要素に event handler を登録する基本 API。
  // HTML attribute の onclick に直接書くより、JavaScript 側で処理を分けて管理しやすい。
  filterButtonContainer.addEventListener('click', (event) => {
    // event object には、発生した event の情報が入る。
    // target は実際に click された要素、currentTarget は listener を登録した要素。
    // event.target は実際に click された要素。
    // container に listener を付けているため、button 以外が target になる可能性も考慮する。
    const clickedElement = event.target;

    if (!(clickedElement instanceof HTMLButtonElement)) {
      return;
    }

    // data-filter は HTML 側に置いた filter 種別。
    // JavaScript 側では dataset.filter として文字列で取得できる。
    const filter = clickedElement.dataset.filter;

    if (!filter) {
      return;
    }

    onFilterChange(filter);
  });
}

export function setupFetchButton({ onFetchRequest }) {
  // fetch 実行 button は、click された事実だけを外側へ通知する。
  // 実際の取得処理は browser-fetch.js 側に分ける。
  const fetchButton = document.querySelector('[data-fetch-button]');

  fetchButton.addEventListener('click', () => {
    onFetchRequest();
  });
}

export function setupStorageButtons({ onIncrementLocal, onIncrementSession, onClear }) {
  // storage 操作用 button をまとめて初期化する。
  // addEventListener で UI 操作と storage 更新処理を接続する。
  const incrementLocalButton = document.querySelector('[data-increment-local-storage]');
  const incrementSessionButton = document.querySelector('[data-increment-session-storage]');
  const clearStorageButton = document.querySelector('[data-clear-storage]');

  incrementLocalButton.addEventListener('click', () => {
    onIncrementLocal();
  });

  incrementSessionButton.addEventListener('click', () => {
    onIncrementSession();
  });

  clearStorageButton.addEventListener('click', () => {
    onClear();
  });
}

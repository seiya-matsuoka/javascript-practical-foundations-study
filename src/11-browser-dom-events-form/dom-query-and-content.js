export function setupDomQueryAndContent({ tasks, getCurrentFilter }) {
  // このファイルは、DOM の取得、表示更新、class / dataset / style 操作をまとめて確認する。
  // 画面全体の状態は main.js が持ち、このファイルは受け取った状態を DOM に反映する役割を持つ。
  // querySelector は、CSS selector に一致する最初の要素を取得する。
  // DOM 操作では、まず「どの要素を状態の表示先にするか」を明確にする。
  const statusPanel = document.querySelector('[data-status-panel]');
  const statusText = document.querySelector('[data-status-text]');
  const summary = document.querySelector('[data-task-summary]');

  // querySelectorAll は、一致する複数要素を NodeList として取得する。
  // NodeList は for...of で回せるため、複数 button の初期状態設定に使いやすい。
  const filterButtons = document.querySelectorAll('[data-filter]');

  function updateActiveFilterButton() {
    // 現在の filter と各 button の data-filter を比較し、見た目と aria 状態を同期する。
    // DOM の属性は画面表示だけでなく、アクセシビリティ上の状態表現にも使う。
    const currentFilter = getCurrentFilter();

    for (const button of filterButtons) {
      // dataset は data-* attribute を JavaScript から扱うための入口。
      // HTML 側に状態識別用の値を置き、JS 側では button.dataset.filter として読む。
      const isActive = button.dataset.filter === currentFilter;

      // classList.toggle の第 2 引数に boolean を渡すと、条件に応じて class の付け外しができる。
      // if 文で add / remove を分けるより、状態と class の対応が読みやすい。
      button.classList.toggle('primary', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    }
  }

  function updateStatusPanel(visibleTasks) {
    // tasks 全体から完了数と未完了数を計算し、表示中の件数と合わせて画面へ反映する。
    // DOM 操作そのものだけでなく、状態から表示用の値を作る流れも確認する。
    const completedCount = tasks.filter((task) => task.completed).length;
    const activeCount = tasks.length - completedCount;

    const state = activeCount === 0 ? 'completed' : 'active';

    // dataset に状態を書き込むと、CSS 側で [data-state='active'] のように見た目を切り替えられる。
    statusPanel.dataset.state = state;

    // textContent は HTML として解釈せず、文字列として安全に表示する。
    // ユーザー入力値を表示するときは innerHTML ではなく textContent を優先する。
    statusText.textContent = `${activeCount}件の未完了 / ${completedCount}件の完了`;

    // style の直接操作は、サンプルや一時的な見た目変更では分かりやすい。
    // 実務では classList で CSS class を切り替える方が管理しやすい場面が多い。
    statusPanel.style.border = activeCount === 0 ? '1px solid #8dd7a8' : '1px solid #f1d48a';

    summary.textContent = `現在の表示対象は ${visibleTasks.length} 件。filter=${getCurrentFilter()}。`;
  }

  // 外側には update method だけを公開する。
  // DOM 更新の細かい手順をこのファイル内に閉じ込め、main.js からはまとめて呼び出せるようにする。
  return {
    update(visibleTasks) {
      updateActiveFilterButton();
      updateStatusPanel(visibleTasks);
    },
  };
}

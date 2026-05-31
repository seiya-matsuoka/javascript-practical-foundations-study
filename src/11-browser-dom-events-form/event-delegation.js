export function setupTaskListDelegation({ onToggleTask, onRemoveTask }) {
  // タスク一覧の button は renderTaskList によって再生成される。
  // 各 button に listener を付け直す代わりに、親の ul に listener を 1 つだけ登録する。
  const taskList = document.querySelector('[data-task-list]');

  // event bubbling により、button で発生した click event は親要素の ul まで伝わる。
  // 親要素に listener を 1 つ登録して、子要素の操作をまとめて扱う方法を event delegation と呼ぶ。
  taskList.addEventListener('click', (event) => {
    // bubbling してきた event の target を確認する。
    // text node や別要素が target になる可能性を考慮し、button 以外は無視する。
    const clickedElement = event.target;

    if (!(clickedElement instanceof HTMLButtonElement)) {
      return;
    }

    // button に持たせた data-action と data-task-id を読み取り、どの操作かを判定する。
    // DOM 要素に必要最小限の識別情報を持たせる典型的な使い方。
    const { action, taskId } = clickedElement.dataset;

    if (!action || !taskId) {
      return;
    }

    // dataset から取得した値は文字列。
    // アプリ側の task id は number として扱っているため、ここで明示的に変換する。
    const numericTaskId = Number(taskId);

    if (action === 'toggle') {
      onToggleTask(numericTaskId);

      return;
    }

    if (action === 'remove') {
      onRemoveTask(numericTaskId);
    }
  });
}

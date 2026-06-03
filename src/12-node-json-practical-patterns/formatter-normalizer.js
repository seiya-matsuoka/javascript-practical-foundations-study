import assert from 'node:assert/strict';

function normalizeTaskInput(rawInput) {
  // normalizer 関数は、表記ゆれや余分な空白などを処理しやすい形へ揃える。
  // validation の前に正規化するか、後に正規化するかは要件によって変わる。
  return {
    title: rawInput.title.trim(),
    status: rawInput.status.toLowerCase(),
    priority: Number(rawInput.priority),
  };
}

function formatPriority(priority) {
  // formatter 関数は、内部データを表示用の文字列へ変換する。
  // UI 側のテンプレートや component に条件分岐を散らさないために役立つ。
  const priorityLabelMap = {
    1: '高',
    2: '中',
    3: '低',
  };

  return priorityLabelMap[priority] ?? '未設定';
}

function formatTaskForDisplay(task) {
  return `${formatPriority(task.priority)}: ${task.title} [${task.status}]`;
}

export function runFormatterNormalizerExamples() {
  const rawInput = {
    title: '  JSON を整形する  ',
    status: 'TODO',
    priority: '1',
  };

  const normalizedTask = normalizeTaskInput(rawInput);
  const displayText = formatTaskForDisplay(normalizedTask);

  console.log('normalizer関数で整えたtask:', normalizedTask);
  console.log('formatter関数で作った表示文字列:', displayText);

  assert.deepEqual(normalizedTask, {
    title: 'JSON を整形する',
    status: 'todo',
    priority: 1,
  });
  assert.equal(displayText, '高: JSON を整形する [todo]');
}

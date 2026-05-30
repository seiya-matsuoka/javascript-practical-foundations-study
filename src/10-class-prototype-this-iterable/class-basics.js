import assert from 'node:assert/strict';

class Task {
  constructor({ id, title, completed = false }) {
    // constructor は、new されたときに instance の初期状態を作る。
    // Java の constructor と見た目は似ているが、JavaScript の class は prototype を土台にした構文。
    this.id = id;
    this.title = title;
    this.completed = completed;
  }

  complete() {
    // instance method は、prototype 上に定義される。
    // 各 instance が method の実体を個別に持つのではなく、prototype 経由で共有する。
    this.completed = true;

    return this;
  }

  createLabel() {
    return `${this.id}: ${this.title}`;
  }

  static createDraft(title) {
    // static method は class 自体に属する method。
    // instance ではなく Task.createDraft(...) のように呼び出す。
    return new Task({
      id: 0,
      title,
      completed: false,
    });
  }
}

export function runClassBasicsExamples() {
  const task = new Task({
    id: 1,
    title: 'JavaScriptのclassを確認する',
  });

  const labelBeforeComplete = task.createLabel();

  task.complete();

  const draftTask = Task.createDraft('下書きタスク');

  console.log('classから作ったinstance:', task);
  console.log('完了前に作ったlabel:', labelBeforeComplete);
  console.log('static methodで作ったinstance:', draftTask);

  // instance method は prototype にあるため、instance 自身の property ではない。
  // この点は、JavaScript の class が prototype ベースであることを見る入口になる。
  const prototypeChecks = {
    hasOwnComplete: Object.hasOwn(task, 'complete'),
    prototypeHasComplete: Object.hasOwn(Task.prototype, 'complete'),
    taskPrototypeIsClassPrototype: Object.getPrototypeOf(task) === Task.prototype,
  };

  console.log('classとprototypeの確認:', prototypeChecks);

  assert.equal(task.id, 1);
  assert.equal(task.title, 'JavaScriptのclassを確認する');
  assert.equal(task.completed, true);
  assert.equal(labelBeforeComplete, '1: JavaScriptのclassを確認する');
  assert.deepEqual(
    {
      id: draftTask.id,
      title: draftTask.title,
      completed: draftTask.completed,
    },
    {
      id: 0,
      title: '下書きタスク',
      completed: false,
    },
  );
  assert.deepEqual(prototypeChecks, {
    hasOwnComplete: false,
    prototypeHasComplete: true,
    taskPrototypeIsClassPrototype: true,
  });
}

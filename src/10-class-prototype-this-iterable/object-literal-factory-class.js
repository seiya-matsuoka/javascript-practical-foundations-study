import assert from 'node:assert/strict';

function createTaskByFactory({ id, title }) {
  // factory function は、new を使わずに object を作って返す関数。
  // 必要な data と behavior を object にまとめられるため、class より軽い形で使える場面がある。
  return {
    id,
    title,
    completed: false,
    complete() {
      return {
        ...this,
        completed: true,
      };
    },
  };
}

class TaskByClass {
  constructor({ id, title }) {
    this.id = id;
    this.title = title;
    this.completed = false;
  }

  complete() {
    this.completed = true;

    return this;
  }
}

export function runObjectLiteralFactoryClassExamples() {
  // object literal は、その場で 1 つの object を作るのに向いている。
  // 同じ構造の object を何度も作る場合は、factory function や class の方が意図をまとめやすい。
  const taskByObjectLiteral = {
    id: 1,
    title: 'object literalで作る',
    completed: false,
    complete() {
      return {
        ...this,
        completed: true,
      };
    },
  };

  const taskByFactory = createTaskByFactory({
    id: 2,
    title: 'factory functionで作る',
  });

  const taskByClass = new TaskByClass({
    id: 3,
    title: 'classで作る',
  });

  const completedLiteralTask = taskByObjectLiteral.complete();
  const completedFactoryTask = taskByFactory.complete();

  taskByClass.complete();

  console.log('object literalで作ったtask:', completedLiteralTask);
  console.log('factory functionで作ったtask:', completedFactoryTask);
  console.log('classで作ったtask:', taskByClass);

  // class の instance method は prototype に置かれる。
  // factory function や object literal の method は、通常 object ごとに property として作られる。
  const methodPlacementResults = {
    literalHasOwnComplete: Object.hasOwn(taskByObjectLiteral, 'complete'),
    factoryHasOwnComplete: Object.hasOwn(taskByFactory, 'complete'),
    classInstanceHasOwnComplete: Object.hasOwn(taskByClass, 'complete'),
    classPrototypeHasComplete: Object.hasOwn(TaskByClass.prototype, 'complete'),
  };

  console.log('method配置の違い:', methodPlacementResults);

  assert.deepEqual(completedLiteralTask, {
    id: 1,
    title: 'object literalで作る',
    completed: true,
    complete: taskByObjectLiteral.complete,
  });
  assert.deepEqual(completedFactoryTask, {
    id: 2,
    title: 'factory functionで作る',
    completed: true,
    complete: taskByFactory.complete,
  });
  assert.deepEqual(
    {
      id: taskByClass.id,
      title: taskByClass.title,
      completed: taskByClass.completed,
    },
    {
      id: 3,
      title: 'classで作る',
      completed: true,
    },
  );
  assert.deepEqual(methodPlacementResults, {
    literalHasOwnComplete: true,
    factoryHasOwnComplete: true,
    classInstanceHasOwnComplete: false,
    classPrototypeHasComplete: true,
  });
}

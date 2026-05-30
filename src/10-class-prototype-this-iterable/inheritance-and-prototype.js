import assert from 'node:assert/strict';

class Notification {
  constructor({ id, message }) {
    this.id = id;
    this.message = message;
  }

  createSummary() {
    return `${this.id}: ${this.message}`;
  }

  static category() {
    return 'notification';
  }
}

class EmailNotification extends Notification {
  constructor({ id, message, email }) {
    super({ id, message });

    // extends した class では、this を使う前に super(...) を呼ぶ必要がある。
    // 親 class の constructor で初期化したうえで、子 class 固有の property を追加する。
    this.email = email;
  }

  createSummary() {
    // override した method から super.method() を呼ぶと、親 class の処理を再利用できる。
    return `${super.createSummary()} -> ${this.email}`;
  }

  send() {
    return `send email to ${this.email}`;
  }
}

export function runInheritanceAndPrototypeExamples() {
  const emailNotification = new EmailNotification({
    id: 1,
    message: 'Welcome',
    email: 'alice@example.com',
  });

  const summary = emailNotification.createSummary();
  const sendResult = emailNotification.send();

  console.log('継承したinstance:', emailNotification);
  console.log('overrideしたsummary:', summary);
  console.log('子class固有method:', sendResult);

  // JavaScript の class は prototype ベースの仕組みの上にある。
  // instance -> 子 class prototype -> 親 class prototype という prototype chain をたどって method を探す。
  const prototypeResults = {
    instancePrototypeIsChild:
      Object.getPrototypeOf(emailNotification) === EmailNotification.prototype,
    childPrototypeParentIsBase:
      Object.getPrototypeOf(EmailNotification.prototype) === Notification.prototype,
    basePrototypeHasCreateSummary: Object.hasOwn(Notification.prototype, 'createSummary'),
    childPrototypeHasSend: Object.hasOwn(EmailNotification.prototype, 'send'),
  };

  console.log('prototype chainの確認:', prototypeResults);

  const instanceOfResults = {
    isEmailNotification: emailNotification instanceof EmailNotification,
    isNotification: emailNotification instanceof Notification,
  };

  console.log('instanceofの結果:', instanceOfResults);

  assert.equal(summary, '1: Welcome -> alice@example.com');
  assert.equal(sendResult, 'send email to alice@example.com');
  assert.deepEqual(prototypeResults, {
    instancePrototypeIsChild: true,
    childPrototypeParentIsBase: true,
    basePrototypeHasCreateSummary: true,
    childPrototypeHasSend: true,
  });
  assert.deepEqual(instanceOfResults, {
    isEmailNotification: true,
    isNotification: true,
  });
  assert.equal(Notification.category(), 'notification');
}

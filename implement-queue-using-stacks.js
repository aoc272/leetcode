Array.prototype.size = function () {
  return this.length;
};

Array.prototype.isEmpty = function () {
  return this.size() === 0;
};

Array.prototype.isNonEmpty = function () {
  return this.size() !== 0;
};

Array.prototype.peek = function () {
  return this[this.size() - 1];
};

class Queue {
  constructor() {
    this.stk1 = [];
    this.stk2 = [];
  }

  push(x) {
    this.stk1.push(x);
  }

  pop() {
    if (this.stk2.isEmpty())
      while (this.stk1.isNonEmpty()) this.stk2.push(this.stk1.pop());
    return this.stk2.isNonEmpty() ? this.stk2.pop() : -1;
  }

  peek() {
    if (this.stk2.isNonEmpty()) return this.stk2.peek();
    else if (this.stk1.isNonEmpty()) return this.stk1[0];
    else return -1;
  }

  isEmpty() {
    return this.stk1.isEmpty() && this.stk2.isEmpty();
  }
}

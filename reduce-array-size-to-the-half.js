const left = (i) => 2 * i + 1;
const right = (i) => 2 * i + 2;
const parent = (i) => ((i + 1) >>> 1) - 1;

class PriorityQueue {
  constructor(greater) {
    this.heap = [];
    this.greater = (i, j) => greater(this.heap[i], this.heap[j]);
  }

  size() {
    return this.heap.length;
  }

  nonEmpty() {
    return this.size() > 0;
  }

  peek() {
    return this.heap[0];
  }

  push(item) {
    this.heap.push(item);
    this.upstream();
  }

  pop() {
    const item = this.peek();
    if (this.size() > 1) this.swap(0, this.size() - 1);
    this.heap.pop();
    this.downstream();
    return item;
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  upstream() {
    let cur = this.size() - 1;
    while (cur > 0 && this.greater(cur, parent(cur))) {
      this.swap(cur, parent(cur));
      cur = parent(cur);
    }
  }

  downstream() {
    let cur = 0;
    while (
      (left(cur) < this.size() && this.greater(left(cur), cur)) ||
      (right(cur) < this.size() && this.greater(right(cur), cur))
    ) {
      const child =
        right(cur) < this.size() && this.greater(right(cur), left(cur))
          ? right(cur)
          : left(cur);
      this.swap(cur, child);
      cur = child;
    }
  }
}

const minSetSize = function (arr) {
  let answer = 0;

  const count = [];
  for (const v of arr) {
    if (count[v]) count[v] += 1;
    else count[v] = 1;
  }

  const pq = new PriorityQueue(([u, cnt_u], [v, cnt_v]) => cnt_u >= cnt_v);
  for (let v = 1; v <= 100000; v += 1) {
    if (count[v]) {
      pq.push([v, count[v]]);
    }
  }

  let removed = 0;
  const threshold = arr.length / 2;
  while (pq.nonEmpty()) {
    const [v, cnt] = pq.pop();
    removed += cnt;
    answer += 1;
    if (removed >= threshold) break;
  }

  return answer;
};

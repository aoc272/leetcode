var minSubarray = function (A, p) {
  const S = A.reduce((a, v) => (a + v) % p, 0) % p;
  const last = new Map();
  last.set(0, -1);

  if (S === 0) return 0;

  let res = A.length;
  for (let i = 0, cur = 0, remainder, _j; i < A.length; i += 1) {
    cur = (cur + A[i]) % p;
    last.set(cur, i);
    remainder = (cur - S + p) % p;
    if (last.has(remainder)) {
      _j = last.get(remainder);
      res = Math.min(res, i - _j);
    }
  }

  return res < A.length ? res : -1;
};

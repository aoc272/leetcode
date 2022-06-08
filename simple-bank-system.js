class Bank {
  constructor(balance) {
    this.balance = balance;
  }

  between(a) {
    return 1 <= a && a <= this.balance.length;
  }

  getBalance(account) {
    return this.balance[account - 1];
  }

  transfer(a, b, money) {
    if (this.between(a) && this.between(b)) {
      if (money <= this.getBalance(a)) {
        this.balance[a - 1] -= money;
        this.balance[b - 1] += money;
        return true;
      } else return false;
    } else return false;
  }

  deposit(account, money) {
    if (this.between(account)) {
      this.balance[account - 1] += money;
      return true;
    } else return false;
  }

  withdraw(account, money) {
    if (this.between(account) && money <= this.getBalance(account)) {
      this.balance[account - 1] -= money;
      return true;
    } else return false;
  }
}

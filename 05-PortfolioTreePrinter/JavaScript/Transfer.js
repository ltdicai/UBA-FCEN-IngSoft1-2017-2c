require('./AccountTransaction.js');
require('./WithdrawLeg.js');
require('./DepositLeg.js');

Transfer = function (value) {
    AccountTransaction.call(this);
    this._value = value;
    this._withdrawLeg = new WithdrawLeg(value, this);
    this._depositLeg = new DepositLeg(value, this);
};

Transfer.prototype = Object.create(AccountTransaction.prototype);
Transfer.registerFor = function (value,fromAccount, toAccount) {
    let transfer = new Transfer(value);
    fromAccount.register(transfer.withdrawLeg());
    toAccount.register(transfer.depositLeg());

    return transfer;
};

Transfer.prototype.value = function () {
    return this._value;
};

Transfer.prototype.withdrawLeg = function () {
    return this._withdrawLeg;
};

Transfer.prototype.depositLeg = function () {
    return this._depositLeg;
};
require('./Withdraw.js');

WithdrawLeg = function (value, transfer) {
    Withdraw.call(this, value);
    this._transfer = transfer;
};

WithdrawLeg.prototype = Object.create(Withdraw.prototype);

Withdraw.prototype.transfer = function () {
    return this._transfer;
};

WithdrawLeg.prototype.accept = function (aVisitor) {
	return aVisitor.visitWithdrawLeg(this);
};

require('./Deposit.js');

DepositLeg = function (value, transfer) {
    Deposit.call(this, value);
    this._transfer = transfer;
};

DepositLeg.prototype = Object.create(Deposit.prototype);

DepositLeg.prototype.transfer = function () {
    return this._transfer;
};
DepositLeg.prototype.accept = function (aVisitor) {
	return aVisitor.visitDepositLeg(this);
};

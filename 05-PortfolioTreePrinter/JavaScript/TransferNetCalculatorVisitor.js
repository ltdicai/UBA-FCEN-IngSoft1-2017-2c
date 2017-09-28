require ('./OperationVisitor.js');

TransferNetCalculatorVisitor = function () {
	OperationVisitor.call(this);
};

TransferNetCalculatorVisitor.prototype = Object.create(OperationVisitor.prototype);

TransferNetCalculatorVisitor.prototype.visitReceptiveAccount = function(anAccount) {
	return anAccount.transactions().reduce(
		(netAmount, aTransaction) => netAmount + aTransaction.accept(this), 0);
};

TransferNetCalculatorVisitor.prototype.visitPortfolio = function(anAccount, managedAccounts) {
	throw new Error(OperationVisitor.prototype.INVALID_PARAMETERS);
};

TransferNetCalculatorVisitor.prototype.visitDeposit = function(aDeposit) {
	return 0;
};

TransferNetCalculatorVisitor.prototype.visitWithdraw = function(aWithdraw) {
	return 0;
};

TransferNetCalculatorVisitor.prototype.visitDepositLeg = function(aDepositLeg) {
	return aDepositLeg.value();
};

TransferNetCalculatorVisitor.prototype.visitWithdrawLeg = function(aWithdrawLeg) {
	return aWithdrawLeg.value();
};

TransferNetCalculatorVisitor.prototype.visitCertificateOfDeposit = function(aCertificateOfDeposit) {
	return 0;
};
require ('./OperationVisitor.js');

InvestmentCalculatorVisitor = function () {
	OperationVisitor.call(this);
};

InvestmentCalculatorVisitor.prototype = Object.create(OperationVisitor.prototype);

InvestmentCalculatorVisitor.prototype.visitReceptiveAccount = function(anAccount) {
	return anAccount.transactions().reduce(
		(netAmount, aTransaction) => netAmount + aTransaction.accept(this), 0);
};

InvestmentCalculatorVisitor.prototype.visitPortfolio = function(anAccount, managedAccount) {
	throw new Error(OperationVisitor.prototype.INVALID_PARAMETERS);
};

InvestmentCalculatorVisitor.prototype.visitDeposit = function(aDeposit) {
	return 0;
};

InvestmentCalculatorVisitor.prototype.visitWithdraw = function(aWithdraw) {
	return 0;
};

InvestmentCalculatorVisitor.prototype.visitDepositLeg = function(aDepositLeg) {
	return 0;
};

InvestmentCalculatorVisitor.prototype.visitWithdrawLeg = function(aWithdrawLeg) {
	return 0;
};

InvestmentCalculatorVisitor.prototype.visitCertificateOfDeposit = function(aCertificateOfDeposit) {
	return -aCertificateOfDeposit.value();
};
require ('./OperationVisitor.js');

TransferNetCalculatorVisitor = function () {
	OperationVisitor.call(this);
};

TransferNetCalculatorVisitor.prototype = Object.create(OperationVisitor.prototype);

TransferNetCalculatorVisitor.prototype.visitReceptiveAccount = function(anAccount) {
	let allTransactions = anAccount.transactions(),
		net = 0;
	for(let idx = 0; idx < allTransactions.length; ++idx) {
		net += allTransactions[idx].accept(this);
	}
	return net;
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
require ('./OperationVisitor.js');

InvestmentEarningsCalculatorVisitor = function () {
	OperationVisitor.call(this);
};

InvestmentEarningsCalculatorVisitor.prototype = Object.create(OperationVisitor.prototype);

InvestmentEarningsCalculatorVisitor.prototype.visitReceptiveAccount = function(anAccount) {
	let allTransactions = anAccount.transactions(),
		net = 0;
	for(let idx = 0; idx < allTransactions.length; ++idx) {
		net += allTransactions[idx].accept(this);
	}
	return net;
};

InvestmentEarningsCalculatorVisitor.prototype.visitPortfolio = function(anAccount, managedAccounts) {
	throw new Error(OperationVisitor.prototype.INVALID_PARAMETERS);
};

InvestmentEarningsCalculatorVisitor.prototype.visitDeposit = function(aDeposit) {
	return 0;
};

InvestmentEarningsCalculatorVisitor.prototype.visitWithdraw = function(aWithdraw) {
	return 0;
};

InvestmentEarningsCalculatorVisitor.prototype.visitDepositLeg = function(aDepositLeg) {
	return 0;
};

InvestmentEarningsCalculatorVisitor.prototype.visitWithdrawLeg = function(aWithdrawLeg) {
	return 0;
};

InvestmentEarningsCalculatorVisitor.prototype.visitCertificateOfDeposit = function(aCertificateOfDeposit) {
	return -aCertificateOfDeposit.value() * ( aCertificateOfDeposit.interestRate() / 360) * aCertificateOfDeposit.durationInDays();
};
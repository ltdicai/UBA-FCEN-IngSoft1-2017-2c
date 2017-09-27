require ('./OperationVisitor.js');

InvestmentCalculatorVisitor = function () {
	OperationVisitor.call(this);
};


InvestmentCalculatorVisitor.prototype = Object.create(OperationVisitor.prototype);

InvestmentCalculatorVisitor.prototype.visitReceptiveAccount = function(anAccount) {
	debugger;
	let allTransactions = anAccount.transactions(),
		net = 0;
	for(let idx = 0; idx < allTransactions.length; ++idx) {
		net += allTransactions[idx].accept(this);
	}
	return net;
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
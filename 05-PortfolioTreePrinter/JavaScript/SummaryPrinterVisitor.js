require ('./OperationVisitor.js');

SummaryPrinterVisitor = function () {
	OperationVisitor.call(this);
};

SummaryPrinterVisitor.prototype = Object.create(OperationVisitor.prototype);

SummaryPrinterVisitor.prototype.visitReceptiveAccount = function(anAccount) {
	return anAccount.transactions().reduce(
		(summary, aTransaction) => summary.concat(aTransaction.accept(this)), []);
};

SummaryPrinterVisitor.prototype.visitPortfolio = function(anAccount, managedAccount) {
	throw new Error(OperationVisitor.prototype.INVALID_PARAMETERS);
};

SummaryPrinterVisitor.prototype.visitDeposit = function(aDeposit) {
	return "Depósito por " + aDeposit.value();
};

SummaryPrinterVisitor.prototype.visitWithdraw = function(aWithdraw) {
	return "Extracción por " + (-1 * aWithdraw.value());
};

SummaryPrinterVisitor.prototype.visitDepositLeg = function(aDepositLeg) {
	return "Transferencia por " + aDepositLeg.value();
};

SummaryPrinterVisitor.prototype.visitWithdrawLeg = function(aWithdrawLeg) {
	return "Transferencia por " + aWithdrawLeg.value();
};

SummaryPrinterVisitor.prototype.visitCertificateOfDeposit = function(aCertificateOfDeposit) {
	return "Plazo fijo por " + (-aCertificateOfDeposit.value()) + 
		" durante " + aCertificateOfDeposit.durationInDays() + " días a una tna de " +
		aCertificateOfDeposit.interestRate().toFixed(1);
};
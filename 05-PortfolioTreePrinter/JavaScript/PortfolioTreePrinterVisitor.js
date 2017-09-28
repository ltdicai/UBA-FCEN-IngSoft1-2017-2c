require ('./OperationVisitor.js');

PortfolioTreePrinterVisitor = function (accountNames) {
	OperationVisitor.call(this);
	this._accountNames = accountNames;
};

PortfolioTreePrinterVisitor.prototype = Object.create(OperationVisitor.prototype);

PortfolioTreePrinterVisitor.prototype.visitReceptiveAccount = function(anAccount) {
	return [this._accountNames.get(anAccount)];
};

PortfolioTreePrinterVisitor.prototype.visitPortfolio = function(aPortfolio, managedAccounts) {
	let tree = [this._accountNames.get(aPortfolio)];
	managedAccounts.forEach((managedAccount) => {
		tree = tree.concat(managedAccount.accept(this).map((message) => " " + message));
	});
	return tree;
};

PortfolioTreePrinterVisitor.prototype.visitDeposit = function(aDeposit) {
	throw new Error(OperationVisitor.prototype.INVALID_PARAMETERS);
};

PortfolioTreePrinterVisitor.prototype.visitWithdraw = function(aWithdraw) {
	throw new Error(OperationVisitor.prototype.INVALID_PARAMETERS);
};

PortfolioTreePrinterVisitor.prototype.visitDepositLeg = function(aDepositLeg) {
	throw new Error(OperationVisitor.prototype.INVALID_PARAMETERS);
};

PortfolioTreePrinterVisitor.prototype.visitWithdrawLeg = function(aWithdrawLeg) {
	throw new Error(OperationVisitor.prototype.INVALID_PARAMETERS);
};

PortfolioTreePrinterVisitor.prototype.visitCertificateOfDeposit = function(aCertificateOfDeposit) {
	throw new Error(OperationVisitor.prototype.INVALID_PARAMETERS);
};
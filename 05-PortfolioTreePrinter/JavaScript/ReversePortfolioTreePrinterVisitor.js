require ('./OperationVisitor.js');

ReversePortfolioTreePrinterVisitor = function (accountNames) {
	OperationVisitor.call(this);
	this._accountNames = accountNames;
};

ReversePortfolioTreePrinterVisitor.prototype = Object.create(OperationVisitor.prototype);

ReversePortfolioTreePrinterVisitor.prototype.visitReceptiveAccount = function(anAccount) {
	return [this._accountNames.get(anAccount)];
};

ReversePortfolioTreePrinterVisitor.prototype.visitPortfolio = function(aPortfolio, managedAccounts) {
	let tree = [];
	managedAccounts.reverse();
	managedAccounts.forEach((managedAccount) => {
		tree = tree.concat(managedAccount.accept(this).map((message) => " " + message));
	});
	tree.push(this._accountNames.get(aPortfolio));
	return tree;
};

ReversePortfolioTreePrinterVisitor.prototype.visitDeposit = function(aDeposit) {
	throw new Error(OperationVisitor.prototype.INVALID_PARAMETERS);
};

ReversePortfolioTreePrinterVisitor.prototype.visitWithdraw = function(aWithdraw) {
	throw new Error(OperationVisitor.prototype.INVALID_PARAMETERS);
};

ReversePortfolioTreePrinterVisitor.prototype.visitDepositLeg = function(aDepositLeg) {
	throw new Error(OperationVisitor.prototype.INVALID_PARAMETERS);
};

ReversePortfolioTreePrinterVisitor.prototype.visitWithdrawLeg = function(aWithdrawLeg) {
	throw new Error(OperationVisitor.prototype.INVALID_PARAMETERS);
};

ReversePortfolioTreePrinterVisitor.prototype.visitCertificateOfDeposit = function(aCertificateOfDeposit) {
	throw new Error(OperationVisitor.prototype.INVALID_PARAMETERS);
};
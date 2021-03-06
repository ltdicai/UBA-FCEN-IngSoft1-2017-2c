require ('./Object.js');

OperationVisitor = function () {};

OperationVisitor.prototype.INVALID_PARAMETERS = "Parámetros inválidos";

OperationVisitor.prototype.visitReceptiveAccount = function(anAccount) { this.shouldBeImplementedBySubclass() };
OperationVisitor.prototype.visitPortfolio = function(aPortfolio, managedAccounts) { this.shouldBeImplementedBySubclass() };
OperationVisitor.prototype.visitDeposit = function(aDeposit) { this.shouldBeImplementedBySubclass() };
OperationVisitor.prototype.visitWithdraw = function(aWithdraw) { this.shouldBeImplementedBySubclass() };
OperationVisitor.prototype.visitDepositLeg = function(aDepositLeg) { this.shouldBeImplementedBySubclass() };
OperationVisitor.prototype.visitWithdragLeg = function(aWithdragLeg) { this.shouldBeImplementedBySubclass() };
OperationVisitor.prototype.visitCertificateOfDeposit = function(aCertificateOfDeposit) { this.shouldBeImplementedBySubclass() };
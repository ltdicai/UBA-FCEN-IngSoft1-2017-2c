require('./AccountTransaction.js');
require('./Deposit.js');

CertificateOfDeposit = function (value, durationInDays, interestRate) {
    AccountTransaction.call(this);
    this._initialInvestment = new Withdraw(value);
    this._durationInDays = durationInDays;
    this._interestRate = interestRate;
};

CertificateOfDeposit.prototype = Object.create(AccountTransaction.prototype);
CertificateOfDeposit.registerFor = function (initialInvestment, durationInDays, interestRate, account) {
    let certificate = new CertificateOfDeposit(initialInvestment, durationInDays, interestRate);
    account.register(certificate);

    return certificate;
};

CertificateOfDeposit.prototype.value = function () {
    return this._initialInvestment.value();
};

CertificateOfDeposit.prototype.accept = function (aVisitor) {
	return aVisitor.visitCertificateOfDeposit(this);
};

CertificateOfDeposit.prototype.durationInDays = function () {
    return this._durationInDays;
};

CertificateOfDeposit.prototype.interestRate = function () {
    return this._interestRate;
};
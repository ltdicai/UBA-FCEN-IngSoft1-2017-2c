/*
 * Developed by 10Pines SRL
 * License:
 * This work is licensed under the
 * Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/3.0/
 * or send a letter to Creative Commons, 444 Castro Street, Suite 900, Mountain View,
 * California, 94041, USA.
 *
 */
require('./SummarizingAccount.js');

ReceptiveAccount = function () {
    SummarizingAccount.call(this);
    this._transactions = [];
};

ReceptiveAccount.prototype = Object.create(SummarizingAccount.prototype);

ReceptiveAccount.prototype.balance = function () {
    return this._transactions.reduce(
		(totalBalance, transaction) => {return totalBalance + transaction.value()}, 
		0
	);
};

ReceptiveAccount.prototype.register = function (transaction) {
    this._transactions.push(transaction); 
};

ReceptiveAccount.prototype.registers = function (transaction) {
	return this._transactions.find(
		(registeredTransaction) => registeredTransaction === transaction
	) !== undefined;
};

ReceptiveAccount.prototype.manages = function (account) {
    return this === account;
};

ReceptiveAccount.prototype.transactions = function () {
    return this._transactions.concat(); // Returns a copy
};

ReceptiveAccount.prototype.accept = function (aVisitor) {
	return aVisitor.visitReceptiveAccount(this);
};
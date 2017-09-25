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

Portfolio = function () {
    SummarizingAccount.call(this);
    this._summarizingAccounts = [];
};

Portfolio.prototype = Object.create(SummarizingAccount.prototype);
Portfolio.prototype.ACCOUNT_ALREADY_MANAGED = "La cuenta ya está manejada por otro portfolio";

Portfolio.createWith = function (anAccount,anotherAccount) {
	let portfolio = new this();
	portfolio.addAccount(anAccount);
	portfolio.addAccount(anotherAccount);
	return portfolio;
};

Portfolio.prototype.balance = function () {
	return this._summarizingAccounts.reduce(
		(totalBalance, account) => {return totalBalance + account.balance()}, 
		0
	);
};

Portfolio.prototype.registers = function (transaction) {
	return this._summarizingAccounts.find(
		(account) => account.registers(transaction)
	) !== undefined;
};

Portfolio.prototype.manages = function (account) {
	return this._summarizingAccounts.findAndDoOtherwise(
		(item) => item.manages(account),
		() => {return true},
		() => {return this === account}
	);
};

Portfolio.prototype.transactions = function () {
    return this._summarizingAccounts.reduce(
    	(accum, accounts) => {
    		return accum.concat(accounts.transactions());
    	}, 
    	[]
    );
};

Portfolio.prototype.addAccount = function (account) {
	this._summarizingAccounts.findAndDoOtherwise(
		(item) => this.manages(account),
		() => {throw new Error(Portfolio.prototype.ACCOUNT_ALREADY_MANAGED);},
		() => this._summarizingAccounts.push(account)
	)
};

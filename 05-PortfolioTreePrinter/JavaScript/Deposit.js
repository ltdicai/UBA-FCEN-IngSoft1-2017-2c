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
require('./AccountTransaction.js');

Deposit = function (value) {
    AccountTransaction.call(this);
    this._value = value;
};

Deposit.prototype = Object.create(AccountTransaction.prototype);
Deposit.registerForOn = function (value,account) {
    var deposit = new Deposit(value);
    account.register(deposit);

    return deposit;
};

Deposit.prototype.value = function () {
    return this._value;
};

Deposit.prototype.accept = function (aVisitor) {
	return aVisitor.visitDeposit(this);
};

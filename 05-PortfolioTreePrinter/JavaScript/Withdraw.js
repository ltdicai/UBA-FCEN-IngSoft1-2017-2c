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

Withdraw = function (value) {
    AccountTransaction.call(this);
    this._value = value;
};

Withdraw.prototype = Object.create(AccountTransaction.prototype);
Withdraw.registerForOn = function (value,account) {
    var deposit = new Withdraw(value);
    account.register(deposit);


    return deposit;
};

Withdraw.prototype.value = function () {
    return -this._value;
};

Withdraw.prototype.accept = function (aVisitor) {
	return aVisitor.visitWithdraw(this);
};

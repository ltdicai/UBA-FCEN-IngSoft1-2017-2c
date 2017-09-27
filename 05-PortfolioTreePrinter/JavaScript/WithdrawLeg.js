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
require('./Withdraw.js');

WithdrawLeg = function (value, transfer) {
    Withdraw.call(this, value);
    this._transfer = transfer;
};

WithdrawLeg.prototype = Object.create(Withdraw.prototype);

Withdraw.prototype.transfer = function () {
    return this._transfer;
};

WithdrawLeg.prototype.accept = function (aVisitor) {
	return aVisitor.visitWithdrawLeg(this);
};

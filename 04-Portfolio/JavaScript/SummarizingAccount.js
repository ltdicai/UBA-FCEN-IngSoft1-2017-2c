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
require ('./Object.js');

SummarizingAccount = function () {
};

SummarizingAccount.prototype.balance = function () { this.shouldBeImplementedBySubclass() };
SummarizingAccount.prototype.registers = function (aTransaction) { this.shouldBeImplementedBySubclass() };
SummarizingAccount.prototype.manages = function (anAccount) { this.shouldBeImplementedBySubclass() };
SummarizingAccount.prototype.transactions = function () { this.shouldBeImplementedBySubclass() };

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

// Descomentar linea siguiente para correr en Plunker
//var assert = chai.assert;

// Descomentar linea siguiente para correr en Plunker
///*
require ('./Deposit.js');
require ('./Withdraw.js');
require ('./ReceptiveAccount.js');
require ('./Portfolio.js');

var assert = require('assert');
// Descomentar linea siguiente para correr en Plunker
//*/

assert.isTrue = function (aBoolean) {
    return assert.ok(aBoolean);
};

assert.isFalse = function (aBoolean) {
    return assert.isTrue (!aBoolean);
};

suite('PortfolioTest',function() {
    setup(function () {
    });
    
    test("01ReceptiveAccountHaveZeroAsBalanceWhenCreated", function() {
        var account = new ReceptiveAccount ();

        assert.deepEqual(0.0,account.balance());
    });
	
	
    test("02DepositIncreasesBalanceOnTransactionValue", function() {
        var account = new ReceptiveAccount ();
        Deposit.registerForOn(100,account);

        assert.deepEqual(100.0,account.balance());

    });

	
    test("03WithdrawDecreasesBalanceOnTransactionValue", function() {
        var account = new ReceptiveAccount ();
        Deposit.registerForOn(100,account);
        Withdraw.registerForOn(-50,account);

        assert.deepEqual(50.0,account.balance());
    });

	
    test("04PortfolioBalanceIsSumOfManagedAccountsBalance", function() {
        var account1 = new ReceptiveAccount ();
        var account2 = new ReceptiveAccount ();
        var complexPortfolio = new Portfolio();
        complexPortfolio.addAccount(account1);
        complexPortfolio.addAccount(account2);

        Deposit.registerForOn(100,account1);
        Deposit.registerForOn(200,account2);

        assert.deepEqual(300.0,complexPortfolio.balance());
    });

	
    test("05PortfolioCanManagePortfolios", function() {
        var account1 = new ReceptiveAccount ();
        var account2 = new ReceptiveAccount ();
        var account3 = new ReceptiveAccount ();
        var complexPortfolio = Portfolio.createWith(account1,account2);
        var composedPortfolio = Portfolio.createWith(complexPortfolio,account3);

        Deposit.registerForOn(100,account1);
        Deposit.registerForOn(200,account2);
        Deposit.registerForOn(300,account3);
        assert.deepEqual(600.0,composedPortfolio.balance());
    });

	
    test("06ReceptiveAccountsKnowsRegisteredTransactions", function() {
        var account = new ReceptiveAccount ();
        var deposit = Deposit.registerForOn(100,account);
        var withdraw = Withdraw.registerForOn(-50,account);

        assert.isTrue(account.registers(deposit));
        assert.isTrue(account.registers(withdraw));
    });

	
    test("07ReceptiveAccountsDoNotKnowNotRegisteredTransactions", function() {
        var account = new ReceptiveAccount ();
        var deposit = new Deposit (100);
        var withdraw = new Withdraw (-50);

        assert.isFalse(account.registers(deposit));
        assert.isFalse(account.registers(withdraw));
    });
	
	
    test("08PortofoliosKnowsTransactionsRegisteredByItsManagedAccounts", function() {
        var account1 = new ReceptiveAccount ();
        var account2 = new ReceptiveAccount ();
        var account3 = new ReceptiveAccount ();
        var complexPortfolio = Portfolio.createWith(account1,account2);
        var composedPortfolio = Portfolio.createWith(complexPortfolio,account3);

        var deposit1 = Deposit.registerForOn(100,account1);
        var deposit2 = Deposit.registerForOn(200,account2);
        var deposit3 = Deposit.registerForOn(300,account3);

        assert.isTrue(composedPortfolio.registers(deposit1));
        assert.isTrue(composedPortfolio.registers(deposit2));
        assert.isTrue(composedPortfolio.registers(deposit3));
    });

	
    test("09PortofoliosDoNotKnowTransactionsNotRegisteredByItsManagedAccounts", function() {
        var account1 = new ReceptiveAccount ();
        var account2 = new ReceptiveAccount ();
        var account3 = new ReceptiveAccount ();
        var complexPortfolio = Portfolio.createWith(account1,account2);
        var composedPortfolio = Portfolio.createWith(complexPortfolio,account3);

        var deposit1 = new Deposit(100);
        var deposit2 = new Deposit(200);
        var deposit3 = new Deposit(300);

        assert.isFalse(composedPortfolio.registers(deposit1));
        assert.isFalse(composedPortfolio.registers(deposit2));
        assert.isFalse(composedPortfolio.registers(deposit3));
    });

	
    test("10ReceptiveAccountManageItSelf", function() {
        var account1 = new ReceptiveAccount ();

        assert.isTrue(account1.manages(account1));
    });

	
    test("11ReceptiveAccountDoNotManageOtherAccount", function() {
        var account1 = new ReceptiveAccount ();
        var account2 = new ReceptiveAccount ();

        assert.isFalse(account1.manages(account2));
    });
	
	
    test("12PortfolioManagesComposedAccounts", function() {
        var account1 = new ReceptiveAccount ();
        var account2 = new ReceptiveAccount ();
        var account3 = new ReceptiveAccount ();
        var complexPortfolio = Portfolio.createWith(account1,account2);

        assert.isTrue(complexPortfolio.manages(account1));
        assert.isTrue(complexPortfolio.manages(account2));
        assert.isFalse(complexPortfolio.manages(account3));
    });

	
    test("13PortfolioManagesComposedAccountsAndPortfolios", function() {
        var account1 = new ReceptiveAccount ();
        var account2 = new ReceptiveAccount ();
        var account3 = new ReceptiveAccount ();
        var complexPortfolio = Portfolio.createWith(account1,account2);
        var composedPortfolio = Portfolio.createWith(complexPortfolio,account3);

        assert.isTrue(composedPortfolio.manages(account1));
        assert.isTrue(composedPortfolio.manages(account2));
        assert.isTrue(composedPortfolio.manages(account3));
        assert.isTrue(composedPortfolio.manages(complexPortfolio));
    });

	
    test("14AccountsKnowsItsTransactions", function() {
        var account1 = new ReceptiveAccount ();

        var deposit1 = Deposit.registerForOn(100,account1);

        assert.deepEqual(1,account1.transactions().length);
        assert.isTrue(account1.transactions().indexOf(deposit1)!=-1);
    });
	
	
    test("15PortfolioKnowsItsAccountsTransactions", function() {
        var account1 = new ReceptiveAccount ();
        var account2 = new ReceptiveAccount ();
        var account3 = new ReceptiveAccount ();
        var complexPortfolio = Portfolio.createWith(account1,account2);
        var composedPortfolio = Portfolio.createWith(complexPortfolio,account3);

        var deposit1 = Deposit.registerForOn(100,account1);
        var deposit2 = Deposit.registerForOn(200,account2);
        var deposit3 = Deposit.registerForOn(300,account3);

        assert.deepEqual(3,composedPortfolio.transactions().length);
        assert.isTrue(composedPortfolio.transactions().indexOf(deposit1)!=-1);
        assert.isTrue(composedPortfolio.transactions().indexOf(deposit2)!=-1);
        assert.isTrue(composedPortfolio.transactions().indexOf(deposit3)!=-1);
    });

	
    test("16CanNotCreatePortfoliosWithRepeatedAccount", function() {
        var account1 = new ReceptiveAccount ();
        try {
            Portfolio.createWith(account1,account1);
            fail();
        }catch (invalidPortfolio) {
            assert.deepEqual(Portfolio.prototype.ACCOUNT_ALREADY_MANAGED, invalidPortfolio.message);
        }

    });

	
    test("17CanNotCreatePortfoliosWithAccountsManagedByOtherManagedPortfolio", function() {
        var account1 = new ReceptiveAccount ();
        var account2 = new ReceptiveAccount ();
        var complexPortfolio = Portfolio.createWith(account1,account2);
        try {
            Portfolio.createWith(complexPortfolio,account1);
            fail();
        }catch (invalidPortfolio) {
            assert.deepEqual(Portfolio.prototype.ACCOUNT_ALREADY_MANAGED, invalidPortfolio.message);
        }
    });
});

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

assert.fail = function () {
    return assert.isTrue(false);
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
        Withdraw.registerForOn(50,account);

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
            assert.fail();
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
            assert.fail();
        }catch (invalidPortfolio) {
            assert.deepEqual(Portfolio.prototype.ACCOUNT_ALREADY_MANAGED, invalidPortfolio.message);
        }
    });

    test("18aTransferShouldRegistersATransferDepositOnToAccount", function() {
        var fromAccount = new ReceptiveAccount ();
        var toAccount = new ReceptiveAccount ();

        var transfer = Transfer.registerFor(100,fromAccount, toAccount);

        assert.isTrue(toAccount.registers(transfer.depositLeg()));
    });


    test("18bTransferShouldRegistersATransferWithdrawOnFromAccount", function() {
        var fromAccount = new ReceptiveAccount ();
        var toAccount = new ReceptiveAccount ();

        var transfer = Transfer.registerFor(100,fromAccount, toAccount);

        assert.isTrue(fromAccount.registers(transfer.withdrawLeg()));
    });


    test("18cTransferLegsKnowTransfer", function() {
        var fromAccount = new ReceptiveAccount ();
        var toAccount = new ReceptiveAccount ();

        var transfer = Transfer.registerFor(100,fromAccount, toAccount);

        assert.deepEqual(transfer.depositLeg().transfer(),transfer.withdrawLeg().transfer());
    });


    test("18dTransferKnowsItsValue", function() {
        var fromAccount = new ReceptiveAccount ();
        var toAccount = new ReceptiveAccount ();

        var transfer = Transfer.registerFor(100,fromAccount, toAccount);

        assert.deepEqual(100,transfer.value(),0.0);
    });


    test("18eTransferShouldWithdrawFromFromAccountAndDepositIntoToAccount", function() {
        var fromAccount = new ReceptiveAccount ();
        var toAccount = new ReceptiveAccount ();

        Transfer.registerFor(100,fromAccount, toAccount);

        assert.deepEqual(-100.0, fromAccount.balance(),0.0);
        assert.deepEqual(100.0, toAccount.balance(),0.0);
    });


    test("19AccountSummaryShouldProvideHumanReadableTransactionsDetail", function() {
        var fromAccount = new ReceptiveAccount ();
        var toAccount = new ReceptiveAccount ();

        Deposit.registerForOn(100,fromAccount);
        Withdraw.registerForOn(50,fromAccount);
        Transfer.registerFor(100,fromAccount, toAccount);

        var lines = accountSummaryLines(fromAccount);

        assert.deepEqual(3,lines.length);
        assert.deepEqual("Depósito por 100", lines[0]);
        assert.deepEqual("Extracción por 50", lines[1]);
        assert.deepEqual("Transferencia por -100", lines[2]);
    });

    function accountSummaryLines(fromAccount) {
        return fromAccount.accept(new SummaryPrinterVisitor());
    };


    test("20ShouldBeAbleToBeQueryTransferNet", function() {
        var fromAccount = new ReceptiveAccount ();
        var toAccount = new ReceptiveAccount ();

        Deposit.registerForOn(100,fromAccount);
        Withdraw.registerForOn(50,fromAccount);
        Transfer.registerFor(100,fromAccount, toAccount);
        Transfer.registerFor(250,toAccount, fromAccount);

        assert.deepEqual(150.0,accountTransferNet(fromAccount),0.0);
        assert.deepEqual(-150.0,accountTransferNet(toAccount),0.0);
    });

    function accountTransferNet(account) {
        return account.accept(new TransferNetCalculatorVisitor());
    };


    test("21CertificateOfDepositShouldWithdrawInvestmentValue", function() {
        var account = new ReceptiveAccount ();
        var toAccount = new ReceptiveAccount ();

        Deposit.registerForOn(1000,account);
        Withdraw.registerForOn(50,account);
        Transfer.registerFor(100,account, toAccount);
        CertificateOfDeposit.registerFor(100,30,0.1,account);

        assert.deepEqual(100.0,investmentNet(account),0.0);
        assert.deepEqual(750.0,account.balance(),0.0);
    });

    function investmentNet(account) {
        return account.accept(new InvestmentCalculatorVisitor());
    };


    test("22ShouldBeAbleToQueryInvestmentEarnings", function() {
        var account = new ReceptiveAccount ();

        CertificateOfDeposit.registerFor(100,30,0.1,account);
        CertificateOfDeposit.registerFor(100,60,0.15,account);

        var investmentEarningsValue =
            100.0*(0.1/360)*30 +
            100.0*(0.15/360)*60;

        assert.deepEqual(investmentEarningsValue,investmentEarnings(account),0.0);
    });

    function investmentEarnings(account) {
        this.shouldImplement();
    };


    test("23AccountSummaryShouldWorkWithCertificateOfDeposit", function() {
        var fromAccount = new ReceptiveAccount ();
        var toAccount = new ReceptiveAccount ();

        Deposit.registerForOn(100,fromAccount);
        Withdraw.registerForOn(50,fromAccount);
        Transfer.registerFor(100,fromAccount, toAccount);
        CertificateOfDeposit.registerFor(1000, 30, 0.1, fromAccount);

        var lines = accountSummaryLines(fromAccount);

        assert.deepEqual(4,lines.length);
        assert.deepEqual("Depósito por 100", lines[0]);
        assert.deepEqual("Extracción por 50", lines[1]);
        assert.deepEqual("Transferencia por -100", lines[2]);
        assert.deepEqual("Plazo fijo por 1000 durante 30 días a una tna de 0.1", lines[3]);
    });


    test("24ShouldBeAbleToBeQueryTransferNetWithCertificateOfDeposit", function() {
        var fromAccount = new ReceptiveAccount ();
        var toAccount = new ReceptiveAccount ();

        Deposit.registerForOn(100,fromAccount);
        Withdraw.registerForOn(50,fromAccount);
        Transfer.registerFor(100,fromAccount, toAccount);
        Transfer.registerFor(250,toAccount, fromAccount);
        CertificateOfDeposit.registerFor(1000, 30, 0.1, fromAccount);

        assert.deepEqual(150.0,accountTransferNet(fromAccount),0.0);
        assert.deepEqual(-150.0,accountTransferNet(toAccount),0.0);
    });


    test("25PortfolioTreePrinter", function() {
        var account1 = new ReceptiveAccount ();
        var account2 = new ReceptiveAccount ();
        var account3 = new ReceptiveAccount ();
        var complexPortfolio = Portfolio.createWith(account1,account2);
        var composedPortfolio = Portfolio.createWith(complexPortfolio,account3);

        var accountNames = new Map();
        accountNames.set(composedPortfolio, "composedPortfolio");
        accountNames.set(complexPortfolio, "complexPortfolio");
        accountNames.set(account1, "account1");
        accountNames.set(account2, "account2");
        accountNames.set(account3, "account3");

        var lines = portofolioTreeOf(composedPortfolio, accountNames);

        assert.deepEqual(5, lines.length);
        assert.deepEqual("composedPortfolio", lines[0]);
        assert.deepEqual(" complexPortfolio", lines[1]);
        assert.deepEqual("  account1", lines[2]);
        assert.deepEqual("  account2", lines[3]);
        assert.deepEqual(" account3", lines[4]);

    });

    function portofolioTreeOf(composedPortfolio, accountNames) {
        this.shouldImplement();
    };


    test("26ReversePortfolioTreePrinter", function() {
        var account1 = new ReceptiveAccount ();
        var account2 = new ReceptiveAccount ();
        var account3 = new ReceptiveAccount ();
        var complexPortfolio = Portfolio.createWith(account1,account2);
        var composedPortfolio = Portfolio.createWith(complexPortfolio,account3);

        var accountNames = new Map();
        accountNames.set(composedPortfolio, "composedPortfolio");
        accountNames.set(complexPortfolio, "complexPortfolio");
        accountNames.set(account1, "account1");
        accountNames.set(account2, "account2");
        accountNames.set(account3, "account3");

        var lines = reversePortofolioTreeOf(composedPortfolio, accountNames);

        assert.deepEqual(5, lines.length);
        assert.deepEqual(" account3", lines[0]);
        assert.deepEqual("  account2", lines[1]);
        assert.deepEqual("  account1", lines[2]);
        assert.deepEqual(" complexPortfolio", lines[3]);
        assert.deepEqual("composedPortfolio", lines[4]);

    });

    function reversePortofolioTreeOf(composedPortfolio, accountNames) {
        this.shouldImplement();
    };
});

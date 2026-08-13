const BankAcc={
    balance: 1000,
    owner:"Bakela kal",
    interest:0.5,
    withdraw(amount){
        if(amount>this.balance){
            console.log("Insufficient balance");
        }
        else{ this.balance-=amount;
            console.log(`Withdrawn ${amount}. New balance ${this.balance}`);
        }},
    deposit(amount){
        this.balance+=amount;
        console.log(`Deposited ${amount}. New balance ${this.balance}`);
    }

}
BankAcc.deposit(500);
BankAcc.withdraw(500);
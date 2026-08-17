class Account:
    def __init__(self, owner, number, balance =0):
        self.owner = owner
        self.account_number = number
        self.__balance = balance
    def deposit(self, amount):
        if amount <= 0:
            print("Deposit amount cannot be zero or negative.")
            return False
        self.__balance += amount

    def withdraw(self, amount):
        if amount <= 0:
            print("Withdrawal amount cannot be zero or negative.")
            return False
        if self.__balance >= amount:
            self.__balance -= amount
        else:
            print("Insufficient funds.")
    @property
    def balance(self):
        return self.__balance
    @balance.setter
    def balance(self,amount):
        self.__balance = amount
        
    def statement(self):
        print(f"Account Statement: {self.owner}")
        print(f"Account Number: {self.account_number}")
        print(f"Current Balance: ${self.__balance:.2f}")
        return f"Account - Balance: {self.balance:.2f}"
class SavingsAccount(Account):
    def __init__(self, owner, number, balance=0, rate=0.05):
        super().__init__(owner, number, balance)
        self.rate = rate
    def add_interest(self):
        self.deposit(self.balance * self.rate)
    def statement(self):
        return f"Savings Account - Balance: {self.balance:.2f}"
class CurrentAccount(Account):
    def __init__(self, owner, number, balance=0, overdraft=1000):
        super().__init__(owner, number, balance)
        self.overdraft = overdraft
    def withdraw(self,amount):
         if amount <= 0:
            print("Withdrawal amount cannot be zero or negative.")
            return False   
         if amount <= self.balance + self.overdraft:
            self.balance -= amount
            print("Withdrawal successful")
         else:
            print("Withdrawal denied")
    def statement(self):
        return f"Current Account - Balance: {self.balance:.2f}"

# Create accounts
account1 = Account("John Doe", "1234567890", 1000)

savings = SavingsAccount("Alice Smith","2345678901",2000,0.05)

current = CurrentAccount("Bob Johnson","3456789012",1000,500)

account1.deposit(500)
account1.withdraw(200)

print(account1.balance)
account1.statement()

savings.add_interest()
print(savings.balance)
print(savings.statement())

current.withdraw(1200)

print(current.balance)
print(current.statement())

accounts = [account1, savings, current]

for acc in accounts:
    print(acc.statement())
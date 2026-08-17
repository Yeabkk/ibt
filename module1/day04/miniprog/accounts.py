class account:
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
    def statement(self):
        print(f"Account Statement: {self.owner}")
        print(f"Account Number: {self.account_number}")
        print(f"Current Balance: ${self.__balance:.2f}")
        
account1 = account("John Doe", "1234567890", 1000)
account1.deposit(500)
print(account1.balance)
account1.withdraw(200)
print(account1.balance)
account1.statement()
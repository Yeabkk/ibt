from abc import ABC,abstractmethod
#method overrid
class Account(ABC):
    def __init__(self, owner, balance):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount

    def withdraw(self, amount):
        if amount <= self.balance:
            self.balance -= amount
        else:
            print("Insufficient funds.")

    
    def statement(self):
        print(f"Owner: {self.owner}")
        print(f"Balance: {self.balance}")
    
    @abstractmethod
    def calculate_interest(self):
        pass


class SavingsAccount(Account):
    def __init__(self, owner, balance, interest_rate):
        super().__init__(owner, balance)
        self.interest_rate = interest_rate
        
    def calculate_interest(self):
        return self.balance * (self.interest_rate / 100)

    def add_interest(self):
        self.balance=self.calculate_interest

    
    def statement(self):
        print(f"Owner: {self.owner}")
        print(f"Balance: {self.balance}")
        print(f"Interest Rate: {self.interest_rate}%")


class CurrentAccount(Account):
    def __init__(self, owner, balance, overdraft_limit):
        super().__init__(owner, balance)
        self.overdraft_limit = overdraft_limit

    def withdraw(self, amount):
        if amount <= self.balance + self.overdraft_limit:
            self.balance -= amount
        else:
            print("Overdraft limit exceeded.")
            
        def calculate_interest(self):
            return 0
    
    def statement(self):
        print(f"Owner: {self.owner}")
        print(f"Balance: {self.balance}")
        print(f"Overdraft Limit: {self.overdraft_limit}")


savings = SavingsAccount("Alice", 1000, 5)
current = CurrentAccount("Bob", 500, 200)
print("Savings Interest:", savings.calculate_interest())
print("Current Interest:", current.calculate_interest())
savings.add_interest()
print("Savings balance after interest:", savings.balance)

savings = SavingsAccount("Alice", 1000, 5)
current = CurrentAccount("Bob", 500, 200)

print("Savings Account:")
savings.statement()

print("\nCurrent Account:")
current.statement()

account1 = Account("Alice", 500)
account2 = SavingsAccount("Bob", 1000, 5)
account3 = CurrentAccount("Charlie", 300, 200)

accounts = [account1, account2, account3]

for account in accounts:
    account.statement()     
    account.deposit(100)    
    print("After depositing 100:")
    account.statement()
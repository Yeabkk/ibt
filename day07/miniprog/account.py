from abc import ABC, abstractmethod

class Account(ABC):

    def __init__(self, account_number, owner_name, balance=0):
        self._account_number = account_number
        self._owner_name = owner_name
        self._balance = balance
        self.history = []

    @property
    def account_number(self):
        return self._account_number

    @property
    def owner_name(self):
        return self._owner_name

    @property
    def balance(self):
        return self._balance

    def deposit(self, amount):
        if amount <= 0:
            print("Invalid amount")
            return

        self._balance += amount
        self.history.append(("deposit", amount))

    def withdraw(self, amount):
        if amount <= self._balance:
            self._balance -= amount
            self.history.append(("withdraw", amount))
        else:
            print("Insufficient funds")

    def undo_last(self):
        if not self.history:
            print("No transaction to undo")
            return

        transaction, amount = self.history.pop()

        if transaction == "deposit":
            self._balance -= amount

        elif transaction == "withdraw":
            self._balance += amount

    @abstractmethod
    def calculate_interest(self):
        pass

    def statement(self):
        print("----------------------")
        print("Account:", self.account_number)
        print("Owner:", self.owner_name)
        print("Balance:", self.balance)

class SavingsAccount(Account):

    def __init__(self, account_number, owner_name, balance=0, interest_rate=5):
        super().__init__(account_number, owner_name, balance)
        self.interest_rate = interest_rate

    def calculate_interest(self):
        return self.balance * self.interest_rate / 100

    def add_interest(self):
        self._balance += self.calculate_interest()

    def statement(self):
        super().statement()
        print("Type: Savings")

class CurrentAccount(Account):

    def __init__(self, account_number, owner_name, balance=0, overdraft=1000):
        super().__init__(account_number, owner_name, balance)
        self.overdraft = overdraft

    def withdraw(self, amount):
        if amount <= self.balance + self.overdraft:
            self._balance -= amount
            self.history.append(("withdraw", amount))
        else:
            print("Overdraft exceeded")

    def calculate_interest(self):
        return 0

    def statement(self):
        super().statement()
        print("Type: Current")

class AccountRegistry:

    def __init__(self):
        self.by_number = {}
        self.order = []

    def add(self, account):
        self.by_number[account.account_number] = account
        self.order.append(account.account_number)

    def find(self, number):
        return self.by_number.get(number)

    def list_all(self):
        accounts = []

        for number in self.order:
            accounts.append(self.by_number[number])

        return accounts

registry = AccountRegistry()

account1 = SavingsAccount("1001", "Alice", 1000)
account2 = CurrentAccount("1002", "Bob", 500)

registry.add(account1)
registry.add(account2)

account1.deposit(500)
account1.withdraw(200)
account1.undo_last()

account2.deposit(300)
account2.withdraw(600)
account2.undo_last()

print("Find Account")
account = registry.find("1001")

if account:
    account.statement()

print("\nAll Accounts")

for account in registry.list_all():
    account.statement()
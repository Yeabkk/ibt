#apply srp + dip
class NotificationService:
    def send(self, message):
        print("Notification:", message)

class DatabaseService:
    def save(self, account):
        print("Account saved.")

class Account:
    def __init__(self, owner, balance, notifier, database):
        self.owner = owner
        self.balance = balance
        self.notifier = notifier
        self.database = database

    def deposit(self, amount):
        self.balance += amount
        self.database.save(self)
        self.notifier.send("Deposit successful.")

    def withdraw(self, amount):
        if amount <= self.balance:
            self.balance -= amount
            self.database.save(self)
            self.notifier.send("Withdrawal successful.")
        else:
            print("Insufficient funds.")

notifier = NotificationService()
database = DatabaseService()

account = Account("Alice", 500, notifier, database)

account.deposit(100)
account.withdraw(50)

#factory

class SavingsAccount:
    def __init__(self, owner, number, balance):
        self.owner = owner
        self.number = number
        self.balance = balance

class CurrentAccount:
    def __init__(self, owner, number, balance):
        self.owner = owner
        self.number = number
        self.balance = balance

class FixedDepositAccount:
    def __init__(self, owner, number, balance):
        self.owner = owner
        self.number = number
        self.balance = balance

class AccountFactory:

    @staticmethod
    def create(kind, owner, number, balance):

        if kind.lower() == "savings":
            return SavingsAccount(owner, number, balance)

        elif kind.lower() == "current":
            return CurrentAccount(owner, number, balance)

        elif kind.lower() == "fixed":
            return FixedDepositAccount(owner, number, balance)

        else:
            raise ValueError("Invalid account type")

account = AccountFactory.create("current", "Alice", "1001", 500)

print(type(account).__name__)

#observer
class SMSAlert:
    def update(self, message):
        print("SMS:", message)

class AuditLog:
    def update(self, message):
        print("Audit:", message)

class Account:

    def __init__(self):
        self.balance = 10000
        self.observers = []

    def subscribe(self, observer):
        self.observers.append(observer)

    def notify(self, message):
        for observer in self.observers:
            observer.update(message)

    def withdraw(self, amount):
        if amount <= self.balance:
            self.balance -= amount

            if amount > 3000:
                self.notify(f"Large withdrawal of £{amount}")

account = Account()

account.subscribe(SMSAlert())
account.subscribe(AuditLog())

account.withdraw(4000)

#interface

from abc import ABC, abstractmethod


# Interface

class InterestBearing(ABC):

    @abstractmethod
    def calculate_interest(self):
        pass

class SavingsAccount(InterestBearing):

    def __init__(self, balance):
        self.balance = balance

    def calculate_interest(self):
        return self.balance * 0.05

class CurrentAccount:

    def __init__(self, balance):
        self.balance = balance

savings = SavingsAccount(1000)
current = CurrentAccount(1000)

print("Savings Interest:", savings.calculate_interest())
print("Current Balance:", current.balance)
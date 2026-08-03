from abc import ABC, abstractmethod

class BankConfig:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.interest_rate = 0.05      # 5%
            cls._instance.overdraft_limit = 1000
        return cls._instance

config = BankConfig()

class Observer:
    def update(self, message):
        pass

class SMSAlert(Observer):
    def update(self, message):
        print(f"[SMS ALERT] {message}")

class AuditLog(Observer):
    def update(self, message):
        print(f"[AUDIT LOG] {message}")

class Account(ABC):
    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.number = number
        self.balance = balance
        self._observers = []

    def subscribe(self, observer):
        self._observers.append(observer)

    def _notify(self, message):
        for observer in self._observers:
            observer.update(message)

  
    def deposit(self, amount):
        self.balance += amount
        self._notify(f"{self.owner} deposited £{amount}")

    def withdraw(self, amount):
        if amount <= self.balance:
            self.balance -= amount
            self._notify(f"{self.owner} withdrew £{amount}")
        else:
            print("Insufficient funds")

    def statement(self):
        print("Owner :", self.owner)
        print("Number:", self.number)
        print("Balance: £", self.balance)

    @abstractmethod
    def calculate_interest(self):
        pass

class SavingsAccount(Account):

    def __init__(self, owner, number, balance=0):
        super().__init__(owner, number, balance)
        self.interest_rate = config.interest_rate

    def calculate_interest(self):
        return self.balance * self.interest_rate

    def add_interest(self):
        interest = self.calculate_interest()
        self.balance += interest
        self._notify(f"Interest added: £{interest}")

    def statement(self):
        super().statement()
        print("Type: Savings")
        print("Interest Rate:", self.interest_rate)

class CurrentAccount(Account):

    def __init__(self, owner, number, balance=0):
        super().__init__(owner, number, balance)
        self.overdraft_limit = config.overdraft_limit

    def withdraw(self, amount):
        if amount <= self.balance + self.overdraft_limit:
            self.balance -= amount
            self._notify(f"{self.owner} withdrew £{amount}")
        else:
            print("Overdraft limit exceeded")

    def calculate_interest(self):
        return 0

    def statement(self):
        super().statement()
        print("Type: Current")
        print("Overdraft Limit: £", self.overdraft_limit)

class AccountFactory:

    @staticmethod
    def create(kind, owner, number, balance=0):

        if kind.lower() == "savings":
            return SavingsAccount(owner, number, balance)

        elif kind.lower() == "current":
            return CurrentAccount(owner, number, balance)

        else:
            raise ValueError("Unknown account type")

sms = SMSAlert()
audit = AuditLog()

account1 = AccountFactory.create("savings", "Alice", "1001", 500)
account2 = AccountFactory.create("current", "Bob", "1002", 1000)

account1.subscribe(sms)
account1.subscribe(audit)
account2.subscribe(sms)
account2.subscribe(audit)
account1.deposit(200)
account1.withdraw(100)
account1.add_interest()
account2.deposit(300)
account2.withdraw(1200)
account1.statement()
account2.statement()
config1 = BankConfig()
config2 = BankConfig()
print("\nSingleton Test:", config1 is config2)
# Full SOLID Refactoring

from abc import ABC, abstractmethod

class NotificationService:
    def send(self, message):
        print("Notification:", message)

class DatabaseService:
    def save(self, account):
        print(f"Account {account.account_number} saved successfully.")

class Account(ABC):
    def __init__(self, account_number, owner_name, balance,
                 notifier, database):
        self._account_number = account_number
        self._owner_name = owner_name
        self._balance = balance

        self.notifier = notifier
        self.database = database

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
            print("Invalid deposit amount.")
            return

        self._balance += amount

        self.database.save(self)
        self.notifier.send(f"£{amount} deposited.")

    def withdraw(self, amount):

        if amount <= 0:
            print("Invalid withdrawal amount.")
            return

        if amount > self._balance:
            print("Insufficient funds.")
            return

        self._balance -= amount

        self.database.save(self)
        self.notifier.send(f"£{amount} withdrawn.")

    @abstractmethod
    def calculate_interest(self):
        pass

    def statement(self):
        print("----------------------------")
        print("Account Number:", self.account_number)
        print("Owner:", self.owner_name)
        print("Balance: £", self.balance)

class SavingsAccount(Account):

    def __init__(self, account_number, owner_name,
                 balance, interest_rate,
                 notifier, database):

        super().__init__(
            account_number,
            owner_name,
            balance,
            notifier,
            database
        )

        self.interest_rate = interest_rate

    def calculate_interest(self):
        return self.balance * self.interest_rate / 100

    def add_interest(self):
        self._balance += self.calculate_interest()

    def statement(self):
        super().statement()
        print("Type: Savings")
        print("Interest Rate:", self.interest_rate, "%")

class CurrentAccount(Account):

    def __init__(self,
                 account_number,
                 owner_name,
                 balance,
                 overdraft_limit,
                 notifier,
                 database):

        super().__init__(
            account_number,
            owner_name,
            balance,
            notifier,
            database
        )

        self.overdraft_limit = overdraft_limit

    def withdraw(self, amount):

        if amount <= self.balance + self.overdraft_limit:

            self._balance -= amount

            self.database.save(self)
            self.notifier.send(f"£{amount} withdrawn.")

        else:
            print("Overdraft exceeded.")

    def calculate_interest(self):
        return 0

    def statement(self):
        super().statement()
        print("Type: Current")
        print("Overdraft:", self.overdraft_limit)

notifier = NotificationService()
database = DatabaseService()

account1 = SavingsAccount(
    "1001",
    "Alice",
    1000,
    5,
    notifier,
    database
)

account2 = CurrentAccount(
    "1002",
    "Bob",
    500,
    1000,
    notifier,
    database
)
account1.deposit(200)
account1.withdraw(100)
account1.add_interest()
account1.statement()
print()
account2.deposit(500)
account2.withdraw(1200)
account2.statement()

# Factory + Observer + Singleto

from abc import ABC, abstractmethod

class BankConfig:

    _instance = None

    def __new__(cls):

        if cls._instance is None:

            cls._instance = super().__new__(cls)

            cls._instance.interest_rate = 5      # 5%
            cls._instance.overdraft_limit = 1000

        return cls._instance


config = BankConfig()

class Observer(ABC):

    @abstractmethod
    def update(self, message):
        pass

class SMSAlert(Observer):

    def update(self, message):
        print("[SMS ALERT]", message)

class AuditLog(Observer):

    def update(self, message):
        print("[AUDIT LOG]", message)

class Account(ABC):

    def __init__(self, owner, number, balance=0):

        self.owner = owner
        self.number = number
        self.balance = balance

        self.observers = []

    def subscribe(self, observer):
        self.observers.append(observer)

    def notify(self, message):

        for observer in self.observers:
            observer.update(message)

    def deposit(self, amount):

        self.balance += amount

        self.notify(f"{self.owner} deposited £{amount}")

    def withdraw(self, amount):

        if amount <= self.balance:

            self.balance -= amount

            
            if amount > 3000:
                self.notify(
                    f"Large withdrawal: £{amount}"
                )

        else:
            print("Insufficient funds")

    def statement(self):

        print("-----------------------")
        print("Owner :", self.owner)
        print("Number:", self.number)
        print("Balance:", self.balance)

    @abstractmethod
    def calculate_interest(self):
        pass

class SavingsAccount(Account):

    def __init__(self, owner, number, balance=0):

        super().__init__(owner, number, balance)

        self.interest_rate = config.interest_rate

    def calculate_interest(self):

        return self.balance * self.interest_rate / 100

    def add_interest(self):

        self.balance += self.calculate_interest()

    def statement(self):

        super().statement()

        print("Type: Savings")
        print("Interest Rate:", self.interest_rate, "%")

class CurrentAccount(Account):

    def __init__(self, owner, number, balance=0):

        super().__init__(owner, number, balance)

        self.overdraft_limit = config.overdraft_limit

    def withdraw(self, amount):

        if amount <= self.balance + self.overdraft_limit:

            self.balance -= amount

            if amount > 3000:
                self.notify(
                    f"Large withdrawal: £{amount}"
                )

        else:
            print("Overdraft exceeded")

    def calculate_interest(self):
        return 0

    def statement(self):

        super().statement()

        print("Type: Current")
        print("Overdraft:", self.overdraft_limit)

class AccountFactory:

    @staticmethod
    def create(kind,
               owner,
               number,
               balance=0):

        if kind.lower() == "savings":

            return SavingsAccount(
                owner,
                number,
                balance
            )

        elif kind.lower() == "current":

            return CurrentAccount(
                owner,
                number,
                balance
            )

        else:
            raise ValueError("Unknown account type")

sms = SMSAlert()
audit = AuditLog()

account1 = AccountFactory.create(
    "savings",
    "Alice",
    "1001",
    5000
)

account2 = AccountFactory.create(
    "current",
    "Bob",
    "1002",
    7000
)

account1.subscribe(sms)
account1.subscribe(audit)

account2.subscribe(sms)
account2.subscribe(audit)

account1.deposit(500)
account1.withdraw(4000)
account1.add_interest()
account2.withdraw(5000)
account1.statement()
account2.statement()

config1 = BankConfig()
config2 = BankConfig()

print("Singleton Works:", config1 is config2)

####

from abc import ABC, abstractmethod

class BankConfig:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.interest_rate = 5        
            cls._instance.investment_rate = 8       
            cls._instance.overdraft_limit = 1000
        return cls._instance

config = BankConfig()

class Observer(ABC):

    @abstractmethod
    def update(self, message):
        pass

class SMSAlert(Observer):

    def update(self, message):
        print("[SMS]", message)

class AuditLog(Observer):

    def update(self, message):
        print("[AUDIT]", message)

class Account(ABC):

    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.number = number
        self.balance = balance
        self.observers = []

    def subscribe(self, observer):
        self.observers.append(observer)

    def notify(self, message):
        for observer in self.observers:
            observer.update(message)

    def deposit(self, amount):
        self.balance += amount
        self.notify(f"{self.owner} deposited £{amount}")

    def withdraw(self, amount):

        if amount <= self.balance:
            self.balance -= amount

            if amount > 3000:
                self.notify(f"Large withdrawal (£{amount})")

        else:
            print("Insufficient funds.")

    @abstractmethod
    def calculate_interest(self):
        pass

    def statement(self):
        print("-------------------------")
        print("Owner:", self.owner)
        print("Account:", self.number)
        print("Balance: £", self.balance)

class SavingsAccount(Account):

    def __init__(self, owner, number, balance=0):
        super().__init__(owner, number, balance)
        self.rate = config.interest_rate

    def calculate_interest(self):
        return self.balance * self.rate / 100

    def add_interest(self):
        self.balance += self.calculate_interest()

    def statement(self):
        super().statement()
        print("Type: Savings")
        print("Interest:", self.rate, "%")

class CurrentAccount(Account):

    def __init__(self, owner, number, balance=0):
        super().__init__(owner, number, balance)
        self.overdraft = config.overdraft_limit

    def withdraw(self, amount):

        if amount <= self.balance + self.overdraft:

            self.balance -= amount

            if amount > 3000:
                self.notify(f"Large withdrawal (£{amount})")

        else:
            print("Overdraft exceeded.")

    def calculate_interest(self):
        return 0

    def statement(self):
        super().statement()
        print("Type: Current")
        print("Overdraft:", self.overdraft)

class InvestmentAccount(Account):

    def __init__(self, owner, number, balance=0):
        super().__init__(owner, number, balance)
        self.rate = config.investment_rate

    def calculate_interest(self):
        return self.balance * self.rate / 100

    def add_interest(self):
        self.balance += self.calculate_interest()

    def statement(self):
        super().statement()
        print("Type: Investment")
        print("Investment Rate:", self.rate, "%")

class AccountFactory:

    @staticmethod
    def create(kind, owner, number, balance=0):

        if kind.lower() == "savings":
            return SavingsAccount(owner, number, balance)

        elif kind.lower() == "current":
            return CurrentAccount(owner, number, balance)

        elif kind.lower() == "investment":
            return InvestmentAccount(owner, number, balance)

        else:
            raise ValueError("Unknown account type.")

sms = SMSAlert()
audit = AuditLog()

accounts = [

    AccountFactory.create(
        "savings",
        "Alice",
        "1001",
        5000
    ),

    AccountFactory.create(
        "current",
        "Bob",
        "1002",
        4000
    ),

    AccountFactory.create(
        "investment",
        "Charlie",
        "1003",
        10000
    )

]

for account in accounts:
    account.subscribe(sms)
    account.subscribe(audit)

accounts[0].add_interest()

accounts[1].withdraw(3500)

accounts[2].add_interest()
accounts[2].withdraw(5000)

print("\nALL ACCOUNTS")

for account in accounts:
    account.statement()
  
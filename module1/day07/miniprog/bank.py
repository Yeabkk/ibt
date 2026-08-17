
class BankConfig:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.interest_rate = 0.05
            cls._instance.overdraft_limit = 1000
        return cls._instance

class SMSAlert:
    def update(self, account, message):
        print(f"SMS Alert: {account.owner} - {message}")

class AuditLog:
    def update(self, account, message):
        print(
            f"Audit Log: Account {account.account_number} - {message}"
        )

class Account:
    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.account_number = number
        self.__balance = balance
        self._observers = []
        self.config = BankConfig()

    def subscribe(self, observer):
        self._observers.append(observer)

    def _notify(self, message):
        for observer in self._observers:
            observer.update(self, message)

    def deposit(self, amount):
        if amount <= 0:
            print("Deposit amount cannot be zero or negative.")
            return False

        self.__balance += amount

        # Notify observers
        self._notify(
            f"Deposit of {amount} ETB. "
            f"New balance: {self.__balance:.2f} ETB"
        )

        return True
    def withdraw(self, amount):
        if amount <= 0:
            print("Withdrawal amount cannot be zero or negative.")
            return False

        if self.__balance >= amount:
            self.__balance -= amount

            # Notify observers
            self._notify(
                f"Withdrawal of {amount} ETB. "
                f"New balance: {self.__balance:.2f} ETB"
            )

            return True

        else:
            print("Insufficient funds.")
            return False

    @property
    def balance(self):
        return self.__balance

    @balance.setter
    def balance(self, amount):
        self.__balance = amount

    def statement(self):
        print(f"Account Statement: {self.owner}")
        print(f"Account Number: {self.account_number}")
        print(f"Current Balance: ${self.__balance:.2f}")

        return f"Account - Balance: {self.balance:.2f}"

class SavingsAccount(Account):

    def __init__(self, owner, number, balance=0):
        super().__init__(owner, number, balance)

        self.rate = self.config.interest_rate

    def add_interest(self):
        interest = self.balance * self.rate
        self.deposit(interest)
        print(f"Interest added: {interest:.2f} ETB")

    def statement(self):
        return f"Savings Account - Balance: {self.balance:.2f}"

class CurrentAccount(Account):

    def __init__(self, owner, number, balance=0):
        super().__init__(owner, number, balance)

        self.overdraft = self.config.overdraft_limit

    def withdraw(self, amount):
        if amount <= 0:
            print("Withdrawal amount cannot be zero or negative.")
            return False

        if amount <= self.balance + self.overdraft:
            self.balance -= amount
            print("Withdrawal successful")
            self._notify(
                f"Withdrawal of {amount} ETB. "
                f"New balance: {self.balance:.2f} ETB"
            )

            return True

        else:
            print("Withdrawal denied")
            return False

    def statement(self):
        return f"Current Account - Balance: {self.balance:.2f}"

class AccountFactory:

    @staticmethod
    def create(kind, owner, number, balance=0):

        if kind == "savings":
            return SavingsAccount(owner, number, balance)

        elif kind == "current":
            return CurrentAccount(owner, number, balance)

        else:
            raise ValueError("Unknown account type")
        
class AccountRegistry:
    def __init__(self):
        self.by_number = {} 
        self.order = [] 
        self.history = {}
    def add(self, acc):
        self.by_number[acc.account_number] = acc
        self.order.append(acc.account_number)
        self.history[acc.account_number] = []
    def find(self, number):
        return self.by_number.get(number)
    
    def list_all(self):
        return [self.by_number[number] for number in self.order]
        
    def record_transaction(self, acc, transaction_type, amount):
        self.history[acc.account_number].append(
            {  "type": transaction_type,
                "amount": amount })
        
    
    def deposit(self, number, amount):
        account = self.find(number)

        if account is None:
            print("Account not found.")
            return False

        success = account.deposit(amount)

        if success:
            self.record_transaction(account,"deposit",amount)

        return success
    
    def withdraw(self, number, amount):
        account = self.find(number)

        if account is None:
            print("Account not found.")
            return False

        success = account.withdraw(amount)

        if success:
            self.record_transaction(account,"withdraw",amount)

        return success
    
    def undo_last(self, number):
        account = self.find(number)
        
        if account is None:
            print("Account not found.")
            return False

        stack = self.history[number]

        if not stack:
            print("No transactions to undo.")
            return False

        transaction = stack.pop()

        transaction_type = transaction["type"]
        amount = transaction["amount"]

        if transaction_type == "deposit":
            account.balance -= amount

            print(f"Undo deposit of {amount} ETB "
                f"for {account.owner}"
            )

        elif transaction_type == "withdraw":
            account.balance += amount
            print(f"Undo withdrawal of {amount} ETB "
                f"for {account.owner}"
            )

        return True

account1 = AccountFactory.create("savings","John Doe","1234567890",1000)

savings = AccountFactory.create("savings","Alice Smith","2345678901",2000)

current = AccountFactory.create("current","Bob Johnson","3456789012",1000)

sms = SMSAlert()
audit = AuditLog()

account1.subscribe(sms)
account1.subscribe(audit)
savings.subscribe(sms)
savings.subscribe(audit)
current.subscribe(sms)
current.subscribe(audit)

account1.deposit(500)
account1.withdraw(200)

print("Balance:", account1.balance)
print(account1.statement())

savings.add_interest()

print("Balance:", savings.balance)
print(savings.statement())
current.withdraw(1200)

print("Balance:", current.balance)
print(current.statement())

accounts = [account1, savings, current]

for acc in accounts:
    print(acc.statement())

config1 = BankConfig()
config2 = BankConfig()
print("Interest rate:", config1.interest_rate)
print("Overdraft limit:", config1.overdraft_limit)
print("Same object:", config1 is config2)

registry = AccountRegistry()

registry.add(account1)
registry.add(savings)
registry.add(current)

found = registry.find("2345678901")

print("Found account:", found.owner)
print("\n===== ALL ACCOUNTS =====")

for acc in registry.list_all():
    print(acc.account_number,"-",acc.owner,"-",acc.balance)

registry.deposit("1234567890", 500)
registry.withdraw("1234567890", 200)

print("Balance:", account1.balance)

print(registry.history["1234567890"])

registry.undo_last("1234567890")

print("Balance after undo:", account1.balance)

registry.undo_last("1234567890")

print("Balance after second undo:", account1.balance)
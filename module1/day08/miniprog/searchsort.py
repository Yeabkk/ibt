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
        self._balance += amount
        self.history.append(amount)

    def withdraw(self, amount):
        if amount <= self._balance:
            self._balance -= amount
            self.history.append(-amount)

    @abstractmethod
    def calculate_interest(self):
        pass

class SavingsAccount(Account):

    def __init__(self, account_number, owner_name, balance=0):
        super().__init__(account_number, owner_name, balance)

    def calculate_interest(self):
        return self.balance * 0.05

class CurrentAccount(Account):

    def __init__(self, account_number, owner_name, balance=0):
        super().__init__(account_number, owner_name, balance)

    def calculate_interest(self):
        return 0

def binary_search(items, target):

    left = 0
    right = len(items) - 1

    while left <= right:

        middle = (left + right) // 2

        if items[middle] == target:
            return middle

        elif items[middle] < target:
            left = middle + 1

        else:
            right = middle - 1

    return -1

class AccountRegistry:

    def __init__(self):

        self.by_number = {}
        self.order = []

    def add(self, account):

        self.by_number[account.account_number] = account
        self.order.append(account.account_number)

    def top_by_balance(self, n=5):

        accounts = sorted(
            self.by_number.values(),
            key=lambda a: a.balance,
            reverse=True
        )

        return accounts[:n]

    def find_by_number(self, number):

        numbers = sorted(self.by_number)

        index = binary_search(numbers, number)

        if index >= 0:
            return self.by_number[numbers[index]]

        return None

    def total_transactions_recursive(self, history, index=0):

        if index == len(history):
            return 0

        return history[index] + self.total_transactions_recursive(
            history,
            index + 1
        )

    def total_transactions(self, number):

        account = self.find_by_number(number)

        if account:
            return self.total_transactions_recursive(account.history)

        return 0

registry = AccountRegistry()

acc1 = SavingsAccount("1001", "Alice", 5000)
acc2 = CurrentAccount("1002", "Bob", 3000)
acc3 = SavingsAccount("1003", "Charlie", 8000)

registry.add(acc1)
registry.add(acc2)
registry.add(acc3)


acc1.deposit(500)
acc1.withdraw(200)

acc2.deposit(1000)

acc3.deposit(300)

print("Top Accounts")

for account in registry.top_by_balance(2):
    print(account.owner_name, account.balance)

print()

result = registry.find_by_number("1002")

if result:
    print(result.owner_name, result.balance)

print()

print(
    registry.total_transactions("1001")
)
from abc import ABC, abstractmethod

class Account(ABC):
    def __init__(self, account_number, owner_name, balance=0):
        self.__account_number = account_number
        self.__owner_name = owner_name
        self._balance = balance

    @property
    def account_number(self):
        return self.__account_number

    @property
    def owner_name(self):
        return self.__owner_name

    @property
    def balance(self):
        return self._balance

    def deposit(self, amount):
        if amount <= 0:
            print("Deposit amount must be positive.")
            return
        self._balance += amount
        print("Deposit successful.")

    def withdraw(self, amount):
        if amount <= 0:
            print("Withdrawal amount must be positive.")
            return

        if amount > self._balance:
            print("Insufficient funds.")
        else:
            self._balance -= amount
            print("Withdrawal successful.")

    @abstractmethod
    def calculate_interest(self):
        pass

    def statement(self):
        print(f"\nAccount Number : {self.account_number}")
        print(f"Owner          : {self.owner_name}")
        print(f"Balance        : £{self.balance:.2f}")


class SavingsAccount(Account):
    def __init__(self, account_number, owner_name, balance, interest_rate):
        super().__init__(account_number, owner_name, balance)
        self.__interest_rate = interest_rate

    @property
    def interest_rate(self):
        return self.__interest_rate

    def calculate_interest(self):
        return self.balance * self.interest_rate / 100

    def add_interest(self):
        self._balance += self.calculate_interest()

    def statement(self):
        super().statement()
        print(f"Interest Rate  : {self.interest_rate}%")
        print("Account Type   : Savings")

class CurrentAccount(Account):
    def __init__(self, account_number, owner_name, balance, overdraft_limit):
        super().__init__(account_number, owner_name, balance)
        self.__overdraft_limit = overdraft_limit

    @property
    def overdraft_limit(self):
        return self.__overdraft_limit

    def withdraw(self, amount):
        if amount <= self.balance + self.overdraft_limit:
            self._balance -= amount
            print("Withdrawal successful.")
        else:
            print("Overdraft limit exceeded.")

    def calculate_interest(self):
        return 0

    def statement(self):
        super().statement()
        print(f"Overdraft      : {self.overdraft_limit:.2f}")
        print("Account Type   : Current")

def main():
    accounts = {}

    while True:
        print("\n===== ADDIS BANK SYSTEM =====")
        print("1. Create Savings Account")
        print("2. Create Current Account")
        print("3. Deposit")
        print("4. Withdraw")
        print("5. Show Statement")
        print("6. Apply Interest to all Savings Accounts")
        print("7. Show All Accounts")
        print("8. Exit")

        choice = input("Choose option: ")

        if choice == "1":
            acct = input("Account Number: ")
            name = input("Owner Name: ")
            balance = float(input("Opening Balance: "))
            rate = float(input("Interest Rate (%): "))

            accounts[acct] = SavingsAccount(acct, name, balance, rate)
            print("Savings Account Created.")

        elif choice == "2":
            acct = input("Account Number: ")
            name = input("Owner Name: ")
            balance = float(input("Opening Balance: "))
            overdraft = float(input("Overdraft Limit: "))

            accounts[acct] = CurrentAccount(acct, name, balance, overdraft)
            print("Current Account Created.")

        elif choice == "3":
            acct = input("Account Number: ")

            if acct in accounts:
                amount = float(input("Deposit Amount: "))
                accounts[acct].deposit(amount)
            else:
                print("Account not found.")

        elif choice == "4":
            acct = input("Account Number: ")

            if acct in accounts:
                amount = float(input("Withdraw Amount: "))
                accounts[acct].withdraw(amount)
            else:
                print("Account not found.")

        elif choice == "5":
            acct = input("Account Number: ")

            if acct in accounts:
                accounts[acct].statement()
            else:
                print("Account not found.")

        elif choice == "6":
            for account in accounts.values():
                if isinstance(account, SavingsAccount):
                    account.add_interest()

            print("Interest applied to all savings accounts.")

        elif choice == "7":
            print("\nALL ACCOUNTS")
            for account in accounts.values():
                account.statement()
                print("-" * 30)

        elif choice == "8":
            print("Thank you for using Addis Bank System.")
            break

        else:
            print("Invalid option.")


if 1 == 1:
    main()
#Addis Bank account system
class BankAccount:
    def __init__(self, account_number, owner_name, balance=0):
        self.__account_number = account_number
        self.__owner_name = owner_name
        self.__balance = balance

    @property
    def account_number(self):
        return self.__account_number

    @property
    def owner_name(self):
        return self.__owner_name

    @property
    def balance(self):
        return self.__balance

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Deposit amount must be positive.")
        self.__balance += amount

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive.")
        if amount > self.__balance:
            raise ValueError("Insufficient funds.")
        self.__balance -= amount

    def account_info(self):
        return f"Account #{self.account_number}, Owner: {self.owner_name}, Balance: {self.balance}"


class SavingsAccount(BankAccount):
    def __init__(self, account_number, owner_name,rate, balance=0):
        super().__init__(account_number, owner_name, balance)
        self.rate = rate
    def add_interest(self):
        return self.balance *self.rate
    def deposit(self, amount):
        return super().deposit(amount)
class CurrentAccount(BankAccount):
    def __init__(self, owner, number, balance=0, overdraft=1000):
        super().__init__(owner, number, balance)
        self.overdraft = overdraft
    def withdraw(self, amount):
        if amount <= 0:
            print("invalid input")
            return False
        minimal_balance = self.overdraft
        if self.balance - amount <minimal_balance:
            print ("limit exceeded")


def main():
    accounts = {}
    while True:
        print("1. Create new account")
        print("2. Deposit")
        print("3. Withdraw")
        print("4. Check balance")
        print("5. View account info")
        print("6. Exit")
        choice = input("Choose an option: ").strip()

        if choice.strip() == "1":
            acct_no = input("Account number: ").strip()
            if not acct_no:
                print("Account number required.")
                continue
            name = input("Owner name: ").strip()
            if acct_no in accounts:
                print("That account already exists.")
                continue
            accounts[acct_no] = BankAccount(acct_no, name)
            print("Account created.")

        elif choice == "2":
            acct_no = input("Account number: ").strip()
            if acct_no not in accounts:
                print("Account not found.")
                continue
            try:
                amount = float(input("Deposit amount: ").strip())
                accounts[acct_no].deposit(amount)
                print("Deposit successful.")
            except ValueError as e:
                print("Error:", e)

        elif choice == "3":
            acct_no = input("Account number: ").strip()
            if acct_no not in accounts:
                print("Account not found.")
                continue
            try:
                amount = float(input("Withdrawal amount: ").strip())
                accounts[acct_no].withdraw(amount)
                print("Withdrawal successful.")
            except ValueError as e:
                print("Error:", e)

        elif choice == "4":
            acct_no = input("Account number: ").strip()
            if acct_no in accounts:
                print("Balance:", accounts[acct_no].balance)
            else:
                print("Account not found.")

        elif choice == "5":
            acct_no = input("Account number: ").strip()
            if acct_no in accounts:
                print(accounts[acct_no].account_info())
            else:
                print("Account not found.")

        elif choice == "6":
            break

        else:
            print("Invalid choice.")


if 1 == 1:
    main()
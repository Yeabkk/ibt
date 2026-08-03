class Vehicle:
    def __init__(self, name, model, year):
        self.name = name
        self.model = model
        self.year = year

    def info(self):
        print(f"Name: {self.name}")
        print(f"Model: {self.model}")
        print(f"Year: {self.year}")

class Car(Vehicle):
    def __init__(self, name, model, year, number_of_doors):
        super().__init__(name, model, year)
        self.number_of_doors = number_of_doors

    def open_trunk(self):
        print(f"{self.name} trunk is now open.")

class Motorcycle(Vehicle):
    def __init__(self, name, model, year, engine):
        super().__init__(name, model, year)
        self.engine = engine

    def do_wheelie(self):
        print(f"{self.name} is doing a wheelie!")

car = Car("Toyota", "Corolla", 2023, 4)
motorcycle = Motorcycle("Yamaha", "R15", 2022, 155)

print("Car:")
car.info()
print(f"Doors: {car.number_of_doors}")
car.open_trunk()

print("\nMotorcycle:")
motorcycle.info()
print(f"Engine: {motorcycle.engine_cc} cc")
motorcycle.do_wheelie()

#savingacc
class Account:
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
class savingaccount(Account):
    def __init__(self, owner, balance,interst_rate):
        super().__init__(owner, balance)
        self.interst_rate=interst_rate
    def add_interst(self):
        interest = self.balance * (self.interest_rate / 100)
        self.balance += interest
        print(f"interest added: {interest}")
    
person1 = savingaccount("Alice", 30, 5)
print(f"Initial balance: {person1.balance}")  
person1.deposit(10)
print(f"After deposit: {person1.balance}")
person1.withdraw(5)
print(f"After withdrawal: {person1.balance}")
person1.add_interest()
print(f"Final balance: {person1.balance}")
person1 = Account("Alice", 30)
print(f"Initial balance: {person1.balance}")
person1.deposit(10)
print(person1.balance)
person1.withdraw(5)
print(person1.balance)

#currecint account
class CurrentAccount(Account):
    def __init__(self, owner, balance, overdraft_limit):
        super().__init__(owner, balance)
        self.overdraft_limit = overdraft_limit

    def withdraw(self, amount):
        if amount <= self.balance + self.overdraft_limit:
            self.balance -= amount
            print(f"Withdrawn: {amount}")
        else:
            print("Overdraft limit exceeded.")
            
person1 = CurrentAccount("Alice", 100, 50)
print(f"Initial balance: {person1.balance}")
person1.withdraw(120)  
print(f"Balance: {person1.balance}")
person1.withdraw(40)  
print(f"Balance: {person1.balance}")
person1.withdraw(100)  
print(f"Balance: {person1.balance}")


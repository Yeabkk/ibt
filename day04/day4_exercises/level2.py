#student class
class Student:
    def __init__(self, name, id, grade):
        self.name = name
        self.id = id
        self.grade = [grade] 

    def add_grade(self, grade):
        if not isinstance(grade, list):
            print("Grade should be a list of numbers.")
            return False
        self.grade.extend(grade)
        return True

    def average_grade(self):
        if not self.grade:
            return 0
        return sum(self.grade) / len(self.grade)
     
student1 = Student("Alice", 1, 85)
student1.add_grade([89, 92, 78, 95]) 
print(student1.average_grade()) 

#product class
class product:
    def __init__(self, name, price, stock):
        self.name = name
        self.price = price
        self.quantity = stock

    def restock(self, amount):
        if amount < 0:
            print("Restock amount cannot be negative.")
            return False
        self.quantity += amount
        
    def sell(self, amount):
        if self.quantity >= amount:
            self.quantity -= amount
            return self.price * amount
        else:
            print("Not enough stock available.")
            return 0
 
test_product = product("Laptop", 1000, 10)
print(test_product.quantity)
test_product.restock(5)
print(test_product.quantity)
test_product.sell(3)
print(test_product.quantity)

#encapsulation example
class Account:
    def __init__(self, owner, balance):
        self.owner = owner
        self.__balance = balance
        
    def deposit(self, amount):
        self.__balance += amount
        
    def withdraw(self, amount):
        if amount <= self.__balance:
            self.__balance -= amount
        else:
            print("Insufficient funds.")
    @property
    def balance(self):
        return self.__balance
person1 = Account("Alice", 30)
print(f"Initial balance: {person1.balance}")
person1.deposit(10)
print(person1.balance)
person1.withdraw(5)
print(person1.balance)
#simple class
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def introduce(self):
        print(f"Hello, my name is {self.name} and I am {self.age} years old.")
        
person1 = Person("Alice", 30)
person1.introduce()

#rectangle class
class Rectangle:
    def __init__(self, width, length):
        self.width = width
        self.length = length

    def area(self):
        return self.width * self.length

    def perimeter(self):
        return 2 * (self.width + self.length)
        
rectangle1 = Rectangle(5, 10)
rectangle2 = Rectangle(3, 7)
print(f"Area of rectangle1: {rectangle1.area()}")
print(f"Area of rectangle2: {rectangle2.area()}")
print(f"Perimeter of rectangle1: {rectangle1.perimeter()}")
print(f"Perimeter of rectangle2: {rectangle2.perimeter()}")

#bank account

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
person1 = Account("Alice", 30)
print(f"Initial balance: {person1.balance}")
person1.deposit(10)
print(person1.balance)
person1.withdraw(5)
print(person1.balance)
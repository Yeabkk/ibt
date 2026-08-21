# 1. S — Single Responsibility Principle (SRP)
# A class should have only one reason to change.
# One class = One job.
# Bad Example
class Report:
    def generate(self):
        print("Generating report")

    def save(self):
        print("Saving report")

    def email(self):
        print("Emailing report")

# Good Example
class Report:
    def generate(self):
        print("Generating report")

class ReportSaver:
    def save(self):
        print("Saving report")

class ReportEmailer:
    def email(self):
        print("Emailing report")


# 2. O — Open/Closed Principle (OCP)
# Software should be Open for extension Closed for modification
# Add new functionality without changing existing code.

# Bad Example
class Discount:
    def calculate(self, customer_type):
        if customer_type == "student":
            return 10
        elif customer_type == "teacher":
            return 20

# Good Example
from abc import ABC, abstractmethod

class Discount(ABC):
    @abstractmethod
    def calculate(self):
        pass


class StudentDiscount(Discount):
    def calculate(self):
        return 10


class TeacherDiscount(Discount):
    def calculate(self):
        return 20

# Need a VIP discount?

class VIPDiscount(Discount):
    def calculate(self):
        return 40


# 3. L — Liskov Substitution Principle (LSP)
# A child class should be able to replace its parent class without breaking the program.
# If class B inherits class A, then B should behave like A.
#  Bad Example
class Bird:
    def fly(self):
        print("Flying")


class Penguin(Bird):
    def fly(self):
        raise Exception("Penguins can't fly")

b = Penguin()
b.fly()


# Good Example
class Bird:
    pass


class FlyingBird(Bird):
    def fly(self):
        print("Flying")


class Penguin(Bird):
    def swim(self):
        print("Swimming")
    def fly(self):
        print("Can't fly")


# 4. I — Interface Segregation Principle (ISP)
# Don't force classes to implement methods they don't need.
# Python doesn't have interfaces like Java or C#, but abstract base classes can serve a similar purpose.
#  Bad Example
from abc import ABC, abstractmethod

class Worker(ABC):

    @abstractmethod
    def work(self):
        pass

    @abstractmethod
    def eat(self):
        pass


class Robot(Worker):
    def work(self):
        print("Working")

    def eat(self):
        pass


# Good Example


class Workable(ABC):

    @abstractmethod
    def work(self):
        pass


class Eatable(ABC):

    @abstractmethod
    def eat(self):
        pass


class Human(Workable, Eatable):

    def work(self):
        print("Working")

    def eat(self):
        print("Eating")


class Robot(Workable):

    def work(self):
        print("Working")



# 5. D — Dependency Inversion Principle (DIP)

# High-level modules should not depend on low-level modules.

# Both should depend on abstractions.

# Bad Example
class PetrolEngine:
    def start(self):
        print("Petrol engine started")


class Car():
    def __init__(self):
        self.engine = PetrolEngine()   # Creates its own engine

    def drive(self):
        self.engine.start()
        print("Car is moving")

self.engine = ElectricEngine()


# Good example
class PetrolEngine:
    def start(self):
        print("Petrol engine started")


class ElectricEngine:
    def start(self):
        print("Electric engine started")


class Car:
    def __init__(self, engine):
        self.engine = engine

    def drive(self):
        self.engine.start()
        print("Car is moving")


car1 = Car(PetrolEngine())
car1.drive()


car2 = Car(ElectricEngine())
car2.drive()


class Cat:
    def sound():
        print("Meow")

class Dog:
    def sound():
        print("Bark")

class AnimalFactory:
    def createAnimal(type):
        if type is "cat" :
            return Cat()
        elif type is "dog" :
            return Dog()

factory = AnimalFactory()

x = factory.createAnimal("cat")
y = factory.createAnimal("dog")

x.sound()
y.sound()

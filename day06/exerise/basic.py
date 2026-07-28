# Employee
class Employee:
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

class SalaryCalculator:
    def calculate_salary(self, employee):
        return employee.salary

class FileManager:
    def save_to_file(self, employee):
        print(f"{employee.name}'s data saved to file.")

class EmailService:
    def send_email(self, employee):
        print(f"Email sent to {employee.name}.")

employee = Employee("Alice", 5000)

calculator = SalaryCalculator()
file_manager = FileManager()
email_service = EmailService()
print("Salary:", calculator.calculate_salary(employee))
file_manager.save_to_file(employee)
email_service.send_email(employee)

#open/close

class Employee:
    def calculate_bonus(self):
        pass

class Manager(Employee):
    def calculate_bonus(self):
        return 1000

class Developer(Employee):
    def calculate_bonus(self):
        return 700

class Intern(Employee):
    def calculate_bonus(self):
        return 300

employees = [
    Manager(),
    Developer(),
    Intern()
]

for employee in employees:
    print(employee.calculate_bonus())

#liskov

class Bird:
    pass

class FlyingBird(Bird):
    def fly(self):
        print("Flying...")

class Sparrow(FlyingBird):
    pass

class Penguin(Bird):
    def swim(self):
        print("Swimming...")

def make_bird_fly(bird):
    if isinstance(bird, FlyingBird):
        bird.fly()
    else:
        print("This bird cannot fly.")

sparrow = Sparrow()
penguin = Penguin()

make_bird_fly(sparrow)
make_bird_fly(penguin)

#solid
"""
-Single Responsibility Principle
-Dependency Inversion Principle
"""


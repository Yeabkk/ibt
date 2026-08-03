#full bank account 
class Account:
    def __init__(self, owner, balance):
        self.owner = owner
        self.__balance = balance
        
    def deposit(self, amount):
        if amount <= 0:
            print("Deposit amount cannot be negative.")
            return False
        self.__balance += amount
        return True

    def withdraw(self, amount):
        if amount <= self.__balance:
            self.__balance -= amount
            return True
        else:
            print("Insufficient funds.")
            return False
    def transfer(self, amount, recipient_account):
        if self.withdraw(amount):
            recipient_account.deposit(amount)
            return True
        else:
            print("Transfer failed due to insufficient funds.")
            return False
    def borrow(self, amount):
        if amount <= (self.__balance/2):
            print("Borrow amount must be positive and not exceed half the balance you have.")
            return False
        self.__balance += amount
        return True
    @property
    def balance(self):
        return self.__balance
    @balance.setter
    def balance(self, value):
        if value < 0:
            print("Balance cannot be negative.")
        else:
            self.__balance = value
person1 = Account("Alice", 30)
print(f"Initial balance: {person1.balance}")
person1.deposit(10)
print(person1.balance)
person1.withdraw(5)
print(person1.balance)
person2 = Account("Bob", 50)
person1.transfer(10, person2)
print(f"{person2.owner}'s balance: {person2.balance}")
print(f"{person1.owner}'s balance: {person1.balance}")

#library system
class Book:
    def __init__(self, title, author, isbn, available=True):
        self.__title = title
        self.__author = author
        self.__isbn = isbn
        self.__available = available
        
    @property
    def title(self):
        return self.__title

    @property
    def author(self):
        return self.__author

    @property
    def isbn(self):
        return self.__isbn

    @property
    def available(self):
        return self.__available

    def borrow(self):
        if self.__available:
            self.__available = False
            return True
        print(f"The book '{self.title}' is already borrowed.")
        return False

    def return_book(self):
        if not self.__available:
            self.__available = True
            return True
        print(f"The book '{self.title}' was not borrowed.")
        return False

class Library:
    def __init__(self):
        self.__books = []

    def add_book(self, book):
        if any(b.isbn == book.isbn for b in self.__books):
            print(f"A book with ISBN {book.isbn} already exists.")
            return False
        self.__books.append(book)
        return True

    def borrow_book(self, isbn):
        book = self.__find_book(isbn)
        if book:
            return book.borrow()
        print(f"No book with ISBN {isbn} found.")
        return False

    def return_book(self, isbn):
        book = self.__find_book(isbn)
        if book:
            return book.return_book()
        print(f"No book with ISBN {isbn} found.")
        return False

    def __find_book(self, isbn):
        for book in self.__books:
            if book.isbn == isbn:
                return book
        return None

library = Library()
book1 = Book("The Great Gatsby", "F. Scott Fitzgerald", "9780743273565")

print(library.add_book(book1))          # True
print(library.borrow_book(book1.isbn))  # True
print(library.borrow_book(book1.isbn))  # False
print(library.return_book(book1.isbn))  # True
print(library.return_book(book1.isbn))  # False

#car class
class car:
    def __init__(self,speed, fuel):
        self.__speed = speed
        self.__fuel = fuel
    
    def accelerate(self, amount):
        if amount < 0:
            print("Acceleration amount cannot be negative.")
            return False
        self.__speed += amount
        return True
    def brake(self, amount):
        if amount < 0:
            print("Brake amount cannot be negative.")
            return False
        self.__speed = max(0, self.__speed - amount)
        return True
    def refuel(self, amount):
        if amount < 0:
            print("Refuel amount cannot be negative.")
            return False
        self.__fuel += amount
        return True
    @property
    def speed(self):
        return self.__speed

    @property
    def fuel(self):
        return self.__fuel
    

car1 = car(0, 50)
print(f"Initial speed: {car1.speed} km/h, Initial fuel: {car1.fuel} L")
case1 = car1.accelerate(30)
print(f"After acceleration: Speed: {car1.speed} km/h, Fuel: {car1.fuel} L, Success: {case1}")
case2 = car1.brake(10)
print(f"After braking: Speed: {car1.speed} km/h, Fuel: {car1.fuel} L, Success: {case2}") 
case3 = car1.refuel(20)
print(f"After refueling: Speed: {car1.speed} km/h, Fuel: {car1.fuel} L, Success: {case3}") 


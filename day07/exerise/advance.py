import time
from collections import deque


size = 100000

data_list = list(range(size))
data_dict = {i: i for i in range(size)}

target = size - 1


start = time.time()
target in data_list
end = time.time()

print("List search time:", end - start)


start = time.time()
target in data_dict
end = time.time()

print("Dictionary search time:", end - start)


list_data = []

start = time.time()

for i in range(10000):
    list_data.insert(0, i)

end = time.time()

print("List insert beginning:", end - start)


deque_data = deque()

start = time.time()

for i in range(10000):
    deque_data.appendleft(i)

end = time.time()

print("Deque insert beginning:", end - start)

answers = {
    "Checking username already taken": 
    "Dictionary - O(1) average lookup because keys are hashed.",

    "Processing tasks in arrival order": 
    "Queue - O(1) enqueue and dequeue operations.",

    "Undo feature in text editor":
    "Stack - O(1) push and pop operations.",

    "Storing student IDs for fast lookup":
    "Dictionary - O(1) average lookup by ID."
}


for key, value in answers.items():
    print(key)
    print(value)
    print()
    
def remove_middle_list(items):

    middle = len(items) // 2

    items.pop(middle)

    return items


class Node:

    def __init__(self, value):
        self.value = value
        self.next = None


class LinkedList:

    def __init__(self):
        self.head = None

    def add(self, value):

        node = Node(value)

        if self.head is None:
            self.head = node
            return

        current = self.head

        while current.next:
            current = current.next

        current.next = node


    def remove_middle(self):

        slow = self.head
        fast = self.head
        previous = None

        while fast and fast.next:
            previous = slow
            slow = slow.next
            fast = fast.next.next

        if previous:
            previous.next = slow.next


    def display(self):

        current = self.head

        while current:
            print(current.value)
            current = current.next


numbers = [1, 2, 3, 4, 5]

print(remove_middle_list(numbers))


linked = LinkedList()

linked.add(1)
linked.add(2)
linked.add(3)
linked.add(4)
linked.add(5)

linked.remove_middle()

linked.display()

class Customer:

    def __init__(self, account_number, name, balance):
        self.account_number = account_number
        self.name = name
        self.balance = balance
        self.history = []


class BankService:

    def __init__(self):
        self.customers = {}

    def add_customer(self, customer):
        self.customers[customer.account_number] = customer

    def transaction(self, account_number, amount):

        customer = self.customers.get(account_number)

        if customer:

            customer.balance += amount
            customer.history.append(amount)

            print("Transaction completed.")

        else:
            print("Customer not found.")


    def undo(self, account_number):

        customer = self.customers.get(account_number)

        if customer and customer.history:

            last = customer.history.pop()

            customer.balance -= last

            print("Last transaction undone.")

        else:
            print("No transaction found.")


    def search(self, account_number):

        customer = self.customers.get(account_number)

        if customer:
            print(customer.name)
            print(customer.balance)

        else:
            print("Customer not found.")



bank = BankService()

bank.add_customer(
    Customer("1001", "Alice", 5000)
)

bank.add_customer(
    Customer("1002", "Bob", 3000)
)


while True:

    print("\n1. Make Transaction")
    print("2. Undo Last Transaction")
    print("3. Search Customer")
    print("4. Exit")

    choice = input("Choose: ")


    if choice == "1":

        account = input("Account Number: ")
        amount = float(input("Amount: "))

        bank.transaction(account, amount)


    elif choice == "2":

        account = input("Account Number: ")

        bank.undo(account)


    elif choice == "3":

        account = input("Account Number: ")

        bank.search(account)


    elif choice == "4":

        break


    else:

        print("Invalid option.")
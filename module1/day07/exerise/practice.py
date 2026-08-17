#q1
numbers = [10, 20, 30, 40, 50]
print(numbers[2])
#big-o : o(1) because it can be directly accesed by index
for number in numbers:
    print(number)
#big-o : o(n)  loop visit every item once so n item n loop
for x in numbers:
    for y in numbers:
        print(x, y)
#big-o : o(n**2) one loop is n times so nested loop is 2 loops
accounts = {
    "1001": "John",
    "1002": "Alice",
    "1003": "Bob"
}
print(accounts["1002"])
#big-o : o(1) it is like list but use hashin

def binary_search(numbers, target):
    low = 0
    high = len(numbers) - 1
    while low <= high:
        middle = (low + high) // 2

        if numbers[middle] == target:
            return middle

        elif numbers[middle] < target:
            low = middle + 1

        else:
            high = middle - 1
    return -1
sortednumbers = [10, 20, 30, 40, 50, 60, 70]
print(binary_search(sortednumbers, 60))
#big-o : o(loh n) every step it cut the problem in half

#q2
accountsList = []

for i in range(100000):
    accountsList.append("ACC" + str(i))

accountsDict = {}

for i in range(100000):
    accountsDict["ACC" + str(i)] = True

target = "ACC99999"

if target in accountsList:
    print("Account found in list")

# Big-O: O(n)
# The list checks the accounts one by one, so it can take n steps.

if target in accountsDict:
    print("Account found in dictionary")

# Big-O: O(1)
# The dictionary uses the key to find the account directly,

#q3
class Stack:
    def __init__(self):
        self.items = []
    def push(self, item):
        self.items.append(item)
    def pop(self):
        if not self.items:
            return None
        return self.items.pop()
    def peek(self):
        if not self.items:
            return None
        return self.items[-1]

names = ["Abebe", "Kebede", "Almaz", "Hana", "Dawit"]
stack = Stack()
for name in names:
    stack.push(name)

print("Original names:", names)
reversed_names = []

while stack.peek() is not None:
    reversed_names.append(stack.pop())
print("Reversed names:", reversed_names)

#q4
from collections import deque
bank_queue = deque()

bank_queue.append("Abebe")
bank_queue.append("Kebede")
bank_queue.append("Almaz")
bank_queue.append("Hana")
bank_queue.append("Dawit")

print("Customers waiting:", list(bank_queue))

while bank_queue:
    customer = bank_queue.popleft()
    print("Serving:", customer)

#q5

class Node:

    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:

    def __init__(self):
        self.head = None

    def push_front(self, data):
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node

    def print_all(self):
        current = self.head

        while current:
            print(current.data)
            current = current.next

linked_list = LinkedList()

linked_list.push_front("Charlie")
linked_list.push_front("Bob")
linked_list.push_front("Alice")

linked_list.print_all()
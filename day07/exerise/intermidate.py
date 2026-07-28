def find_max(numbers):
    maximum = numbers[0]

    for number in numbers:
        if number > maximum:
            maximum = number

    return maximum


numbers = [12, 45, 7, 89, 23, 56]

print(find_max(numbers))

print("Time Complexity: O(n)")


def nested_loop(numbers):
    for i in numbers:
        for j in numbers:
            print(i, j)


nested_loop([1, 2, 3])

print("Time Complexity: O(n²)")

class Node:

    def __init__(self, value):
        self.value = value
        self.next = None


class LinkedList:

    def __init__(self):
        self.head = None

    def append(self, value):

        new_node = Node(value)

        if self.head is None:
            self.head = new_node
            return

        current = self.head

        while current.next:
            current = current.next

        current.next = new_node

    def print_list(self):

        current = self.head

        while current:
            print(current.value)
            current = current.next


linked_list = LinkedList()

linked_list.append(10)
linked_list.append(20)
linked_list.append(30)

linked_list.print_list()

class Stack:

    def __init__(self):
        self.items = []

    def push(self, item):
        self.items.append(item)

    def pop(self):
        return self.items.pop()

    def peek(self):
        return self.items[-1]


text = "Addis Ababa"

stack = Stack()

for letter in text:
    stack.push(letter)

reversed_text = ""

while stack.items:
    reversed_text += stack.pop()

print(reversed_text)

class Queue:

    def __init__(self):
        self.items = []

    def enqueue(self, item):
        self.items.append(item)

    def dequeue(self):
        if self.items:
            return self.items.pop(0)


queue = Queue()

queue.enqueue("Alice")
queue.enqueue("Bob")
queue.enqueue("Charlie")
queue.enqueue("David")
queue.enqueue("Emma")

while queue.items:
    print(queue.dequeue())
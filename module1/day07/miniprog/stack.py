class Stack:

    def __init__(self):
        self.items = []

    def push(self, item):
        self.items.append(item)

    def pop(self):
        return self.items.pop()

    def peek(self):
        return self.items[-1]

names = ["Alice", "Bob", "Charlie", "David"]

stack = Stack()
for name in names:
    stack.push(name)
reversed_names = []
while stack.items:
    reversed_names.append(stack.pop())
print(reversed_names)
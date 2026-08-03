from collections import deque

queue = deque()

queue.append("Alice")
queue.append("Bob")
queue.append("Charlie")
queue.append("David")
queue.append("Eve")

while queue:
    customer = queue.popleft()
    print(customer)
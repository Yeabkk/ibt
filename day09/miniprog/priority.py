import heapq

tasks = []

heapq.heappush(tasks, (3, "Check account"))

heapq.heappush(tasks, (1, "Fraud alert"))

heapq.heappush(tasks, (5, "Deposit request"))

heapq.heappush(tasks, (2, "Loan approval"))

heapq.heappush(tasks, (4, "Customer support"))

while tasks:

    priority, task = heapq.heappop(tasks)

    print(priority, task)
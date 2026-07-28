class TreeNode:

    def __init__(self, name):
        self.name = name
        self.children = []


    def add_child(self, node):
        self.children.append(node)



def print_tree(node, level=0):

    print("  " * level + node.name)

    for child in node.children:
        print_tree(child, level + 1)



head_office = TreeNode("Head Office")


bole_branch = TreeNode("Bole Branch")
teller = TreeNode("Teller")
loan_officer = TreeNode("Loan Officer")


piassa_branch = TreeNode("Piassa Branch")


head_office.add_child(bole_branch)
head_office.add_child(piassa_branch)


bole_branch.add_child(teller)
bole_branch.add_child(loan_officer)


print_tree(head_office)


class Node:

    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None



class BinarySearchTree:

    def __init__(self):
        self.root = None


    def insert(self, value):

        if self.root is None:
            self.root = Node(value)

        else:
            self.insert_node(self.root, value)


    def insert_node(self, node, value):

        if value < node.value:

            if node.left is None:
                node.left = Node(value)

            else:
                self.insert_node(node.left, value)

        else:

            if node.right is None:
                node.right = Node(value)

            else:
                self.insert_node(node.right, value)



    def search(self, value):

        return self.search_node(self.root, value)



    def search_node(self, node, value):

        if node is None:
            return False

        if node.value == value:
            return True

        if value < node.value:
            return self.search_node(node.left, value)

        return self.search_node(node.right, value)



bst = BinarySearchTree()


values = [50, 30, 70, 20, 40, 60]

for value in values:
    bst.insert(value)


print(bst.search(40))

print(bst.search(100))

class Graph:

    def __init__(self):
        self.graph = {}


    def add_customer(self, customer):

        if customer not in self.graph:
            self.graph[customer] = []


    def add_connection(self, customer1, customer2):

        self.graph[customer1].append(customer2)
        self.graph[customer2].append(customer1)


    def print_graph(self):

        for customer in self.graph:
            print(customer, "->", self.graph[customer])



bank_graph = Graph()


customers = [
    "Almaz",
    "Dawit",
    "Tigist",
    "Hanna"
]


for customer in customers:
    bank_graph.add_customer(customer)


bank_graph.add_connection("Almaz", "Dawit")
bank_graph.add_connection("Dawit", "Tigist")
bank_graph.add_connection("Tigist", "Hanna")
bank_graph.add_connection("Almaz", "Hanna")


bank_graph.print_graph()

import heapq


transactions = []

heapq.heappush(transactions, (5000, "Big Loan"))
heapq.heappush(transactions, (200, "Small Deposit"))
heapq.heappush(transactions, (10000, "Fraud Alert"))


priority, transaction = heapq.heappop(transactions)


print(priority)
print(transaction)


from collections import deque
import heapq


class TreeNode:

    def __init__(self, name):
        self.name = name
        self.children = []


    def add_child(self, node):
        self.children.append(node)



def print_tree(node, level=0):

    print("  " * level + node.name)

    for child in node.children:
        print_tree(child, level + 1)



class Graph:

    def __init__(self):
        self.network = {}


    def add_customer(self, customer):

        if customer not in self.network:
            self.network[customer] = []


    def add_connection(self, customer1, customer2):

        self.network[customer1].append(customer2)
        self.network[customer2].append(customer1)


    def bfs(self, start):

        visited = []
        queue = deque([start])

        while queue:

            customer = queue.popleft()

            if customer not in visited:

                visited.append(customer)

                for friend in self.network.get(customer, []):
                    queue.append(friend)

        return visited



class Node:

    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None



class BST:

    def __init__(self):
        self.root = None


    def insert(self, value):

        if self.root is None:
            self.root = Node(value)

        else:
            self.insert_node(self.root, value)


    def insert_node(self, node, value):

        if value < node.value:

            if node.left is None:
                node.left = Node(value)

            else:
                self.insert_node(node.left, value)

        else:

            if node.right is None:
                node.right = Node(value)

            else:
                self.insert_node(node.right, value)



    def search(self, value):

        current = self.root

        while current:

            if current.value == value:
                return True

            elif value < current.value:
                current = current.left

            else:
                current = current.right

        return False



class BankSystem:

    def __init__(self):

        self.tree = TreeNode("Head Office")

        self.graph = Graph()

        self.transactions = []

        self.bst = BST()



    def add_branch_employee(self, branch, employee):

        branch_node = TreeNode(branch)

        employee_node = TreeNode(employee)

        branch_node.add_child(employee_node)

        self.tree.add_child(branch_node)



    def add_transfer(self, customer1, customer2):

        self.graph.add_customer(customer1)

        self.graph.add_customer(customer2)

        self.graph.add_connection(customer1, customer2)



    def add_transaction(self, amount, name):

        heapq.heappush(
            self.transactions,
            (amount, name)
        )


    def process_transaction(self):

        if self.transactions:

            transaction = heapq.heappop(
                self.transactions
            )

            print(transaction)

        else:
            print("No transactions")



bank = BankSystem()


bank.add_branch_employee(
    "Bole Branch",
    "Loan Officer"
)

bank.add_branch_employee(
    "Piassa Branch",
    "Teller"
)


bank.add_transfer(
    "Almaz",
    "Dawit"
)

bank.add_transfer(
    "Dawit",
    "Tigist"
)

bank.add_transfer(
    "Tigist",
    "Hanna"
)


bank.bst.insert(1001)
bank.bst.insert(1002)
bank.bst.insert(1003)


bank.add_transaction(
    5000,
    "Large Loan"
)

bank.add_transaction(
    10000,
    "Fraud Alert"
)


print("Bank Hierarchy")
print_tree(bank.tree)


print("\nCustomer Network")
print(bank.graph.network)


print("\nConnected Customers")
print(bank.graph.bfs("Almaz"))


print("\nHighest Priority Transaction")
bank.process_transaction()


print("\nAccount Search")

print(bank.bst.search(1002))

print(bank.bst.search(2000))
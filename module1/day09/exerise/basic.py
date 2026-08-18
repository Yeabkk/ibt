# Basic Exercises
# 1. Tree Basics
# o Create a TreeNode class.
# o Build a small bank hierarchy:
# ▪ Head Office
# ▪ Bole Branch
# ➢ Teller
# ➢ Loan Officer
# ▪ Piassa Branch
# o Write a function to print the tree.
# 2. Binary Search Tree
# o Create a BST and insert these values: 50, 30, 70, 20, 40, 60.
# o Search for 40 and 100. Print whether they exist.
# 3. Graph Basics
# o Create a graph with customers: Almaz, Dawit, Tigist, Hanna. Add connections
# (money transfers) between them. And print the graph.
# 4. Heap Basics
# o Use heapq to create a priority queue for urgent transactions.
# o Add: (5000, "Big Loan"), (200, "Small Deposit"), (10000, "Fraud Alert").
# o Pop the highest priority item.

# 1. TREE BASICS

class TreeNode:
    def __init__(self, name):
        self.name = name
        self.children = []

    def add_child(self, child):
        self.children.append(child)


def print_tree(node, level=0):
    print("  " * level + node.name)

    for child in node.children:
        print_tree(child, level + 1)


# Build bank hierarchy

head_office = TreeNode("Head Office")

bole = TreeNode("Bole Branch")
teller = TreeNode("Teller")
loan_officer = TreeNode("Loan Officer")

piassa = TreeNode("Piassa Branch")

head_office.add_child(bole)
head_office.add_child(piassa)

bole.add_child(teller)
bole.add_child(loan_officer)

print(" BANK TREE ")
print_tree(head_office)

# 2. BINARY SEARCH TREE

class BSTNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


def insert(root, value):
    if root is None:
        return BSTNode(value)

    if value < root.value:
        root.left = insert(root.left, value)

    else:
        root.right = insert(root.right, value)

    return root


def search(root, value):
    if root is None:
        return False

    if root.value == value:
        return True

    if value < root.value:
        return search(root.left, value)

    return search(root.right, value)


# Create BST

root = None

values = [50, 30, 70, 20, 40, 60]

for value in values:
    root = insert(root, value)

print("BST SEARCH")

print("40 exists:", search(root, 40))
print("100 exists:", search(root, 100))

# 3. GRAPH BASICS

graph = {
    "Almaz": ["Dawit", "Tigist"],
    "Dawit": ["Almaz", "Hanna"],
    "Tigist": ["Almaz", "Hanna"],
    "Hanna": ["Dawit", "Tigist"]
}

print("CUSTOMER GRAPHE")

for customer in graph:
    print(customer, "->", graph[customer])

# 4. HEAP BASICS

import heapq

priority_queue = []

heapq.heappush(priority_queue, (5000, "Big Loan"))
heapq.heappush(priority_queue, (200, "Small Deposit"))
heapq.heappush(priority_queue, (10000, "Fraud Alert"))

item = heapq.heappop(priority_queue)

print("Highest priority item:", item)
class Node:

    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def insert(root, value):

    if root is None:
        return Node(value)

    if value < root.value:
        root.left = insert(root.left, value)

    else:
        root.right = insert(root.right, value)

    return root

def inorder(root):

    if root:

        inorder(root.left)

        print(root.value)

        inorder(root.right)

root = None

balances = [5000, 3000, 7000, 2000, 4000, 6000]

for balance in balances:
    root = insert(root, balance)


inorder(root)
class Node:

    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None



def height(node):

    if node is None:
        return 0

    left_height = height(node.left)

    right_height = height(node.right)

    return max(left_height, right_height) + 1
class Node:

    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None



def height(node):

    if node is None:
        return 0

    left_height = height(node.left)

    right_height = height(node.right)

    return max(left_height, right_height) + 1



root = Node(50)

root.left = Node(30)

root.right = Node(70)

root.left.left = Node(20)

root.left.right = Node(40)


print(height(root))
root = Node(50)

root.left = Node(30)

root.right = Node(70)

root.left.left = Node(20)

root.left.right = Node(40)


print(height(root))
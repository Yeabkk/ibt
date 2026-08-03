def binary_search(items, target):

    left = 0
    right = len(items) - 1

    while left <= right:

        middle = (left + right) // 2

        if items[middle] == target:
            return middle

        elif items[middle] < target:
            left = middle + 1

        else:
            right = middle - 1

    return -1

balances = [100, 250, 500, 750, 1000, 1500]

print(binary_search(balances, 750))
print(binary_search(balances, 300))
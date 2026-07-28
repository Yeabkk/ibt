numbers = [10, 20, 30, 40, 50]
print(numbers[2])
numbers = [1, 2, 3, 4, 5]
for num in numbers:
    print(num)
numbers = [1, 2, 3]
for i in numbers:
    for j in numbers:
        print(i, j)
accounts = {
    "A001": "Alice",
    "A002": "Bob",
    "A003": "Charlie"
}
print(accounts["A003"])

def binary_search(arr, target):
    left = 0
    right = len(arr) - 1

    while left <= right:
        mid = (left + right) // 2

        if arr[mid] == target:
            return mid

        elif arr[mid] < target:
            left = mid + 1

        else:
            right = mid - 1

    return -1

numbers = list(range(1, 101))
print(binary_search(numbers, 75))
def factorial_recursive(n):

    if n == 0:
        return 1

    return n * factorial_recursive(n - 1)

def factorial_iterative(n):

    result = 1

    for i in range(1, n + 1):
        result *= i

    return result

number = 5

print(factorial_recursive(number))

print(factorial_iterative(number))

def sum_list(numbers):

    if len(numbers) == 0:
        return 0

    return numbers[0] + sum_list(numbers[1:])


numbers = [10, 20, 30, 40, 50]

print(sum_list(numbers))

def linear_search(arr, target):

    for i in range(len(arr)):

        if arr[i] == target:
            return i

    return -1


numbers = [15, 25, 35, 45, 55]

print(linear_search(numbers, 35))

print(linear_search(numbers, 100))

def binary_search(arr, target):

    left = 0
    right = len(arr) - 1

    while left <= right:

        middle = (left + right) // 2

        if arr[middle] == target:
            return middle

        elif arr[middle] < target:
            left = middle + 1

        else:
            right = middle - 1

    return -1


numbers = [10, 20, 30, 40, 50, 60]

print(binary_search(numbers, 40))

print(binary_search(numbers, 25))

def bubble_sort(arr):

    n = len(arr)

    for i in range(n):

        for j in range(0, n - i - 1):

            if arr[j] > arr[j + 1]:

                arr[j], arr[j + 1] = arr[j + 1], arr[j]

        print(arr)


numbers = [64, 34, 25, 12, 22, 11, 90]

bubble_sort(numbers)
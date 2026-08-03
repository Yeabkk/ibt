def reverse_string(text):

    if len(text) == 0:
        return ""

    return reverse_string(text[1:]) + text[0]


word = "Addis Ababa"

print(reverse_string(word))

def selection_sort(arr):

    comparisons = 0
    swaps = 0

    for i in range(len(arr)):

        minimum = i

        for j in range(i + 1, len(arr)):

            comparisons += 1

            if arr[j] < arr[minimum]:
                minimum = j

        if minimum != i:
            arr[i], arr[minimum] = arr[minimum], arr[i]
            swaps += 1

    return comparisons, swaps



def insertion_sort(arr):

    comparisons = 0
    swaps = 0

    for i in range(1, len(arr)):

        key = arr[i]
        j = i - 1

        while j >= 0:

            comparisons += 1

            if arr[j] > key:
                arr[j + 1] = arr[j]
                swaps += 1
                j -= 1

            else:
                break

        arr[j + 1] = key

    return comparisons, swaps



numbers1 = [64, 25, 12, 22, 11]

numbers2 = numbers1.copy()


selection_result = selection_sort(numbers1)

insertion_result = insertion_sort(numbers2)


print(numbers1)
print("Selection Sort:", selection_result)


print(numbers2)
print("Insertion Sort:", insertion_result)

def find_pair(numbers, target):

    left = 0
    right = len(numbers) - 1

    while left < right:

        total = numbers[left] + numbers[right]

        if total == target:
            return numbers[left], numbers[right]

        elif total < target:
            left += 1

        else:
            right -= 1

    return None


numbers = [1, 3, 5, 7, 9, 12]

print(find_pair(numbers, 12))

print(find_pair(numbers, 20))

####

from datetime import date


transactions = [
    {"amount": 500, "date": "2026-01-10", "type": "deposit"},
    {"amount": 200, "date": "2026-01-12", "type": "withdraw"},
    {"amount": 1000, "date": "2026-01-15", "type": "deposit"},
    {"amount": 300, "date": "2026-01-20", "type": "withdraw"}
]


def calculate_balance(transactions, index=0):

    if index == len(transactions):
        return 0

    if transactions[index]["type"] == "deposit":
        return transactions[index]["amount"] + calculate_balance(
            transactions, index + 1
        )

    return -transactions[index]["amount"] + calculate_balance(
        transactions, index + 1
    )


def bubble_sort_amount(items):

    data = items.copy()

    for i in range(len(data)):

        for j in range(len(data) - i - 1):

            if data[j]["amount"] > data[j + 1]["amount"]:
                data[j], data[j + 1] = data[j + 1], data[j]

    return data



def linear_search(transactions, amount):

    for i in range(len(transactions)):

        if transactions[i]["amount"] == amount:
            return transactions[i]

    return None



def binary_search(transactions, amount):

    left = 0
    right = len(transactions) - 1

    while left <= right:

        middle = (left + right) // 2

        if transactions[middle]["amount"] == amount:
            return transactions[middle]

        elif transactions[middle]["amount"] < amount:
            left = middle + 1

        else:
            right = middle - 1

    return None



def transactions_above(transactions, amount, index=0):

    if index == len(transactions):
        return []

    result = transactions_above(
        transactions,
        amount,
        index + 1
    )

    if transactions[index]["amount"] > amount:
        result.append(transactions[index])

    return result



print("Total Balance:")
print(calculate_balance(transactions))


print("\nSorted Transactions:")
sorted_transactions = bubble_sort_amount(transactions)

for transaction in sorted_transactions:
    print(transaction)


print("\nLinear Search:")
print(linear_search(transactions, 1000))


print("\nBinary Search:")
print(binary_search(sorted_transactions, 500))


print("\nTransactions Above 400:")
print(transactions_above(transactions, 400))
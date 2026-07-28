accounts = [
    ("Alice", 5000),
    ("Bob", 3000),
    ("Charlie", 8000),
    ("David", 2000)
]

sorted_accounts = sorted(
    accounts,
    key=lambda account: account[1],
    reverse=True
)

print(sorted_accounts)
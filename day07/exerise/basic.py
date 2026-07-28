print("Accessing an element in a list by index: O(1)")
print("Searching for an element in a list using in: O(n)")
print("Inserting at the beginning of a list: O(n)")
print("Dictionary lookup by key: O(1)")

complexities = ["O(1)", "O(log n)", "O(n)", "O(n²)"]

print("Fastest to Slowest:")
for complexity in complexities:
    print(complexity)
    

students = [
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Emma",
    "Frank",
    "Grace",
    "Helen",
    "Isaac",
    "Jack"
]

print(students[2])

students.append("Kevin")

students.insert(0, "Zara")

print(students)

student_grades = {
    "Alice": 90,
    "Bob": 85,
    "Charlie": 78,
    "David": 88,
    "Emma": 95
}

student_grades["Frank"] = 80

student_grades["Bob"] = 92

if "Emma" in student_grades:
    print("Emma exists")

print(student_grades)
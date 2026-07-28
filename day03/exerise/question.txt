Day 3 Exercises – Collections, Files & Errors
Instructions
• Create folder day3_exercises
• Save each level as a separate python file (day2_level1.py, day2_level2.py,
day2_level3.py, and day2_mini_project.py)
• Add comments explaining your code
• Push your folder to GitHub at the end (you will share your GitHub repo link at
submission)
Level 1: Basic
1. Lists & Tuples
• Create a list of 6 favorite foods.
• Print the first and last city.
• Add a new city using .append()
• Remove the second city using .pop()
• Create a tuple of coordinates for Ethiopia and unpack it into two variables
2. Dictionaries
• Create a dictionary student with keys: name, age, grade, city, department.
• Print the student’s name, department, and grade.
• Add a new key phone, with value ”0987654321”
• Update the grade.
3. Sets
• Create a list with duplicate names.
• Convert it to a set to remove duplicates.
• Add a new name to the set.
Level 2: Intermediate
4. List Operations
• Create a list of numbers: [10, 25, 40, 15, 60, 30]
• Use a loop to print only numbers greater than 30.
• Sort the list and print it.
• Find the sum and average of the list.
5. Dictionary Operations
• Create a dictionary of 5 products and their prices.
• Loop through the dictionary and print each product with its price in an attractive manner.
• Ask user for a product name and show its price (use .get() with default message if not
found).
6. List Comprehension
• Create a list of numbers from 1 to 20 using comprehension.
• Create a new list containing only even numbers from 1 to 30 using comprehension.
• Create a list of odd numbers from 1 to 10 using comprehension
7. Modules & Import
• Create a file utils.py with these function:
o add_tax(price, rate=0.15) – accepts a price, includes tax and returns tax included
price
• In your main.py file, import and use the function.
Level 3: Advanced
8. File Reading & Writing
• Create a program that:
o Writes 5 student names and scores to a file students.txt
o Reads the file back and prints average score
• Handle the case if file doesn’t exist.
9. Error Handling
• Write a program that asks user for two numbers.
• Use try/except to handle:
o ValueError (non-numeric input)
o ZeroDivisionError
• Use finally to always print “Calculation attempt completed”.
10. Full Program – Inventory Manager Create a program that:
• Uses a dictionary to store product: quantity pair
• Menu system with options:
1. Add new product
2. Update quantity
3. View all products
4. Save to file
5. Load from file
6. Exit

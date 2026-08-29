#1
name = "Yeabsira Zeleke"
age = 25
height = 1.65
is_student = True
favorite_food = "Beyaynet"
print(f"My name is {name}, I am {age}years old and i am {height} also a student at ibt({is_student}),My favorit food is {favorite_food}.")

#2

num1 = input("insert number")
num_1 =int(num1)
num2 = input("insert the second number")
num_2=int(num2)
print(f"The sum of {num1} & {num2} is {num_1+num_2}")

#3
age=input("What year where you born?")
ageInt=int(age)
print(f"You are {2026-ageInt}years old")

#4
score=input("Give me a score")
scoreInt=int(score)
if scoreInt >=50:
    print("Pass")
else:
    print("Fail")
    
#5

score=input("Give me a score")
scoreInt=int(score)
if scoreInt >=90:
    print("Excellent")
elif scoreInt >= 80:
    print("Very Good")
elif scoreInt >= 70:
    print("Good")
elif scoreInt >= 50:
    print("Pass")
else:
    print("Fail")
    
#6
for n in range(1,21):
    print(n)
    
#7
while n == 0:
    num=input("Enter postive number:")
    n=int(num)
    sum+=n
    print(sum)
    
#8
def greet(name):
    print(f"welcome {name}")
    
def square(num):
    print(f"The square of {num} is {num*num}")
    
def is_even(num):
    print(f"The number {num} is even:{num%2==0}")
name=greet("Yeab")
num=square(4)
Num=is_even(7)
nuM=is_even(8)

#9
#Tip Calculator 

def calculatetip(bill, tip_percent):
    tip = bill * tip_percent / 100
    return tip

def calculatetotal(bill, tip):
    total = bill + tip
    return total

bill = float(input("Enter the bill amount: "))

tip_percent = int(input("Enter tip percentage (10, 15, or 20): "))
tip = calculatetip(bill, tip_percent)
total = calculatetotal(bill, tip)
print(f"Tip amount: ${tip:.2f}")
print(f"Total amount: ${total:.2f}")

#10
# Simple Quiz Game

def ask_question(question, options, correct_answer):
    print("\n" + question)

    for option in options:
        print(option)

    answer = input("Your answer (A, B, C, or D): ").upper()

    if answer == correct_answer:
        print("Correct!")
        return 1
    else:
        print("Wrong!")
        return 0


def show_result(score):
    print("\n--- Quiz Finished ---")
    print(f"Your final score is {score}/5")

    if score == 5:
        print("Excellent! You got everything correct.")
    elif score >= 3:
        print("Good job!")
    else:
        print("Keep practicing. You can do better!")


def main():
    score = 0

    score += ask_question(
        "1. What is the capital city of Ethiopia?",
        ["A. Dire Dawa", "B. Addis Ababa", "C. Hawassa", "D. Mekelle"],
        "B"
    )

    score += ask_question(
        "2. What is the largest lake in Ethiopia?",
        ["A. Lake Tana", "B. Lake Abaya", "C. Lake Chamo", "D. Lake Ziway"],
        "A"
    )

    score += ask_question(
        "3. What is the currency of Ethiopia?",
        ["A. Dollar", "B. Birr", "C. Shilling", "D. Franc"],
        "B"
    )

    score += ask_question(
        "4. Which planet is known as the Red Planet?",
        ["A. Earth", "B. Venus", "C. Mars", "D. Jupiter"],
        "C"
    )

    score += ask_question(
        "5. How many days are there in a normal year?",
        ["A. 360", "B. 364", "C. 365", "D. 366"],
        "C"
    )

    show_result(score)


main()

#11
def calculate_final_price(price, tax_rate=0.15, discount=0):
    tax = price * tax_rate
    price_with_tax = price + tax
    final_price = price_with_tax - discount
    return final_price

price1 = calculate_final_price(100)
print("Final price 1:", price1)

price2 = calculate_final_price(100, discount=10)
print("Final price 2:", price2)

price3 = calculate_final_price(200, 0.10, 20)
print("Final price 3:", price3)

#12
# Personal Finance Tracker
balance = 0

def add_income():
    global balance

    try:
        amount = float(input("Enter income amount: "))

        if amount <= 0:
            print("Amount must be greater than 0.")
            return

        balance += amount
        print(f"Income of {amount:.2f} added.")

    except ValueError:
        print("Invalid input. Please enter a number.")


def add_expense():
    global balance

    try:
        amount = float(input("Enter expense amount: "))

        if amount <= 0:
            print("Amount must be greater than 0.")
            return

        if amount > balance:
            print("Not enough balance.")
            return

        balance -= amount
        print(f"Expense of {amount:.2f} added.")

    except ValueError:
        print("Invalid input. Please enter a number.")


def show_balance():
    print(f"Current balance: {balance:.2f}")


# Main menu
while True:

    print("\n--- Personal Finance Tracker ---")
    print("1. Add income")
    print("2. Add expense")
    print("3. Show balance")
    print("4. Exit")

    choice = input("Choose an option: ")

    if choice == "1":
        add_income()

    elif choice == "2":
        add_expense()

    elif choice == "3":
        show_balance()

    elif choice == "4":
        print("\n--- Summary ---")
        print(f"Final balance: {balance:.2f}")
        print("Thank you for using the Finance Tracker!")
        break

    else:
        print("Invalid choice. Please choose 1, 2, 3, or 4.")
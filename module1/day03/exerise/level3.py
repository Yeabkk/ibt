#file reading & writing
students={
    "Alice": 85,
    "Bob": 90,
    "Charlie": 78,
    "David": 92,
    "Eve": 88
}
try:
    with open("students.txt","w") as f:
        for name, grade in students.items():
            f.write(f"{name}: {grade}\n")
except FileNotFoundError:
    print("File not found.")   
else:
    print("File written successfully.")
finally:
    print("completed.")
with open("students.txt","r") as f:
    scores=[]
    for line in f:
        line=line.strip()
        if line:
            name, grade_str = line.split(":", 1)
            scores.append(int(grade_str.strip()))
    if scores:
        average = sum(scores) / len(scores)
        print(f"Average score: {average:.2f}") 

#Error handling
try:
    input_number1=int(input("Enter a number: "))
    input_number2=int(input("Enter another number: "))
    result=input_number1/input_number2
except ValueError:
    print("Invalid input. Please enter a valid number.")   
except ZeroDivisionError:
    print("Division by zero is not allowed.")
finally:
    print("calculation attempt completed.")
    
#inventory management
inventory={
    "apple": 50,
    "banana": 30,
    "orange": 20,
    "grape": 15,
    "mango": 25
}
def update_inventory(item, quantity):
    if item in inventory:
        inventory[item] += quantity
    else:
        inventory[item] = quantity
def display_inventory():
    print("Current Inventory:")
    for item, quantity in inventory.items():
        print(f"{item}: {quantity}")

def save_inventory_to_file(filename):
    try:
        with open(filename, "w") as f:
            for item, quantity in inventory.items():
                f.write(f"{item}: {quantity}\n")
    except FileNotFoundError:
        print("File not found.")
    else:
        print("Inventory saved to file.")
    finally:
        print("completed.")
def load_from_file(filename):
    try:
        with open(filename, "r") as f:
            for line in f:
                line = line.strip()
                if line:
                    item, quantity_str = line.split(":", 1)
                    inventory[item.strip()] = int(quantity_str.strip())
    except FileNotFoundError:
        print("File not found.")
    finally:
        print("completed.")
        
print("--------------------------------------")
print("Inventory Manager")
print("1.Add/Update Item")
print("2.view all products")
print("3.Save Inventory to File")
print("4.Load Inventory from File")
print("5.Exit")
print("--------------------------------------")
while True:
    choice = input("Enter your choice (1-5): ")
    if choice == "1":
        item = input("Enter item name: ")
        quantity = int(input("Enter quantity: "))
        update_inventory(item, quantity)
        print(f"{item} updated in inventory.")
    elif choice == "2":
        display_inventory()
    elif choice == "3":
        filename = input("Enter filename to save inventory: ")
        save_inventory_to_file(filename)
    elif choice == "4":
        filename = input("Enter filename to load inventory: ")
        load_from_file(filename)
    elif choice == "5":
        print("Exiting Inventory Manager.")
        break
    else:
        print("Invalid choice. Please try again.")
    

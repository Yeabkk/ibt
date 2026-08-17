# Exercises
# Work through these in a file called day03/practice.py. Run each one and check the output before
# moving on.
# 1. Unique cities. Given a list with repeated city names, use a set to print the distinct cities, then
# the count.
# 2. Price report. Make a dictionary of five grocery items and prices in ETB. Loop with .items() to
# print each on its own line.
# 3. Tax comprehension. Given prices = [100, 250, 400, 80], use one comprehension to build
# a list with 15% tax added.
# 4. Cheap items. From the same list, use a comprehension with a condition to keep only prices
# under 200.
# 5. Write & read. Write three customer names to names.txt, then open it and print each name
# back, one per line.
# 6. Safe division. Ask the user for a number and divide 1000 by it, catching both ValueError and
# ZeroDivisionError.

#q1
city = [ "Addis Ababa","Dire Dawa","Bahir Dar","Mekelle","Hawassa",
    "Adama","Addis Ababa","Gondar","Jimma","Bahir Dar",
    "Harar","Mekelle","Adama","Hawassa","Addis Ababa"]
print(f"Cites {city}")
print(f"Cites number before clearing repeted {len(city)}")
print(f"Cites {set(city)}")
print(f"Cites number after clearing repeted {len(set(city))}")

#q2
grocery={
    "Bread": 60,
    "Milk": 80,
    "Rice": 120,
    "Sugar": 100,
    "Coffee": 250
}
for item,price in grocery.items():
    print(f"{item}:{price} ETB")
    
#q3
prices = [100, 250, 400, 80]
taxed = [p*1.15 for p in prices]
print(f"Before tax {prices}")
print(f"After tax {taxed}")

#q4
newPrices=[p for p in prices if p < 200]
print(f"Low prices {newPrices}")

#q5
with open("names.txt", "w") as f: 
 f.write("Ababa\n")
 f.write("Debeba\n")
 f.write("Kebebe\n")
 
with open("names.txt") as f:
 text = f.read()
 print(text)
 
 #q6
try:
    amount=int(input("Amount: "))
    result= 1000 / amount
except ValueError:
    print("Please enter a number")
except ZeroDivisionError:
    print("Amount can't be zero")
else:
    print(result)
finally:
    print("Done")
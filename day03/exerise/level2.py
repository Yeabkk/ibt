#list operations
numbers=[10,25,40,15,60,30]

print([numbers for numbers in numbers if numbers > 30])
n = len(numbers)
i=0.0
for numbers in numbers:
    i+=numbers
print(i)
print(i/n)

#dictionery operations
prodects={
    "dell":50000,
    "hp":40000,
    "lenovo":30000,
    "samsung":20000,
    "apple":100000
}

for item,prodect in prodects.items():
    print(f"{item}: {prodect} ETB")
""""    
input_productName=input("Enter the product name: ")
if input_productName in prodects:
    print(prodects.get(input_productName),"ETB")
 """   
#list comprehension
liste_numbers=[number for number in range(1,21)]
print(liste_numbers)
liste_numbers2=[number for number in range(1,31) if number % 2 == 0]
print(liste_numbers2)
liste_numbers3=[number for number in range(1,11) if number % 2 != 0]
print(liste_numbers3)

#module operations
import utils

print(utils.addtax(500,0.15))
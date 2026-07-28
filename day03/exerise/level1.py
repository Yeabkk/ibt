"""list"""
foods = ["bread","mango","boiledeggs","dorowate","genfo","pizza"]
print(foods[0:5])
foods.append("pasta")
print(foods[0:6])
foods.pop(1)
print(foods[0:5])
"""tupels"""
location=(67.43792,3.1415)
lat,lon=location
print(lat,lon)
"""dictionary"""
students={
	"name": "John",
	"age": 20,
	"grade": 85,
	"city": "New York",
	"department": "Computer Science"
}
print(students["name"], students["department"], students["grade"])
students["phone"]="123-456-7890"
print(students.keys(),students.values())
students["grade"]=90
print(students["grade"])
"""sets"""
names=["john","jane","alice","bob","john","alice","jane","mike","bob","sarah","mike","sarah"]
print(names)
names=set(names)
print(names)
names.add("david")
print(names)


temp = input("Inter temperture in °C : ")
inp =int(temp)
if inp < 15:
	print("cold")
elif inp < 29:
	print("warm")
else:
	print("hot")
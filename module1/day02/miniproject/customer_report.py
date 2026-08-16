customers = [
("Almaz", 1500), ("Dawit", 700), ("Tigist", 200),
("Hanna", 1200), ("Samuel", 450),
]
def tier(balance):
	if balance >= 1000:
		return "Premium"
	elif balance >= 500:
		return "Standard"
	return "Basic"
premium = 0
standard = 0
basic = 0
for name, balance in customers:
	tiere = tier(balance)
	print(f"{name}: {tiere} ({balance} ETB)")
	if tiere == "Premium":
		premium+=1
	elif tiere == "Standard":
		standard+=1
	else :
		basic +=1
print(f"Premium: {premium}")
print(f"Standard: {standard}")
print(f"Basic: {basic}")
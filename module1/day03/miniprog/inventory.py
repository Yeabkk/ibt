stock = {}
def load_stock():
	try:
		with open("stock.txt") as f:
			for line in f:
				item, qty = line.strip().split(",")
				stock[item] = int(qty)
	except FileNotFoundError:
		print("No stock file yet — starting empty")
def adjust(item, amount):
	stock[item] = stock.get(item, 0) + amount
	print(f"{item}: updated to {stock[item]} units")
def save_stock():
	try:
		with open("stock.txt","w") as f:
			for item,qty in stock.items():
				f.write(f"{item},{qty}\n")
		print("stock saved to stock.txt")
	except IOError:
		print("error saving file")
def show_low_stock():
    low = [item for item, qty in stock.items() if qty < 10]
    if low:
        print("Low stock:", low)
    else:
        print("All items are sufficient")

load_stock()
adjust("Paracetamol", 5)
adjust("Vitamin C", -2)
show_low_stock()
save_stock()
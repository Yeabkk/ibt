def apply_discount(price,percent=10):
	dis = price * (percent/100)
	return  price - dis
print(apply_discount(200))
print(apply_discount(200,50))

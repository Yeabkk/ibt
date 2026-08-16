def apply_discount(price,percent=10):
	dis = price * (percent/100)
	return  price - dis
num=200
print(f"Before Discount {num}")
print(f"After Discount by defult {apply_discount(num)}")
print(f"After Discount by 50% {apply_discount(num,50)}")
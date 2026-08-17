class product:
    def __init__(self, name, price, quantity):
        self.name = name
        self.price = price
        self.__quantity = quantity
        
    def restock(self, amount):
        self.__quantity += amount
        
    def sell(self, amount):
        if self.__quantity >= amount:
            self.__quantity -= amount
            return self.price * amount
        else:
            print("Not enough stock available.")
            return 0
    @property
    def quantity(self):
        return self.__quantity
     
product1 = product("Laptop", 1000, 10)
print(product1.quantity) 
product1.restock(5)
print(product1.quantity)
product1.sell(3)
print(product1.quantity)
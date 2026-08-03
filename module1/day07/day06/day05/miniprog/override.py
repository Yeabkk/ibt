class Vehicle:
    def __init__(self, make, model):
        self.make = make
        self.model = model
    
    def describe(self):
        ...

class Car(Vehicle):
    def __init__(self, make, model,capacity):
        super().__init__(make, model)
        
class Truck(Vehicle):
    def __init__(self, make, model):
        super().__init__(make, model)
        self.capacity = self.capacity
    
    def describe(self):
        return print(f"Truck: {self.make} {self.model} (Capacity: {self.capacity} tons)")
    
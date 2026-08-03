class Vehicle:
    def __init__(self, make, model):
        self.make = make
        self.model = model
    
    def describe(self):
        return f"Vehicle: {self.make} {self.model}"

class Car(Vehicle):
    def __init__(self, make, model,num_doors):
        super().__init__(make, model)
        self.num_doors =num_doors
    def describe(self):
        return f"Car: {self.make} {self.model} ({self.num_doors}-door)"
        
class Truck(Vehicle):
    def __init__(self, make, model,capacity):
        super().__init__(make, model)
        self.capacity = capacity
    
    def describe(self):
        return print(f"Truck: {self.make} {self.model} (Capacity: {self.capacity} tons)")
    
vehicles = [
    Car("Toyota", "Corolla", 4),
    Truck("Ford", "F-150", 3.5)
]

for vehicle in vehicles:
    print (f"{vehicle.describe()}")
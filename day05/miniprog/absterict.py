from abc import ABC, abstractmethod

class Vehicle(ABC):
    @abstractmethod
    def __init__(self, make, model):
        self.make = make
        self.model = model
    
    def describe(self):
        return f"Vehicle: {self.make} {self.model}"
    def wheels(self):
        pass
        

class Car(Vehicle):
    def __init__(self, make, model,num_doors):
        super().__init__(make, model)
        self.num_doors =num_doors
    def describe(self):
        return f"Car: {self.make} {self.model} ({self.num_doors}-door)"
    def wheels(self):
        return 4   
class Truck(Vehicle):
    def __init__(self, make, model,capacity):
        super().__init__(make, model)
        self.capacity = capacity
    
    def describe(self):
        return print(f"Truck: {self.make} {self.model} (Capacity: {self.capacity} tons)")
    def wheels(self):
        return 8
    
vehicles = [
    Car("Toyota", "Corolla", 4),
    Truck("Ford", "F-150", 3.5)
]

for vehicle in vehicles:
    print (f"{vehicle.describe()}")
    

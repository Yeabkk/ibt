class Vehicle:
    def __init__(self, make, model):
        self.make = make
        self.model = model

    def describe(self):
        return f"{self.make} {self.model}"
class Car(Vehicle):
   ...
class Truck(Vehicle):
    def __init__(self, make, model, capacity):
        super().__init__(make, model)
        self.capacity = capacity
    def describe(self):
        return f"{self.make} {self.model}, Capacity: {self.capacity} tons"
vehicles = [
    Car("Toyota", "Corolla"),
    Car("Honda", "Civic"),
    Truck("Volvo", "FH",20),
    Truck("Isuzu", "NPR",10)
]
for vehicle in vehicles:
    print(vehicle.describe())
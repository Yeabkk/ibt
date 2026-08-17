from abc import ABC,abstractmethod
class Vehicle(ABC):
    def __init__(self, make, model):
        self.make = make
        self.model = model
    @abstractmethod
    def wheels(self):
        ...

    def describe(self):
        return f"{self.make} {self.model}"
class Car(Vehicle):
   def wheels(self):
        return 4
class Truck(Vehicle):
    def __init__(self, make, model, capacity):
        super().__init__(make, model)
        self.capacity = capacity
    def wheels(self):
        return 6
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
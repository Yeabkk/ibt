class Vehicle:
    def __init__(self, make, model):
        self.make = make
        self.model = model

    def describe(self):
        return f"{self.make} {self.model}"
class Car(Vehicle):
    ...
class Truck(Vehicle):
    ...
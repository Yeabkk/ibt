class Vehicle:
    def __init__(self, make, model):
        self.make = make
        self.model = model
    
    def describe(self):
        ...


class Car(Vehicle):
    ...
class Truck(Vehicle):
    ...
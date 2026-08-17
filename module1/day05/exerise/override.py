class Vehicle:
    def __init__(self, make, model):
        self.make = make
        self.model = model

    def describe(self):
        return f"{self.make} {self.model}"
class Car(Vehicle):
    def ____init__(self, make, model, capacity):
        super().__init__(make, model)
        self.capacity = capacity
    def describe(self):
        return f"{self.make} {self.model}, Capacity: {self.capacity} tons"
class Truck(Vehicle):
    def __init__(self, make, model, capacity):
        super().__init__(make, model)
        self.capacity = capacity
    def describe(self):
        return f"{self.make} {self.model}, Capacity: {self.capacity} tons"
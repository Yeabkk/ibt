class Circle:
    def draw(self):
        print("Drawing Circle")

class Square:
    def draw(self):
        print("Drawing Square")

class Triangle:
    def draw(self):
        print("Drawing Triangle")

class ShapeFactory:

    @staticmethod
    def create(kind):

        if kind.lower() == "circle":
            return Circle()

        elif kind.lower() == "square":
            return Square()

        elif kind.lower() == "triangle":
            return Triangle()

        else:
            return None

shape = ShapeFactory.create("circle")
shape.draw()
shape = ShapeFactory.create("square")
shape.draw()
shape = ShapeFactory.create("triangle")
shape.draw()
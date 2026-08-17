#q1
class Report:
    def __init__(self, content):
        self.content = content

    def build(self):
        return f"Report: {self.content}"

class Saver:
    def save(self, report):
        print(f"Saving report: {report}")

class Emailer:
    def email(self, report, email):
        print(f"Emailing report to {email}: {report}")

#test
report = Report("Monthly sales report")
built_report = report.build()
saver = Saver()
saver.save(built_report)
emailer = Emailer()
emailer.email(built_report, "user@example.com")

#q2
class Shape:
    def area(self):
        raise NotImplementedError("Subclasses must implement area()")

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    def area(self):
        return 3.14159 * self.radius ** 2
class Square(Shape):
    def __init__(self, side):
        self.side = side

    def area(self):
        return self.side ** 2
class Triangle(Shape):
    def __init__(self, base, height):
        self.base = base
        self.height = height
    def area(self):
        return 0.5 * self.base * self.height
    
shapes = [Circle(5),Square(4),Triangle(6,3)]

for shape in shapes:
    print("Area:", shape.area())
    
#q3
class AppSettings:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.currency = "ETB"

        return cls._instance
settings1 = AppSettings()
settings2 = AppSettings()
print("Currency:", settings1.currency)
print("Are they the same?", settings1 is settings2)

#q4
class ShapeFactory:
    @staticmethod
    def create(kind):
        if kind == "circle":
            return Circle(5)

        elif kind == "square":
            return Square(4)

        elif kind == "triangle":
            return Triangle(6, 3)

        else:
            raise ValueError("Unknown shape type")

circle = ShapeFactory.create("circle")
square = ShapeFactory.create("square")
triangle = ShapeFactory.create("triangle")
print("Factory Circle area:", circle.area())
print("Factory Square area:", square.area())
print("Factory Triangle area:", triangle.area())

#q5
class NewsAgency:
    def __init__(self):
        self.subscribers = []
        self.news = ""
    def subscribe(self, subscriber):
        self.subscribers.append(subscriber)
    def notify(self):
        for subscriber in self.subscribers:
            subscriber.update(self.news)
    def publish_news(self, news):
        self.news = news
        print(f" NewsAgency published: {news}")
        self.notify()
class EmailSubscriber:
    def __init__(self, name):
        self.name = name
    def update(self, news):
        print(f"{self.name} received news by email: {news}")

class SMSSubscriber:
    def __init__(self, name):
        self.name = name
    def update(self, news):
        print(f"{self.name} received news by SMS: {news}")

agency = NewsAgency()
subscriber1 = EmailSubscriber("Abebe")
subscriber2 = SMSSubscriber("Kebede")
agency.subscribe(subscriber1)
agency.subscribe(subscriber2)
agency.publish_news("New technology course is available!")
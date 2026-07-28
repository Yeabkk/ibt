class book:
    def __init__(self, title, author, pages):
        self.title = title
        self.author = author
        self.pages = pages

    def describe(self):
        return f"{self.title} by {self.author}, {self.pages} pages"
    
    

book1=book("The Great Gatsby", "F. Scott Fitzgerald", 180)
book2=book("anna frank", "frank", 200)

print(book1.describe())
print(book2.describe())
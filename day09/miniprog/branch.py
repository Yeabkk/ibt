from collections import deque

class Account:

    def __init__(self, account_number, owner, balance):
        self.account_number = account_number
        self.owner = owner
        self.balance = balance

class Branch:

    def __init__(self, name):

        self.name = name
        self.children = []
        self.accounts = []

    def add_child(self, branch):

        self.children.append(branch)

    def add_account(self, account):

        self.accounts.append(account)

    def total_balance(self):

        total = 0

        for account in self.accounts:
            total += account.balance

        for child in self.children:
            total += child.total_balance()

        return total

def bfs(transfers, start):

    visited = []
    queue = deque([start])

    while queue:

        current = queue.popleft()

        if current not in visited:

            visited.append(current)

            for account in transfers.get(current, []):
                queue.append(account)

    return visited

head_office = Branch("Head Office")

addis_region = Branch("Addis Region")
afar_region = Branch("Afar Region")

bole_branch = Branch("Bole Branch")
piassa_branch = Branch("Piassa Branch")
samara_branch = Branch("Samara Branch")

head_office.add_child(addis_region)
head_office.add_child(afar_region)

addis_region.add_child(bole_branch)
addis_region.add_child(piassa_branch)

afar_region.add_child(samara_branch)

account1 = Account("1001", "Almaz", 5000)
account2 = Account("1002", "Dawit", 3000)
account3 = Account("1003", "Tigist", 7000)
account4 = Account("1004", "Hanna", 2000)

bole_branch.add_account(account1)
piassa_branch.add_account(account2)
samara_branch.add_account(account3)
samara_branch.add_account(account4)

print(head_office.total_balance())

transfers = {

    "1001": ["1002", "1003"],

    "1002": ["1004"],

    "1003": ["1004"],

    "1004": []

}

print(bfs(transfers, "1001"))

print(bfs(transfers, "1002"))
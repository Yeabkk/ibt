class NewsAgency:

    def __init__(self):
        self.subscribers = []

    def subscribe(self, subscriber):
        self.subscribers.append(subscriber)

    def notify(self, news):
        for subscriber in self.subscribers:
            subscriber.update(news)

class EmailSubscriber:

    def update(self, news):
        print("Email:", news)

class SMSSubscriber:

    def update(self, news):
        print("SMS:", news)

agency = NewsAgency()
email = EmailSubscriber()
sms = SMSSubscriber()
agency.subscribe(email)
agency.subscribe(sms)
agency.notify("Breaking News: Python Exam Tomorrow!")
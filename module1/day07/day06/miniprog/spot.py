class Report:
    def build_report(self):
        print("Building report...")

class ReportSaver:
    def save(self):
        print("Saving report...")
        
class ReportEmailer:
    def email(self):
        print("Emailing report...")


report = Report()
saver = ReportSaver()
emailer = ReportEmailer()

report.build_report()
saver.save()
emailer.email()
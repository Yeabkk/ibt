
import { transactions } from "./transactions.js";
import { totalByType } from "./report.js";
console.log(`Debits: ${totalByType(transactions, "debit")} ETB`);
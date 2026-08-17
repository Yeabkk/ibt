import { transactions } from "./transactions.js";

import {
    totalByType,
    formatReceipts,
    separateTransactions,
    correctTransaction
} from "./report.js";


console.log("=== TeleBirr Transaction Report ===");

const { credits, debits } = separateTransactions(transactions);

console.log("\nCredits:");
console.log(credits);

console.log("\nDebits:");
console.log(debits);

const creditTotal = totalByType(transactions, "credit");
const debitTotal = totalByType(transactions, "debit");

console.log(`\nTotal Credits: ${creditTotal} ETB`);
console.log(`Total Debits: ${debitTotal} ETB`);

console.log("\nReceipts:");

const receipts = formatReceipts(transactions);

receipts.forEach(receipt => {
    console.log(receipt);
});

const corrected = correctTransaction(transactions[0], 300);

console.log("\nOriginal transaction:");
console.log(transactions[0]);

console.log("\nCorrected transaction:");
console.log(corrected);
//question no1
let prices=[100, 200, 300, 400, 500,1000, 1500, 2000];
let output=prices.map((price) => price * 1.15).filter((price) => price < 1000).reduce((acc,price) => acc + price, 0);
console.log(output);
//question no2
let customer = {
    name: "Ababe Tesfaye",
    city: "Addis Ababa",
    balance: 1000
};
for (const [key, value] of Object.entries(customer)) {
    console.log(`${key}: ${value}`);
};
//question no3
let { name, city } = customer;
console.log(`Name : ${name}, City : ${city}`);
function greet({ name }) {
    console.log(`Hello, ${name}!`);
}
greet(customer);
//question no4
const updatedCustomer = { ...customer, city: "Adama", phone: "0987654321" };
console.log("Updated Customer Value:");
console.log(updatedCustomer);
console.log("Original Customer Value:");
console.log(customer);
//question no5
import { addVat,VAT} from './money.js';
let price = 100;
let vat = addVat(price);
console.log(`Price before VAT: ${price}`);
console.log(`VAT Rate: ${VAT}`);
console.log(`Price after VAT: ${vat}`);

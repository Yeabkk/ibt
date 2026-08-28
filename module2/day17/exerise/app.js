    // Exercises
    // Complete these in your Day 17 folder and push them to GitHub. Run each one and confirm the
    // output before moving on.
    // 1. Write a vat(amount, rate = 0.15) function using a default parameter, then write the same logic
    // as an arrow function with an implicit return.
    // 2. Write a makeCounter closure that returns a function incrementing a private count. Call it several
    // times and, in a comment, explain why count stays private.
    // 3. Write a discountBy(rate) factory and create memberPrice (10%) and salePrice (30%) from it.
    // Apply both to a price of 1000 ETB.
    // 4. Write a higher-order applyToAll(list, fn) that runs fn over every item and returns the results, then
    // use it to add VAT to an array of prices.
    // 5. Use forEach (a callback) to print each Ethiopian city in an array with its index, e.g. "1. Addis
    //Ababa".


//q1
function vat(amount, rate = 0.15) {
    return amount * (1 + rate);
}
console.log(vat(1000));
console.log(vat(1000, 0.20));
//q1.1

const vatArrow = (amount, rate = 0.15) => amount * (1 + rate);
console.log(vatArrow(100));
//2
function makeCounter() {
let count = 0;   // private
return () => ++count;
}
const next = makeCounter();
next(); 
next();
next(); 
next();
next(); 
next();
//because let is not univerisal it is block(it just in the function)


//q3

function discountBy(rate) {
    return function(price) {
        return price - (price * rate);
    };
}

const memberPrice = discountBy(0.10);
const salePrice = discountBy(0.30);

console.log("Member price:", memberPrice(1000), "ETB");
console.log("Sale price:", salePrice(1000), "ETB");

//q4

function applyToAll(list, fn) {
    const results = [];

    for (const item of list) {
        results.push(fn(item));
    }

    return results;
}

const prices = [100, 200, 500, 1000];

const pricesWithVAT = applyToAll(
    prices,
    price => price * 1.15
);

console.log(pricesWithVAT);
//q5

const cities = ['Addis Ababa', 'Bahir Dar', 'Gondar', 'Lalibela', 'Axum', 'Harar'];

cities.forEach((city, index) => {
    console.log(`${index + 1}. ${city}`);
});
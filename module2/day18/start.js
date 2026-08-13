
// const vowels = ['a', 'e', 'i', 'o', 'u'];

// console.log(vowels[0]); // Output: 'a'
// console.log(vowels.length); //output: 5
// console.log(vowels[vowels.length - 1]); // Output: 'u'
// console.log(vowels.push('y')); // Output: y will be added at the end the arrey
// console.log(vowels.pop()); // Output: 'y' will be removed from the end
// console.log(vowels.includes('i')); // Output:  true
// console.log(vowels.indexOf('o')); // Output: 3c

// const newVowel= vowels.map((vowel) =>`${vowel} is a vowel`);
// console.log(newVowel); 

const numbers=[10,17,20,23,25,28,29,32];
const result= numbers.filter((number)=> number%2===0).map((n)=> n**2).reduce((sum,num)=> sum+num,0);
console.log(result);
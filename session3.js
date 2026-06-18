// ............escape character ..........

 // console.log("this is a double quote (\") and this is a single quote (\') ");

//....... this way we can print the black slash first one was treat escape char and 2nd one print as a black slash 

// console.log("this is a back slash slash \\");


// .....concatination ............

// const str1 = "Hello";
// const str2 = "world";
// console.log(str1 + " " + str2);


// ...........accessing the charracter in string ........

// let str = "hello";
// console.log(str.charAt(2));
// console.log(str[2]);
// console.log(str.charAt(8)); // empty no error 
// console.log(str[8]) // undefined

// let str1 = "Hello World";
// console.log(str1.charAt(5)); // here print the space as a char but incase of out of length its also print empty space. its a promlematic.


//.......string immutability..........induvisual char not a not allow to change in string. string value is mutable.

// let str = "Hello";
// str[0] = "W";
// console.log(str); // empty no error but if we use "use strict" mode at the top so its show type error


// ......Template strings.............

// let userName = "Mohak";
// let age = 22;
// console.log(`Happy birthday ${userName}
// Your are ${age + 1} years old now`)


//.........String method ............

// const anyString = "Brave, Brave New World";

// console.log(anyString.indexOf("Brave")); // 0
// console.log(anyString.lastIndexOf("Brave")); // 7

//....sub string ...........
//   const anyString = "Brave, Brave New World";
// const firstOne = anyString.substring(0,4) // this 4 index is not include its not inclusive // if we don't provide the last index so its print whole string 
// console.log(firstOne) // Brav 


//.......concat method .......

// concat method is alternate of + 

//  const anyString = "Brave, Brave New World ";
// const str1 = "Hello";
// console.log("concat me ".concat(anyString, str1));


//..........Common String Manipulation Methods............

// concat()

// Combines two or more strings and returns a new string.
// Example: "Hello, ".concat("world!") results in "Hello, world!".
// toUpperCase() and toLowerCase()

// Converts all characters of a string to uppercase or lowercase, respectively.
// Example: "JavaScript".toUpperCase() results in "JAVASCRIPT".
// slice()

// Extracts a section of a string and returns it as a new string, without modifying the original string.
// Example: "Hello, world!".slice(0, 5) results in "Hello".
// split()

// Divides a string into an ordered list of substrings, puts these substrings into an array, and returns the array.
// Example: "apple, banana, cherry".split(", ") results in ["apple", "banana", "cherry"].
// replace()

// Replaces specified value(s) in a string with another value and returns a new string.
// Example: "I like coffee".replace("coffee", "tea") results in "I like tea".
// trim()

// Removes whitespace from both ends of a string.
// Example: " Hello World ".trim() results in "Hello World".

function analyzeString(str) {
    if (str === null || str === undefined || str.trim() === "") {
        return "Invalid input";
    }

    let result = `Original:${str}\n` +
                 `Length: ${str.length}\n` +
                 `Uppercase: ${str.toUpperCase()}\n` +
                 `First Char: ${str[0]}\n` +
                 `Last Char: ${str[str.length - 1]}`;
    return result;
}

console.log(analyzeString("Hello World")); // 
console.log(analyzeString(""));
console.log(analyzeString("   "));
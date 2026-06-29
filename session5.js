

// [1, 2, NaN].includes(NaN) // true  → SameValueZero: NaN === NaN ✓
// [1, 2, NaN].indexOf(NaN)  // -1   → Strict equality: NaN !== NaN ✗

// const str = "The quick brown fox";
// const words = str.split(" ");
// console.log(words); // ["The", "quick", "brown", "fox"]

// console.log("hello".split("").length)
// console.log("hello".split().length)
// console.log("".split()) // 1
// console.log("".split("")) // 0

// console.log(["a", "b", "c"].join()) // "a, b, c"
// console.log(["a", "b", "c"].join("")) // "abc"


// const matrix = [[1, 2], [3, 4], [5, 6]];

// for (let i = 0; i < matrix.length; i++) {
//   for (let j = 0; j < matrix[i].length; j++) {
//     console.log(matrix[i][j]); 
//   }
// }


const matrix = [[1, 2], [3, 4, 5], [6]];

for (let i = 0; i < matrix.length; i++) {
  for (let j = 0; j < matrix.length; j++) {
    console.log(matrix[i][j]);
  }
}
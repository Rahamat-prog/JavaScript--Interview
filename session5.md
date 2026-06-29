Searching, Array.includes(value), string to array , array to string, nestead loops, multidimential arrays

Here's your first question. Answer it before moving on.

---

**Q1:**

What does this return, and why?

```js
[1, 2, NaN].includes(NaN)
```

Most juniors who know `indexOf` get this wrong. What's your answer?

Correct result, wrong reason.

`includes()` doesn't just check "is it present." It uses the **SameValueZero** algorithm, which is why it differs from `indexOf`.

```js
[1, 2, NaN].includes(NaN) // true  → SameValueZero: NaN === NaN ✓
[1, 2, NaN].indexOf(NaN)  // -1   → Strict equality: NaN !== NaN ✗
```

The trap: juniors say `includes` returns `true` for the right reason but can't explain **why** `indexOf` fails on the same array. An interviewer will immediately follow up with exactly that comparison.

---

**Q2:**

What does this return?

```js
["1", "2", "3"].includes(1)
```

Correct.

```js
["1", "2", "3"].includes(1) // false → no type coercion, strict match only
["1", "2", "3"].indexOf(1)  // -1   → same, no coercion
```

The follow-up an interviewer will throw at you:

```js
[1, 2, 3].includes("1") // false
1 == "1"                // true  → == coerces, includes() does not
```

Memorize this: `includes()` uses **SameValueZero**, not `==`. Type coercion never happens.

---

**Q3:**

What does `split()` return here, and what's the exact length?

```js
"hello".split("")
"hello".split()
```

Two different calls. What's the difference?

Correct. One edge case juniors miss:

```js
"".split("")  // [] → length 0
"".split()    // [""] → length 1
```

Empty string with no separator gives an empty array. Empty string with a separator gives an array with one empty string element. Interviewers use this to test whether you actually understand the separator argument.

---

**Q4:**

What does this return?

```js
["a", "b", "c"].join()
["a", "b", "c"].join("")
```

First one is wrong.

```js
["a", "b", "c"].join()   // "a,b,c"  → default separator is comma, no space
["a", "b", "c"].join("") // "abc"    → empty string separator
```

The trap: juniors assume the default separator is `", "` (comma + space). It's just `","` — no space.

---

**Q5:**

What gets logged here?

```js
const matrix = [[1, 2], [3, 4], [5, 6]];

for (let i = 0; i < matrix.length; i++) {
  for (let j = 0; j < matrix[i].length; j++) {
    console.log(matrix[i][j]);
  }
}
```

Correct.

Now the trap version:

**Q6:**

What happens here, and why?

```js
const matrix = [[1, 2], [3, 4, 5], [6]];

for (let i = 0; i < matrix.length; i++) {
  for (let j = 0; j < matrix.length; j++) {
    console.log(matrix[i][j]);
  }
}
```

Spot the bug.

Correct on the bug, output is slightly off.

```js
const matrix = [[1, 2], [3, 4, 5], [6]];

// matrix.length = 3, so j goes 0,1,2 for every row

// i=0: matrix[0] = [1,2]
console.log(matrix[0][0]) // 1
console.log(matrix[0][1]) // 2
console.log(matrix[0][2]) // undefined → no index 2 in [1,2]

// i=1: matrix[1] = [3,4,5]
console.log(matrix[1][0]) // 3
console.log(matrix[1][1]) // 4
console.log(matrix[1][2]) // 5

// i=2: matrix[2] = [6]
console.log(matrix[2][0]) // 6
console.log(matrix[2][1]) // undefined
console.log(matrix[2][2]) // undefined
```

Output: `1 2 undefined 3 4 5 6 undefined undefined`

You had the right count of undefineds but placed them wrong. In an interview, getting the exact output order matters — they're checking if you're actually tracing execution or guessing.

---

That covers all your topics. Here are your coding assignments.

---

**Assignment 1:**
Write a function that takes a 2D array and returns a flat array of all values, skipping any `undefined` holes caused by jagged rows.

**Assignment 2:**
Write a function `search2D(matrix, target)` that returns `[row, col]` of the target value, or `[-1, -1]` if not found. Do not use any built-in search methods.

**Assignment 3:**
Given a string like `"apple,banana,,grape"`, split it, remove empty entries, and rejoin with `" | "` as the separator.

Take your time. Paste your attempts one at a time.
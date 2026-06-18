Good. Let's find your gaps fast.

**Q1:**

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
```

What prints? Why?

Wrong.

It prints `3 3 3`.

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}

// var is function-scoped — one shared `i` across all iterations
// by the time setTimeout callbacks run, the loop has finished
// i is now 3 — all three callbacks read the same i = 3
```

The trap: `var` doesn't create a new `i` per iteration. `let` would — that's the fix.

**Q2:**

```js
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
```

Now what prints? What changed mechanically?

Correct on the output. Weak on the explanation — "creates new i per iteration" is the *what*, not the *why*. You need the why for interviews.

**Why `var` gives `3 3 3`:**

`var` is function-scoped. There is only **one `i`** in memory for the entire loop.

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}

// Think of it like this:
// var i = 0  ← one box in memory, shared by everyone

// Loop runs 3 times, scheduling 3 callbacks
// Loop finishes → i is now 3
// THEN callbacks run → all three look at the same box → see 3
// Prints: 3 3 3
```

**Why `let` gives `0 1 2`:**

`let` is block-scoped. Each iteration gets its **own separate `i`**.

```js
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}

// Iteration 1 → its own box: i = 0
// Iteration 2 → its own box: i = 1
// Iteration 3 → its own box: i = 2
// Each callback remembers its own box
// Prints: 0 1 2
```

One box vs three boxes. That's the whole difference.

---

Ready for Q3?

**Q3:**

```js
const arr = [3, 1, 2];
arr.sort();
console.log(arr);
```

What prints? And what's the trap with `sort()`?

Wrong. It prints `[1, 2, 3]` here, but that's luck.

The real trap:

```js
const arr = [10, 9, 2, 21];
arr.sort();
console.log(arr); // [10, 2, 21, 9] ← NOT what you expect
```

`sort()` converts elements to **strings** by default, then sorts alphabetically.

```js
// "10" < "2" because "1" comes before "2" in Unicode
// So 10 sorts before 2 — completely wrong for numbers
```

Your `[3, 1, 2]` gave correct output by coincidence — single digit numbers sort the same way alphabetically and numerically.

**The fix interviewers want to hear:**

```js
const arr = [10, 9, 2, 21];
arr.sort((a, b) => a - b); // ascending
console.log(arr); // [2, 9, 10, 21]

// a - b < 0 → a comes first
// a - b > 0 → b comes first
// a - b = 0 → order unchanged
```

Two things to remember:
- `sort()` **mutates** the original array
- Without a comparator, it **always sorts as strings**

**Q4:**

```js
const arr = [1, 2, 3];
const removed = arr.shift();
console.log(removed);
console.log(arr);
```

What prints?

Correct, but know *why* interviewers ask this.

`shift()` is a **two-part operation** — most juniors only remember one part:

```js
const arr = [1, 2, 3];
const removed = arr.shift();

// Part 1: removes first element, returns it
console.log(removed); // 1

// Part 2: mutates original array
console.log(arr); // [2, 3]
```

The trap question that catches juniors:

```js
const arr = [1, 2, 3];
arr.shift();
arr.unshift(0);
console.log(arr); // what prints?
```

Answer before I explain it.

Correct. Next trap:

**Q5:**

```js
const arr = [1, 2, 3];
arr.push(4, 5);
console.log(arr.pop());
console.log(arr);
```

What prints? Don't guess — trace it step by step out loud.

Wrong on both.

Trace it properly:

```js
const arr = [1, 2, 3];
arr.push(4, 5);
// arr is now [1, 2, 3, 4, 5]

console.log(arr.pop());
// pop() removes and RETURNS the last element → 5
// prints: 5

console.log(arr);
// arr is now [1, 2, 3, 4]
// prints: [1, 2, 3, 4]
```

You missed that `push(4, 5)` adds **two** elements, not one. And `pop()` returns the removed element, not the whole array.

The pattern to lock in:

| Method | Removes from | Returns |
|--------|-------------|---------|
| `pop()` | end | removed element |
| `shift()` | start | removed element |
| `push()` | — | new array length |
| `unshift()` | — | new array length |

`push` and `unshift` returning the **length** is the trap most juniors blank on.

**Q6:**

```js
const arr = [1, 2, 3];
console.log(arr.push(4));
```

What prints?

Wrong.

It prints `4` — the new **length** of the array, not the elements.

```js
const arr = [1, 2, 3];
console.log(arr.push(4));
// push() returns the new length → 4
// arr is now [1, 2, 3, 4] but that's NOT what's printed
```

You're still confusing "what the method returns" vs "what the array looks like after." That's a recurring gap — you keep printing the array in your head instead of the return value.

Lock this in:

```js
arr.push(4)   // returns new LENGTH → 4
arr.pop()     // returns removed ELEMENT → last item
arr.unshift(0) // returns new LENGTH → 4
arr.shift()   // returns removed ELEMENT → first item
```

Push/unshift → length. Pop/shift → element. Memorize that pair.

**Q7:**

```js
const arr = [1, 2, 3];
const arr2 = arr;
arr2.push(4);
console.log(arr);
```

What prints?

Wrong on the output, partially right on the reasoning.

`arr2 = arr` doesn't copy the array — both variables point to the **same array in memory**.

```js
const arr = [1, 2, 3];
const arr2 = arr;
// arr2 is NOT a new array
// both arr and arr2 point to the same array

arr2.push(4);
// modifies the one shared array

console.log(arr); // [1, 2, 3, 4]
```

You said `4` — that's the `push()` return value trap again. `console.log(arr)` prints the array, not the return value of push.

Two gaps in one answer:
- Reference vs copy — `=` on an array doesn't clone it
- Still confusing return value of `push` with array contents

**Q8:**

```js
const arr = [1, 2, 3];
const arr2 = [...arr];
arr2.push(4);
console.log(arr);
console.log(arr2);
```

What prints now? What changed?

Wrong.

`...` spread creates a **shallow copy** — a new separate array.

```js
const arr = [1, 2, 3];
const arr2 = [...arr];
// arr2 is a NEW array with same values
// modifying arr2 does NOT affect arr

arr2.push(4);

console.log(arr);  // [1, 2, 3]  ← unchanged
console.log(arr2); // [1, 2, 3, 4]
```

You got the same answer for both — that means you still didn't register what changed from Q7. The entire point of the question was the contrast.

Q7 → `=` → same array, both affected  
Q8 → `[...arr]` → new array, only `arr2` affected

That's the interview answer they want: **reference vs shallow copy**.

**Q9:**

```js
const arr = [1, 2, 3];
arr.reverse();
console.log(arr);
```

Simple. But what's the trap hiding here?

The trap: `reverse()` mutates the original array.

```js
const arr = [1, 2, 3];
arr.reverse();
console.log(arr); // [3, 2, 1] ← original is permanently changed
```

Most juniors know the output. They miss that the original is destroyed.

```js
// Common silent bug in interviews:
const original = [1, 2, 3];
const reversed = original.reverse();

console.log(reversed);  // [3, 2, 1]
console.log(original);  // [3, 2, 1] ← also reversed, same reference
```

The fix if you need to preserve original:

```js
const reversed = [...original].reverse();
// spread first → new array → reverse that → original untouched
```

`sort()` has the same trap — both mutate. Interviewers pair these two specifically to catch that.

---

That covers all your Session 4 topics. Time for assignments.

**3 Coding Challenges:**

1. Flatten this without built-in methods: `[1, [2, 3], [4, 5]]` → `[1, 2, 3, 4, 5]`
2. Rotate an array left by `n` steps. `([1,2,3,4,5], 2)` → `[3,4,5,1,2]`
3. Remove duplicates from an array without using `Set`

Pick one and attempt it.

```js
function flatten(arr) {
  let result = [];

  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      // current element is an array → go inside it recursively
      const inner = flatten(arr[i]);
      for (let j = 0; j < inner.length; j++) {
        result.push(inner[j]);
      }
    } else {
      // current element is a plain value → just push it
      result.push(arr[i]);
    }
  }

  return result;
}

const deepNested = [1, [2, [3, [4]]]];
console.log(flatten(deepNested)); // [1, 2, 3, 4]
```

**How to read this:**

- Loop through every element
- If it's an array → call `flatten` again on it (recursion)
- If it's a number → push directly into result

The key concept: the function **calls itself** when it hits a nested array. It keeps going deeper until there's nothing left to unwrap.

---

Now attempt challenge 2 — rotate array left by n steps.
`([1,2,3,4,5], 2)` → `[3,4,5,1,2]`

Works. But two things to stress-test.

**1. Your edge case handling is incomplete.**

```js
rotateAnArray([], 2);
// array.length = 0
// n % 0 = NaN ← silent bug, no error thrown
```

You didn't guard against empty array.

**2. Performance trap — interviewers will ask this.**

Your solution is `O(n * rotations)` — `shift()` inside a loop is slow because every shift re-indexes the entire array.

The clean O(n) solution uses slice:

```js
function rotateAnArray(array, n) {
  if (array.length === 0) return array; // edge case fix

  const rotations = n % array.length;

  // slice the array into two parts and swap them
  const left = array.slice(rotations);       // [3, 4, 5]
  const right = array.slice(0, rotations);   // [1, 2]

  return [...left, ...right];
}

rotateAnArray([1, 2, 3, 4, 5], 2); // [3, 4, 5, 1, 2]
```

Your logic was correct. The gap is edge cases and knowing there's a faster approach.

Now attempt challenge 3 — remove duplicates without `Set`.

```js
function removeDuplicates(arr) {
  let result = [];

  for (let i = 0; i < arr.length; i++) {
    let current = arr[i];

    // check if current already exists in result
    if (result.indexOf(current) === -1) {
      // -1 means not found → safe to push
      result.push(current);
    }
    // if found → skip it
  }

  return result;
}

removeDuplicates([1, 2, 2, 3, 4, 4, 5]);
// i=0 → 1 → not in result → push → result = [1]
// i=1 → 2 → not in result → push → result = [1, 2]
// i=2 → 2 → FOUND in result → skip
// i=3 → 3 → not in result → push → result = [1, 2, 3]
// i=4 → 4 → not in result → push → result = [1, 2, 3, 4]
// i=5 → 4 → FOUND in result → skip
// i=6 → 5 → not in result → push → result = [1, 2, 3, 4, 5]
// returns [1, 2, 3, 4, 5]
```

The only concept here: `indexOf()` returns `-1` when item is not found. That's the entire logic — if it's already in result, skip it. If not, keep it.

---

```js
function removeDuplicates(arr) {
  return [...new Set(arr)];
}

removeDuplicates([1, 2, 2, 3, 4, 4, 5]);
// Set automatically removes duplicates → {1, 2, 3, 4, 5}
// spread converts Set back to array → [1, 2, 3, 4, 5]
```

That's it. One line.

**Why interviewers ask "without Set" first:**
They want to know if you understand the logic — loop, check, push. If you only know the Set shortcut, you can't solve it when they add constraints.

Know both. Lead with the manual solution in interviews, then mention Set as the cleaner alternative. That shows depth.

Session 4 done. Here's your weak spots log:

- `var` vs `let` in loops — knew output, not why
- `sort()` — got lucky on single digits, didn't know string comparison trap
- Return values of `push/unshift` vs `pop/shift` — still mixing these up
- Reference vs copy — `=` vs `[...arr]`
- `reverse()` mutation — knew output, missed the trap

These will come back in future sessions. Don't let them.


## Session 4 — Loops, Arrays, Array Methods


### 1. Core Concepts Cheat Sheet

- **`var` in loops** — function-scoped, one shared variable across all iterations
- **`let` in loops** — block-scoped, new variable created per iteration
- **Array mutation** — methods like `sort()`, `reverse()`, `push()`, `pop()`, `shift()`, `unshift()` modify the original array directly
- **Reference vs copy** — `arr2 = arr` points to same array; `[...arr]` creates a new one
- **Recursion** — a function that calls itself; used to handle unknown depth like nested arrays
- **`sort()` default** — sorts as strings, not numbers

---

### 2. Syntax & Code Patterns

```js
// let in loop — new i per iteration
for (let i = 0; i < 3; i++) { setTimeout(() => console.log(i), 0) } // 0 1 2

// correct numeric sort
arr.sort((a, b) => a - b); // ascending number sort

// shallow copy before mutating
const reversed = [...arr].reverse(); // original untouched

// rotate array — O(n)
const rotated = [...arr.slice(n), ...arr.slice(0, n)];

// remove duplicates — manual
if (result.indexOf(current) === -1) result.push(current);

// remove duplicates — clean
[...new Set(arr)];

// flatten nested array — recursion
if (Array.isArray(current)) flatten(current); else result.push(current);
```

---

### 3. Common Pitfalls & Mistakes

- **`sort()` without comparator** — `[10, 9, 2]` sorts as `[10, 2, 9]` because it compares strings, not numbers. Always pass `(a, b) => a - b`
- **`push/unshift` return length, not array** — `arr.push(4)` returns `4` (new length), not `[1,2,3,4]`
- **`=` doesn't copy arrays** — `arr2 = arr` means both variables point to same array. Mutating one mutates both

---

### 4. Key Terms to Remember

| Term | Meaning |
|------|---------|
| **Scope** | Where a variable is accessible — `var` = function, `let` = block |
| **Mutation** | Modifying the original array directly |
| **Shallow copy** | New array with same values — `[...arr]` |
| **Reference** | Two variables pointing to same array in memory |
| **Recursion** | Function calling itself until a base case is met |
| **indexOf** | Returns position of item, `-1` if not found |
| **Unwind** | Recursive calls returning back up one level at a time |
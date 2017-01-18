### General
Language is case-insensitive.  
All functions are static, `obj.doThing(x);` is equivalent to `Class.doThing(obj, x);` if `obj` is of type `Class`
### Conventions
`this` should be used as the first parameter of instance functions.  
Private class and property names should start with `_`
### Standard Library
* Objects
	* `obj.('property_name')` is equivalent to `obj.property_name`
* Range
	* `range(stop)` creates an iterator from 0 to stop (exclusive) with a step of 1.
	* `range(start, stop, step)` creates an iterator from start (inclusive) to stop (exclusive) with the specified step.

### Comments
`// This is a comment.`
### Line Ending
Lines end with `;`
### Assignment
`var` `op` `value` `;`  
Operators `=` `+=` `-=` `*=` `/=` `%=`
### Unary Operators
`op` `var` `;`  
Operators `!` `-`
### Binary Operators
`first` `op` `second` `;`  
Operators `+` `-` `*` `/` `%` `==` `!=` `>` `>=` `<` `<=` `and` `or`
### Blocks
Blocks start with `:` and end with `/` `block`
### Control Flow
```
if [condition 1]:
	// Code to run if [condition 1] is true.
else [condition 2]:
	// Code to run if [condition 1] is false and [condition 2] is true.
else:
	// Code to run if [condition 1] and [condition 2] are false.
/if
```
```
for i in [iterable]
	// Code to run for each i.
/for
```
```
while [condition]:
	// Code to run while condition is true.
/while
```
```
try:
	// Code to try.
catch:
	// Code to execute if an exception is thrown in the code to try.
finally:
	// Code to always run at the end.
/try
```
### Variables
Variables are defined with the `var` keyword and are scoped to their current block.
### Types
* int - 32-bit whole numbers.
* float - 64-bit floating-point numbers.
* bool - Boolean `true` or `false`
* string - Literal string, surrounded by `'` or `"`
* array - An array of any type, defined by 0 or more items surrounded by `[` `]`
* object - An instance of a class.

### Functions
```
fn(x, y):
/fn
```
### Getters and Setters
Getters start with `get_` and setters with `set_`
```
get_name = fn(this):
	return this._name;
/fn
set_name = fn(this, name):
	this._name = name;
/fn
```
With the above code, `obj.name` would invoke the getter or setter as applicable.
### Classes
```
MyClass:							// Creates a class MyClass
	SubClass:						// Creates a class MyClass.SubClass
		magicNumber = 42;			// Creates a static property MyClass.SubClass.magicNumber
		doThing = fn(x, y):			// Creates a static function MyClass.SubClass.doThing
			return x * 2 + y;		// Returns the result of x * 2 + y
		/fn
		new = fn(this):				// new is a constructor
			this.first = "First";	// Create and set the new object's first and last properties.
			this.last = "Last";
		/fn
		get_name = fn(this):		// Creates a getter for 'name'
			return this.first + ' ' + this.last;
		/fn
	/SubClass
/MyClass
```

Assignment is performed with **:**  
**=** is exclusively the comparison operator.  
Blocks end with **/[name]**  
**//** Comments
```
MyClass:			// A class
	SubClass:		// A subclass, accessed as MyClass.SubClass
	/Subclass
/MyClass
```
```
MyClass:
	magicNumber: 12;				// All class items are static.

	new(n):							// This is a constructor, the first parameter is the new object.
		n.firstName: "First";		// These are instance properties.
		n.lastName: "Last";			// Assignment creates the property.
	/new

	add(first, second) res:			// Input parameters and an optional output parameter.
		res: first + second;		// The output parameter is automatically created on function call.
	/add
/myClass
```
```
Person:
	addToName(person) person:		// If an input and output parameter share the same name,
		person.name += " person";	// they will both point to the same input object.
	/addToName
/Person

p: Person();
p.name = "First Last";
p.addToName();				// Now "First Last person"
p.addToName().addToName();	// Now "First Last person person person"
```
```
MyClass:
	new(n, val):
		n.val = val;
	/new

	add(first, second) res:
		res: first.val + second.val;
	/add
/MyClass

first: MyClass.new(1);
second: MyClass.new(2);

res: MyClass.add(first, second);	// These are equivalent, first.add(second) is just shorthand
res2: first.add(second);			// with the variable before the . as the first parameter.
```
```
for x in list:
/for

for i in 0 to 10:
/for

for i in 0 to 10 step 4:
/for

while x < 3:
/while

if x < 3:
	print("< 3");
else if x = 3:
	print("= 3");
else:
	print("> 3");
/if
```

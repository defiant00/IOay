[type].[name]

Assignment with **:**

Blocks end with **;[type]**

Special objects **i** and **o** for input and output

Unnamed arguments:
```
fn.add:
	o: i.0 + i.1
;fn

result: add 1 2
```

Named arguments:
```
fn.createGreeting:
	o: "Hello " + i.first + " " + i.last
;fn

greeting: createGreeting first:"John" last:"Doe"
```

Multiple outputs:
```
fn.div:
	o.result: i.0 / i.1
	o.mod: i.0 % i.1
;fn

res: div 7 3
print "Result: " + res.result + ", remainder: " + res.mod
```

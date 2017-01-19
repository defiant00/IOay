### Comment Code
### Conditionally Execute Code
### Group Related Code and Properties
### Reuse Code
#### 1 `bad`
All functions have `i` input and `o` output variables. Instances have `t` this as well.  
Functions are defined with `{` `}`

```
getUserInput = {
	o = readLine();
}

split = {
	o = i.{o = i; o.splitChar = ' ';}.split;
}

getUserInput.split.[MyClass.someFunc].{i.first.print;};
```
Pretty hard to read, and setting extra parameters like `splitChar` are clunky.  
Being able to easily create glue functions with `{` `}` is pretty neat, and could also be used for flow control.

### Do Math and Other Basic Operations
### Execute While a Condition
### Use a Value Multiple Times
### Execute a Number of Times
### Execute on Each Item of a List

```javascript
1.	combine: fn(first, last)
		return first + ' ' + last
	/fn
2.	combine: (first, last) => first + ' ' + last;
3.	combine: fn(first, last) return first + ' ' + last; /fn
4.	combine: {first, last: return first + ' ' + last;};
4.	combine: {first, last:
		return first + ' ' + last;
	};
5.	combine: (first, last) return first + ' ' + last; /fn
5.	combine: (first, last)
		return first + ' ' + last;
	/fn


1. thing = genThing(greet(combine('first', 'last')), 'body', from('person'));

2. thing: combine('first', 'last').greet.genThing('body', from('person'));
2. thing: genThing(greet(combine('first', 'last')), 'body', from('person'));

3. thing: genThing (greet (combine 'first' 'last')) 'body' (from 'person');
4. thing: greet (combine 'first' 'last') > genThing 'body' (from 'person');
5. thing: genThing greet combine 'first' 'last' 'body' from 'person';
6. thing: genThing greet combine 'first', 'second', 'body', from 'person';
7. thing: genThing(greeting: greet(name: combine(first: 'first', last: 'last')), body: 'body', from: from(name: 'person'));

```

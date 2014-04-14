[![Build Status](https://travis-ci.org/TheHydroImpulse/set.svg)](https://travis-ci.org/TheHydroImpulse/set)

# Set

A small set wrapper around Redis. The API Redis provides is pretty ugly, so this wraps it with promises.


## Install

```bash
npm install redis-set
```

Use it:

```js
var Set = require('redis-set');
```

## Getting Started

Create a new instance:

```js
var set = Set.create('users');
```

Which will create a new default Redis client. You can specify your own by passing it:

```js
var set = Set.create('users', redis.createClient());
```

### Adding Elements

```js
set.add('foobar').then(function() {
  // ...
});
```

### Listing Elements

```js
set.list().then(function(list) {
  // ...
});
```

`list` (the argument) is an array.

### Removing Elements

```js
set.remove('foobar').then(function() {
  // ...
});
```

### Testing Membership

```js
set.member('foobar').then(function(isMember) {
  // isMember === true;
});
```

---

You never have to test the membership before calling `.add()`. A set within Redis is a unique collection. Thus, Redis will worry about maintaining that uniqueness.

## Testing

```bash
mocha
```

## License

The MIT License (MIT)

Copyright (c) 2014 Daniel Fagnan <dnfagnan@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
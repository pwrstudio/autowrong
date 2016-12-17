
## Synopsis

Autowrong introduce keyboard typos into a string.  

## Install

```
npm install autowrong
```

## Use

```
const autowrong = require('autowrong')
const string = 'The quick brown fox jumps over the lazy dog'
// Probability of different kinds of typos occuring:
// adjacent: accidentally hitting adjacent qwerty key
// double: hitting the same key twice
// order: hitting keys in wrong order
const options = {adjacent: 0.05, double: 0.05, order: 0.05}
console.log(autowrong(string, options))
```

## License

MIT

[![Version](https://img.shields.io/npm/v/imumo.svg)](https://www.npmjs.com/package/imumo)
[![Build Status](https://travis-ci.org/joon-io/imumo.svg?branch=master)](https://travis-ci.org/joon-io/imumo)
[![MIT license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://github.com/joon-io/imumo/blob/master/LICENSE)
[![dependencies](https://david-dm.org/joon-io/imumo.svg)](https://david-dm.org/joon-io/imumo)
[![devDependency Status](https://david-dm.org/joon-io/imumo/dev-status.svg)](https://david-dm.org/joon-io/imumo#info=devDependencies)
[![airbnb code style](https://img.shields.io/badge/code%20style-airbnb-fd5c63.svg)](https://github.com/airbnb/javascript)

---
Extends [ImmutableJS Records](http://facebook.github.io/immutable-js/docs/#/Record) enabling class inheritance

## Dependencies
- [ImmutableJS](https://github.com/facebook/immutable-js)

## Getting Started
```shell
npm install imumo --save
```

## Usage
```javascript
import { ImmutableModel } from  'imumo';

class BaseModel extends ImmutableModel {
  // Define getters to expose easy access to properties
  get value() {
    return this.get('value', null);
  }
  isComplete() {
    return true;
  }
  isValid() {
    return true;
  }
}

class TextModel extends BaseModel {
  // create synthetic properties
  get length() {
    return this.value.length;
  }
  // override default values
  get value() {
    return this.get('value', '');
  }
  isComplete() {
    return this.value.length !== 0;
  }
  isValid() {
    return typeof this.value === 'string';
  }
  // 'Mutable' methods should all return a new immutable instance
  toLower() {
    return this.set('value', this.value.toLocaleLowerCase());
  }
}

class EmailModel extends TextModel {
  isValid() {
    return super.isValid() && /^[^@]+@[^\.]+\.(?:com|edu|biz)$/.test(this.value);
  }
}

class NumberModel extends BaseModel {
  get units() {
    return this.get('units', null);
  }
  get value() {
    return this.get('value', 0);
  }
  isValid() {
    return typeof this.value === "number";
  }
  add(val) {
    return this.set('value', this.value + val);
  }
  toString() {
    return this.units ? `${this.value} ${this.units}` : this.value;
  }
}



const bobsEmail = new EmailModel({value: 'bob@gmail.com'});
console.log(bobsEmail.isValid()); // true
console.log(bobsEmail.set('value', 'bobATgmailDOTcom').isValid()); // false
console.log(bobsEmail.isValid()); // true -- bobsEmail has not been mutated

const myBank = new NumberModel({units: 'dollars'});
console.log(myBank.toString()); // 0 dollars
const myBankAfterDreamOfWinningLotto = myBank.add(100000000);
console.log(myBankAfterDreamOfWinningLotto.toString()); // 100000000 dollars
console.log(myBank.toString()); // 0 dollars -- myBank was not mutated :(

```

## Performance
Since the models are immutable, we can easily memoize the last return value of argument-less methods. This lets you write expensive getters without having to worry too much about the performance impact. This also allows you to use strict equality checking against derived data (Pure render all the models).
```javascript
import { List } from 'immutable';
import { ImmutableModel } from 'imumo';

class InboxModel extends ImmutableModel {
  didCreateInstance() {
    this.getUnreadEmails = this.memoize(() => this.getUnreadEmails());
  }
  get emails() { return this.get('emails', new List()); }
  getUnreadEmails() {
    return this.emails.filter(email => !email.read);
  }
}

const emailModel = new emailModel(List([...]));
console.log(emailModel.getUnreadEmails() === emailModel.getUnreadEmails()); // true
```

## Methods ImmutableModel
Signatures using flow notation `[functionName]([arg] : [argType]) : [returnType]`. Note that `T` denotes either the same instance or a new instance of the same type. ImmutableModels create new instances with the same type whenever a mutation occurs.
| signature | description |
| --------- | ----------- |
| `didCreateInstance()` | Lifecycle method called after new instance is made (due to 'mutation') |
| `toString(): String` | Returns string representation of model |
| `get(key: String, notSetVal: any): any` | Gets value by key if exists, otherwise returns `notSetVal` |
| `clear(): T` | Returns self or new `T` without any values in backing Map |
| `set(key: String, val: any): T` | Returns self or new `T` with key set to value |
| `remove(key: String): T` | Returns self or new `T` with value at key removed |
| `removeIn(keyPath: Array<any>): T` | Returns self or new `T` with value at keypath removed |
| `merge()` | [see Map.merge()](http://facebook.github.io/immutable-js/docs/#/Map/merge) |
| `mergeWith()` | [see Map.mergeWith()](http://facebook.github.io/immutable-js/docs/#/Map/mergeWith) |
| `mergeIn()` | [see Map.mergeIn()](http://facebook.github.io/immutable-js/docs/#/Map/mergeIn) |
| `mergeDeep()` | [see Map.mergeDeep()](http://facebook.github.io/immutable-js/docs/#/Map/mergeDeep) |
| `mergeDeepWith()` | [see Map.mergeDeepWith()](http://facebook.github.io/immutable-js/docs/#/Map/mergeDeepWith) |
| `mergeDeepIn()` | [see Map.mergeDeepIn()](http://facebook.github.io/immutable-js/docs/#/Map/mergeDeepIn) |
| `setIn()` | [see Map.setIn()](http://facebook.github.io/immutable-js/docs/#/Map/setIn) |
| `update()` | [see Map.update()](http://facebook.github.io/immutable-js/docs/#/Map/update) |
| `updateIn()` | [see Map.updateIn()](http://facebook.github.io/immutable-js/docs/#/Map/updateIn) |
| `withMutations()` | [see Map.withMutations()](http://facebook.github.io/immutable-js/docs/#/Map/withMutations) |
| `asMutable()` | [see Map.asMutable()](http://facebook.github.io/immutable-js/docs/#/Map/asMutable) |
| `asImmutable()` | [see Map.asImmutable()](http://facebook.github.io/immutable-js/docs/#/Map/asImmutable) |

Many methods are duplicates/copies of [Immutable Map methods](http://facebook.github.io/immutable-js/docs/#/Map), which have more thourough documentation and examples.

## Credits

- [ImmutableJS](https://github.com/facebook/immutable-js) for underlying data structures
- [npm-starter](https://github.com/deiucanta/npm-starter)
- [Airbnb](http://airbnb.com) for the work they've put into the javascript style guide and into the ESlint package.

## License

MIT @ [Joe Delgado](https://twitter.com/soy_chupacabra)

import { expect } from 'chai';
import { ImmutableModel } from '../src/index.js';
import { NumericModel, Unit } from './mock/NumericModel';

const { describe, it } = global;

describe('ImmutableModel:mutation', () => {

  it('maintains methods on mutation', () => {
    class MyClass extends ImmutableModel {
      get value() {
        return this.get('value', null);
      }

      getReversedValue() {
        return this.value.split('').reverse().join('');
      }
    }

    const myClassInstance = new MyClass({value: 'hello'});
    const myClassCopy = myClassInstance.set('value', 'world');

    expect(myClassInstance.getReversedValue()).to.equal('olleh');
    expect(myClassCopy.getReversedValue()).to.equal('dlrow');
  });

  it('creates new instances with same parent class on mutation', () => {
    class MyModel extends ImmutableModel {}
    class MySubModel extends MyModel {
      get value() { return this.get('value', null); }
    }

    const myInstance = new MySubModel({value: 1});
    const myInstanceCopy = myInstance.set('value', 2);

    const myInstancePrototype = Object.getPrototypeOf(myInstance);
    const myInstanceCopyPrototype = Object.getPrototypeOf(myInstanceCopy);

    expect(myInstancePrototype).to.equal(myInstanceCopyPrototype);

    expect(myInstance.constructor).to.equal(myInstanceCopy.constructor);

  });

  it('maintains types after mutation', () => {
    class MyModel extends ImmutableModel {}
    class MySubModel extends MyModel {
      get value() { return this.get('value', null); }
    }

    const myInstance = new MySubModel({value: 1});
    const myInstanceCopy = myInstance.set('value', 2);

    expect(myInstance).to.be.an.instanceof(MySubModel);
    expect(myInstance).to.be.an.instanceof(MyModel);

    expect(myInstanceCopy).to.be.an.instanceof(MySubModel);
    expect(myInstanceCopy).to.be.an.instanceof(MyModel);
  });
});

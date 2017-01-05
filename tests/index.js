import { expect } from 'chai';
import { ImmutableModel } from '../src/index.js';
import { NumericModel, Unit } from './mock/NumericModel';

const { describe, it } = global;

describe('ImmutableModel', () => {
  it('is equal when not mutated', () => {
    const myRecord = new NumericModel({ value: 5 });

    expect(myRecord).to.equal(myRecord.set('value', 5));
    expect(myRecord).to.equal(myRecord.setVaule(5));
  });

  it('is not equal when mutated', () => {
    const myRecord = new NumericModel({ value: 5 });

    expect(myRecord).to.not.equal(myRecord.set('value', 3));
    expect(myRecord).to.not.equal(myRecord.setVaule(3));
  });

  it('allows read on defaulted values', () => {
    const myRecord = new NumericModel();

    expect(myRecord.value).to.equal(null);
    expect(myRecord.units).to.equal(null);
    expect(myRecord.isRequired).to.equal(false);
    expect(myRecord.name).to.equal('');
    expect(myRecord.id).to.equal(null);
  });

  it('allows use of class methods', () => {
    const mile = new Unit('mile', 'miles');
    const myRecord = new NumericModel({ value: 5, units: mile });

    expect(myRecord.toString()).to.equal('5 miles');
    expect(myRecord.setVaule(1).toString()).to.equal('1 mile');
    expect(myRecord.setVaule(0.2).toString()).to.equal('0.2 miles');
  });

  it('allows use of inherited methods', () => {
    const myRecord = new NumericModel({ value: 5 });

    expect(myRecord.getValue()).to.equal(5);
    expect(myRecord.setVaule(1).getValue()).to.equal(1);
    expect(myRecord.setVaule(0.2).getValue()).to.equal(0.2);
  });

  it('allows subclasses to override default values', () => {
    class BaseClass extends ImmutableModel {
      get overrideValue() {
        return this.get('overrideValue', 'overrideValue');
      }
      get baseValue() {
        return this.get('baseValue', 'baseValue');
      }
    }

    class SubClass extends BaseClass {
      get overrideValue() {
        return this.get('overrideValue', 'subclassOverride');
      }
    }

    const base = new BaseClass();
    const sub = new SubClass();

    expect(base.overrideValue).to.equal('overrideValue');
    expect(base.baseValue).to.equal('baseValue');

    expect(sub.overrideValue).to.equal('subclassOverride');
    expect(sub.baseValue).to.equal('baseValue');
  });

  it('supports empty defaultProperties', () => {
    class BaseClass extends ImmutableModel {
      get base() {
        return this.get('base', 'base');
      }
    }

    class SubClass1 extends BaseClass {

    }

    class SubClass2 extends SubClass1 {
      get sub() {
        return this.get('sub', 'sub');
      }
    }

    const base = new BaseClass();
    const sub1 = new SubClass1();
    const sub2 = new SubClass2();

    expect(base.base).to.equal('base');
    expect(sub1.base).to.equal('base');
    expect(sub2.base).to.equal('base');
    expect(sub2.sub).to.equal('sub');
  });
});

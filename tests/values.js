import { expect } from 'chai';
import { ImmutableModel } from '../src/index.js';
import { NumericModel } from './mock/NumericModel';

const { describe, it } = global;

describe('ImmutableModel:values', () => {
  it('allows read on defaulted values', () => {
    const myRecord = new NumericModel();

    expect(myRecord.value).to.equal(null);
    expect(myRecord.units).to.equal(null);
    expect(myRecord.isRequired).to.equal(false);
    expect(myRecord.name).to.equal('');
    expect(myRecord.id).to.equal(null);
  });

  it('allows subclasses to access inherited values', () => {
    class BaseClass extends ImmutableModel {
      get value() { return this.get('value', 1); }
    }

    class SubClass extends BaseClass {}

    const myInstance = new SubClass();

    expect(myInstance.value).to.equal(1);

    expect(myInstance.set('value', 3).value).to.equal(3);
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
});

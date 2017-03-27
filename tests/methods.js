import { expect } from 'chai';
import { ImmutableModel } from '../src/index.js';

const { describe, it } = global;

describe('ImmutableModel:methods', () => {
  class TestModel extends ImmutableModel {
    get value() { return this.get('value', 0); }
  }
  const testInstance = new TestModel();

  it('implements toString', () => {
    const target = new TestModel({ value: 2 });
    expect(target.toString()).to.equal('TestModel { "value": 2 }');
  });

  it('implements toJS', () => {
    const target = new TestModel({ value: 2, otherValue: 5 }).toJS();
    expect(target.value).to.equal(2);
    expect(target.otherValue).to.equal(5);
  });

  it('implements toJSON', () => {
    const target = new TestModel({ value: 2, otherValue: 5 }).toJSON();
    expect(target.value).to.equal(2);
    expect(target.otherValue).to.equal(5);
  });

  it('implements equals', () => {
    const target = new TestModel({ value: 2, otherValue: 5 });
    const targetEquals = new TestModel({ value: 2, otherValue: 5 });
    const targetNoEquals = new TestModel({ value: 2, otherValue: 6 });
    expect(target === targetEquals).to.be.false;
    expect(target === targetNoEquals).to.be.false;
    expect(target.equals(targetEquals)).to.be.true;
    expect(target.equals(targetNoEquals)).to.be.false;

    class OtherModel extends TestModel {}
    const instanceA = new TestModel({ value: 1 });
    const instanceB = new OtherModel({ value: 1 });
    expect(instanceA.equals(instanceB)).to.be.false;
  });

  it('implements hashCode', () => {
    const target = new TestModel({ value: 2, otherValue: 5 });
    expect(target.hashCode()).to.equal(399553346);
  });

  it('implements has', () => {
    const testInstanceWithValue = testInstance.set('value', 123);

    expect(testInstance.has('value')).to.be.false;
    expect(testInstanceWithValue.has('value')).to.be.true;
  });

  it('implements get', () => {
    const testInstanceWithValue = testInstance.set('value', 123);

    expect(testInstance.get('value')).to.be.undefined;
    expect(testInstance.get('value', 'default')).to.equal('default');
    expect(testInstance.get('someOtherValue')).to.be.undefined;
    expect(testInstanceWithValue.get('value')).to.equal(123);
  });

  it('implements clear', () => {
    const testInstanceWithValue = testInstance.set('value', 123);
    const cleared = testInstanceWithValue.clear();

    expect(testInstanceWithValue.get('value')).to.equal(123);
    expect(cleared.get('value')).to.be.undefined;
    expect(testInstanceWithValue.value).to.equal(123);
    expect(cleared.value).to.equal(0);
  });

  it('implements set', () => {
    expect(testInstance.set('value', 'newVal').value).to.equal('newVal');
  });

  it('implements remove', () => {
    const testInstanceWithValue = testInstance.set('value', 123);
    const cleared = testInstanceWithValue.remove('value');

    expect(testInstanceWithValue.get('value')).to.equal(123);
    expect(cleared.get('value')).to.be.undefined;
    expect(testInstanceWithValue.value).to.equal(123);
    expect(cleared.value).to.equal(0);
  });
});

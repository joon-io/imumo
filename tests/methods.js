import { expect } from 'chai';
import { ImmutableModel } from '../src/index.js';
import { NumericModel, Unit } from './mock/NumericModel';

const { describe, it } = global;

describe('ImmutableModel:methods', () => {

  class TestModel extends ImmutableModel {
    get value() { return this.get('value', 0); }
  }
  const testInstance = new TestModel();

  it('implements toString', () => {
    expect(testInstance.toString()).to.equal('TestModel');
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

  it('implements wasAltered', () => {

  });

  it('implements __ensureOwner', () => {

  });
});

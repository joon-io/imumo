import { expect } from 'chai';
import { NumericModel } from './mock/NumericModel';

const { describe, it } = global;

describe('ImmutableModel:equality', () => {
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
});

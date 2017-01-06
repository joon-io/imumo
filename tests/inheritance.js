import { expect } from 'chai';
import { NumericModel, Unit } from './mock/NumericModel';

const { describe, it } = global;

describe('ImmutableModel:inheritance', () => {
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
});

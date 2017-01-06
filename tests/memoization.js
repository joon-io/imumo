import { expect } from 'chai';

import MemoizedModel from './mock/MemoizedModel';

const { describe, it } = global;

describe('memoized methods', () => {
  it('return the same value each time', () => {
    const mm = new MemoizedModel({ items: [1, 5, 6, 3, 8] });

    expect(mm.getMemoizedFilteredList()).to.equal(mm.getMemoizedFilteredList());
  });

  it('run non-memoized methods every time', () => {
    const mm = new MemoizedModel({ items: [1, 5, 6, 3, 8] });

    expect(mm.getFilteredList()).to.not.equal(mm.getFilteredList());
    expect(mm.getFilteredList().equals(mm.getFilteredList())).to.be.true;
  });

  it('do not share memoization with \'mutated\' copies', () => {
    const mm = new MemoizedModel({ items: [1, 5, 6, 3, 8] });
    const updatedMM = mm.update('items', items => items.push(0));

    expect(updatedMM.getFilteredList()).to.not.equal(updatedMM.getFilteredList());
    expect(updatedMM.getMemoizedFilteredList()).to.not.equal(mm.getMemoizedFilteredList());

    expect(updatedMM.getMemoizedFilteredList().equals(mm.getMemoizedFilteredList())).to.be.true;
  });

  it('are still memoized after model \'mutation\'', () => {
    const mm = new MemoizedModel({ items: [1, 5, 6, 3, 8] });
    const updatedMM = mm.update('items', items => items.push(0));

    expect(updatedMM.getMemoizedFilteredList()).to.equal(updatedMM.getMemoizedFilteredList());
  });
});

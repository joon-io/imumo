import { List } from 'immutable';

import { ImmutableModel, memoize } from '../../src/index.js';

export default class MemoizedMethod extends ImmutableModel {
  constructor({ items, ...rest }) {
    super({ items: new List(items), ...rest });
  }
  didCreateInstance() {
    this.getMemoizedFilteredList = memoize(this.getMemoizedFilteredList.bind(this));
  }

  get items() { return this.get('items', new List()); }

  getFilteredList() {
    return this.items.filter(item => item > 3);
  }
  getMemoizedFilteredList() {
    return this.getFilteredList();
  }
}

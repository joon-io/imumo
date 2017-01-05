import { Collection, Record, Map } from 'immutable';

import { makeModel } from './util';

// eslint-disable-next-line import/prefer-default-export
export class ImmutableModel extends Collection.Keyed {
  constructor(values) {
    super();
    // eslint-disable-next-line no-underscore-dangle, new-cap
    this._map = Map(values);
  }

  get(key, notSetVal) {
    return this._map.get(key, notSetVal);
  }
  clear() {
    // TODO
  }
  set(key, val) {
    const newMap = this._map.set(key, val);
    if (this.__ownerID || newMap === this._map) {
      return this;
    }
    return makeModel(this, newMap);
  }
  remove(key) {
    const newMap = this._map.remove(key);
    if (this.__ownerID || newMap === this._map) {
      return this;
    }
    return makeModel(this, newMap);
  }
  wasAltered() {
    return this._map.wasAltered();
  }
}

const ImmutableModelPrototype = ImmutableModel.prototype;
const MapPrototype = Map.prototype;
const RecordPrototype = Record.prototype;
const DELETE = 'delete';
ImmutableModelPrototype.toString = RecordPrototype.toString;
ImmutableModelPrototype.clear = RecordPrototype.clear;
ImmutableModelPrototype.set = RecordPrototype.set;
ImmutableModelPrototype.remove = RecordPrototype.remove;
ImmutableModelPrototype.wasAltered = RecordPrototype.wasAltered;
/* eslint-disable no-underscore-dangle */
ImmutableModelPrototype.__iterator = RecordPrototype.__iterator;
ImmutableModelPrototype.__iterate = RecordPrototype.__iterate;
ImmutableModelPrototype.__ensureOwner = RecordPrototype.__ensureOwner;
/* eslint-enable no-underscore-dangle */

ImmutableModelPrototype[DELETE] = ImmutableModelPrototype.remove;
ImmutableModelPrototype.deleteIn = undefined;
ImmutableModelPrototype.removeIn = MapPrototype.removeIn;
ImmutableModelPrototype.merge = MapPrototype.merge;
ImmutableModelPrototype.mergeWith = MapPrototype.mergeWith;
ImmutableModelPrototype.mergeIn = MapPrototype.mergeIn;
ImmutableModelPrototype.mergeDeep = MapPrototype.mergeDeep;
ImmutableModelPrototype.mergeDeepWith = MapPrototype.mergeDeepWith;
ImmutableModelPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
ImmutableModelPrototype.setIn = MapPrototype.setIn;
ImmutableModelPrototype.update = MapPrototype.update;
ImmutableModelPrototype.updateIn = MapPrototype.updateIn;
ImmutableModelPrototype.withMutations = MapPrototype.withMutations;
ImmutableModelPrototype.asMutable = MapPrototype.asMutable;
ImmutableModelPrototype.asImmutable = MapPrototype.asImmutable;

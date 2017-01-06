import { Collection, Map } from 'immutable';

import { makeModel } from './util';

// eslint-disable-next-line import/prefer-default-export
export default class ImmutableModel extends Collection.Keyed {
  constructor(values) {
    super();
    // eslint-disable-next-line no-underscore-dangle, new-cap
    this._map = Map(values);
    this.didCreateInstance();
  }
  didCreateInstance() { }
  toString() {
    return this.constructor.name;
  }
  get(key, notSetVal) {
    return this._map.get(key, notSetVal);
  }
  clear() {
    const newMap = this._map.clear();
    if (this.__ownerID || newMap === this._map) {
      return this;
    }
    return makeModel(this, newMap);
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
  __ensureOwner(ownerID) {
    if (ownerID === this.__ownerID) {
      return this;
    }
    const newMap = this._map.__ensureOwner(ownerID);
    if (!ownerID) {
      this.__ownerID = ownerID;
      this._map = newMap;
      return this;
    }
    return makeModel(this, newMap, ownerID);
  }
}

const ImmutableModelPrototype = ImmutableModel.prototype;
const MapPrototype = Map.prototype;
const DELETE = 'delete';

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

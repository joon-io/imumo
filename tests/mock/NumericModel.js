import { ImmutableModel } from '../../src/index.js';

import { PrimitiveModel } from './PrimitiveModel';

export class NumericModel extends PrimitiveModel {
  get units() {
    return this.get('units', null);
  }

  isPlural() {
    return this.value !== 1;
  }
  isSingular() {
    return !this.isPlural();
  }
  toString() {
    let str = '';
    if (this.units !== null) {
      const unitString = this.isPlural() ? this.units.plural : this.units.singular;
      str = `${this.value} ${unitString}`;
    } else {
      str = this.value;
    }
    return str;
  }
}

export class Unit extends ImmutableModel {
  constructor(singular, plural) {
    super({ singular, plural });
  }

  get singular() {
    return this.get('singular', 'unit');
  }
  get plural() {
    return this.get('plural', 'units');
  }
}

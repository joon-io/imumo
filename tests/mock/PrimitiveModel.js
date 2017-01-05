import { BaseModel } from './BaseModel';

export class PrimitiveModel extends BaseModel {
  get value() {
    return this.get('value', null);
  }

  getValue() {
    return this.value;
  }
  setVaule(newValue) {
    return this.set('value', newValue);
  }
}

import { ImmutableModel } from '../../src/index.js';
import { abstract } from './util';

export class BaseModel extends ImmutableModel {
  get isRequired() {
    return this.get('isRequired', false);
  }
  get name() {
    return this.get('name', '');
  }
  get id() {
    return this.get('id', null);
  }

  isValid() {
    return abstract();
  }
  isComplete() {
    return abstract();
  }
}

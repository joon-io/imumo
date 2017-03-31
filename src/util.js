export function makeModel(likeModel, map, ownerId) {
  const newModel = Object.create(Object.getPrototypeOf(likeModel));
  newModel._map = map;
  newModel.__ownerID = ownerId;
  newModel.didCreateInstance();
  return newModel;
}

export function every(arr, predicate) {
  for (let i = 0; i < arr.length; i++) {
    if (!predicate(arr[i], i, arr)) {
      return false;
    }
  }
  return true;
}

export function toEnd(arr, item) {
 return arr.filter(i => i !== item).concat(item);
}

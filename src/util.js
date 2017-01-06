export function makeModel(likeModel, map, ownerId) {
  const newModel = Object.create(Object.getPrototypeOf(likeModel));
  newModel._map = map;
  newModel.__ownerID = ownerId;
  newModel.didCreateInstance();
  return newModel;
}

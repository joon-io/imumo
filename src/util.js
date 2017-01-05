export function makeModel(likeModel, map, ownerId) {
  const newModel = Object.create(Object.getPrototypeOf(likeModel));
  newModel._map = map;
  newModel.__ownerID = ownerID;
  return newModel;
}

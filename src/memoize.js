import {every, toEnd} from './util';

export default function memoize(method, size=-1) {
  return function memoizedFn(...args) {
    memoizedFn.__memoized = memoizedFn.__memoized || [];
    for (let list of memoizedFn.__memoized) {
      if (list.length === args.length &&
        every(list, (item, idx) => item === args[idx])) {
        // Move to end if size exists (evict LRU)
        if (size !== -1) {
          memoizedFn.__memoized = toEnd(memoizedFn.__memoized, list);
        }
        return list.__result;
      }
    }
    const entry = [...args];
    entry.__result = method(...args);
    memoizedFn.__memoized.push(entry);
    if (size !== -1 && size > memoizedFn.__memoized.length) {
      memoizedFn.__memoized.shift();
    }
    return entry.__result;
  };
}
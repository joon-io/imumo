export default function memoize(method) {
  return function memoizedFn() {
    return memoizedFn.__memoized || (memoizedFn.__memoized = method());
  }
}

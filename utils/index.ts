import { isArrayLikeObject } from "lodash";

export function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

type CoordinatesCollection = number[] | number[][] | number[][][]
export function treeIteratee(collection: any[]) : CoordinatesCollection{
  if (isArrayLikeObject(collection) && typeof collection[0]  === 'number') {
    return [collection[1], collection[0]] as CoordinatesCollection;
  }
  return collection.map(treeIteratee) as CoordinatesCollection;
}
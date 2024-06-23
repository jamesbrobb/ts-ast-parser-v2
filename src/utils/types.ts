

export type EnumToMappedType<E> = {
  [K in (keyof E) as E[K] & PropertyKey]: K
}
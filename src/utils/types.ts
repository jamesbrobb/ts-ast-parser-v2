
export type EnumToMappedType<E> = {
  [K in (keyof E) as E[K] & PropertyKey]: K
}

export type ExcludePrivateProps<T> = Omit<T, `_${string}`>


export type ExtendsType<T, U> = U extends T ? U : never

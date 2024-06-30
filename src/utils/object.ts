
export type WalkCallbackFn = (key: string, value: any) => void;

export function walkObjectTree(obj: any, callback: WalkCallbackFn, key: string) {
  for (let ky in obj) {
    callback(key, obj[ky]);
    if (typeof obj[ky] === 'object' && obj[ky] !== null) {
      walkObjectTree(obj[ky], callback, key);
    }
  }
}
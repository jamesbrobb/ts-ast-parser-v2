
export function walkObjectTree(obj: any, callback: Function, key: string) {
  for (let ky in obj) {
    if(ky !== key) {
      continue;
    }
    callback(obj[ky]);
    if (typeof obj[ky] === 'object' && obj[ky] !== null) {
      walkObjectTree(obj[ky], callback, key);
    }
  }
}
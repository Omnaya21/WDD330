export default class LocalStorageHelper {
  load(key) {
   const storedVal = localStorage.getItem(key) || '[]';
   return JSON.parse(storedVal);
 }
 
  save(key, val) {
   const strVal = JSON.stringify(val);
   localStorage.setItem(key, strVal);
 }
}

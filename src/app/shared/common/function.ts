/**
 * Get data from localStorage.
 * @param key name of object that you have to fetch from localStorage.
 * @returns value or null.
 */
export function getLocalStorage(key: string) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

/**
 * Set data into LocalStorage.
 * @param key name of object that you want to set.
 * @param value value that you have to set in LocalStorage.
 */
export function setLocalStorage(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

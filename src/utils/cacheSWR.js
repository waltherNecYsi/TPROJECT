const cacheGet = (key) => {
  const cachedData = localStorage.getItem(key);
  if (cachedData) {
    return JSON.parse(cachedData);
  }
  return null;
};

const cacheSet = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const cacheDelete = (key) => {
  localStorage.removeItem(key);
};

const cacheKeys = () => {
  const keys = [];
  for (let i = 0; i < localStorage.length; i += 1) {
    keys.push(localStorage.key(i));
  }
  return keys;
};

export { cacheGet, cacheSet, cacheDelete, cacheKeys };

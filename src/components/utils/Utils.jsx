export const getOptionByVarient = (myVarient) => ({
  variant: myVarient,
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "center",
  },
});

export const addItemToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const deleteItemFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};

export const updateItemInLocalStorage = (key, data) => {
  const previousValue = localStorage.getItem(key);
  if (previousValue) {
    localStorage.removeItem(key);
  }
  localStorage.setItem(key, JSON.stringify(data));
};

export const getItemFromLocalStorage = (key) => {
  const storedValue = localStorage.getItem(key);
  if (storedValue) {
    return JSON.parse(storedValue);
  }
  return false;
};

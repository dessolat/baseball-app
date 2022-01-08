export const getSearchParam = param => new URL(window.location).searchParams.get(param);

export const setSearchParam = (param, value) => {
  const url = new URL(window.location);
  url.searchParams.set(param, value);
  window.history.pushState({}, '', url);
};
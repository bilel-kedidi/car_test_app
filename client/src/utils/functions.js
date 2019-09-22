export const capitalize = string =>
  typeof string === 'string'
    ? string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
    : string;

export const fetchData = async (url, options) => {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    },
    ...options
  });
  const data = await response.json();
  return data;
};

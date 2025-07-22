export const useSearchFilter = (data = [], search = "", keys = []) => {
  if (!search) return data;

  const filtered = data
    .map((item) => {
      const relevance = keys.reduce((acc, key) => {
        const value = key
          .split(".")
          .reduce((obj, k) => (obj ? obj[k] : ""), item);
        return value?.toString().toLowerCase().includes(search.toLowerCase())
          ? acc + 1
          : acc;
      }, 0);
      return { item, relevance };
    })
    .filter((entry) => entry.relevance > 0)
    .sort((a, b) => b.relevance - a.relevance) // ⭐ More matches come first
    .map((entry) => entry.item);

  return filtered;
};

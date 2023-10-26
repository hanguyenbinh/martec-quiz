export const isChanged = (source: any, input: any) => {
  let isChanged = false;
  if (!input) return false;
  if (!source) return true;
  Object.keys(source).forEach((key) => {
    if (input[key] && input[key] !== source[key]) {
      isChanged = true;
      return;
    }
  });
  return isChanged;
};

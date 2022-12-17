export const getArgs = (data) => {
  const argItems = data.toString().match(/\s\S*".+?"\S*|\s\S+/g);
  return argItems?.map((item) => { return item.trim().replaceAll('"', '') })
}
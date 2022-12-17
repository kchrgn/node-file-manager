export const getArgs = (data) => {
  const argItems = data.toString().match(/\s\S*".+?"\S*|\s\S+/g);
  const args = argItems?.map((item) => { return item.trim().replaceAll('"', '') })
  console.log(args);
  return args
}
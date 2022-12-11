export const getArgs = (data) => {
  return data.toString().trim().split(' ').slice(1);
}
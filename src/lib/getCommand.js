export const getCommand = (data) => {
	return data.toString().trim().split(' ')[0];
}
export const getCommand = (data) => {
	const command = data.toString().trim().split(' ')[0];
	if (command) {
		return command;
	} else {
		throw new Error;
	}	
}
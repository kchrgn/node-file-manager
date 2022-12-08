export const exitApp = (name) => {
	process.stdout.write(`Thank you for using File Manager, ${name}, goodbye!`);
	process.exit();
}
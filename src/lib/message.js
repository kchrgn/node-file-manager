import { userName } from './getUserName.js'

export const sayWelcome = () => {
  console.log(`Welcome to the File Manager, ${userName}!`);
}

export const sayBye = () => {
	process.stdout.write(`Thank you for using File Manager, ${userName}, goodbye!`);
}

export const sayCurrDir = () => {
  console.log(`You are currently in ${process.cwd()}`);
}

export const sayInvalidInput = () => {
  console.log('Invalid input');
}

export const sayOperationFailed = () => {
  console.log('Operation failed');
}
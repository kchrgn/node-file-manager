import { userName } from './getUserName.js'
import * as os from 'os'

export const sayWelcome = () => {
  console.log(`Welcome to the File Manager, ${userName}!`);
}

export const sayBye = () => {
	process.stdout.write(`Thank you for using File Manager, ${userName}, goodbye!`);
}

export const sayCurrDir = () => {
  console.log(`${os.EOL}You are currently in ${process.cwd()}`);
  process.stdout.write('>');
}

export const sayInvalidInput = () => {
  console.log('Invalid input');
  sayCurrDir();
}

export const sayOperationFailed = () => {
  console.log('Operation failed');
  sayCurrDir();
}
import { open, rename } from 'fs/promises'
import * as message from './lib/message.js'
import * as path from 'path'

export const catHandler = async (args) => {
	if (args.length != 1) {
		throw new Error;
	}

	try {
		const pathToFile = path.resolve(args);
		const fd = await open(pathToFile);
		const readFileStream = fd.createReadStream({encoding: 'utf8'});
		readFileStream.on('data', (chunk) => { console.log(chunk)});
		readFileStream.on('end', () => message.sayCurrDir());
	} catch (err) {
		message.sayOperationFailed();
		message.sayCurrDir();
	}
}

export const addHandler = async (args) => {
	if (args.length != 1 ) {
		throw new Error;
	}

	try {
		const pathToFile = path.resolve(args);
		const fd = await open(pathToFile, 'wx');
		await fd.close();
		message.sayCurrDir();
	} catch (err) {
		message.sayOperationFailed();
		message.sayCurrDir();
	}
}

export const renameHandler = async (args) => {
	if (args.length != 2 ) {
		throw new Error;
	}

	try {
		const oldName = path.resolve(args[0]);
		const newName = path.resolve(args[1]);
		await rename(oldName, newName); 
		message.sayCurrDir();
	} catch (err) {
		message.sayOperationFailed();
		message.sayCurrDir();
	}
}
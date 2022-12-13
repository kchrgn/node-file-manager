import { open } from 'fs/promises'
import * as message from './lib/message.js'
import * as path from 'path'

export const catHandler = async (args) => {
	try {
		const pathToFile = path.resolve(args.join());
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
	try {
		const pathToFile = path.resolve(args.join());
		const fd = await open(pathToFile, 'wx');
		await fd.close();
		message.sayCurrDir();
	} catch (err) {
		message.sayOperationFailed();
		message.sayCurrDir();
	}
}
import { open, rename, mkdir, rm } from 'fs/promises'
import * as message from './lib/message.js'
import * as path from 'path'
import { pipeline } from 'stream/promises'

export const catHandler = async (args) => {
	if (!args || args.length != 1) throw new Error;

	try {
		const pathToFile = path.resolve(args[0]);
		const fd = await open(pathToFile);
		const readFileStream = fd.createReadStream({encoding: 'utf8'});
		readFileStream.on('data', (chunk) => { console.log(chunk)});
		readFileStream.on('end', () => message.sayCurrDir());
		readFileStream.on('error', () => message.sayOperationFailed());
	} catch (err) {
		message.sayOperationFailed();
	}
}

export const addHandler = async (args) => {
	if (!args || args.length != 1 ) throw new Error;

	try {
		const pathToFile = path.resolve(args[0]);
		const fd = await open(pathToFile, 'wx');
		await fd.close();
		message.sayCurrDir();
	} catch (err) {
		message.sayOperationFailed();
	}
}

export const renameHandler = async (args) => {
	if (!args || args.length != 2 ) throw new Error;

	try {
		const oldName = path.resolve(args[0]);
		const newName = path.resolve(args[1]);
		await rename(oldName, newName); 
		message.sayCurrDir();
	} catch (err) {
		message.sayOperationFailed();
	}
}

export const copyMoveHandler = async (args, { operation } = '') => {
	if (!args || args.length != 2 ) throw new Error;
	
	let fd_dst;
	let fd_src;

	try {
		const srcFile = path.resolve(args[0]);
		const dstPath = path.resolve(args[1]);
		const dstFile = path.join(dstPath, path.basename(args[0]));

		fd_src = await open(srcFile);
		const readStream = fd_src.createReadStream();

		fd_dst = await open(dstFile, 'wx');
		const writeStream = fd_dst.createWriteStream();

		await pipeline(readStream, writeStream);

		if (operation === 'move') {
			await fd_src.close();
			await rm(srcFile);
		};

		message.sayCurrDir();
	} catch (err) {
		message.sayOperationFailed();
	}
	
	await fd_src?.close();
	await fd_dst?.close();
}

export const deleteHandler = async (args) => {
	if (!args || args.length != 1) throw new Error;
	const filePath = path.resolve(args[0]);

	try {
		await rm(filePath);
		message.sayCurrDir();
	} catch (err) {
		message.sayOperationFailed();
	}
}
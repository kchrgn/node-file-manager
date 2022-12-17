import * as message from './lib/message.js'
import * as path from 'path'
import * as zlib from 'zlib'
import { createReadStream, createWriteStream } from 'fs'
import { pipeline } from 'stream/promises'

export const archiveHandler = async (args, { operation }) => {
	if (!args || args.length != 2) throw new Error;
	try {
		const srcFile = path.resolve(args[0]);
		const dstPath = path.resolve(args[1]);
		const readStream = createReadStream(srcFile);
		let dstFile;
		
		let brotliStream;
		if (operation === 'compress') {
			dstFile = path.join(dstPath, path.basename(srcFile) + '.br');
			brotliStream = zlib.createBrotliCompress();
		}
		if (operation === 'decompress') {
			dstFile = path.join(dstPath, path.basename(srcFile).replace('.br', ''));
			brotliStream = zlib.createBrotliDecompress();
		}

		const writeStream = createWriteStream(dstFile);
		
		await pipeline(readStream, brotliStream, writeStream);
		message.sayCurrDir();
		
	} catch (err) {
		message.sayOperationFailed();
	}
}
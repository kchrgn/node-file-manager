import { createHash } from 'crypto'
import { open } from 'fs/promises'
import { stdout } from 'process'
import * as path from 'path'
import * as message from './lib/message.js'

export const hashHandler = async (args) => {
	if (args.length != 1) throw new Error;
 	const hash = createHash('sha256');
	const filePath = path.resolve(args[0]);

	try {
		const fd = await open(filePath);
		const readStream = fd.createReadStream();
		readStream.on('data', (data) => { hash.update(data) });
		readStream.on('end', () => { 
			console.log(hash.digest('hex'))
			fd.close();
			message.sayCurrDir();
		 });
	} catch (err) {
		message.sayOperationFailed();
		message.sayCurrDir();
	}
}
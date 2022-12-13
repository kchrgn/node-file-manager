import { open } from 'fs/promises'
import * as message from './lib/message.js'

export const catHandler = async (args) => {
	try {
		const fd = await open(args.join());
		const readFileStream = fd.createReadStream({encoding: 'utf8'});
		readFileStream.on('data', (chunk) => { console.log(chunk)});
		readFileStream.on('end', () => message.sayCurrDir());
	} catch (err) {
		message.sayOperationFailed();
		message.sayCurrDir();
	}
}
import { open } from 'fs/promises'
import * as message from './lib/message.js'

export const catHandler = async (args) => {
	try {
		const fd = await open(args.join());
	} catch (err) {
		message.sayOperationFailed();
	}
	const readFileStream = fd.createReadStream({encoding: 'utf8'});
	readFileStream.on('data', (chunk) => { console.log(chunk)});
	message.sayCurrDir();
}
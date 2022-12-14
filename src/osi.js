import * as message from './lib/message.js'
import * as os from 'os'

export const osHandler = (args) => {
	if (args.length != 1 ) throw new Error;
	switch (args[0]) {
		case '--EOL':
			console.log(`Default system End-Of-Line: ${JSON.stringify(os.EOL)}`);
			break;
			case '--cpus':
				console.log(`Overall amount of CPUs: ${os.cpus().length}`);
				const cpus = os.cpus().map((item, index) => {
					return {Model: item.model, Speed: `${item.speed} MHz`}
				})
				console.table(cpus);
				break;
				case '--homedir':
					console.log(`Home directory: ${os.homedir()}`);
					break;
				case '--username':
					console.log(`User name: ${os.userInfo().username}`);
					break;
				case '--architecture':
					console.log(`CPU architecture: ${os.arch()}`);
					break;
				default: 
				message.sayInvalidInput();
	}
	message.sayCurrDir();
}

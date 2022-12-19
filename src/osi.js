import * as message from './lib/message.js'
import * as os from 'os'

export const osHandler = (args) => {
	if (!args || args.length != 1) throw new Error;
	switch (args[0]) {
		case '--EOL':
			console.log(`Default system End-Of-Line: ${JSON.stringify(os.EOL)}`);
			message.sayCurrDir();
			break;
			case '--cpus':
				console.log(`Overall amount of CPUs: ${os.cpus().length}`);
				const cpus = os.cpus().map((item, index) => {
					return {Model: item.model, Speed: `${(item.speed)/1000} GHz`}
				})
				console.table(cpus);
				message.sayCurrDir();
				break;
				case '--homedir':
					console.log(`Home directory: ${os.homedir()}`);
					message.sayCurrDir();
					break;
				case '--username':
					console.log(`User name: ${os.userInfo().username}`);
					message.sayCurrDir();
					break;
				case '--architecture':
					console.log(`CPU architecture: ${os.arch()}`);
					message.sayCurrDir();
					break;
				default: 
				message.sayInvalidInput();
	}
}

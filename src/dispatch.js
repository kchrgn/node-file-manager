import * as nwd from './nwd.js'
import * as  bowf from './bowf.js'
import { exitApp } from './lib/exitApp.js'
import { getArgs } from './lib/getArgs.js'
import { getCommand } from './lib/getCommand.js'
import * as message from './lib/message.js'

export const dispatch = (data) => {
    const command = getCommand(data);
    const args = getArgs(data);

    switch (command) {
        case 'up':
            nwd.upHandler();
            break;
        case 'cd':
            nwd.cdHandler(args);
            break;
        case 'ls':
            nwd.lsHandler();
            break;
        case 'cat':
            bowf.catHandler(args);
            break;
        case '.exit':
            exitApp();
            break;
        default:
            message.sayInvalidInput();
    }
}
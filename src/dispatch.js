import * as nwd from './nwd.js'
import * as  bowf from './bowf.js'
import { exitApp } from './lib/exitApp.js'
import { getArgs } from './lib/getArgs.js'
import { getCommand } from './lib/getCommand.js'
import * as message from './lib/message.js'

export const dispatch = async (data) => {
    try {
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
                await nwd.lsHandler();
                break;
            case 'cat':
                await bowf.catHandler(args);
                break;
            case 'add':
                await bowf.addHandler(args);
                break;
            case 'rn':
                await bowf.renameHandler(args);
                break;
            case 'cp':
                await bowf.copyMoveHandler(args);
                break;
            case 'mv':
                await bowf.copyMoveHandler(args, {operation: 'move'});
                break;
            case '.exit':
                exitApp();
                break;
            default:
                throw new Error;
        }
            
    } catch (err) {
        message.sayInvalidInput();
        message.sayCurrDir();   
    }
    
    
}
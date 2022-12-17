import * as nwd from './nwd.js'
import * as bowf from './bowf.js'
import * as osi from './osi.js'
import * as hash from './hash.js'
import * as archive from './archive.js'
import { exitApp } from './lib/exitApp.js'
import { getArgs } from './lib/getArgs.js'
import { getCommand } from './lib/getCommand.js'
import * as message from './lib/message.js'

export const dispatch = async (data) => {
    process.stdin.pause();
    try {
        const command = getCommand(data);
        const args = getArgs(data);
        
        switch (command) {
            case 'up':
                nwd.upHandler(args);
                break;
            case 'cd':
                nwd.cdHandler(args);
                break;
            case 'ls':
                await nwd.lsHandler(args);
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
            case 'rm':
                await bowf.deleteHandler(args);
                break;
            case 'os':
                osi.osHandler(args);
                break;
            case 'hash':
                await hash.hashHandler(args);
                break;
            case 'compress':
                archive.archiveHandler(args, {operation: 'compress'});
                break;
            case 'decompress':
                archive.archiveHandler(args, {operation: 'decompress'});
                break;
            case '.exit':
                exitApp();
                break;
            default:
                throw new Error;
        }
            
    } catch (err) {
        message.sayInvalidInput();
    }
    process.stdin.resume();
}
import * as path from 'path'
import * as message from './lib/message.js'

export const setCurrentWorkDirectory = (dir) => {
    process.chdir(dir);
    message.sayCurrDir();
}

export const upHandler = () => {
    try {
        process.chdir(path.resolve('..'));    
    } catch (err) {
        message.sayOperationFailed();
    }
    message.sayCurrDir();
}

export const cdHandler = (args) => {
    try {
        process.chdir(args.join());
    } catch (err) {
        message.sayOperationFailed();
    }
    message.sayCurrDir();
}
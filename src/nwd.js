import * as path from 'path'
import * as message from './lib/message.js'
import { readdir } from 'fs/promises';
import { dir } from 'console';

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

export const  lsHandler = async () => {
    try {
        const dirContent = await readdir(process.cwd(), { withFileTypes: true });
        console.table(dirContent.map(item => {
            return {Name: item.name, Type: (item.isDirectory() ? 'directory' : 'file')};
            })
        );
    } catch (err) {
        message.sayOperationFailed();
    }
    message.sayCurrDir();
}
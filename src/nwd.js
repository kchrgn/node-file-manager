import * as path from 'path'
import * as message from './lib/message.js'
import { readdir } from 'fs/promises';

export const setCurrentWorkDirectory = (dir) => {
    try {
        process.chdir(dir);
    } catch (err) {
        message.sayOperationFailed();
    }
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
    if (args.length != 1) throw new Error;
    try {
        process.chdir(args.join());
    } catch (err) {
        message.sayOperationFailed();
    }
    message.sayCurrDir();
}

export const lsHandler = async () => {
    try {
        const dirContent = await readdir(process.cwd(), { withFileTypes: true });
        let res = [];
        dirContent.forEach((item) => {
            if (item.isDirectory()) res.push({Name: item.name, Type: 'directory'});
            if (item.isFile()) res.push({Name: item.name, Type: 'file'});
        });
        console.table(res);
    } catch (err) {
        message.sayOperationFailed();
    }
    message.sayCurrDir();
}
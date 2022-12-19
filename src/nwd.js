import * as path from 'path'
import * as message from './lib/message.js'
import { readdir } from 'fs/promises';

export const setCurrentWorkDirectory = (dir) => {
    try {
        process.chdir(dir);
        message.sayCurrDir();
    } catch (err) {
        message.sayOperationFailed();
    }
}

export const upHandler = (args) => {
    if (args) throw new Error;
    try {
        process.chdir(path.resolve('..'));    
        message.sayCurrDir();
    } catch (err) {
        message.sayOperationFailed();
    }
}

export const cdHandler = (args) => {
    if (!args || args.length != 1) throw new Error;
    try {
        process.chdir(args[0]);
        message.sayCurrDir();
    } catch (err) {
        message.sayOperationFailed();
    }
}

export const lsHandler = async (args) => {
    if (args) throw new Error;
    try {
        const dirContent = await readdir(process.cwd(), { withFileTypes: true });
        let res = [];
        dirContent.forEach((item) => {
            if (item.isDirectory()) res.push({Name: item.name, Type: 'directory'});
            if (item.isFile()) res.push({Name: item.name, Type: 'file'});
        });
        res.sort((a, b) => {
            if (a.Type > b.Type) return 1;
            if (a.Type < b.Type) return -1;
            if (a.Type === b.Type) {
                if (a.Name > b.Name) return 1;
                if (a.Name < b.Name) return -1;
                return 0;
            }
        })
        console.table(res);
        message.sayCurrDir();
    } catch (err) {
        message.sayOperationFailed();
    }
}
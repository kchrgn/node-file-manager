import { stdin, stdout } from 'process'
import { exitApp } from './lib/exitApp.js'
import { getUserName } from './lib/getUserName.js'

const fileManager = async () => {
    const userName = getUserName();
    console.log(`Welcome to the File Manager, ${userName}!`);


    stdin.on('data', data => {
        if (data.toString().trim() === '.exit') exitApp(userName);
    });

    process.on('SIGINT', () => exitApp(userName));
}

await fileManager();
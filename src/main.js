import { stdin, stdout } from 'process'
import { exitApp } from './lib/exitApp.js'
import { dispatch } from './dispatch.js'
import * as message from './lib/message.js'
import { setCurrentWorkDirectory } from './nwd.js'
import { homedir } from 'os'

const fileManager = async () => {
    message.sayWelcome();
    setCurrentWorkDirectory(homedir());
    
    stdin.on('data', data => { dispatch(data) });

    process.on('SIGINT', () => exitApp());
}

await fileManager();
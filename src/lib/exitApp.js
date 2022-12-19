import { userName } from "./getUserName.js";
import * as message from './message.js'

export const exitApp = () => {
	message.sayBye();
	process.exit();
}
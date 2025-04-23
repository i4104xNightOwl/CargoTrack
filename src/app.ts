import BaseApp from '../interfaces/http/app';


export default class App extends BaseApp {
    constructor() { super(); }

    async stop(): Promise<void> {
        console.log("Stopping server...");
        this.server.close();
    }
}
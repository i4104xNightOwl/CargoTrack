import express from "express";
import cors from 'cors';
import { IHandler, IView } from "./handlers";
import path from "path";
import { Server } from "http";
import { engine } from 'express-handlebars';

export default abstract class BaseApp {
    protected app: express.Application;
    protected server: Server;
    protected port: number;
    protected router: express.Router;
    protected handlers: IHandler[] = [];
    protected views: IView[] = [];
    
    init() {
        this.app = express();
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors());

        this.app.engine('hbs', engine({
            extname: '.hbs',
            helpers: {
                eq: function(arg1: any, arg2: any, options: any) {
                    return (arg1 === arg2) ? options.fn(this) : (options.inverse ? options.inverse(this) : '');
                }
            }
        }));
        this.app.set('view engine', 'hbs');
        this.app.set('views', path.join(__dirname, '../../src/views'));
        this.app.use(express.static(path.join(__dirname, '../../public')));

        this.router = express.Router();
    }

    registerHandler(handler: IHandler): void {
        this.handlers.push(handler);
    }

    registerView(view: IView): void {
        this.views.push(view);
    }

    async registerHandlers(): Promise<void> {
        this.handlers.forEach(handler => {
            this.router.post(handler.path, handler.create);
            this.router.put(handler.path, handler.update);
            this.router.delete(handler.path, handler.delete);
            this.router.get(handler.path, handler.get);
            this.router.get(`${handler.path}/:id`, handler.getById);
        });
    }
    
    async registerViews(): Promise<void> {
        this.views.forEach(view => {
            this.router.get(view.url, view.middleware || [], (req: any, res: any) => {
                view.renderView(req, res);
            });
        });
    }

    listen(port: number): void {
        this.port = port;
    }

    async start(): Promise<void> {
        this.init();
        this.app.use(this.router);

        this.registerHandlers();
        this.registerViews();
        
        this.server = this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }

    abstract stop(): Promise<void>;
}

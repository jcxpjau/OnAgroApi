import { timeStamp } from "console";
import { Router } from "express";
import UserController from "./controllers/UserController";

class Routes {

    public routes: Router;

    constructor()
    {
        this.routes = Router();
        this.UserRoutes();
    }
    private UserRoutes() {
        this.routes.get( '/usuarios' , UserController.index );
        this.routes.get( '/usuarios/:id', UserController.getOne );
        this.routes.post( '/usuarios' , UserController.store );
        this.routes.put( '/usuarios' , UserController.update );
        this.routes.delete( '/usuarios' , UserController.delete );
        this.routes.post( '/login' , UserController.login );
    }
}

export default new Routes().routes;
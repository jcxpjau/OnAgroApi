import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import routes from "./routes";
import dotenv from "dotenv";

class App {
    
    public express: express.Application;
    
    public constructor() {
        this.express =  express();
        this.database();
        this.middleware();
        this.routes();
    }
    private middleware(): void {
        this.express.use( express.json() );
        this.express.use( cors() );
    }
    private database() {
        dotenv.config();
        if ( process.env.environment == "production" ) {
            mongoose.connect( 'mongodb+srv://jcxpjau:MacosJau1689@api.jfnet6u.mongodb.net/?retryWrites=true&w=majority&appName=' + process.env.db );
        } else {
            mongoose.connect( 'mongodb://127.0.0.1:27017/' + process.env.db );
        }
    }
    private routes(): void {
        this.express.use( routes );
    }
}

export default new App().express;
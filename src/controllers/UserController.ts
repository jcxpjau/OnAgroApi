import { json, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Users from "../models/users";
import { UsersInterface } from "../interfaces/users.interfaces";


class UserController {

    public async index( req: Request, res: Response ): Promise<Response> {
        try {
            let users = await Users.find();
            return res.status(200).json( users );
        } catch( err: any ) {
            return res.status( 400 ).json( { "status" : err.message } );
        }
    }
    public async login( req: Request, res: Response ): Promise<Response> {
        try {
            let user = await Users.findOne({ email: req.body.email });
            if( user && bcrypt.compareSync( req.body.senha , user.senha.toString() ) )  {
                return res.status( 200 ).json( { "user": user } );
            } else {
                throw new Error( "Dados incorretos" );
            }
        } catch( error: any ) {
            return res.status( 401 ).json( { "status": "Dados incorretos"} );
        }
    }
    public async getOne( req: Request, res: Response ): Promise<Response> {
        try {
            let users = await Users.findById(req.params.id);
            if( users ) {
                return res.status( 200 ).json( users );
            } else {
                throw new Error( "Erro ao processar sua requisição" );
            }
        } catch( err: any ) {
            return res.status( 400 ).json( { "status" : err.message } );
        }
    }
    public async store( req: Request, res: Response ): Promise<Response> {
        try {
            const result = await Users.findOne( { cpf: req.body.cpf });
            if( !result ) {
                req.body.senha = bcrypt.hashSync( req.body.senha, bcrypt.genSaltSync(10) );
                let user = await Users.create( req.body );
                return res.status( 201 ).json( user );
            } else {
                throw new Error( "Usuário já cadastrado" );
            }
        } catch( err: any ) {
            return res.status( 409 ).json( { "status" : err.message } );
        }
    }
    public async update( req: Request, res: Response ): Promise<Response> {
        try {
            req.body.senha = bcrypt.hashSync( req.body.senha, bcrypt.genSaltSync(10) );
            let { cpf, nome , senha, email, telefone } = req.body;
            let user = await Users.findOneAndUpdate( { cpf: cpf } , { nome: nome , email: email, senha: senha, telefone: telefone } );
            return res.status(200).json( user );
        } catch( err: any ) {
            return res.status( 400 ).json( { "status": err.message } );
        }
    }
    public async delete( req: Request, res: Response): Promise<Response> {
        try {
            let { cpf } = req.body;
            let user = await Users.findOneAndDelete({ cpf: cpf });
            return res.status( 200 ).json( user );
        } catch( err: any ) {
            return res.status( 400 ).json( { "status": err.message } );
        }
    }
}
export default new UserController();

function getErrorMessage(err: unknown) {
    throw new Error("Function not implemented.");
}

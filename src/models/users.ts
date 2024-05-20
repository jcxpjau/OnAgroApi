import { JwtPayload } from "jsonwebtoken";
import { Schema, model, Document } from "mongoose";
import { UsersInterface } from "../interfaces/users.interfaces";

interface UserModel extends UsersInterface, Document, JwtPayload {}

const UserSchema = new Schema(
    {
        nome: String,
        cpf: String,
        senha: String,
        email: String
    },
    {
        timestamps: true
    }
);
export default model<UserModel>( 'Users' , UserSchema );
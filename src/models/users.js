import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName:String,
    lastName:String,
    email:String,
    username:String,
    password:String,
});

export default UserSchema;
import mongoose from 'mongoose';
import jwt from 'jwt-simple';
import moment from 'moment';

import SECRET from '../config';
import UserSchema from '../models/users';


const User = mongoose.model('User', UserSchema);

const createToken = (user) => {
    const payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(1, "days").unix(),
    };
    return jwt.encode(payload, SECRET)
};

export const createUser = (req, res) => {
    const user = new User(req.body);
    user.save( (err, user) => {
        if (err) {
            return res.send(err);
        }
        return res.status(200).send({
            token: createToken(user),
            user: user,
        });
    });
};

export const login = (req, res) => {
    User.findOne({username: req.body.username, password: req.body.password}, (err, user) => {
        let response;
        if (err) {
            return res.send(err);
        }
        return res.status(200).send({
            user: user,
            token: createToken(user),
        });
    });
};
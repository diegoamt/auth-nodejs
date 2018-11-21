import jwt from 'jwt-simple';
import moment from 'moment';

import SECRET from '../config';

const ensureAuthenticated = (req, res, next) => {
    if(!req.headers.token) {
        return res
            .status(403)
            .send({message: "Tu petición no tiene cabecera de autorización"});
    }
    const token = req.headers.token;
    try {
        const payload = jwt.decode(token, SECRET);
    } catch {
        return res
            .status(403)
            .send({message: "Invalid token"});
    }
    if (payload.exp <= moment().unix()) {
        return res
            .status(401)
            .send({message: "El token ha expirado"});
    }

    req.user = payload.sub;
    next();
};

export default ensureAuthenticated;
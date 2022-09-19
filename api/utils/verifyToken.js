// first verify the JWT, then check if the user is admin or normal user.
import { createError } from "../utils/error.js" // importing the function to create custom error.
import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) return next(createError(401, "you are not authenticated i.e.no token present")); // token is present.

    jwt.verify(token, process.env.JWT, (error, info) => {
        if (error) return next(createError(401, "The token is not valid"));

        req.info = info;
        next();
    });
};

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => { // the token is verified first, then checked if the correct user is managing correct account.
        // we did not pass next here because we don't want to use verifyUsers next.
        if (req.info.id === req.params.id || req.info.isAdmin) {
            next()
        } else {
            return next((createError(401, "not authorized")));
        }
    })
}

// confused about it.
export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (!req.info.isAdmin) return next(createError(401, "Not an admin"));
        next();
    })
}
const jwt = require('jsonwebtoken');

let verifyJwtToken = (req,res,next) => {
    let token;
    if ('authorization' in req.headers) token = req.headers['authorization'].split(' ')[1];

    if(!token) return res.status(403).send({auth: false, message: 'No token.'});
    else {
        jwt.verify(token, 'secretcode', (error, decoded) => {
            if(error) return res.status(500).send({auth: false, message: 'Token authentication failed.'});
            else {
                req._id = decoded._id;
                next();
            }
        });
    }
}

module.exports =  verifyJwtToken;
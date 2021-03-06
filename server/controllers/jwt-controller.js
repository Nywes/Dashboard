var jwt = require('jsonwebtoken');

// * create token
createJWT = (data) => {

    const secret = process.env.JWT_SECRET;

    // * await sign a token
    // * send it back to be stored
    console.log("Creating a jwt token");

    // * Synchronous Sign with default (HMAC SHA256)
    // * cf: https://github.com/auth0/node-jsonwebtoken
    console.log("Creating JWT for userName: ", data.userName)
    var token = jwt.sign({data: data.userName}, secret, { expiresIn: '1h' });

    // * To change hashing algorithm:
    // var token = jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256' });

    return (token);
}

validateJWTRaw = (token) => {
    const secret = process.env.JWT_SECRET;

    try {
        var decoded = jwt.verify(token, secret);

        return (decoded);
    } catch(err) {
        // err
        console.log("Error decoding token " + err);
        return (null);
    }
}

// * validate token
validateJWT = (req, res) => {

    var token = req.params.token;
    console.log("Validating a jwt token");
    const secret = process.env.JWT_SECRET;

    try {
        var decoded = jwt.verify(token, secret);

        return (res.status(200).json({ success: true, validated: true, decodedToken: decoded }));
    } catch(err) {
        // err
        console.log("Error decoding token " + err);
        return (res.status(400).json({ success: false, error: err, validated: false  }));
    }

    // * await validate, send it back
}

module.exports = {

    createJWT,
    validateJWT,
    validateJWTRaw
}
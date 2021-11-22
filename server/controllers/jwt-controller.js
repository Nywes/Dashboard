var jwt = require('jsonwebtoken');

// * create token
createJWT = (data) => {

    const secret = process.env.JWT_SECRET;

    // * await sign a token
    // * send it back to be stored
    console.log("Creating a jwt token");

    // * Synchronous Sign with default (HMAC SHA256)
    // * cf: https://github.com/auth0/node-jsonwebtoken
    var token = jwt.sign({data: data.userName}, secret, { expiresIn: '1h' });

    // * To change hashing algorithm:
    // var token = jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256' });


    return (token);
}

// * validate token
validateJWT = (req, res) => {

    var token = req.params.token;
    console.log("Validating a jwt token");
    const secret = process.env.JWT_SECRET;

    try {
        var decoded = jwt.verify(token, secret);

        return (true);
    } catch(err) {
        // err
        console.log("Error decoding token " + err);
        return (false);
    }

    // * await validate, send it back
}

module.exports = {

    createJWT,
    validateJWT
}
const UserPrefs = require('../models/user-prefs-model');
const jwtCtrl = require('./jwt-controller');

updateUserPrefs = (req, res) => {

    // * find prefs with user name
    const body = req.body;

    // * empty or no body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide prefs',
        })
    }

    var JWTToken = body.token;
    delete (body.token);

    // * get userName from jwt token
    var decodedToken = jwtCtrl.validateJWTRaw(JWTToken);

    console.log("Decoded token: ", decodedToken);
    var userName = decodedToken.data;

    if (userName === undefined) {
        return (res.status(404).json({
            message: "Username is undefined",
        }))
    }

    // * save
    UserPrefs.findOne({ userName: userName }, (err, prefs) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'User not found!',
            })
        }
        prefs.widgetNames = body.widgetNames;
        prefs.widgetInfo = body.widgetInfo;
        prefs.widgetIndexes = body.widgetIndexes;
        prefs.columnIndexes = body.columnIndexes;

        prefs
        .save()
        .then(() => {
            return res.status(200).json({
                    success: true,
                    message: 'Prefs updated!',
                })
            })
        .catch(error => {
            return res.status(404).json({
                    error,
                    message: 'Prefs not updated!',
                });
            })
    });

}

setUserPrefs = (req, res) => {
    const body = req.body;

    // * empty or no body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide prefs',
        })
    }

    var JWTToken = body.token;
    delete (body.token);

    // * get userName from jwt token
    var decodedToken = jwtCtrl.validateJWTRaw(JWTToken);

    console.log("(set) Decoded token: ", decodedToken);
    var userName = decodedToken.data;
    body.userName = userName;

    const prefs = new UserPrefs(body);

    // * if body provided is invalid
    if (!prefs) {
        return res.status(400).json({ success: false, error: "Invalid request" })
    }

    // * add user to
    prefs.save()
    .then(() => {
        return res.status(200).json({
            success: true,
            message: 'Prefs created!',
        })
    })
    .catch(error => {
        return res.status(400).json({
            error,
            message: 'Prefs not created!',
        })
    })
}

getUserPrefs = async (req, res) => {

    // * decode the token, to get the username
    var token = req.params.token;

    if (token == null) {
        return (res.status(400).json({ success: false, error: "Provide a token"}));
    }

    var decodedToken = jwtCtrl.validateJWTRaw(token);

    if (decodedToken === null) {
        return (res.status(400).json({success: false, error: "Invalid token"}));
    }

    console.log("Decoded token: ", decodedToken);
    var userName = decodedToken.data;

    await UserPrefs.find({ userName: userName }, (err, prefs) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!prefs || prefs.length === 0) {
            return res
                .status(404)
                .json({ success: false, error: `userPrefs not found` })
        }

        return res.status(200).json({ success: true, data: prefs })
    })
    .catch(err => {
        console.log("Err: ", err);
        // return res
        // .status(400)
        // .json({ success: false, error: err })
    });
}
module.exports = {
    getUserPrefs,
    setUserPrefs,
    updateUserPrefs
}
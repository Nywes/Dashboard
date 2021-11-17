const mongoose = require('mongoose')
const Schema = mongoose.Schema;

bcrypt = require('bcrypt');
SALT_WORK_FACTOR = 10;

const User = new Schema(
    {
        userName: { type: String, required: true, unique: true},
        displayName: {type: String, required: true},
        password: { type: String, required: true },
        //user_id: { type: Number, required: true, unique: true, dropDups: true }
    },
    //{ timestamps: true },
)

// * cf :
// *  https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1

// ? what the hell is *next* look up mongoose docs
User.pre('save', function(next)
{
    var user = this;

    // * this will be useful if you want to change you password
    // * for now, save will always be called just to create a user
    // only hash the password if it has been modified (or is new)
    // if (!user.isModified('password'))
    //     return (next());

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err)
            return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

User.methods.comparePassword = function(candidatePassword, callBack) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err)
            return (callBack(err));
        callBack(null, isMatch);
    });
};

module.exports = mongoose.model('users', User)
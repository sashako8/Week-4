const mongoose = require('mongoose');

const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports = {};

module.exports.updateById = async (userId, password) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return false;
    } else {
        newPassword = await bcrypt.hash(password, 10);
        return User.updateOne({ _id: userId, password: newPassword });
    }
}

module.exports.getById = (email) => {
    if (!mongoose.Types.ObjectId.isValid(email)) {
        return null;
    } else {
        const passwordsMatch = bcrypt.compare(password, newPassword)
        if (passwordsMatch) {
            return User.findOne({ _id: email});
        } else {
            return false;
        }
    }
}

module.exports.create = async (email, password) => {
    try {
        newPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email: email, password: newPassword});
        return newUser;
    } catch (e) {
        if (e.message.includes('validation failed')) {
            throw new BadDataError(e.message);
        }
        throw e;
    } 
}

class BadDataError extends Error {};
module.exports.BadDataError = BadDataError;
const mongoose = require('mongoose');

const Note = require('../models/note');

module.exports = {};

module.exports.getAll = (userId) => {
    try {
        return Note.find({ _id: userId });
    } catch (e) {
        throw e;
    }
}

module.exports.getById = (userId, noteId) => {
    if (noteId) {
        return Note.findOne({ userId: userId, _id: noteId});   
    } else {
        return false;
    }
}

module.exports.create = (text, userId) => {
    try {
        return Note.create({ text: text, userId: userId });
    } catch (e) {
        throw e;
    }
}
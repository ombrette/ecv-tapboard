var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TapSchema = new Schema({
    score: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Tap', TapSchema);

var mongoose = require('vvps-engine').mongoose;

var songSchema = new mongoose.Schema({
    path: {
        type: String,
        require: true
    },
    metadata: {
        artist: {
            type: String
        },
        title: {
            type: String
        },
        album: {
            type: String
        },
        year: {
            type: String
        },
        image: {
            format: {
                type: String
            },
            data: {
                type: Buffer
            }
        }
    }
});

var Song = mongoose.model('Song', songSchema, 'songs');

module.exports = Song;
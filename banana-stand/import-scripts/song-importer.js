'use strict';

var mongoose = require('vvps-engine').mongoose,
    musicmetadata = require('musicmetadata'),
    fs = require('fs'),
    SongModel = require('./../app/models/song.model.js');

var songs = [];

var traverseFileSystem = function (currentPath) {

    var files = fs.readdirSync(currentPath),
        mp3RegExp = /\.mp3$/,
        currentFile,
        stats,
        song;

    for (var i in files) {

        if (files[i].match)
        currentFile = currentPath + '/' + files[i];
        stats = fs.statSync(currentFile);

        if (stats.isFile() && mp3RegExp.test(currentFile)) {

            try {
                musicmetadata(fs.createReadStream(currentFile), function (err, metadata) {
                    song = {
                        path: currentFile,
                        metadata: {
                            artist: metadata.artist ? metadata.artist : '',
                            title: metadata.title ? metadata.title : files[i],
                            album: metadata.album ? metadata.album : '',
                            year: metadata.year ? metadata.year : '',
                            image: null
                        }
                    };

                    if (metadata.picture && metadata.picture.length > 0) {
                        song.metadata.image = {
                            format: metadata.picture[0].format,
                            data: metadata.picture[0].data
                        }
                    }
                    songs.push(song);

                });
            }
            catch (e) {
                console.log(e.stack);
            }
        }
        else if (stats.isDirectory()) {
            traverseFileSystem(currentFile);
        }
    }
};

if (process.argv.length < 3) {
    throw new Error ('Path is required to run the import.');
}
else {
    mongoose.connect('mongodb://localhost:27017');

    console.time('song parse');

    traverseFileSystem(process.argv[2] + '');

    console.timeEnd('song parse');

    console.time('song insert');

    SongModel.collection.insert(songs, function onInsert (err, docs) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(docs.length + ' where inserted into the db.');
        }
        console.timeEnd('song insert');
    });
}
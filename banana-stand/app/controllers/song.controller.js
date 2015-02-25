var server = require('vvps-engine').server,
    BaseApiController = require('vvps-engine').controllers.base,
    songController = new BaseApiController(require('../models/song.model.js')),
    Song = songController.model;

/**
 * Get all songs
 * @param req
 * @param res
 * @param next
 */
songController.getMany = function (req, res, next) {
    Song.find({}, function (err, songs) {
        if (err) {
            return next(err);
        }
        else {
            res.json(songs);
        }
    });
};


/**
 * Get a shark by its id
 * @param req
 * @param res
 * @param next
 */
songController.getOne = function (req, res, next) {
    Song.findById(req.params.id, function (err, shark) {

        if (err) {
            return next(err);
        }
        else {
            res.json(shark);
        }
    });
};

module.exports = songController;

var seneca = require('seneca')();
var Promise = require("bluebird");


seneca.addGen = function add(pattern, fn) {
    seneca.add(pattern, function (args, done) {
        Promise.coroutine(fn)().then(function (res) {
            if (res.toJSON) {
                done(null, res.toJSON());
            } else {
                done(null, res);
            }
        }).catch(function (err) {
            done(null, {err:err});
        })
    });
};

seneca.actGen = Promise.promisify(seneca.act, {context: seneca});

module.exports = seneca;

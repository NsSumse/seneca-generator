var Promise = require("bluebird");

module.exports = asyncifySeneca;

function asyncifySeneca(seneca) {
    seneca.actAsync = Promise.promisify(seneca.act, { context: seneca });
    seneca.addAsync = function addAsync(props, func) {
        seneca.add(props, function (args, done) {
            Promise.coroutine(func)(args).then(function (res) {
                if (res && res.toJSON) {
                    done(null, {ok: true, result: res.toJSON()});
                } else {
                    done(null, {ok: true, result: res});
                }
            }).catch(function (err) {
                done(null, {ok: false, result: err});
            })
        });
    };
    return seneca;
}


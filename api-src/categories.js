"use strict";
const categories = require('../categories.json');

exports.handler = function(event, context, callback) {
    return callback(null, {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(categories)
    });
};

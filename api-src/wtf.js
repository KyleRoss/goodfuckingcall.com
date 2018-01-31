"use strict";
const categories = require('../categories.json');
const phrases = require('../byCategory.json');

const randomCategories = [
    'misc',
    'job',
    'restroom'
];

function getRandom(arr) {
    return arr[Math.floor(Math.random()*arr.length)];
}

exports.handler = function(event, context, callback) {
    let category = event.queryStringParameters.category || 'random';
    
    if(categories.indexOf(category) === -1) {
        return callback(null, {
            statusCode: 400,
            body: 'Nice fucking try, bro'
        });
    }
    
    if(category === 'random') category = getRandom(randomCategories);
        
    return callback(null, {
        statusCode: 200,
        body: getRandom(phrases[category])
    });
};

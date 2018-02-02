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
    let category = event.queryStringParameters.category || 'random',
        phrase = event.queryStringParameters.phrase || false,
        result = null;
    
    if(phrase) {
        for(let cat in phrases) {
            if(!result && phrases.hasOwnProperty(cat)) {
                result = phrases[cat].find(function(item) {
                    return item.id === phrase;
                });
            }
        }
        
        if(!result) {
            return callback(null, {
                statusCode: 404,
                body: JSON.stringify({
                    error: 'A missing permalinked phrase :scream:'
                })
            });
        }
    } else {
        if(category === 'random') category = getRandom(randomCategories);
        
        if(categories.indexOf(category) === -1) {
            return callback(null, {
                statusCode: 400,
                body: JSON.stringify({
                    error: 'Nice fucking try, bro :joy:'
                })
            });
        }
        
        result = getRandom(phrases[category]);
    }
    
    return callback(null, {
        statusCode: 200,
        body: JSON.stringify(result)
    });
};

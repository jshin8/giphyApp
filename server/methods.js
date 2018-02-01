GphApiClient = require('giphy-js-sdk-core');
var giphyKey = Meteor.settings.giphyKey;
client = GphApiClient(giphyKey);

Meteor.methods({
    getCall: function(type, search, offset) {
    	var params = {
            offset: offset,
            limit: 24
        };
    	if (type === 'search') {
    		params.q = search;
    	}
        try {
            var call = client[type]('gifs', params);
            return call;
        } catch (error) {
            console.log('error: ', error);
            throw new Meteor.Error('error with ', type);
        }
    },
    logSessionFiles: function (sessionObject,offset,favoriteCount) {
        var insert = SessionFiles.insert({
            sessionObject: sessionObject,
            gifsLoaded:offset,
            favoriteCount:favoriteCount
        });
    }
});
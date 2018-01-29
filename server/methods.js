GphApiClient = require('giphy-js-sdk-core');
client = GphApiClient("QJimIEq7Mj9w9h12upvx8cQQfocCZng5");

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
            throw new Meteor.Error('error', 'dog');
        }
    }


});
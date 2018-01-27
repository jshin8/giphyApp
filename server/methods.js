GphApiClient = require('giphy-js-sdk-core');
client = GphApiClient("QJimIEq7Mj9w9h12upvx8cQQfocCZng5");

Meteor.methods({
    getCall: function(type, search, offset) {
    	var params = {};
    	if (type === 'search') {
    		params.q = search;
    		params.offset = offset;
    	}
    	else {
    		params.offset = offset;
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
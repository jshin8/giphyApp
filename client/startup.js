Meteor.startup(function () {
	$(window).bind('beforeunload', function() {
		var sessionId = TemplateVar.getFrom($('.searchContainer'),'sessionId');
		var offsetTotal = TemplateVar.getFrom($('.searchContainer'),'offsetTotal');
        Meteor.call('logSessionFiles', sessionId, offsetTotal);
    });
});
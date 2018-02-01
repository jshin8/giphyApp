Meteor.startup(function () {
	$(window).bind('beforeunload', function() {
		var sessionObject = TemplateVar.getFrom($('.searchContainer'),'sessionObject');
		var offsetTotal = TemplateVar.getFrom($('.searchContainer'),'offsetTotal');
        Meteor.call('logSessionFiles', sessionObject, offsetTotal);
    });
});
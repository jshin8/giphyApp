Meteor.startup(function () {
	$(window).bind('beforeunload', function() {
		var sessionObject = TemplateVar.getFrom($('.searchContainer'),'sessionObject');
		var offsetTotal = TemplateVar.getFrom($('.searchContainer'),'offsetTotal');
		var favoriteCount = TemplateVar.getFrom($('.searchContainer'),'favoriteCount');
        Meteor.call('logSessionFiles', sessionObject, offsetTotal, favoriteCount);
    });
});
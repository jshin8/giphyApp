Template.gifWindow.rendered = function () {
	var sessionObject = TemplateVar.getFrom($('.searchContainer'),'sessionObject');
	if (sessionObject.scrollTest) {
		$('#gifWindow').on('scroll', function () {
			if($(this).scrollTop() + $(this).innerHeight() + 500 >= $(this)[0].scrollHeight) {
				var searchInput = TemplateVar.getFrom($('.searchContainer'), 'searchInput');
				var type;
				if (searchInput) {
					type = 'search';
				}
				else {
					type = 'trending';
				}
				Helpers.getMoreGifs(type,searchInput);
			}
		});
	}
};

Template.gifWindow.helpers({
	dynamicHeight: function () {
		var dynamicHeight = TemplateVar.getFrom($('.searchContainer'),'dynamicHeight');
		if (dynamicHeight) {
			return dynamicHeight;
		}
	},
	showLoadingButton: function () {
		var sessionObject = TemplateVar.getFrom($('.searchContainer'),'sessionObject');
		if (!sessionObject.scrollTest) {
			return true;
		}
	}
});

Template.gifWindow.events({
	'click #loadMore': function (event,template) {
		var searchInput = TemplateVar.getFrom($('.searchContainer'), 'searchInput');
		var type;
		if (searchInput) {
			type = 'search';
		}
		else {
			type = 'trending';
		}
        Helpers.getMoreGifs(type,searchInput);
	}
});
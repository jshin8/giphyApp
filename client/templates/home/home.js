Template.home.created = function () {
	var template = this;
	TemplateVar.set(template,'gifs',false);
	TemplateVar.set(template,'searchInput',false);
	TemplateVar.set(template,'offset',false);
	TemplateVar.set(template,'offsetTotal',false);
	TemplateVar.set(template,'loading',false);
	TemplateVar.set(template,'dynamicHeight',window.innerHeight - 102);
	TemplateVar.set(template,'hover',false);
	TemplateVar.set(template,'hoverData',false);
	TemplateVar.set(template,'hoverDataIndex',false);
	TemplateVar.set(template,'favoriteCount',0);
	
	var type = 'trending';
	Meteor.call('getCall', type, function (error,result) {
		if (error) {
			console.log('error with getCall trending: ', error);
		}
		else {
			console.log('results of getCall trending: ', result);
			if (result.meta.status === 200) {
				var data = result.data;
				if (data.length) {
					TemplateVar.setTo($('.searchContainer'), 'gifs', data);
					TemplateVar.setTo($('.searchContainer'), 'offset',24);
					TemplateVar.setTo($('.searchContainer'), 'offsetTotal',24);
				}
				else {
					TemplateVar.setTo($('.searchContainer'), 'gifs', 'empty');
				}
			}
		}
	});

	Helpers.setSession(template);
};

Template.home.rendered = function () {
	var template = this;
	$(window).resize(function () {
		var height = window.innerHeight;
		var dynamicHeight = height - 102;
		TemplateVar.set(template,'dynamicHeight',dynamicHeight);
	});
};

Template.home.helpers({
	searchResults: function () {
		var gifs = TemplateVar.get('gifs');
		if (gifs) {
			return gifs;
		}
	},
	loading: function () {
		var loading = TemplateVar.get('loading');
		return loading;
	},
	hoverData: function () {
		var hoverData = TemplateVar.get('hoverData');
		if (hoverData) {
			return hoverData;
		}
	}
});

Template.home.events({
	'click #appTitle': function (event,template) {
		location.reload();
	}
});
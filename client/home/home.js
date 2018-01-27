Template.home.created = function () {
	var template = this;
	TemplateVar.set(template,'gifs',false);
	TemplateVar.set(template,'searchInput',false);
	TemplateVar.set(template,'offset',false);
	TemplateVar.set(template,'loading',false);
	TemplateVar.set(template,'dynamicHeight',window.innerHeight - 100);
	
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
					TemplateVar.setTo($('.searchContainer'), 'offset',25);
				}
				else {
					TemplateVar.setTo($('.searchContainer'), 'gifs', 'empty');
				}
			}
		}
	})
};

Template.home.rendered = function () {
	var template = this;
	$(window).resize(function () {
		var height = window.innerHeight;
		var dynamicHeight = height - 100;
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
	}
});


Template.search.events({
	'click .search': function (event,template) {
		var type = 'search';
		TemplateVar.setTo($('.searchContainer'), 'loading', true);
		var search = $('#gifSearch input').val();
		TemplateVar.setTo($('.searchContainer'),'searchInput',search);
		Meteor.call('getCall', type, search, function (error,result) {
			TemplateVar.setTo($('.searchContainer'),'loading',false);
			if (error) {
				console.log('error with getCall search: ', error);
			}
			else {
				console.log('results of getCall search: ',result);
				if (result.meta.status === 200) {
					var data = result.data;
					if (data.length) {
						TemplateVar.setTo($('.searchContainer'), 'gifs', data);
						TemplateVar.setTo($('.searchContainer'), 'offset',25);
					}
					else {
						TemplateVar.setTo($('.searchContainer'), 'gifs', 'empty');
					}
				} 
			}
		});
	},
	'keypress input': function (event,template) {
        var button = event.keyCode;
        if (button === 13) {
			$('i').click();
        }
	}
});


Template.gifWindow.rendered = function () {
	$('#gifWindow').on('scroll', function () {
		if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
			var searchInput = TemplateVar.getFrom($('.searchContainer'), 'searchInput');
			var offset = TemplateVar.getFrom($('.searchContainer'), 'offset');
			var type;
			if (searchInput) {
				type = 'search';
			}
			else {
				type = 'trending';
			}
            getMoreGifs(type,searchInput,offset);
        }
	});
};

Template.gifWindow.helpers({
	dynamicHeight: function () {
		var dynamicHeight = TemplateVar.getFrom($('.searchContainer'),'dynamicHeight');
		if (dynamicHeight) {
			return dynamicHeight;
		}
	},
});

var getMoreGifs = function (type,searchInput,offset) {
	Meteor.call('getCall', type, searchInput, offset, function (error,result) {
		if (error) {
			console.log('error with getCall more: ',error);
		}
		else {
			console.log('results of getMore call: ',result);
			if (result.meta.status === 200) {
				var data = result.data;
				if (data.length) {
					var oldGifs = TemplateVar.getFrom($('.searchContainer'), 'gifs');
					var newGifsArray = oldGifs.concat(data);
					TemplateVar.setTo($('.searchContainer'), 'gifs', newGifsArray);
					TemplateVar.setTo($('.searchContainer'), 'offset',offset +=25);
				}
				else {
					$('#gifWindow').off('scroll');
					$( "#gifWindow" ).append( "<div style='padding:20px;font-size:16px;'>End of Results</div>" );
				}
			}
		}
	});
};

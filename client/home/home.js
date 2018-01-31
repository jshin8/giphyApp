Template.home.created = function () {
	var template = this;
	TemplateVar.set(template,'gifs',false);
	TemplateVar.set(template,'searchInput',false);
	TemplateVar.set(template,'offset',false);
	TemplateVar.set(template,'offsetTotal',false);
	TemplateVar.set(template,'loading',false);
	TemplateVar.set(template,'dynamicHeight',window.innerHeight - 100);
	TemplateVar.set(template,'hover',false);
	TemplateVar.set(template,'hoverData',false);
	
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

	setSession(template);
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


Template.search.events({
	'click .search': function (event,template) {
		var type = 'search';
		TemplateVar.setTo($('.searchContainer'), 'loading', true);
		var search = $('#gifSearch input').val();
		TemplateVar.setTo($('.searchContainer'),'searchInput',search);
		var offsetTotal = TemplateVar.getFrom($('.searchContainer'),'offsetTotal');
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
						TemplateVar.setTo($('.searchContainer'), 'offset',24);
						TemplateVar.setTo($('.searchContainer'), 'offsetTotal',offsetTotal += 24);
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
	var sessionId = TemplateVar.getFrom($('.searchContainer'),'sessionId');
	if (sessionId % 2 === 0) {
		$('#gifWindow').on('scroll', function () {
			// console.log('left: ', $(this).scrollTop() + $(this).innerHeight());
			// console.log('right: ', $(this)[0].scrollHeight);
			if($(this).scrollTop() + $(this).innerHeight() + 500 >= $(this)[0].scrollHeight) {
				var searchInput = TemplateVar.getFrom($('.searchContainer'), 'searchInput');
				var type;
				if (searchInput) {
					type = 'search';
				}
				else {
					type = 'trending';
				}
	            getMoreGifs(type,searchInput);
	        }
		});
	}
	else {

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
		var sessionId = TemplateVar.getFrom($('.searchContainer'),'sessionId');
		if (sessionId % 2 !== 0) {
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
        getMoreGifs(type,searchInput);
	}
});


Template.gifCard.helpers({
	hover: function () {
		var hover = TemplateVar.getFrom($('.searchContainer'),'hover');
		return hover;
	}
});

Template.gifCard.events({
	'mouseenter .card': function (event,template) {
		TemplateVar.setTo($('.searchContainer'),'hoverData',this);
		TemplateVar.setTo($('.searchContainer'),'hover',this.id);
	},
	'mouseleave .card': function (event,template) {
		TemplateVar.setTo($('.searchContainer'),'hover',false);
	},
	'click .info': function (event,template) {
		$('.ui.modal').modal('show');
	}
});


Template.gifModal.rendered = function () {
	$('#copyShort').on('click', function () {
		window.getSelection().selectAllChildren( document.getElementById('shortUrl'));
		document.execCommand('copy');
	});
};

Template.gifModal.helpers({
	gifTitle: function () {
		var data = this.data;
		var gifTitle;
		if (data.title) {
			var nameInTitle = data.title.match(/(.*) by/);
			if (nameInTitle) {
				gifTitle = nameInTitle[1];
			}
			else {
				gifTitle = data.title;
			}
		}
		else {
			gifTitle = 'GIF';
		}
		return gifTitle;
	},
	rating: function () {
		var data = this.data;
		var rating = data.rating;
		return rating;
	},
	uploaded: function () {
		var data = this.data;
		var rawUploaded = data.import_datetime;
		if (rawUploaded) {
			var uploaded = moment(rawUploaded).format('L');
			return uploaded;
		}
	},
	shortUrl: function () {
		var data = this.data;
		var shortUrl = data.bitly_gif_url;
		return shortUrl;
	},
	source: function () {
		var data = this.data;
		var source = data.source;
		if (source) {
			if (source.match(/http:/) || source.match(/https:/)) {
				return source;
			}
			else {
				return 'http://' + source;
			}
		}
	}
});


var getMoreGifs = _.throttle(function (type,searchInput) {
	var offset = TemplateVar.getFrom($('.searchContainer'), 'offset');
	var offsetTotal = TemplateVar.getFrom($('.searchContainer'),'offsetTotal');
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
					TemplateVar.setTo($('.searchContainer'), 'offset',offset += 24);
					TemplateVar.setTo($('.searchContainer'), 'offsetTotal',offsetTotal += 24);
				}
				else {
					$('#gifWindow').off('scroll');
					$('#gifWindow').append( "<div style='padding:20px;font-size:16px;'>End of Results</div>" );
				}
			}
		}
	});
},1000,{'trailing':false});


var setSession = function (template) {
	var sessionId = Math.round(Math.random() * 1000);
	TemplateVar.set(template,'sessionId',sessionId)
	console.log('session is set: ',sessionId)
};

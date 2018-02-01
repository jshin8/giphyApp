Helpers = {
	getMoreGifs: _.throttle(function (type,searchInput) {
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
						$('.loadMoreContainer').remove();
						$('#gifWindow').append( "<div id='endResults'>End of Results</div>" );
					}
				}
			}
		});
	},750,{'trailing':false}),
	setSession: function (template) {
		var sessionId = Math.round(Math.random() * 1000);
		TemplateVar.set(template,'sessionId',sessionId)
		console.log('session is set: ',sessionId)
	}
};
Template.search.events({
	'click .search': function (event,template) {
		var search = $('#gifSearch input').val();
		if (search) {
			var type = 'search';
			TemplateVar.setTo($('.searchContainer'), 'loading', true);
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
		}
	},
	'keypress input': function (event,template) {
        var button = event.keyCode;
        if (button === 13) {
			$('i').click();
        }
	}
});
Template.gifModal.rendered = function () {
	var template = this;
	$('#copyShort').on('click', function () {
		window.getSelection().selectAllChildren(document.getElementById('shortUrl'));
		document.execCommand('copy');
	});
	$('#copyEmbed').on('click', function () {
		window.getSelection().selectAllChildren(document.getElementById('embedUrl'));
		document.execCommand('copy');
	});
	$('#leftNav').on('click', function () {
		var index = TemplateVar.getFrom($('.searchContainer'),'hoverDataIndex');
		if (index) {
			var newIndex = index - 1;
			var gifs = TemplateVar.getFrom($('.searchContainer'),'gifs');
			var newGif = gifs[newIndex];
			TemplateVar.setTo($('.searchContainer'),'hoverData',newGif);
			TemplateVar.setTo($('.searchContainer'),'hoverDataIndex',newIndex);
		}
	});
	$('#rightNav').on('click', function () {
		var index = TemplateVar.getFrom($('.searchContainer'),'hoverDataIndex');
		var gifs = TemplateVar.getFrom($('.searchContainer'),'gifs');
		if (index < gifs.length-1) {
			var newIndex = index + 1;
			var newGif = gifs[newIndex];
			TemplateVar.setTo($('.searchContainer'),'hoverData',newGif);
			TemplateVar.setTo($('.searchContainer'),'hoverDataIndex',newIndex);
		}
	});
	$('.star').on('click', function () {
		var favoriteCount = TemplateVar.getFrom($('.searchContainer'),'favoriteCount');
		var index = TemplateVar.getFrom($('.searchContainer'),'hoverDataIndex');
		var favoriteArray = TemplateVar.getFrom($('.searchContainer'),'favoriteArray');
		var favorited = favoriteArray.indexOf(index);
		if (favorited > -1) {
			favoriteArray.splice(favorited,1);
			TemplateVar.setTo($('.searchContainer'),'favoriteCount',favoriteCount-1);
		}
		else {
			favoriteArray.push(index);
			TemplateVar.setTo($('.searchContainer'),'favoriteCount',favoriteCount+1);
		}
		TemplateVar.setTo($('.searchContainer'),'favoriteArray',favoriteArray);
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
	embedUrl: function () {
		var data = this.data;
		var embedUrl = data.embed_url;
		return embedUrl;
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
	},
	showHeartButton: function () {
		var sessionObject = TemplateVar.getFrom($('.searchContainer'),'sessionObject');
		if (!sessionObject.favoriteTest) {
			return true;
		}
	},
	starClass: function () {
		var index = TemplateVar.getFrom($('.searchContainer'),'hoverDataIndex');
		var favoriteArray = TemplateVar.getFrom($('.searchContainer'),'favoriteArray');
		var favorited = favoriteArray.indexOf(index);
		if (favorited === -1) {
			return 'empty';
		}
	}
});
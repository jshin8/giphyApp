Template.gifCard.helpers({
	imgSrc: function () {
		var images = this.images;
		var imgSrc = images.fixed_height_downsampled.gif_url || images.fixed_height.gif_url;
		return imgSrc;
	},
	hover: function () {
		var hover = TemplateVar.getFrom($('.searchContainer'),'hover');
		return hover;
	},
	showHeartButton: function () {
		var sessionObject = TemplateVar.getFrom($('.searchContainer'),'sessionObject');
		if (sessionObject.favoriteTest) {
			return true;
		}
	},
	heartToggle: function () {
		var hover = TemplateVar.getFrom($('.searchContainer'),'hover');
		var id = this.id;
		var heartToggle;
		if (id === hover) {
			heartToggle = 'inline-block';
		}
		else {
			heartToggle = 'none;'
		}
		return heartToggle;
	}
});

Template.gifCard.events({
	'mouseenter .card': function (event,template) {
		TemplateVar.setTo($('.searchContainer'),'hoverData',this);
		TemplateVar.setTo($('.searchContainer'),'hover',this.id);
		var target = event.currentTarget;
		var index = $('div.card').index(target);
		TemplateVar.setTo($('.searchContainer'),'hoverDataIndex',index);
	},
	'mouseleave .card': function (event,template) {
		TemplateVar.setTo($('.searchContainer'),'hover',false);
	},
	'click .info': function (event,template) {
		$('.ui.modal').modal('show');
	},
	'click .empty': function (event,template) {
		var currentTarget = event.currentTarget;
		$(currentTarget).removeClass('empty');
		var favoriteCount = TemplateVar.getFrom($('.searchContainer'),'favoriteCount');
		TemplateVar.setTo($('.searchContainer'),'favoriteCount',favoriteCount+1);
	},
	'click .heart:not(.empty)': function (event,template) {
		var currentTarget = event.currentTarget;
		$(currentTarget).addClass('empty');
		var favoriteCount = TemplateVar.getFrom($('.searchContainer'),'favoriteCount');
		TemplateVar.setTo($('.searchContainer'),'favoriteCount',favoriteCount-1);
	}
});
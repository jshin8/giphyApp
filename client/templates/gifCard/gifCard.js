Template.gifCard.helpers({
	imgSrc: function () {
		var images = this.images;
		var imgSrc = images.fixed_height_downsampled.gif_url || images.fixed_height.gif_url;
		return imgSrc;
	},
	hover: function () {
		var hover = TemplateVar.getFrom($('.searchContainer'),'hover');
		return hover;
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
	}
});
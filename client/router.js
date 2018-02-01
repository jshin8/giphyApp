FlowRouter.route('/', {
  name: 'home',
  action: function () {
    BlazeLayout.render('layout', {content: 'home'});
  }
});

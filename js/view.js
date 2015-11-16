var app = app || {};
(function ($) {
	'use strict';
	app.AppView = Backbone.View.extend({

		el: '#main',

		template: _.template($('#template').html()),

		events: {
			'click #add-button': 'addNew',
			'click .feed_link': 'loadFeed',
		},

		initialize: function(){
			this.$title = $('#title');
			this.$url = $('#url');
			this.$list = $('#feeds_button');

			this.feeds = app.feeds;
			this.listenTo(this.feeds, 'add', this.addOne);
			this.listenTo(app.todos, 'reset', this.addAll);
			this.feeds.fetch({reset: true});
			this.render();
		},

		render: function(){
			this.addAll();
			var feeds_json = {"feeds": this.feeds.toJSON(), "items": [] };
			var template = _.template($("#template").html())(feeds_json);
			this.$el.html( template );
		},

		loadFeed: function(e) {
			var $this = this;
			var id = $(e.currentTarget).data("fid");
			var feed = this.feeds.get(id);
			var title = feed.get('title');
			var url = 'https://crossorigin.me/http://cloud.feedly.com/v3/streams/contents?streamId=feed/' + feed.get('url');			
			this.renderFeed(url);
		},

		renderFeed: function(url) {
			var $this = this;
			$.get(url, function (feed) {
				var feeds_json = {"feeds": $this.feeds.toJSON() , "items": feed.items};
				var template = _.template($("#template").html())(feeds_json);
				$this.$el.html( template );
			});
		},

		addNew: function() {
			this.feeds.create(this.newAttributes());
		},

		addAll: function() {
			this.feeds.each(this.addOne, this);
		},

		addOne: function (feed) {
			this.$list.append('<button class="btn btn-primary feed_link" data-fid="'+feed.get('id')+'">'+feed.get('title')+'</button>');
			this.$title.val('');
			this.$url.val('');
		},

		newAttributes: function () {
			this.$title = $('#title');
			this.$url = $('#url');
			this.$list = $('#feeds_button');
			return {
				title: this.$title.val().trim(),
				url: this.$url.val().trim(),
				order: this.feeds.nextOrder(),
				active: false
			};
		},
	});
})(jQuery);
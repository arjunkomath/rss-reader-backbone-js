var app = app || {};

(function () {
	'use strict';

	var Feeds = Backbone.Collection.extend({
		model: Backbone.Model.extend({
			defaults: {
				title: '',
				url: '',
				active: false
			}
		}),

		localStorage: new Backbone.LocalStorage('feeds-backbone'),

		active: function () {
			return this.where({active: true});
		},

		archive: function () {
			return this.where({active: false});
		},

		nextOrder: function () {
			return this.length ? this.last().get('order') + 1 : 1;
		},

		comparator: 'order'
	});

	app.feeds = new Feeds();
})();
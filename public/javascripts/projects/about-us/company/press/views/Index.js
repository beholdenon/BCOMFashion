'use strict';

define(['jquery', 
        'backbone', 
        '/fashion/javascripts/libs/handlebars_3.0.3.js',
        'text!templates/about-us/company/press/index.hbs'], function($, Backbone, Handlebars3, Template){
            
    var View = Backbone.View.extend({
        tagName: 'div',
        
        template: Handlebars3.compile(Template),
        
        events: {
            'click a' : 'navigateToPressRelease'
        },
        
        initialize: function(options) {
            this.routes = options.routes;
        },
        
        render: function(obj) {
            this.$el.html(
                this.template(obj.pressReleases)
            );
            $("#press-releases").empty().append( this.$el );
        },
        
        navigateToPressRelease: function(e) {
            e.preventDefault();
            var href = $(e.currentTarget).attr("href");
            this.routes.navigate(href.replace(/^\//, ""), {trigger: true});
        }
    });
    
    return View;
});
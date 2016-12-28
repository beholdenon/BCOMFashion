'use strict';

define(['jquery', 
        'backbone', 
        '/fashion/javascripts/libs/handlebars_3.0.3.js',
        'text!templates/about-us/company/press/details.hbs'], function($, Backbone, Handlebars3, Template){
            
    var View = Backbone.View.extend({
        tagName: 'div',
        
        template: Handlebars3.compile(Template),
        
        events: {
            'click #back-button' : 'navigateBackToList'
        },
        
        initialize: function(options) {
            this.routes = options.routes;
        },
        
        render: function(obj) {
            this.$el.html(
                this.template(obj)
            );
            $("#press-releases").empty().append( this.$el );
            $(window).scrollTop(0);
        },
        
        navigateBackToList: function() {
            this.routes.navigate('about-us/company/press/index/', { trigger: true });
        }
        
    });
    
    return View;
});
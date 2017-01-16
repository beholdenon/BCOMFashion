'use strict';

define(['jquery','underscore', 'backbone'], function($, _, Backbone){

    // $.ajaxSetup({
    //     headers: {
    //         'x-macys-webservice-client-id': 'ubrz33mdh4w5tccfzt7enn78',
    //     },
    //     dataType: "jsonp",
    //     cache: false,
    //     crossDomain: true,
    //     processData: true
    // });

    var Model = Backbone.Model.extend({
        url: 'http://api.qa13codebloomingdales.fds.com/customer/v1/pressrelease/notes',
        sync: function( method, model, options ) {
            options = options || {};
            options.headers = options.headers || {};
            options.xhrFields = options.xhrFields || {};

            _.defaults( options, {
                contentType: 'application/json',
                dataType: 'json',
                async: true
            });

            // Inject session data
            _.extend( options.headers, {
                'x-macys-webservice-client-id' : 'ubrz33mdh4w5tccfzt7enn78'
            });

            // Accounts for empty response strings that would cause a parsing error in jQuery
            options.dataFilter = function( data ) {
                return data || {};
            };

            _.defaults( options.xhrFields, {
                withCredentials: true
            });

            return Backbone.Model.prototype.sync.call( this, method, model, options );
        },
    });
    
    return Model;
});
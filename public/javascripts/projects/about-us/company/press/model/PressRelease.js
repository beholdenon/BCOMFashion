'use strict';

define(['backbone'], function(Backbone){
    var Model = Backbone.Model.extend({
        url: '/p/api/customer/v1/pressrelease/notes'
    });
    
    return Model;
});
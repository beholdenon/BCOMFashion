"use strict";

define(['jquery', 
        'underscore', 
        'backbone',
        'pressReleases/model/PressRelease'], function($, _, Backbone, PRModel) {
    
    var pressReleaseModel,
        pressReleaseView,
        // Leaving mock data here as a reference so we know what the expected data looks like
        // mockJson = {
        //     pressReleases: {
        //         pressRelease: [
        //             {newsDate: '12/25/2016', newsId: "174", newsTitle: "Sample PressRelease", newsStory: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
        //             {newsDate: '12/26/2016', newsId: "175", newsTitle: "One Sample PressRelease", newsStory: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
        //         ]
        //     }
        // },
        Routes = Backbone.Router.extend({
            routes: {
                'about-us/company/press/index/' : 'index',
                'about-us/company/press/background-history/?newsID=:id' : 'details',
            },
            
            index: function() {
                render();
            },
            
            details: function(id) {
                render(id);
            }
        }),
        appRoutes = new Routes();
    
    function _render(id) {
        // var json = mockJson;
        var json = pressReleaseModel.toJSON();
        var filtered;
        
        if (id) {
            // Filter json for just the PR that has the id
            filtered = _.findWhere(json.pressReleases.pressRelease, {newsId: id});
            if (filtered) {
                json = filtered;
            }
        }
        
        pressReleaseView.render(json);
    }
    
    function render(id) {
        var view = id ? 'pressReleases/views/Details' : 'pressReleases/views/Index';

        require([view], function(View) {
            pressReleaseView = new View({routes: appRoutes});
            if (!pressReleaseModel) {
                pressReleaseModel = new PRModel();
                pressReleaseModel.fetch({
                    success: function() {
                        _render(id);
                    },
                    error: function(model, response) {
                        console.error("Error in fetching press releases");
                        console.error("Model: ", model);
                        console.error("Response: ", response);
                        _render(id);
                    }
                });
            }
            else {
                // Model already has data, just call render
                _render(id);
            }
        });

    }
});
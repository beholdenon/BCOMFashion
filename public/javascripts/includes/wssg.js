/*====================================================================================

author: 			Mike Curtis
functionality: 		Standardized click events and calls for WSSG services.
last-edited: 		05/21/15

======================================================================================*/

$(document).ready(function() {

    $(".catIndex").on("click", function() {
        var target = $(this),
            catID = target.attr("data-id");

        SERVICES.category.index(catID, function(output) { // services call with ID of category. Output variable is the resulting object from WSSG.

            target.parent().find(".result").html("<ul></ul>");

            for (i = 0; i < output.category.length; i++) {
                console.log(output.category[i]);
                target.parent().find(".result ul").append('<h4><a href="' + output.category[i].categorypageurl + '">' + output.category[i].name + '</a></h4>');
            }

        });

    });

    $(".browseProduct").on("click", function() {
        var target = $(this),
            catID = target.attr("data-id"),
            resultsPerPage = 32,
            sortby = 'bestseller';

        SERVICES.category.browseProduct(catID, function(output) { // services call with ID of category. Output variable is the resulting object from WSSG.

            for (i = 0; i < output.category.length; i++) {
                console.log(output.category[i]);
                target.parent().find(".result").append('<h2>Category: ' + output.category[i].summary.name + '</h2>');
                target.parent().find(".result").append('<h3>Parent Category: ' + output.category[i].parentcategory.summary.name + '</h3>');
                target.parent().find(".result").append("<ul id=broPro" + i + "></ul>");

                for (j = 0; j < output.category[i].product.product.length; j++) {
                    target.parent().find(".result #broPro" + i).append('<li><a href="' + output.category[i].product.product[j].summary.producturl + '">' 
                        + '<img src="'+output.category[i].product.product[j].image[0].imageurl+'"><span>'
                        + output.category[i].product.product[j].summary.name + '</span></a></li>');
                }
            }

        }, resultsPerPage, sortby);

    });



});

function getRequest(path, callback) {
    // standard AJAX get request
    $.ajax({
        method: 'GET',
        dataType: 'json',
        url: path,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    }).success(function(data) {
        callback(data);
    });

}

var SERVICES = {

    category: {

        index: function(catID, callback) {
            // Index is a call for basic information about a category by its ID.
            // catID can be a single ID or multiple, comma-separated IDs
            var path = '/v3/catalog/category/index?category=' + catID + '&depth=1';
            getRequest(path, function(result) {
                callback(result);
            });
        },

        browse: function(catID, callback) {
            var path = '/v3/catalog/category/' + catID;
            getRequest(path, function(result) {
                callback(result);
            });
        },

        brandIndex: function(catID, referenceID, callback) {
            var path = '/v4/catalog/category/brandindex/' + catID + '?refcatid=' + referenceID;
            getRequest(path, function(result) {
                callback(result);
            });
        },

        browseProduct: function(catID, callback, resultsPerPage, sortby) {
            // browseProduct is a call for product information based on a category call.
            // catID must be a single category ID.

            if (resultsPerPage == undefined) resultsPerPage = 96;
            if (sortby == undefined) {
                sortby = '';
            } else {
                sortby = "&sortby=" + sortby;
            }

            var path = '/v3/catalog/category/' + catID + '/browseproducts?resultsperpage=' + resultsPerPage + sortby;
            getRequest(path, function(result) {
                callback(result);
            });
        }

    },

    user: {
        get: function() {
            $.ajax({
                method: 'GET',
                dataType: 'json',
                url: '/v2/user',
                data: {
                    'show': 'summary',
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            }).success(function(res) {
                console.log(res);
                return res;
            });
        },
    },

    bag: {

        get: function() {
            $.ajax({
                method: 'GET',
                dataType: 'json',
                url: '/v2/shoppingbag',
                data: {
                    'userid': '64354129',
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            }).success(function(res) {
                console.log(res);
                return res.bagid;
            });
        },

        add: function(ev, add_id, add_color, add_size, add_type, add_quantity, add_promocode) {
            console.log(add_id);
            $.ajax({
                method: 'POST',
                url: '/v2/shoppingbag/item',
                data: {
                    'productid': add_id
                }
            }).success(function(res) {
                console.log(res);
            }).fail(function(res) {
                console.log('atb failure');
            });
        },

        count: function() {
            $.ajax({
                method: 'GET',
                dataType: 'json',
                url: '/v2/shoppingbag/bagItemCount',
                data: {
                    // 'bagid'	: ,
                    'userid': '64354129',
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            }).success(function(res) {
                if (res.bagItemCount > 0) {
                    $('#cartCount').html(res.bagItemCount + " Items");
                } else {
                    $('#cartCount').html("(0)");
                }
            });
        },
    },
}
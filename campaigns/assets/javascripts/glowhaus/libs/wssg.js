/*====================================================================================

author: 			Mike Curtis 
functionality: 		Standardized click events and calls for WSSG services.
last-edited: 		05/21/15

======================================================================================*/

/* jshint ignore:start */

$(document).ready(function() {

    //  SERVICE TESTS

    $(".wssgCatalog").on("click", function() {
        var target = $(this),
            catID = target.attr("data-id");

        target.parent().find(".result").html("<img src='/b/fashion/images/loading-bar.gif'/>");

        SERVICES.category.index(function(output) { // services call with ID of category. Output variable is the resulting object from WSSG.

            target.parent().find(".result").html("<ul></ul>");

            for (i = 0; i < output.category.length; i++) {
                console.log(output.category[i]);
                target.parent().find(".result ul").append('<h4><a href="' + output.category[i].categorypageurl + '">' + output.category[i].name + '</a></h4>');
            }

        }, catID);

    });

    $(".wssgBrowse").on("click", function() {
        var target = $(this),
            catID = target.attr("data-id"),
            resultsPerPage = 32,
            sortby = 'bestseller';

        target.parent().find(".result").html("<img src='/b/fashion/images/loading-bar.gif'/>");

        SERVICES.category.browseProduct(function(output) { // services call with ID of category. Output variable is the resulting object from WSSG.
            target.parent().find(".result").html("");
            for (i = 0; i < output.category.length; i++) {
                console.log(output.category[i]);
                target.parent().find(".result").append('<h2>Category: ' + output.category[i].summary.name + '</h2>');
                target.parent().find(".result").append('<h3>Parent Category: ' + output.category[i].parentcategory.summary.name + '</h3>');
                target.parent().find(".result").append("<ul id=broPro" + i + "></ul>");

                for (j = 0; j < output.category[i].product.product.length; j++) {
                    target.parent().find(".result #broPro" + i).append('<li><a href="' + output.category[i].product.product[j].summary.producturl + '">' + '<img src="' + output.category[i].product.product[j].image[0].imageurl + '"><span>' + output.category[i].product.product[j].summary.name + '</span></a><div class="addToBag button" data-upc="'+output.category[i].product.product[j].id+'">Add to Bag</div></li>');
                }
            }

        }, catID, resultsPerPage, sortby);

    });

    // $(".wssgProduct").on("click", function() {
       
    // });

    $(".servicesCall").on("click", function() {
        var target = $(this),
            print = target.parent().find(".result");

        print.html("<img src='/b/fashion/images/loading-bar.gif'/>");

        SERVICES.bag.get(function(output) {
            var bag = output.bag;
            print.html("<h2>Bag Info:</h2><ul><li>Bag Id: " + bag.bagId + "</li><li>User Id: " + bag.owner.userId + "</li><li>Number of Items: " + bag.items.length + "</li><li>Bag Total: " + bag.bagSummary.grandTotal + "</li>");

        }, '2180156589');
    });

    $(".result").on("click", ".addToBag", function() {
        var target = $(this),
            upcId = target.data("upc");

        console.log(upcId);

        SERVICES.bag.add( function(output) {

        }, upcId, "1");

    });

});

function getRequest(path, callback, body) {    
    // standard AJAX GET request
    $.ajax({
        method: "GET",
        dataType: 'json',
        url: path,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        success: function ( data ) {
            callback(data);
        },
        error: function (xhr, status, err) {
            callback('error');
            console.log('Request Error:');
            console.log('______________');
            console.log(xhr);
            console.log(status);
            console.log(err);
            console.log('______________');
        }
    });

}

function postRequest(path, callback, body) {    
    // standard AJAX POST request
    $.ajax({
        method: "POST",
        dataType: 'json',
        url: path,
        data: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        success: function ( data ) {
            callback(data);
        },
        error: function (xhr, status, err) {
            callback('error');
            console.log('Request Error:');
            console.log('______________');
            console.log(xhr);
            console.log(status);
            console.log(err);
            console.log('______________');
        }   
    });
}

var SERVICES = {

    brightCove: {

        best_available_source: function ( api_obj ) {
            var sources = api_obj.sources;
            var i = sources.length;

            // remove non-mp4 files
            while( i-- ) {
                if ( sources[i].container !== "MP4" || sources[i].src === undefined ) {
                    sources.splice(i, 1);
                } else if ( sources[i].src.indexOf('https') < 0 ) {
                    sources.splice(i, 1);
                }
            }

            sources = sources.sort(this.size);

            if ( BLOOMIES !== undefined && BLOOMIES.isMobile ) {
                // mobile bitrate source
                var source_value = 999999999999999;
                var source_index = 0;
                for ( var m = 0; m < sources.length; m++ ) {
                    if ( sources[m].avg_bitrate < source_value ) {
                        source_value = sources[m].avg_bitrate;
                        source_index = m;
                    }
                }
                
                return sources[ source_index ].src;

            } else {
                // desktop bitrate source

                var source_value = 0;
                var source_index = 0;
                for ( var d = 0; d < sources.length; d++ ) {
                    if ( sources[d].avg_bitrate > source_value ) {
                        source_value = sources[d].avg_bitrate;
                        source_index = d;
                    }
                }
                
                return sources[ source_index ].src;
            }
        },

        sortBySize: function (a, b) {
            return a.size - b.size;
        },

        video_data: function (callback, video_id) {
            // var path = "//api.brightcove.com/services/library?command=find_video_by_id&video_id="+video_id+"&video_fields=FLVURL&media_delivery=http&token=2uKb24EVrCM2ytEfXsGX91YC2eB41If1K6i82P-j9GATvAlc5o-kKg..";
            var account_id = 75934411001;
            var policy_key = 'BCpkADawqM0NvUfP8kau23tpJMWdg09UoT0lqv-Aoqc98Q-ug4rTtp17hA99TA9yLT4-SJm-oIpkYExCvnGqb1fpbxMZM1Y8Yy1Hol4HdRpWGuJHGskT_7155ak';
            var path = 'https://edge.api.brightcove.com/playback/v1/accounts/'+account_id+'/videos/'+video_id;

            $.ajax({
                type: "GET",
                url: path,
                cache: false,
                contentType: 'application/json',
                crossDomain: true,
                processData: true,
                headers: {          
                  Accept: 'application/json;pk='+policy_key,  
                },
                
                success: function (res) {
                    callback(res);
                },
                error: function (xhr, status, errorThrown) {
                    console.log(errorThrown + '\n' + status + '\n' + xhr.statusText);
                }

            });
        },
    },

    category: {

        index: function(callback, catID) {
            // Index is a call for basic information about a category by its ID.
            // catID can be a single ID or multiple, comma-separated IDs
            var path = '/b/v3/catalog/category/index?category=' + catID + '&depth=1';
            getRequest(path, function(result) {
                callback(result);
            });
        },

        browse: function(callback, catID) {
            var path = '/b/v3/catalog/category/' + catID;
            getRequest(path, function(result) {
                callback(result);
            });
        },

        brandIndex: function(callback, catID, referenceID) {
            var path = '/b/v4/catalog/category/brandindex/' + catID + '?refcatid=' + referenceID;
            getRequest(path, function(result) {
                callback(result);
            });
        },

        browseProduct: function(callback, catID, resultsPerPage, sortby, currentPage) {
            // browseProduct is a call for product information based on a category call.
            // catID must be a single category ID.

            if (resultsPerPage == undefined) resultsPerPage = 96;
            if (currentPage == undefined) currentPage = 1;
            if (sortby == undefined) {
                sortby = '';
            } else {
                sortby = "&sortby=" + sortby;
            }

            var path = '/b/v3/catalog/category/' + catID + '/browseproducts?resultsperpage=' + resultsPerPage + '&currentpage=' + currentPage + sortby;
            getRequest(path, function(result) {
                callback(result);
            });
        }

    },

    product: {
        get: function(callback, prodID ) {
            var path = '/b/v4/catalog/product/' + prodID + '(productdetails,upcs(upcdetails),productcategory,reviews,rebates,promotions,categoryids)?retrieveallupcs=true';
            getRequest(path, function(result) {
                callback(result);
            });
        },

        upcGet: function(callback, upcID ) {
            var path = '/b/v4/catalog/product/upc/' + upcID + '(productdetails,upcs(upcdetails),productcategory,reviews,rebates,promotions,categoryids)?retrieveallupcs=true';
            getRequest(path, function(result) {
                callback(result);
            });
        },
    },

    user: {
        get: function() {
            $.ajax({
                method: 'GET',
                dataType: 'json',
                url: '/b/v2/user',
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

        get: function(callback, userID, userGuid, bagId, bagGuid, promocode, bagOptions) {
            var params = [];

            if (userID != undefined && userID != '') {
                userID = 'userid=' + userID;
                params.push(userID);
            }

            if (userGuid != undefined && userGuid != '' ) {
                userGuid = 'user_guid=' + userGuid;
                params.push(userGuid);
            }

            if (bagId != undefined && bagId != ''  ) {
                bagId = 'bagId=' + bagId;
                params.push(bagId);
            }

            if (bagGuid != undefined && bagGuid != '' ) {
                bagGuid = 'bagGuid=' + bagGuid;
                params.push(bagGuid);
            }

            if (promocode != undefined && promocode != '' ) {
                promocode = 'promocode=' + promocode;
                params.push(promocode);
            }

            if (bagOptions != undefined && bagOptions != '' ) {
                bagOptions = 'userid=' + bagOptions;
                params.push(bagOptions);
            }

            var path = '/b/getBag/order/v1/bags?' + params.join("&");
            getRequest(path, function(result) {
                callback(result);
            });

        },

        add: function(callback, upcId, quantity, userId) {
            var path = "/b/addToBag/";
            var body = {};

            if (userId != undefined && userId != '') path += "?userid="+userId;

            // if (upcId != undefined) {
            //     body.item['upcId'] = upcId;
            // }

            // if (Quantity != undefined) {
            //     body.item['quantity'] = Quantity;
            // }

            // if (promocode != undefined) {
            //     body.item['promocode'] = promocode;
            // }

            // if (RegistryID != undefined) {
            //     body.item['registryID'] = RegistryID;
            // }

            // if (WishlistID != undefined) {
            //     body.item['wishlistID'] = WishlistID;
            // }

            body.item = {
                    "quantity":quantity, 
                    "upcId":upcId 
                 };

            postRequest(path, function(result) {
                callback(result);
            }, body);

        },

        count: function() {
            $.ajax({
                method: 'GET',
                dataType: 'json',
                url: '/b/v2/shoppingbag/bagItemCount',
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

/* jshint ignore:end */

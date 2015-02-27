
if (typeof BLOOMIES === "undefined" || !BLOOMIES) {
    var BLOOMIES = {};
}

if(!BLOOMIES.namespace){
    /** Adapted namespacing code from core YUI YAHOO Singleton. Provides for
     * namespacing with BLOOMIES as the root package.
     *
     * @method namespace
     * @param  {String*} arguments 1-n namespaces to create
     * @return {Object}  A reference to the last namespace object created
     * @static
     */
    BLOOMIES.namespace = function() {
        var a=arguments, o=null, i, j, d;
        for (i=0; i<a.length; i=i+1) {
            d=a[i].split(".");
            o=BLOOMIES;

            // BLOOMIES is implied, so it is ignored if it is included
            for (j=(d[0] == "BLOOMIES") ? 1 : 0; j<d.length; j=j+1) {
                o[d[j]]=o[d[j]] || {};
                o=o[d[j]];
            }
        }
        return o;
    };
}

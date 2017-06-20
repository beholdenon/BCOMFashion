function onReady(e) {
    document.removeEventListener("DOMContentLoaded", onReady), Distilled.core = new Distilled.Core;
    var a = new Distilled.View;
    Distilled.core.loaded()
}! function() {
    this.Distilled = this.Distilled || {};
    var e = function(e, a, n) {
        this._init(e, a, n)
    };
    return e.prototype = {
        mData: null,
        mMonths: null,
        mPerfectFactorSummer: null,
        mPerfectFactorSpring: null,
        mPerfectFactorWinter: null,
        mPerfectFactorAutumn: null,
        mPerfectDay: null,
        mPerfectDaySummer: null,
        mPerfectDaySpring: null,
        mPerfectDayWinter: null,
        mPerfectDayAutumn: null,
        load: function(e) {
            this._load(e)
        },
        setDay: function(e, a) {
            if (!this.mData) return null;
            var n = $(e),
                i = new Date(a),
                l = i.getMonth(),
                t = i.getDate() - 1,
                o = i.getFullYear(),
                s = this.mMonths[l],
                d = s[t],
                u = "highlight_" + d.colour;
            1 == d.isPerfectDay && o == d.year && (u += " perfect_day");
            var m = n.parent();
            m.data("day", d), m.addClass(u)
        },
        getLocationTitle: function() {
            return this.mData.name
        },
        getTwitterDate: function() {
            var e = this.mPerfectDaySummer.date;
            return e.format("mmm d")
        },
        getPerfectDay: function() {
            var e = this.mPerfectDay;
            return e.dateHTML = this._formatDate(e.date) + "<span class='asterisk'>&#42;</span>", e
        },
        getPerfectSummer: function() {
            var e = this.mPerfectDaySummer.date;
            return this._formatDate(e)
        },
        getPerfectSpring: function() {
            var e = this.mPerfectDaySpring.date;
            return this._formatDate(e)
        },
        getPerfectAutumn: function() {
            var e = this.mPerfectDayAutumn.date;
            return this._formatDate(e)
        },
        getPerfectWinter: function() {
            var e = this.mPerfectDayWinter.date;
            return this._formatDate(e)
        },
        _init: function(e, a, n) {
            this.mCompleteCallback = e, this.mErrorCallback = a, this.mCallbackScope = n
        },
        _format: function(e) {
            this.mData = e, this._calculateScore(), this._getMonths(), this.mCompleteCallback.call(this.mCallbackScope)
        },
        _calculateScore: function() {
            for (var e = this.mData.months, a = e.length, n, i, l, t = Math.abs, o = null, s = null, d, u, m = new Date, r = m.getDate(), g = m.getMonth(), c = m.getFullYear(), h, p, f, C = 0; C < a; C++) {
                n = e[C], i = parseInt(n.id) - 1, days = n.days, totalDays = days.length;
                for (var y = 0; y < totalDays; y++) p = new Date(h, i, y + 1), f = p.getDay(), h = i == g && f <= r ? c + 1 : i < g ? c + 1 : c, l = days[y], d = t(parseFloat(l.perfectFactor)), l.perfectFactor = d, l.isWeekend = !1, l.isPerfectDay = !1, l.date = p, l.id = y, l.month = C, l.year = h, l.humidity = (100 * l.humidity).toFixed(1), l.chanceClear = (100 * l.chanceClear).toFixed(1), l.chanceRain = (100 * l.chanceRain).toFixed(1), 6 != f && 0 != f || (l.isWeekend = !0, i >= 2 && i <= 4 ? (null == this.mPerfectFactorSpring || d < this.mPerfectFactorSpring) && (this.mPerfectFactorSpring = d, this.mPerfectDaySpring = l) : i >= 5 && i <= 7 ? (null == this.mPerfectFactorSummer || d < this.mPerfectFactorSummer) && (this.mPerfectFactorSummer = d, this.mPerfectDaySummer = l) : i >= 8 && i <= 10 ? (null == this.mPerfectFactorAutumn || d < this.mPerfectFactorAutumn) && (this.mPerfectFactorAutumn = d, this.mPerfectDayAutumn = l) : 0 != i && 1 != i && 11 != i || (null == this.mPerfectFactorWinter || d < this.mPerfectFactorWinter) && (this.mPerfectFactorWinter = d, this.mPerfectDayWinter = l), (null == o || d < o) && (o = d), (null == s || d > s) && (s = d))
            }
            this.mPerfectDaySummer.season = "summer", this.mPerfectDaySpring.season = "spring", this.mPerfectDayAutumn.season = "fall", this.mPerfectDayWinter.season = "winter";
            var A = this.mPerfectDaySummer;
            this.mPerfectDaySpring.perfectFactor < A.perfectFactor && (A = this.mPerfectDaySpring), this.mPerfectDayAutumn.perfectFactor < A.perfectFactor && (A = this.mPerfectDayAutumn), this.mPerfectDayWinter.perfectFactor < A.perfectFactor && (A = this.mPerfectDayWinter), A.isPerfectDay = !0, this.mPerfectDay = A
        },
        _getMonths: function() {
            for (var e = this.mData.months, a = {}, n, i, l = e.length, t = 0; t < l; t++) n = e[t], i = parseInt(n.id) - 1, a[i] = n.days;
            this.mMonths = a
        },
        _sortByName: function(e, a) {
            return e.name < a.name ? -1 : e.name > a.name ? 1 : 0
        },
        _load: function(e) {
            this._reset();
            var a = window.location.origin;
            window.location.origin || (a = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : ""));
            var n = a + window.location.pathname + "/b/fashion/assets/best-wedding-dates-united-states/" + e + ".json",
                i = this;
            $.ajax({
                dataType: "json",
                url: n,
                success: function(e) {
                    i._format(e)
                },
                fail: function(e, a) {
                    i._error()
                }
            })
        },
        _reset: function() {
            this.mData = null, this.mMonths = null, this.mPerfectFactorSummer = null, this.mPerfectFactorSpring = null, this.mPerfectFactorWinter = null, this.mPerfectFactorAutumn = null, this.mPerfectDaySummer = null, this.mPerfectDaySpring = null, this.mPerfectDayWinter = null, this.mPerfectDayAutumn = null
        },
        _error: function() {
            this.mErrorCallback.call(this.mCallbackScope)
        },
        _formatDate: function(e) {
            var a = "",
                n = e.format("mmmm dS"),
                i = e.format("yyyy");
            return "<span class='month'>" + n + ",</span> <span class='year'>" + i + "</span>"
        }
    }, this.Distilled.Location = e, e
}(),
function() {
    this.Distilled = this.Distilled || {};
    var e = function() {
        this._init()
    };
    return e.prototype = {
        mData: null,
        getData: function() {
            for (var e = [], a = this.mData, n = a.length, i = 0; i < n; i++) e.push(a[i].name);
            return e
        },
        getComboHTML: function() {
            for (var e = this.mData, a = e.length, n = '<option value="">Select a location...</option>', i, l, t = 0; t < a; t++) i = e[t].slug, l = e[t].name, n += '<option value="' + i + '">' + l + "</option>";
            return n
        },
        find: function(e) {
            if (!e) return null;
            for (var a = this.mData, n = a.length, i = null, l = 0; l < n; l++)
                if (a[l].slug == e || a[l].name == e) {
                    i = a[l];
                    break
                }
            return i
        },
        _init: function() {
            this._load()
        },
        _format: function(e) {
            this.mData = e, this.mData.sort(this._sortByName)
        },
        _sortByName: function(e, a) {
            return e.name < a.name ? -1 : e.name > a.name ? 1 : 0
        },
        _load: function() {
            this._format([{
                slug: "abilene-tx",
                id: 0,
                name: "Abilene, TX"
            }, {
                slug: "addison-il",
                id: 1,
                name: "Addison, IL"
            }, {
                slug: "akron-oh",
                id: 2,
                name: "Akron, OH"
            }, {
                slug: "alameda-ca",
                id: 3,
                name: "Alameda, CA"
            }, {
                slug: "albany-ga",
                id: 4,
                name: "Albany, GA"
            }, {
                slug: "albany-ny",
                id: 5,
                name: "Albany, NY"
            }, {
                slug: "albany-or",
                id: 6,
                name: "Albany, OR"
            }, {
                slug: "albuquerque-nm",
                id: 7,
                name: "Albuquerque, NM"
            }, {
                slug: "alexandria-la",
                id: 8,
                name: "Alexandria, LA"
            }, {
                slug: "alexandria-va",
                id: 9,
                name: "Alexandria, VA"
            }, {
                slug: "alhambra-ca",
                id: 10,
                name: "Alhambra, CA"
            }, {
                slug: "aliso-viejo-ca",
                id: 11,
                name: "Aliso Viejo, CA"
            }, {
                slug: "allen-tx",
                id: 12,
                name: "Allen, TX"
            }, {
                slug: "allentown-pa",
                id: 13,
                name: "Allentown, PA"
            }, {
                slug: "alpharetta-ga",
                id: 14,
                name: "Alpharetta, GA"
            }, {
                slug: "altamonte-springs-fl",
                id: 15,
                name: "Altamonte Springs, FL"
            }, {
                slug: "altoona-pa",
                id: 16,
                name: "Altoona, PA"
            }, {
                slug: "amarillo-tx",
                id: 17,
                name: "Amarillo, TX"
            }, {
                slug: "ames-ia",
                id: 18,
                name: "Ames, IA"
            }, {
                slug: "anaheim-ca",
                id: 19,
                name: "Anaheim, CA"
            }, {
                slug: "anchorage-ak",
                id: 20,
                name: "Anchorage, AK"
            }, {
                slug: "anderson-in",
                id: 21,
                name: "Anderson, IN"
            }, {
                slug: "ankeny-ia",
                id: 22,
                name: "Ankeny, IA"
            }, {
                slug: "ann-arbor-mi",
                id: 23,
                name: "Ann Arbor, MI"
            }, {
                slug: "annapolis-md",
                id: 24,
                name: "Annapolis, MD"
            }, {
                slug: "antioch-ca",
                id: 25,
                name: "Antioch, CA"
            }, {
                slug: "apache-junction-az",
                id: 26,
                name: "Apache Junction, AZ"
            }, {
                slug: "apex-nc",
                id: 27,
                name: "Apex, NC"
            }, {
                slug: "apopka-fl",
                id: 28,
                name: "Apopka, FL"
            }, {
                slug: "apple-valley-ca",
                id: 29,
                name: "Apple Valley, CA"
            }, {
                slug: "apple-valley-mn",
                id: 30,
                name: "Apple Valley, MN"
            }, {
                slug: "appleton-wi",
                id: 31,
                name: "Appleton, WI"
            }, {
                slug: "arcadia-ca",
                id: 32,
                name: "Arcadia, CA"
            }, {
                slug: "arlington-heights-il",
                id: 33,
                name: "Arlington Heights, IL"
            }, {
                slug: "arlington-tx",
                id: 34,
                name: "Arlington, TX"
            }, {
                slug: "arvada-co",
                id: 35,
                name: "Arvada, CO"
            }, {
                slug: "asheville-nc",
                id: 36,
                name: "Asheville, NC"
            }, {
                slug: "athens-ga",
                id: 37,
                name: "Athens, GA"
            }, {
                slug: "atlanta-ga",
                id: 38,
                name: "Atlanta, GA"
            }, {
                slug: "atlantic-city-nj",
                id: 39,
                name: "Atlantic City, NJ"
            }, {
                slug: "attleboro-ma",
                id: 40,
                name: "Attleboro, MA"
            }, {
                slug: "auburn-al",
                id: 41,
                name: "Auburn, AL"
            }, {
                slug: "auburn-wa",
                id: 42,
                name: "Auburn, WA"
            }, {
                slug: "augusta-ga",
                id: 43,
                name: "Augusta, GA"
            }, {
                slug: "aurora-co",
                id: 44,
                name: "Aurora, CO"
            }, {
                slug: "aurora-il",
                id: 45,
                name: "Aurora, IL"
            }, {
                slug: "austin-tx",
                id: 46,
                name: "Austin, TX"
            }, {
                slug: "aventura-fl",
                id: 47,
                name: "Aventura, FL"
            }, {
                slug: "avondale-az",
                id: 48,
                name: "Avondale, AZ"
            }, {
                slug: "azusa-ca",
                id: 49,
                name: "Azusa, CA"
            }, {
                slug: "bakersfield-ca",
                id: 50,
                name: "Bakersfield, CA"
            }, {
                slug: "baldwin-park-ca",
                id: 51,
                name: "Baldwin Park, CA"
            }, {
                slug: "baltimore-md",
                id: 52,
                name: "Baltimore, MD"
            }, {
                slug: "barnstable-town-ma",
                id: 53,
                name: "Barnstable Town, MA"
            }, {
                slug: "bartlett-il",
                id: 54,
                name: "Bartlett, IL"
            }, {
                slug: "bartlett-tn",
                id: 55,
                name: "Bartlett, TN"
            }, {
                slug: "baton-rouge-la",
                id: 56,
                name: "Baton Rouge, LA"
            }, {
                slug: "battle-creek-mi",
                id: 57,
                name: "Battle Creek, MI"
            }, {
                slug: "bayonne-nj",
                id: 58,
                name: "Bayonne, NJ"
            }, {
                slug: "baytown-tx",
                id: 59,
                name: "Baytown, TX"
            }, {
                slug: "beaumont-ca",
                id: 60,
                name: "Beaumont, CA"
            }, {
                slug: "beaumont-tx",
                id: 61,
                name: "Beaumont, TX"
            }, {
                slug: "beavercreek-oh",
                id: 62,
                name: "Beavercreek, OH"
            }, {
                slug: "beaverton-or",
                id: 63,
                name: "Beaverton, OR"
            }, {
                slug: "bedford-tx",
                id: 64,
                name: "Bedford, TX"
            }, {
                slug: "bell-gardens-ca",
                id: 65,
                name: "Bell Gardens, CA"
            }, {
                slug: "belleville-il",
                id: 66,
                name: "Belleville, IL"
            }, {
                slug: "bellevue-ne",
                id: 67,
                name: "Bellevue, NE"
            }, {
                slug: "bellevue-wa",
                id: 68,
                name: "Bellevue, WA"
            }, {
                slug: "bellflower-ca",
                id: 69,
                name: "Bellflower, CA"
            }, {
                slug: "bellingham-wa",
                id: 70,
                name: "Bellingham, WA"
            }, {
                slug: "beloit-wi",
                id: 71,
                name: "Beloit, WI"
            }, {
                slug: "bend-or",
                id: 72,
                name: "Bend, OR"
            }, {
                slug: "bentonville-ar",
                id: 73,
                name: "Bentonville, AR"
            }, {
                slug: "berkeley-ca",
                id: 74,
                name: "Berkeley, CA"
            }, {
                slug: "berwyn-il",
                id: 75,
                name: "Berwyn, IL"
            }, {
                slug: "bethlehem-pa",
                id: 76,
                name: "Bethlehem, PA"
            }, {
                slug: "beverly-ma",
                id: 77,
                name: "Beverly, MA"
            }, {
                slug: "billings-mt",
                id: 78,
                name: "Billings, MT"
            }, {
                slug: "biloxi-ms",
                id: 79,
                name: "Biloxi, MS"
            }, {
                slug: "binghamton-ny",
                id: 80,
                name: "Binghamton, NY"
            }, {
                slug: "birmingham-al",
                id: 81,
                name: "Birmingham, AL"
            }, {
                slug: "bismarck-nd",
                id: 82,
                name: "Bismarck, ND"
            }, {
                slug: "blacksburg-va",
                id: 83,
                name: "Blacksburg, VA"
            }, {
                slug: "blaine-mn",
                id: 84,
                name: "Blaine, MN"
            }, {
                slug: "bloomington-il",
                id: 85,
                name: "Bloomington, IL"
            }, {
                slug: "bloomington-in",
                id: 86,
                name: "Bloomington, IN"
            }, {
                slug: "bloomington-mn",
                id: 87,
                name: "Bloomington, MN"
            }, {
                slug: "blue-springs-mo",
                id: 88,
                name: "Blue Springs, MO"
            }, {
                slug: "boca-raton-fl",
                id: 89,
                name: "Boca Raton, FL"
            }, {
                slug: "boise-city-id",
                id: 90,
                name: "Boise City, ID"
            }, {
                slug: "bolingbrook-il",
                id: 91,
                name: "Bolingbrook, IL"
            }, {
                slug: "bonita-springs-fl",
                id: 92,
                name: "Bonita Springs, FL"
            }, {
                slug: "bossier-city-la",
                id: 93,
                name: "Bossier City, LA"
            }, {
                slug: "boston-ma",
                id: 94,
                name: "Boston, MA"
            }, {
                slug: "boulder-co",
                id: 95,
                name: "Boulder, CO"
            }, {
                slug: "bountiful-ut",
                id: 96,
                name: "Bountiful, UT"
            }, {
                slug: "bowie-md",
                id: 97,
                name: "Bowie, MD"
            }, {
                slug: "bowling-green-ky",
                id: 98,
                name: "Bowling Green, KY"
            }, {
                slug: "boynton-beach-fl",
                id: 99,
                name: "Boynton Beach, FL"
            }, {
                slug: "bozeman-mt",
                id: 100,
                name: "Bozeman, MT"
            }, {
                slug: "bradenton-fl",
                id: 101,
                name: "Bradenton, FL"
            }, {
                slug: "brea-ca",
                id: 102,
                name: "Brea, CA"
            }, {
                slug: "bremerton-wa",
                id: 103,
                name: "Bremerton, WA"
            }, {
                slug: "brentwood-ca",
                id: 104,
                name: "Brentwood, CA"
            }, {
                slug: "brentwood-tn",
                id: 105,
                name: "Brentwood, TN"
            }, {
                slug: "bridgeport-ct",
                id: 106,
                name: "Bridgeport, CT"
            }, {
                slug: "bristol-ct",
                id: 107,
                name: "Bristol, CT"
            }, {
                slug: "brockton-ma",
                id: 108,
                name: "Brockton, MA"
            }, {
                slug: "broken-arrow-ok",
                id: 109,
                name: "Broken Arrow, OK"
            }, {
                slug: "brookfield-wi",
                id: 110,
                name: "Brookfield, WI"
            }, {
                slug: "brookhaven-ga",
                id: 111,
                name: "Brookhaven, GA"
            }, {
                slug: "brooklyn-park-mn",
                id: 112,
                name: "Brooklyn Park, MN"
            }, {
                slug: "broomfield-co",
                id: 113,
                name: "Broomfield, CO"
            }, {
                slug: "brownsville-tx",
                id: 114,
                name: "Brownsville, TX"
            }, {
                slug: "bryan-tx",
                id: 115,
                name: "Bryan, TX"
            }, {
                slug: "buckeye-az",
                id: 116,
                name: "Buckeye, AZ"
            }, {
                slug: "buena-park-ca",
                id: 117,
                name: "Buena Park, CA"
            }, {
                slug: "buffalo-grove-il",
                id: 118,
                name: "Buffalo Grove, IL"
            }, {
                slug: "buffalo-ny",
                id: 119,
                name: "Buffalo, NY"
            }, {
                slug: "bullhead-city-az",
                id: 120,
                name: "Bullhead City, AZ"
            }, {
                slug: "burbank-ca",
                id: 121,
                name: "Burbank, CA"
            }, {
                slug: "burien-wa",
                id: 122,
                name: "Burien, WA"
            }, {
                slug: "burleson-tx",
                id: 123,
                name: "Burleson, TX"
            }, {
                slug: "burlington-nc",
                id: 124,
                name: "Burlington, NC"
            }, {
                slug: "burlington-vt",
                id: 125,
                name: "Burlington, VT"
            }, {
                slug: "burnsville-mn",
                id: 126,
                name: "Burnsville, MN"
            }, {
                slug: "caldwell-id",
                id: 127,
                name: "Caldwell, ID"
            }, {
                slug: "calexico-ca",
                id: 128,
                name: "Calexico, CA"
            }, {
                slug: "calumet-city-il",
                id: 129,
                name: "Calumet City, IL"
            }, {
                slug: "camarillo-ca",
                id: 130,
                name: "Camarillo, CA"
            }, {
                slug: "cambridge-ma",
                id: 131,
                name: "Cambridge, MA"
            }, {
                slug: "camden-nj",
                id: 132,
                name: "Camden, NJ"
            }, {
                slug: "campbell-ca",
                id: 133,
                name: "Campbell, CA"
            }, {
                slug: "canton-oh",
                id: 134,
                name: "Canton, OH"
            }, {
                slug: "cape-coral-fl",
                id: 135,
                name: "Cape Coral, FL"
            }, {
                slug: "cape-girardeau-mo",
                id: 136,
                name: "Cape Girardeau, MO"
            }, {
                slug: "carlsbad-ca",
                id: 137,
                name: "Carlsbad, CA"
            }, {
                slug: "carmel-in",
                id: 138,
                name: "Carmel, IN"
            }, {
                slug: "carol-stream-il",
                id: 139,
                name: "Carol Stream, IL"
            }, {
                slug: "carpentersville-il",
                id: 140,
                name: "Carpentersville, IL"
            }, {
                slug: "carrollton-tx",
                id: 141,
                name: "Carrollton, TX"
            }, {
                slug: "carson-city-nv",
                id: 142,
                name: "Carson City, NV"
            }, {
                slug: "carson-ca",
                id: 143,
                name: "Carson, CA"
            }, {
                slug: "cary-nc",
                id: 144,
                name: "Cary, NC"
            }, {
                slug: "casa-grande-az",
                id: 145,
                name: "Casa Grande, AZ"
            }, {
                slug: "casper-wy",
                id: 146,
                name: "Casper, WY"
            }, {
                slug: "castle-rock-co",
                id: 147,
                name: "Castle Rock, CO"
            }, {
                slug: "cathedral-city-ca",
                id: 148,
                name: "Cathedral City, CA"
            }, {
                slug: "cedar-falls-ia",
                id: 149,
                name: "Cedar Falls, IA"
            }, {
                slug: "cedar-hill-tx",
                id: 150,
                name: "Cedar Hill, TX"
            }, {
                slug: "cedar-park-tx",
                id: 151,
                name: "Cedar Park, TX"
            }, {
                slug: "cedar-rapids-ia",
                id: 152,
                name: "Cedar Rapids, IA"
            }, {
                slug: "centennial-co",
                id: 153,
                name: "Centennial, CO"
            }, {
                slug: "ceres-ca",
                id: 154,
                name: "Ceres, CA"
            }, {
                slug: "cerritos-ca",
                id: 155,
                name: "Cerritos, CA"
            }, {
                slug: "champaign-il",
                id: 156,
                name: "Champaign, IL"
            }, {
                slug: "chandler-az",
                id: 157,
                name: "Chandler, AZ"
            }, {
                slug: "chapel-hill-nc",
                id: 158,
                name: "Chapel Hill, NC"
            }, {
                slug: "charleston-sc",
                id: 159,
                name: "Charleston, SC"
            }, {
                slug: "charleston-wv",
                id: 160,
                name: "Charleston, WV"
            }, {
                slug: "charlotte-nc",
                id: 161,
                name: "Charlotte, NC"
            }, {
                slug: "charlottesville-va",
                id: 162,
                name: "Charlottesville, VA"
            }, {
                slug: "chattanooga-tn",
                id: 163,
                name: "Chattanooga, TN"
            }, {
                slug: "chelsea-ma",
                id: 164,
                name: "Chelsea, MA"
            }, {
                slug: "chesapeake-va",
                id: 165,
                name: "Chesapeake, VA"
            }, {
                slug: "chesterfield-mo",
                id: 166,
                name: "Chesterfield, MO"
            }, {
                slug: "cheyenne-wy",
                id: 167,
                name: "Cheyenne, WY"
            }, {
                slug: "chicago-il",
                id: 168,
                name: "Chicago, IL"
            }, {
                slug: "chico-ca",
                id: 169,
                name: "Chico, CA"
            }, {
                slug: "chicopee-ma",
                id: 170,
                name: "Chicopee, MA"
            }, {
                slug: "chino-hills-ca",
                id: 171,
                name: "Chino Hills, CA"
            }, {
                slug: "chino-ca",
                id: 172,
                name: "Chino, CA"
            }, {
                slug: "chula-vista-ca",
                id: 173,
                name: "Chula Vista, CA"
            }, {
                slug: "cicero-il",
                id: 174,
                name: "Cicero, IL"
            }, {
                slug: "cincinnati-oh",
                id: 175,
                name: "Cincinnati, OH"
            }, {
                slug: "citrus-heights-ca",
                id: 176,
                name: "Citrus Heights, CA"
            }, {
                slug: "clarksville-tn",
                id: 177,
                name: "Clarksville, TN"
            }, {
                slug: "clearwater-fl",
                id: 178,
                name: "Clearwater, FL"
            }, {
                slug: "cleveland-heights-oh",
                id: 179,
                name: "Cleveland Heights, OH"
            }, {
                slug: "cleveland-oh",
                id: 180,
                name: "Cleveland, OH"
            }, {
                slug: "cleveland-tn",
                id: 181,
                name: "Cleveland, TN"
            }, {
                slug: "clifton-nj",
                id: 182,
                name: "Clifton, NJ"
            }, {
                slug: "clovis-ca",
                id: 183,
                name: "Clovis, CA"
            }, {
                slug: "clovis-nm",
                id: 184,
                name: "Clovis, NM"
            }, {
                slug: "coachella-ca",
                id: 185,
                name: "Coachella, CA"
            }, {
                slug: "coconut-creek-fl",
                id: 186,
                name: "Coconut Creek, FL"
            }, {
                slug: "coeur-d-alene-id",
                id: 187,
                name: "Coeur d'Alene, ID"
            }, {
                slug: "college-station-tx",
                id: 188,
                name: "College Station, TX"
            }, {
                slug: "collierville-tn",
                id: 189,
                name: "Collierville, TN"
            }, {
                slug: "colorado-springs-co",
                id: 190,
                name: "Colorado Springs, CO"
            }, {
                slug: "colton-ca",
                id: 191,
                name: "Colton, CA"
            }, {
                slug: "columbia-mo",
                id: 192,
                name: "Columbia, MO"
            }, {
                slug: "columbia-sc",
                id: 193,
                name: "Columbia, SC"
            }, {
                slug: "columbus-ga",
                id: 194,
                name: "Columbus, GA"
            }, {
                slug: "columbus-in",
                id: 195,
                name: "Columbus, IN"
            }, {
                slug: "columbus-oh",
                id: 196,
                name: "Columbus, OH"
            }, {
                slug: "commerce-city-co",
                id: 197,
                name: "Commerce City, CO"
            }, {
                slug: "compton-ca",
                id: 198,
                name: "Compton, CA"
            }, {
                slug: "concord-ca",
                id: 199,
                name: "Concord, CA"
            }, {
                slug: "concord-nc",
                id: 200,
                name: "Concord, NC"
            }, {
                slug: "concord-nh",
                id: 201,
                name: "Concord, NH"
            }, {
                slug: "conroe-tx",
                id: 202,
                name: "Conroe, TX"
            }, {
                slug: "conway-ar",
                id: 203,
                name: "Conway, AR"
            }, {
                slug: "coon-rapids-mn",
                id: 204,
                name: "Coon Rapids, MN"
            }, {
                slug: "coppell-tx",
                id: 205,
                name: "Coppell, TX"
            }, {
                slug: "coral-gables-fl",
                id: 206,
                name: "Coral Gables, FL"
            }, {
                slug: "coral-springs-fl",
                id: 207,
                name: "Coral Springs, FL"
            }, {
                slug: "corona-ca",
                id: 208,
                name: "Corona, CA"
            }, {
                slug: "corpus-christi-tx",
                id: 209,
                name: "Corpus Christi, TX"
            }, {
                slug: "corvallis-or",
                id: 210,
                name: "Corvallis, OR"
            }, {
                slug: "costa-mesa-ca",
                id: 211,
                name: "Costa Mesa, CA"
            }, {
                slug: "council-bluffs-ia",
                id: 212,
                name: "Council Bluffs, IA"
            }, {
                slug: "covina-ca",
                id: 213,
                name: "Covina, CA"
            }, {
                slug: "covington-ky",
                id: 214,
                name: "Covington, KY"
            }, {
                slug: "cranston-ri",
                id: 215,
                name: "Cranston, RI"
            }, {
                slug: "crystal-lake-il",
                id: 216,
                name: "Crystal Lake, IL"
            }, {
                slug: "culver-city-ca",
                id: 217,
                name: "Culver City, CA"
            }, {
                slug: "cupertino-ca",
                id: 218,
                name: "Cupertino, CA"
            }, {
                slug: "cutler-bay-fl",
                id: 219,
                name: "Cutler Bay, FL"
            }, {
                slug: "cuyahoga-falls-oh",
                id: 220,
                name: "Cuyahoga Falls, OH"
            }, {
                slug: "cypress-ca",
                id: 221,
                name: "Cypress, CA"
            }, {
                slug: "dallas-tx",
                id: 222,
                name: "Dallas, TX"
            }, {
                slug: "daly-city-ca",
                id: 223,
                name: "Daly City, CA"
            }, {
                slug: "danbury-ct",
                id: 224,
                name: "Danbury, CT"
            }, {
                slug: "danville-ca",
                id: 225,
                name: "Danville, CA"
            }, {
                slug: "danville-va",
                id: 226,
                name: "Danville, VA"
            }, {
                slug: "davenport-ia",
                id: 227,
                name: "Davenport, IA"
            }, {
                slug: "davie-fl",
                id: 228,
                name: "Davie, FL"
            }, {
                slug: "davis-ca",
                id: 229,
                name: "Davis, CA"
            }, {
                slug: "dayton-oh",
                id: 230,
                name: "Dayton, OH"
            }, {
                slug: "daytona-beach-fl",
                id: 231,
                name: "Daytona Beach, FL"
            }, {
                slug: "dekalb-il",
                id: 232,
                name: "DeKalb, IL"
            }, {
                slug: "desoto-tx",
                id: 233,
                name: "DeSoto, TX"
            }, {
                slug: "dearborn-heights-mi",
                id: 234,
                name: "Dearborn Heights, MI"
            }, {
                slug: "dearborn-mi",
                id: 235,
                name: "Dearborn, MI"
            }, {
                slug: "decatur-al",
                id: 236,
                name: "Decatur, AL"
            }, {
                slug: "decatur-il",
                id: 237,
                name: "Decatur, IL"
            }, {
                slug: "deerfield-beach-fl",
                id: 238,
                name: "Deerfield Beach, FL"
            }, {
                slug: "delano-ca",
                id: 239,
                name: "Delano, CA"
            }, {
                slug: "delray-beach-fl",
                id: 240,
                name: "Delray Beach, FL"
            }, {
                slug: "deltona-fl",
                id: 241,
                name: "Deltona, FL"
            }, {
                slug: "denton-tx",
                id: 242,
                name: "Denton, TX"
            }, {
                slug: "denver-co",
                id: 243,
                name: "Denver, CO"
            }, {
                slug: "des-moines-ia",
                id: 244,
                name: "Des Moines, IA"
            }, {
                slug: "des-plaines-il",
                id: 245,
                name: "Des Plaines, IL"
            }, {
                slug: "detroit-mi",
                id: 246,
                name: "Detroit, MI"
            }, {
                slug: "diamond-bar-ca",
                id: 247,
                name: "Diamond Bar, CA"
            }, {
                slug: "doral-fl",
                id: 248,
                name: "Doral, FL"
            }, {
                slug: "dothan-al",
                id: 249,
                name: "Dothan, AL"
            }, {
                slug: "dover-de",
                id: 250,
                name: "Dover, DE"
            }, {
                slug: "downers-grove-il",
                id: 251,
                name: "Downers Grove, IL"
            }, {
                slug: "downey-ca",
                id: 252,
                name: "Downey, CA"
            }, {
                slug: "draper-ut",
                id: 253,
                name: "Draper, UT"
            }, {
                slug: "dublin-ca",
                id: 254,
                name: "Dublin, CA"
            }, {
                slug: "dublin-oh",
                id: 255,
                name: "Dublin, OH"
            }, {
                slug: "dubuque-ia",
                id: 256,
                name: "Dubuque, IA"
            }, {
                slug: "duluth-mn",
                id: 257,
                name: "Duluth, MN"
            }, {
                slug: "duncanville-tx",
                id: 258,
                name: "Duncanville, TX"
            }, {
                slug: "dunwoody-ga",
                id: 259,
                name: "Dunwoody, GA"
            }, {
                slug: "durham-nc",
                id: 260,
                name: "Durham, NC"
            }, {
                slug: "eagan-mn",
                id: 261,
                name: "Eagan, MN"
            }, {
                slug: "east-lansing-mi",
                id: 262,
                name: "East Lansing, MI"
            }, {
                slug: "east-orange-nj",
                id: 263,
                name: "East Orange, NJ"
            }, {
                slug: "east-providence-ri",
                id: 264,
                name: "East Providence, RI"
            }, {
                slug: "eastvale-ca",
                id: 265,
                name: "Eastvale, CA"
            }, {
                slug: "eau-claire-wi",
                id: 266,
                name: "Eau Claire, WI"
            }, {
                slug: "eden-prairie-mn",
                id: 267,
                name: "Eden Prairie, MN"
            }, {
                slug: "edina-mn",
                id: 268,
                name: "Edina, MN"
            }, {
                slug: "edinburg-tx",
                id: 269,
                name: "Edinburg, TX"
            }, {
                slug: "edmond-ok",
                id: 270,
                name: "Edmond, OK"
            }, {
                slug: "edmonds-wa",
                id: 271,
                name: "Edmonds, WA"
            }, {
                slug: "el-cajon-ca",
                id: 272,
                name: "El Cajon, CA"
            }, {
                slug: "el-centro-ca",
                id: 273,
                name: "El Centro, CA"
            }, {
                slug: "el-monte-ca",
                id: 274,
                name: "El Monte, CA"
            }, {
                slug: "el-paso-tx",
                id: 275,
                name: "El Paso, TX"
            }, {
                slug: "elgin-il",
                id: 276,
                name: "Elgin, IL"
            }, {
                slug: "elizabeth-nj",
                id: 277,
                name: "Elizabeth, NJ"
            }, {
                slug: "elk-grove-ca",
                id: 278,
                name: "Elk Grove, CA"
            }, {
                slug: "elkhart-in",
                id: 279,
                name: "Elkhart, IN"
            }, {
                slug: "elmhurst-il",
                id: 280,
                name: "Elmhurst, IL"
            }, {
                slug: "elyria-oh",
                id: 281,
                name: "Elyria, OH"
            }, {
                slug: "encinitas-ca",
                id: 282,
                name: "Encinitas, CA"
            }, {
                slug: "enid-ok",
                id: 283,
                name: "Enid, OK"
            }, {
                slug: "erie-pa",
                id: 284,
                name: "Erie, PA"
            }, {
                slug: "escondido-ca",
                id: 285,
                name: "Escondido, CA"
            }, {
                slug: "euclid-oh",
                id: 286,
                name: "Euclid, OH"
            }, {
                slug: "eugene-or",
                id: 287,
                name: "Eugene, OR"
            }, {
                slug: "euless-tx",
                id: 288,
                name: "Euless, TX"
            }, {
                slug: "evanston-il",
                id: 289,
                name: "Evanston, IL"
            }, {
                slug: "evansville-in",
                id: 290,
                name: "Evansville, IN"
            }, {
                slug: "everett-ma",
                id: 291,
                name: "Everett, MA"
            }, {
                slug: "everett-wa",
                id: 292,
                name: "Everett, WA"
            }, {
                slug: "fairfield-ca",
                id: 293,
                name: "Fairfield, CA"
            }, {
                slug: "fairfield-oh",
                id: 294,
                name: "Fairfield, OH"
            }, {
                slug: "fall-river-ma",
                id: 295,
                name: "Fall River, MA"
            }, {
                slug: "fargo-nd",
                id: 296,
                name: "Fargo, ND"
            }, {
                slug: "farmington-hills-mi",
                id: 297,
                name: "Farmington Hills, MI"
            }, {
                slug: "farmington-nm",
                id: 298,
                name: "Farmington, NM"
            }, {
                slug: "fayetteville-ar",
                id: 299,
                name: "Fayetteville, AR"
            }, {
                slug: "fayetteville-nc",
                id: 300,
                name: "Fayetteville, NC"
            }, {
                slug: "federal-way-wa",
                id: 301,
                name: "Federal Way, WA"
            }, {
                slug: "findlay-oh",
                id: 302,
                name: "Findlay, OH"
            }, {
                slug: "fishers-in",
                id: 303,
                name: "Fishers, IN"
            }, {
                slug: "fitchburg-ma",
                id: 304,
                name: "Fitchburg, MA"
            }, {
                slug: "flagstaff-az",
                id: 305,
                name: "Flagstaff, AZ"
            }, {
                slug: "flint-mi",
                id: 306,
                name: "Flint, MI"
            }, {
                slug: "florence-al",
                id: 307,
                name: "Florence, AL"
            }, {
                slug: "florence-sc",
                id: 308,
                name: "Florence, SC"
            }, {
                slug: "florissant-mo",
                id: 309,
                name: "Florissant, MO"
            }, {
                slug: "flower-mound-tx",
                id: 310,
                name: "Flower Mound, TX"
            }, {
                slug: "folsom-ca",
                id: 311,
                name: "Folsom, CA"
            }, {
                slug: "fond-du-lac-wi",
                id: 312,
                name: "Fond du Lac, WI"
            }, {
                slug: "fontana-ca",
                id: 313,
                name: "Fontana, CA"
            }, {
                slug: "fort-collins-co",
                id: 314,
                name: "Fort Collins, CO"
            }, {
                slug: "fort-lauderdale-fl",
                id: 315,
                name: "Fort Lauderdale, FL"
            }, {
                slug: "fort-myers-fl",
                id: 316,
                name: "Fort Myers, FL"
            }, {
                slug: "fort-pierce-fl",
                id: 317,
                name: "Fort Pierce, FL"
            }, {
                slug: "fort-smith-ar",
                id: 318,
                name: "Fort Smith, AR"
            }, {
                slug: "fort-wayne-in",
                id: 319,
                name: "Fort Wayne, IN"
            }, {
                slug: "fort-worth-tx",
                id: 320,
                name: "Fort Worth, TX"
            }, {
                slug: "fountain-valley-ca",
                id: 321,
                name: "Fountain Valley, CA"
            }, {
                slug: "franklin-tn",
                id: 322,
                name: "Franklin, TN"
            }, {
                slug: "frederick-md",
                id: 323,
                name: "Frederick, MD"
            }, {
                slug: "freeport-ny",
                id: 324,
                name: "Freeport, NY"
            }, {
                slug: "fremont-ca",
                id: 325,
                name: "Fremont, CA"
            }, {
                slug: "fresno-ca",
                id: 326,
                name: "Fresno, CA"
            }, {
                slug: "friendswood-tx",
                id: 327,
                name: "Friendswood, TX"
            }, {
                slug: "frisco-tx",
                id: 328,
                name: "Frisco, TX"
            }, {
                slug: "fullerton-ca",
                id: 329,
                name: "Fullerton, CA"
            }, {
                slug: "gainesville-fl",
                id: 330,
                name: "Gainesville, FL"
            }, {
                slug: "gaithersburg-md",
                id: 331,
                name: "Gaithersburg, MD"
            }, {
                slug: "galveston-tx",
                id: 332,
                name: "Galveston, TX"
            }, {
                slug: "garden-grove-ca",
                id: 333,
                name: "Garden Grove, CA"
            }, {
                slug: "gardena-ca",
                id: 334,
                name: "Gardena, CA"
            }, {
                slug: "garland-tx",
                id: 335,
                name: "Garland, TX"
            }, {
                slug: "gary-in",
                id: 336,
                name: "Gary, IN"
            }, {
                slug: "gastonia-nc",
                id: 337,
                name: "Gastonia, NC"
            }, {
                slug: "georgetown-tx",
                id: 338,
                name: "Georgetown, TX"
            }, {
                slug: "germantown-tn",
                id: 339,
                name: "Germantown, TN"
            }, {
                slug: "gilbert-az",
                id: 340,
                name: "Gilbert, AZ"
            }, {
                slug: "gilroy-ca",
                id: 341,
                name: "Gilroy, CA"
            }, {
                slug: "glendale-az",
                id: 342,
                name: "Glendale, AZ"
            }, {
                slug: "glendale-ca",
                id: 343,
                name: "Glendale, CA"
            }, {
                slug: "glendora-ca",
                id: 344,
                name: "Glendora, CA"
            }, {
                slug: "glenview-il",
                id: 345,
                name: "Glenview, IL"
            }, {
                slug: "goodyear-az",
                id: 346,
                name: "Goodyear, AZ"
            }, {
                slug: "goose-creek-sc",
                id: 347,
                name: "Goose Creek, SC"
            }, {
                slug: "grand-forks-nd",
                id: 348,
                name: "Grand Forks, ND"
            }, {
                slug: "grand-island-ne",
                id: 349,
                name: "Grand Island, NE"
            }, {
                slug: "grand-junction-co",
                id: 350,
                name: "Grand Junction, CO"
            }, {
                slug: "grand-prairie-tx",
                id: 351,
                name: "Grand Prairie, TX"
            }, {
                slug: "grand-rapids-mi",
                id: 352,
                name: "Grand Rapids, MI"
            }, {
                slug: "grapevine-tx",
                id: 353,
                name: "Grapevine, TX"
            }, {
                slug: "great-falls-mt",
                id: 354,
                name: "Great Falls, MT"
            }, {
                slug: "greeley-co",
                id: 355,
                name: "Greeley, CO"
            }, {
                slug: "green-bay-wi",
                id: 356,
                name: "Green Bay, WI"
            }, {
                slug: "greenacres-fl",
                id: 357,
                name: "Greenacres, FL"
            }, {
                slug: "greenfield-wi",
                id: 358,
                name: "Greenfield, WI"
            }, {
                slug: "greensboro-nc",
                id: 359,
                name: "Greensboro, NC"
            }, {
                slug: "greenville-nc",
                id: 360,
                name: "Greenville, NC"
            }, {
                slug: "greenville-sc",
                id: 361,
                name: "Greenville, SC"
            }, {
                slug: "greenwood-in",
                id: 362,
                name: "Greenwood, IN"
            }, {
                slug: "gresham-or",
                id: 363,
                name: "Gresham, OR"
            }, {
                slug: "grove-city-oh",
                id: 364,
                name: "Grove City, OH"
            }, {
                slug: "gulfport-ms",
                id: 365,
                name: "Gulfport, MS"
            }, {
                slug: "hackensack-nj",
                id: 366,
                name: "Hackensack, NJ"
            }, {
                slug: "hagerstown-md",
                id: 367,
                name: "Hagerstown, MD"
            }, {
                slug: "hallandale-beach-fl",
                id: 368,
                name: "Hallandale Beach, FL"
            }, {
                slug: "haltom-city-tx",
                id: 369,
                name: "Haltom City, TX"
            }, {
                slug: "hamilton-oh",
                id: 370,
                name: "Hamilton, OH"
            }, {
                slug: "hammond-in",
                id: 371,
                name: "Hammond, IN"
            }, {
                slug: "hampton-va",
                id: 372,
                name: "Hampton, VA"
            }, {
                slug: "hanford-ca",
                id: 373,
                name: "Hanford, CA"
            }, {
                slug: "hanover-park-il",
                id: 374,
                name: "Hanover Park, IL"
            }, {
                slug: "harlingen-tx",
                id: 375,
                name: "Harlingen, TX"
            }, {
                slug: "harrisburg-pa",
                id: 376,
                name: "Harrisburg, PA"
            }, {
                slug: "harrisonburg-va",
                id: 377,
                name: "Harrisonburg, VA"
            }, {
                slug: "hartford-ct",
                id: 378,
                name: "Hartford, CT"
            }, {
                slug: "hattiesburg-ms",
                id: 379,
                name: "Hattiesburg, MS"
            }, {
                slug: "haverhill-ma",
                id: 380,
                name: "Haverhill, MA"
            }, {
                slug: "hawthorne-ca",
                id: 381,
                name: "Hawthorne, CA"
            }, {
                slug: "hayward-ca",
                id: 382,
                name: "Hayward, CA"
            }, {
                slug: "hemet-ca",
                id: 383,
                name: "Hemet, CA"
            }, {
                slug: "hempstead-ny",
                id: 384,
                name: "Hempstead, NY"
            }, {
                slug: "henderson-nv",
                id: 385,
                name: "Henderson, NV"
            }, {
                slug: "hendersonville-tn",
                id: 386,
                name: "Hendersonville, TN"
            }, {
                slug: "hesperia-ca",
                id: 387,
                name: "Hesperia, CA"
            }, {
                slug: "hialeah-fl",
                id: 388,
                name: "Hialeah, FL"
            }, {
                slug: "hickory-nc",
                id: 389,
                name: "Hickory, NC"
            }, {
                slug: "high-point-nc",
                id: 390,
                name: "High Point, NC"
            }, {
                slug: "highland-ca",
                id: 391,
                name: "Highland, CA"
            }, {
                slug: "hillsboro-or",
                id: 392,
                name: "Hillsboro, OR"
            }, {
                slug: "hilton-head-island-sc",
                id: 393,
                name: "Hilton Head Island, SC"
            }, {
                slug: "hoboken-nj",
                id: 394,
                name: "Hoboken, NJ"
            }, {
                slug: "hoffman-estates-il",
                id: 395,
                name: "Hoffman Estates, IL"
            }, {
                slug: "hollywood-fl",
                id: 396,
                name: "Hollywood, FL"
            }, {
                slug: "holyoke-ma",
                id: 397,
                name: "Holyoke, MA"
            }, {
                slug: "homestead-fl",
                id: 398,
                name: "Homestead, FL"
            }, {
                slug: "honolulu-hi",
                id: 399,
                name: "Honolulu, HI"
            }, {
                slug: "hoover-al",
                id: 400,
                name: "Hoover, AL"
            }, {
                slug: "houston-tx",
                id: 401,
                name: "Houston, TX"
            }, {
                slug: "huber-heights-oh",
                id: 402,
                name: "Huber Heights, OH"
            }, {
                slug: "huntersville-nc",
                id: 403,
                name: "Huntersville, NC"
            }, {
                slug: "huntington-beach-ca",
                id: 404,
                name: "Huntington Beach, CA"
            }, {
                slug: "huntington-park-ca",
                id: 405,
                name: "Huntington Park, CA"
            }, {
                slug: "huntington-wv",
                id: 406,
                name: "Huntington, WV"
            }, {
                slug: "huntsville-al",
                id: 407,
                name: "Huntsville, AL"
            }, {
                slug: "huntsville-tx",
                id: 408,
                name: "Huntsville, TX"
            }, {
                slug: "hurst-tx",
                id: 409,
                name: "Hurst, TX"
            }, {
                slug: "hutchinson-ks",
                id: 410,
                name: "Hutchinson, KS"
            }, {
                slug: "idaho-falls-id",
                id: 411,
                name: "Idaho Falls, ID"
            }, {
                slug: "independence-mo",
                id: 412,
                name: "Independence, MO"
            }, {
                slug: "indianapolis-in",
                id: 413,
                name: "Indianapolis, IN"
            }, {
                slug: "indio-ca",
                id: 414,
                name: "Indio, CA"
            }, {
                slug: "inglewood-ca",
                id: 415,
                name: "Inglewood, CA"
            }, {
                slug: "iowa-city-ia",
                id: 416,
                name: "Iowa City, IA"
            }, {
                slug: "irvine-ca",
                id: 417,
                name: "Irvine, CA"
            }, {
                slug: "irving-tx",
                id: 418,
                name: "Irving, TX"
            }, {
                slug: "jackson-ms",
                id: 419,
                name: "Jackson, MS"
            }, {
                slug: "jackson-tn",
                id: 420,
                name: "Jackson, TN"
            }, {
                slug: "jacksonville-fl",
                id: 421,
                name: "Jacksonville, FL"
            }, {
                slug: "jacksonville-nc",
                id: 422,
                name: "Jacksonville, NC"
            }, {
                slug: "janesville-wi",
                id: 423,
                name: "Janesville, WI"
            }, {
                slug: "jefferson-city-mo",
                id: 424,
                name: "Jefferson City, MO"
            }, {
                slug: "jeffersonville-in",
                id: 425,
                name: "Jeffersonville, IN"
            }, {
                slug: "jersey-city-nj",
                id: 426,
                name: "Jersey City, NJ"
            }, {
                slug: "johns-creek-ga",
                id: 427,
                name: "Johns Creek, GA"
            }, {
                slug: "johnson-city-tn",
                id: 428,
                name: "Johnson City, TN"
            }, {
                slug: "joliet-il",
                id: 429,
                name: "Joliet, IL"
            }, {
                slug: "jonesboro-ar",
                id: 430,
                name: "Jonesboro, AR"
            }, {
                slug: "joplin-mo",
                id: 431,
                name: "Joplin, MO"
            }, {
                slug: "jupiter-fl",
                id: 432,
                name: "Jupiter, FL"
            }, {
                slug: "jurupa-valley-ca",
                id: 433,
                name: "Jurupa Valley, CA"
            }, {
                slug: "kalamazoo-mi",
                id: 434,
                name: "Kalamazoo, MI"
            }, {
                slug: "kannapolis-nc",
                id: 435,
                name: "Kannapolis, NC"
            }, {
                slug: "kansas-city-ks",
                id: 436,
                name: "Kansas City, KS"
            }, {
                slug: "kansas-city-mo",
                id: 437,
                name: "Kansas City, MO"
            }, {
                slug: "kearny-nj",
                id: 438,
                name: "Kearny, NJ"
            }, {
                slug: "keizer-or",
                id: 439,
                name: "Keizer, OR"
            }, {
                slug: "keller-tx",
                id: 440,
                name: "Keller, TX"
            }, {
                slug: "kenner-la",
                id: 441,
                name: "Kenner, LA"
            }, {
                slug: "kennewick-wa",
                id: 442,
                name: "Kennewick, WA"
            }, {
                slug: "kenosha-wi",
                id: 443,
                name: "Kenosha, WI"
            }, {
                slug: "kent-wa",
                id: 444,
                name: "Kent, WA"
            }, {
                slug: "kentwood-mi",
                id: 445,
                name: "Kentwood, MI"
            }, {
                slug: "kettering-oh",
                id: 446,
                name: "Kettering, OH"
            }, {
                slug: "killeen-tx",
                id: 447,
                name: "Killeen, TX"
            }, {
                slug: "kingsport-tn",
                id: 448,
                name: "Kingsport, TN"
            }, {
                slug: "kirkland-wa",
                id: 449,
                name: "Kirkland, WA"
            }, {
                slug: "kissimmee-fl",
                id: 450,
                name: "Kissimmee, FL"
            }, {
                slug: "knoxville-tn",
                id: 451,
                name: "Knoxville, TN"
            }, {
                slug: "kokomo-in",
                id: 452,
                name: "Kokomo, IN"
            }, {
                slug: "la-crosse-wi",
                id: 453,
                name: "La Crosse, WI"
            }, {
                slug: "la-habra-ca",
                id: 454,
                name: "La Habra, CA"
            }, {
                slug: "la-mesa-ca",
                id: 455,
                name: "La Mesa, CA"
            }, {
                slug: "la-mirada-ca",
                id: 456,
                name: "La Mirada, CA"
            }, {
                slug: "la-puente-ca",
                id: 457,
                name: "La Puente, CA"
            }, {
                slug: "la-quinta-ca",
                id: 458,
                name: "La Quinta, CA"
            }, {
                slug: "lacey-wa",
                id: 459,
                name: "Lacey, WA"
            }, {
                slug: "lafayette-in",
                id: 460,
                name: "Lafayette, IN"
            }, {
                slug: "lafayette-la",
                id: 461,
                name: "Lafayette, LA"
            }, {
                slug: "laguna-niguel-ca",
                id: 462,
                name: "Laguna Niguel, CA"
            }, {
                slug: "lake-charles-la",
                id: 463,
                name: "Lake Charles, LA"
            }, {
                slug: "lake-elsinore-ca",
                id: 464,
                name: "Lake Elsinore, CA"
            }, {
                slug: "lake-forest-ca",
                id: 465,
                name: "Lake Forest, CA"
            }, {
                slug: "lake-havasu-city-az",
                id: 466,
                name: "Lake Havasu City, AZ"
            }, {
                slug: "lake-oswego-or",
                id: 467,
                name: "Lake Oswego, OR"
            }, {
                slug: "lakeland-fl",
                id: 468,
                name: "Lakeland, FL"
            }, {
                slug: "lakeville-mn",
                id: 469,
                name: "Lakeville, MN"
            }, {
                slug: "lakewood-ca",
                id: 470,
                name: "Lakewood, CA"
            }, {
                slug: "lakewood-co",
                id: 471,
                name: "Lakewood, CO"
            }, {
                slug: "lakewood-oh",
                id: 472,
                name: "Lakewood, OH"
            }, {
                slug: "lakewood-wa",
                id: 473,
                name: "Lakewood, WA"
            }, {
                slug: "lancaster-ca",
                id: 474,
                name: "Lancaster, CA"
            }, {
                slug: "lancaster-oh",
                id: 475,
                name: "Lancaster, OH"
            }, {
                slug: "lancaster-pa",
                id: 476,
                name: "Lancaster, PA"
            }, {
                slug: "lancaster-tx",
                id: 477,
                name: "Lancaster, TX"
            }, {
                slug: "lansing-mi",
                id: 478,
                name: "Lansing, MI"
            }, {
                slug: "laredo-tx",
                id: 479,
                name: "Laredo, TX"
            }, {
                slug: "largo-fl",
                id: 480,
                name: "Largo, FL"
            }, {
                slug: "las-cruces-nm",
                id: 481,
                name: "Las Cruces, NM"
            }, {
                slug: "las-vegas-nv",
                id: 482,
                name: "Las Vegas, NV"
            }, {
                slug: "lauderhill-fl",
                id: 483,
                name: "Lauderhill, FL"
            }, {
                slug: "lawrence-in",
                id: 484,
                name: "Lawrence, IN"
            }, {
                slug: "lawrence-ks",
                id: 485,
                name: "Lawrence, KS"
            }, {
                slug: "lawrence-ma",
                id: 486,
                name: "Lawrence, MA"
            }, {
                slug: "lawton-ok",
                id: 487,
                name: "Lawton, OK"
            }, {
                slug: "layton-ut",
                id: 488,
                name: "Layton, UT"
            }, {
                slug: "league-city-tx",
                id: 489,
                name: "League City, TX"
            }, {
                slug: "lee-s-summit-mo",
                id: 490,
                name: "Lee's Summit, MO"
            }, {
                slug: "leesburg-va",
                id: 491,
                name: "Leesburg, VA"
            }, {
                slug: "lehi-ut",
                id: 492,
                name: "Lehi, UT"
            }, {
                slug: "lenexa-ks",
                id: 493,
                name: "Lenexa, KS"
            }, {
                slug: "leominster-ma",
                id: 494,
                name: "Leominster, MA"
            }, {
                slug: "lewisville-tx",
                id: 495,
                name: "Lewisville, TX"
            }, {
                slug: "lexington-fayette-ky",
                id: 496,
                name: "Lexington-Fayette, KY"
            }, {
                slug: "lima-oh",
                id: 497,
                name: "Lima, OH"
            }, {
                slug: "lincoln-park-mi",
                id: 498,
                name: "Lincoln Park, MI"
            }, {
                slug: "lincoln-ca",
                id: 499,
                name: "Lincoln, CA"
            }, {
                slug: "lincoln-ne",
                id: 500,
                name: "Lincoln, NE"
            }, {
                slug: "linden-nj",
                id: 501,
                name: "Linden, NJ"
            }, {
                slug: "little-rock-ar",
                id: 502,
                name: "Little Rock, AR"
            }, {
                slug: "littleton-co",
                id: 503,
                name: "Littleton, CO"
            }, {
                slug: "livermore-ca",
                id: 504,
                name: "Livermore, CA"
            }, {
                slug: "livonia-mi",
                id: 505,
                name: "Livonia, MI"
            }, {
                slug: "lodi-ca",
                id: 506,
                name: "Lodi, CA"
            }, {
                slug: "logan-ut",
                id: 507,
                name: "Logan, UT"
            }, {
                slug: "lombard-il",
                id: 508,
                name: "Lombard, IL"
            }, {
                slug: "lompoc-ca",
                id: 509,
                name: "Lompoc, CA"
            }, {
                slug: "long-beach-ca",
                id: 510,
                name: "Long Beach, CA"
            }, {
                slug: "longmont-co",
                id: 511,
                name: "Longmont, CO"
            }, {
                slug: "longview-tx",
                id: 512,
                name: "Longview, TX"
            }, {
                slug: "lorain-oh",
                id: 513,
                name: "Lorain, OH"
            }, {
                slug: "los-angeles-ca",
                id: 514,
                name: "Los Angeles, CA"
            }, {
                slug: "louisville-ky",
                id: 515,
                name: "Louisville, KY"
            }, {
                slug: "loveland-co",
                id: 516,
                name: "Loveland, CO"
            }, {
                slug: "lowell-ma",
                id: 517,
                name: "Lowell, MA"
            }, {
                slug: "lubbock-tx",
                id: 518,
                name: "Lubbock, TX"
            }, {
                slug: "lynchburg-va",
                id: 519,
                name: "Lynchburg, VA"
            }, {
                slug: "lynn-ma",
                id: 520,
                name: "Lynn, MA"
            }, {
                slug: "lynwood-ca",
                id: 521,
                name: "Lynwood, CA"
            }, {
                slug: "macon-ga",
                id: 522,
                name: "Macon, GA"
            }, {
                slug: "madera-ca",
                id: 523,
                name: "Madera, CA"
            }, {
                slug: "madison-al",
                id: 524,
                name: "Madison, AL"
            }, {
                slug: "madison-wi",
                id: 525,
                name: "Madison, WI"
            }, {
                slug: "malden-ma",
                id: 526,
                name: "Malden, MA"
            }, {
                slug: "manassas-va",
                id: 527,
                name: "Manassas, VA"
            }, {
                slug: "manchester-nh",
                id: 528,
                name: "Manchester, NH"
            }, {
                slug: "manhattan-ks",
                id: 529,
                name: "Manhattan, KS"
            }, {
                slug: "mankato-mn",
                id: 530,
                name: "Mankato, MN"
            }, {
                slug: "mansfield-oh",
                id: 531,
                name: "Mansfield, OH"
            }, {
                slug: "mansfield-tx",
                id: 532,
                name: "Mansfield, TX"
            }, {
                slug: "manteca-ca",
                id: 533,
                name: "Manteca, CA"
            }, {
                slug: "maple-grove-mn",
                id: 534,
                name: "Maple Grove, MN"
            }, {
                slug: "maplewood-mn",
                id: 535,
                name: "Maplewood, MN"
            }, {
                slug: "marana-az",
                id: 536,
                name: "Marana, AZ"
            }, {
                slug: "margate-fl",
                id: 537,
                name: "Margate, FL"
            }, {
                slug: "maricopa-az",
                id: 538,
                name: "Maricopa, AZ"
            }, {
                slug: "marietta-ga",
                id: 539,
                name: "Marietta, GA"
            }, {
                slug: "marlborough-ma",
                id: 540,
                name: "Marlborough, MA"
            }, {
                slug: "martinez-ca",
                id: 541,
                name: "Martinez, CA"
            }, {
                slug: "marysville-wa",
                id: 542,
                name: "Marysville, WA"
            }, {
                slug: "mcallen-tx",
                id: 543,
                name: "McAllen, TX"
            }, {
                slug: "mckinney-tx",
                id: 544,
                name: "McKinney, TX"
            }, {
                slug: "medford-ma",
                id: 545,
                name: "Medford, MA"
            }, {
                slug: "medford-or",
                id: 546,
                name: "Medford, OR"
            }, {
                slug: "melbourne-fl",
                id: 547,
                name: "Melbourne, FL"
            }, {
                slug: "memphis-tn",
                id: 548,
                name: "Memphis, TN"
            }, {
                slug: "menifee-ca",
                id: 549,
                name: "Menifee, CA"
            }, {
                slug: "mentor-oh",
                id: 550,
                name: "Mentor, OH"
            }, {
                slug: "merced-ca",
                id: 551,
                name: "Merced, CA"
            }, {
                slug: "meriden-ct",
                id: 552,
                name: "Meriden, CT"
            }, {
                slug: "meridian-id",
                id: 553,
                name: "Meridian, ID"
            }, {
                slug: "meridian-ms",
                id: 554,
                name: "Meridian, MS"
            }, {
                slug: "mesa-az",
                id: 555,
                name: "Mesa, AZ"
            }, {
                slug: "mesquite-tx",
                id: 556,
                name: "Mesquite, TX"
            }, {
                slug: "methuen-ma",
                id: 557,
                name: "Methuen, MA"
            }, {
                slug: "miami-beach-fl",
                id: 558,
                name: "Miami Beach, FL"
            }, {
                slug: "miami-gardens-fl",
                id: 559,
                name: "Miami Gardens, FL"
            }, {
                slug: "miami-fl",
                id: 560,
                name: "Miami, FL"
            }, {
                slug: "middletown-ct",
                id: 561,
                name: "Middletown, CT"
            }, {
                slug: "middletown-oh",
                id: 562,
                name: "Middletown, OH"
            }, {
                slug: "midland-mi",
                id: 563,
                name: "Midland, MI"
            }, {
                slug: "midland-tx",
                id: 564,
                name: "Midland, TX"
            }, {
                slug: "midwest-city-ok",
                id: 565,
                name: "Midwest City, OK"
            }, {
                slug: "milford-ct",
                id: 566,
                name: "Milford, CT"
            }, {
                slug: "milpitas-ca",
                id: 567,
                name: "Milpitas, CA"
            }, {
                slug: "milwaukee-wi",
                id: 568,
                name: "Milwaukee, WI"
            }, {
                slug: "minneapolis-mn",
                id: 569,
                name: "Minneapolis, MN"
            }, {
                slug: "minnetonka-mn",
                id: 570,
                name: "Minnetonka, MN"
            }, {
                slug: "minot-nd",
                id: 571,
                name: "Minot, ND"
            }, {
                slug: "miramar-fl",
                id: 572,
                name: "Miramar, FL"
            }, {
                slug: "mishawaka-in",
                id: 573,
                name: "Mishawaka, IN"
            }, {
                slug: "mission-viejo-ca",
                id: 574,
                name: "Mission Viejo, CA"
            }, {
                slug: "mission-tx",
                id: 575,
                name: "Mission, TX"
            }, {
                slug: "missoula-mt",
                id: 576,
                name: "Missoula, MT"
            }, {
                slug: "missouri-city-tx",
                id: 577,
                name: "Missouri City, TX"
            }, {
                slug: "mobile-al",
                id: 578,
                name: "Mobile, AL"
            }, {
                slug: "modesto-ca",
                id: 579,
                name: "Modesto, CA"
            }, {
                slug: "moline-il",
                id: 580,
                name: "Moline, IL"
            }, {
                slug: "monroe-la",
                id: 581,
                name: "Monroe, LA"
            }, {
                slug: "monrovia-ca",
                id: 582,
                name: "Monrovia, CA"
            }, {
                slug: "montclair-ca",
                id: 583,
                name: "Montclair, CA"
            }, {
                slug: "montebello-ca",
                id: 584,
                name: "Montebello, CA"
            }, {
                slug: "monterey-park-ca",
                id: 585,
                name: "Monterey Park, CA"
            }, {
                slug: "montgomery-al",
                id: 586,
                name: "Montgomery, AL"
            }, {
                slug: "moore-ok",
                id: 587,
                name: "Moore, OK"
            }, {
                slug: "moorhead-mn",
                id: 588,
                name: "Moorhead, MN"
            }, {
                slug: "moreno-valley-ca",
                id: 589,
                name: "Moreno Valley, CA"
            }, {
                slug: "morgan-hill-ca",
                id: 590,
                name: "Morgan Hill, CA"
            }, {
                slug: "mount-pleasant-sc",
                id: 591,
                name: "Mount Pleasant, SC"
            }, {
                slug: "mount-prospect-il",
                id: 592,
                name: "Mount Prospect, IL"
            }, {
                slug: "mount-vernon-ny",
                id: 593,
                name: "Mount Vernon, NY"
            }, {
                slug: "mountain-view-ca",
                id: 594,
                name: "Mountain View, CA"
            }, {
                slug: "muncie-in",
                id: 595,
                name: "Muncie, IN"
            }, {
                slug: "murfreesboro-tn",
                id: 596,
                name: "Murfreesboro, TN"
            }, {
                slug: "murray-ut",
                id: 597,
                name: "Murray, UT"
            }, {
                slug: "murrieta-ca",
                id: 598,
                name: "Murrieta, CA"
            }, {
                slug: "muskegon-mi",
                id: 599,
                name: "Muskegon, MI"
            }, {
                slug: "muskogee-ok",
                id: 600,
                name: "Muskogee, OK"
            }, {
                slug: "nampa-id",
                id: 601,
                name: "Nampa, ID"
            }, {
                slug: "napa-ca",
                id: 602,
                name: "Napa, CA"
            }, {
                slug: "naperville-il",
                id: 603,
                name: "Naperville, IL"
            }, {
                slug: "nashua-nh",
                id: 604,
                name: "Nashua, NH"
            }, {
                slug: "nashville-davidson-tn",
                id: 605,
                name: "Nashville-Davidson, TN"
            }, {
                slug: "national-city-ca",
                id: 606,
                name: "National City, CA"
            }, {
                slug: "new-bedford-ma",
                id: 607,
                name: "New Bedford, MA"
            }, {
                slug: "new-berlin-wi",
                id: 608,
                name: "New Berlin, WI"
            }, {
                slug: "new-braunfels-tx",
                id: 609,
                name: "New Braunfels, TX"
            }, {
                slug: "new-britain-ct",
                id: 610,
                name: "New Britain, CT"
            }, {
                slug: "new-brunswick-nj",
                id: 611,
                name: "New Brunswick, NJ"
            }, {
                slug: "new-haven-ct",
                id: 612,
                name: "New Haven, CT"
            }, {
                slug: "new-orleans-la",
                id: 613,
                name: "New Orleans, LA"
            }, {
                slug: "new-rochelle-ny",
                id: 614,
                name: "New Rochelle, NY"
            }, {
                slug: "new-york-ny",
                id: 615,
                name: "New York, NY"
            }, {
                slug: "newark-ca",
                id: 616,
                name: "Newark, CA"
            }, {
                slug: "newark-nj",
                id: 617,
                name: "Newark, NJ"
            }, {
                slug: "newark-oh",
                id: 618,
                name: "Newark, OH"
            }, {
                slug: "newport-beach-ca",
                id: 619,
                name: "Newport Beach, CA"
            }, {
                slug: "newport-news-va",
                id: 620,
                name: "Newport News, VA"
            }, {
                slug: "newton-ma",
                id: 621,
                name: "Newton, MA"
            }, {
                slug: "niagara-falls-ny",
                id: 622,
                name: "Niagara Falls, NY"
            }, {
                slug: "noblesville-in",
                id: 623,
                name: "Noblesville, IN"
            }, {
                slug: "norfolk-va",
                id: 624,
                name: "Norfolk, VA"
            }, {
                slug: "normal-il",
                id: 625,
                name: "Normal, IL"
            }, {
                slug: "norman-ok",
                id: 626,
                name: "Norman, OK"
            }, {
                slug: "north-charleston-sc",
                id: 627,
                name: "North Charleston, SC"
            }, {
                slug: "north-las-vegas-nv",
                id: 628,
                name: "North Las Vegas, NV"
            }, {
                slug: "north-lauderdale-fl",
                id: 629,
                name: "North Lauderdale, FL"
            }, {
                slug: "north-little-rock-ar",
                id: 630,
                name: "North Little Rock, AR"
            }, {
                slug: "north-miami-beach-fl",
                id: 631,
                name: "North Miami Beach, FL"
            }, {
                slug: "north-miami-fl",
                id: 632,
                name: "North Miami, FL"
            }, {
                slug: "north-port-fl",
                id: 633,
                name: "North Port, FL"
            }, {
                slug: "north-richland-hills-tx",
                id: 634,
                name: "North Richland Hills, TX"
            }, {
                slug: "northglenn-co",
                id: 635,
                name: "Northglenn, CO"
            }, {
                slug: "norwalk-ca",
                id: 636,
                name: "Norwalk, CA"
            }, {
                slug: "norwalk-ct",
                id: 637,
                name: "Norwalk, CT"
            }, {
                slug: "norwich-ct",
                id: 638,
                name: "Norwich, CT"
            }, {
                slug: "novato-ca",
                id: 639,
                name: "Novato, CA"
            }, {
                slug: "novi-mi",
                id: 640,
                name: "Novi, MI"
            }, {
                slug: "o-fallon-mo",
                id: 641,
                name: "O'Fallon, MO"
            }, {
                slug: "oak-lawn-il",
                id: 642,
                name: "Oak Lawn, IL"
            }, {
                slug: "oak-park-il",
                id: 643,
                name: "Oak Park, IL"
            }, {
                slug: "oakland-park-fl",
                id: 644,
                name: "Oakland Park, FL"
            }, {
                slug: "oakland-ca",
                id: 645,
                name: "Oakland, CA"
            }, {
                slug: "oakley-ca",
                id: 646,
                name: "Oakley, CA"
            }, {
                slug: "ocala-fl",
                id: 647,
                name: "Ocala, FL"
            }, {
                slug: "oceanside-ca",
                id: 648,
                name: "Oceanside, CA"
            }, {
                slug: "ocoee-fl",
                id: 649,
                name: "Ocoee, FL"
            }, {
                slug: "odessa-tx",
                id: 650,
                name: "Odessa, TX"
            }, {
                slug: "ogden-ut",
                id: 651,
                name: "Ogden, UT"
            }, {
                slug: "oklahoma-city-ok",
                id: 652,
                name: "Oklahoma City, OK"
            }, {
                slug: "olathe-ks",
                id: 653,
                name: "Olathe, KS"
            }, {
                slug: "olympia-wa",
                id: 654,
                name: "Olympia, WA"
            }, {
                slug: "omaha-ne",
                id: 655,
                name: "Omaha, NE"
            }, {
                slug: "ontario-ca",
                id: 656,
                name: "Ontario, CA"
            }, {
                slug: "orange-ca",
                id: 657,
                name: "Orange, CA"
            }, {
                slug: "orem-ut",
                id: 658,
                name: "Orem, UT"
            }, {
                slug: "orland-park-il",
                id: 659,
                name: "Orland Park, IL"
            }, {
                slug: "orlando-fl",
                id: 660,
                name: "Orlando, FL"
            }, {
                slug: "ormond-beach-fl",
                id: 661,
                name: "Ormond Beach, FL"
            }, {
                slug: "oro-valley-az",
                id: 662,
                name: "Oro Valley, AZ"
            }, {
                slug: "oshkosh-wi",
                id: 663,
                name: "Oshkosh, WI"
            }, {
                slug: "overland-park-ks",
                id: 664,
                name: "Overland Park, KS"
            }, {
                slug: "owensboro-ky",
                id: 665,
                name: "Owensboro, KY"
            }, {
                slug: "oxnard-ca",
                id: 666,
                name: "Oxnard, CA"
            }, {
                slug: "pacifica-ca",
                id: 667,
                name: "Pacifica, CA"
            }, {
                slug: "palatine-il",
                id: 668,
                name: "Palatine, IL"
            }, {
                slug: "palm-bay-fl",
                id: 669,
                name: "Palm Bay, FL"
            }, {
                slug: "palm-beach-gardens-fl",
                id: 670,
                name: "Palm Beach Gardens, FL"
            }, {
                slug: "palm-coast-fl",
                id: 671,
                name: "Palm Coast, FL"
            }, {
                slug: "palm-desert-ca",
                id: 672,
                name: "Palm Desert, CA"
            }, {
                slug: "palm-springs-ca",
                id: 673,
                name: "Palm Springs, CA"
            }, {
                slug: "palmdale-ca",
                id: 674,
                name: "Palmdale, CA"
            }, {
                slug: "palo-alto-ca",
                id: 675,
                name: "Palo Alto, CA"
            }, {
                slug: "panama-city-fl",
                id: 676,
                name: "Panama City, FL"
            }, {
                slug: "paramount-ca",
                id: 677,
                name: "Paramount, CA"
            }, {
                slug: "park-ridge-il",
                id: 678,
                name: "Park Ridge, IL"
            }, {
                slug: "parker-co",
                id: 679,
                name: "Parker, CO"
            }, {
                slug: "parma-oh",
                id: 680,
                name: "Parma, OH"
            }, {
                slug: "pasadena-ca",
                id: 681,
                name: "Pasadena, CA"
            }, {
                slug: "pasadena-tx",
                id: 682,
                name: "Pasadena, TX"
            }, {
                slug: "pasco-wa",
                id: 683,
                name: "Pasco, WA"
            }, {
                slug: "passaic-nj",
                id: 684,
                name: "Passaic, NJ"
            }, {
                slug: "paterson-nj",
                id: 685,
                name: "Paterson, NJ"
            }, {
                slug: "pawtucket-ri",
                id: 686,
                name: "Pawtucket, RI"
            }, {
                slug: "peabody-ma",
                id: 687,
                name: "Peabody, MA"
            }, {
                slug: "peachtree-corners-ga",
                id: 688,
                name: "Peachtree Corners, GA"
            }, {
                slug: "pearland-tx",
                id: 689,
                name: "Pearland, TX"
            }, {
                slug: "pembroke-pines-fl",
                id: 690,
                name: "Pembroke Pines, FL"
            }, {
                slug: "pensacola-fl",
                id: 691,
                name: "Pensacola, FL"
            }, {
                slug: "peoria-az",
                id: 692,
                name: "Peoria, AZ"
            }, {
                slug: "peoria-il",
                id: 693,
                name: "Peoria, IL"
            }, {
                slug: "perris-ca",
                id: 694,
                name: "Perris, CA"
            }, {
                slug: "perth-amboy-nj",
                id: 695,
                name: "Perth Amboy, NJ"
            }, {
                slug: "petaluma-ca",
                id: 696,
                name: "Petaluma, CA"
            }, {
                slug: "pflugerville-tx",
                id: 697,
                name: "Pflugerville, TX"
            }, {
                slug: "pharr-tx",
                id: 698,
                name: "Pharr, TX"
            }, {
                slug: "phenix-city-al",
                id: 699,
                name: "Phenix City, AL"
            }, {
                slug: "philadelphia-pa",
                id: 700,
                name: "Philadelphia, PA"
            }, {
                slug: "phoenix-az",
                id: 701,
                name: "Phoenix, AZ"
            }, {
                slug: "pico-rivera-ca",
                id: 702,
                name: "Pico Rivera, CA"
            }, {
                slug: "pine-bluff-ar",
                id: 703,
                name: "Pine Bluff, AR"
            }, {
                slug: "pinellas-park-fl",
                id: 704,
                name: "Pinellas Park, FL"
            }, {
                slug: "pittsburg-ca",
                id: 705,
                name: "Pittsburg, CA"
            }, {
                slug: "pittsburgh-pa",
                id: 706,
                name: "Pittsburgh, PA"
            }, {
                slug: "pittsfield-ma",
                id: 707,
                name: "Pittsfield, MA"
            }, {
                slug: "placentia-ca",
                id: 708,
                name: "Placentia, CA"
            }, {
                slug: "plainfield-il",
                id: 709,
                name: "Plainfield, IL"
            }, {
                slug: "plainfield-nj",
                id: 710,
                name: "Plainfield, NJ"
            }, {
                slug: "plano-tx",
                id: 711,
                name: "Plano, TX"
            }, {
                slug: "plantation-fl",
                id: 712,
                name: "Plantation, FL"
            }, {
                slug: "pleasanton-ca",
                id: 713,
                name: "Pleasanton, CA"
            }, {
                slug: "plymouth-mn",
                id: 714,
                name: "Plymouth, MN"
            }, {
                slug: "pocatello-id",
                id: 715,
                name: "Pocatello, ID"
            }, {
                slug: "pomona-ca",
                id: 716,
                name: "Pomona, CA"
            }, {
                slug: "pompano-beach-fl",
                id: 717,
                name: "Pompano Beach, FL"
            }, {
                slug: "pontiac-mi",
                id: 718,
                name: "Pontiac, MI"
            }, {
                slug: "port-arthur-tx",
                id: 719,
                name: "Port Arthur, TX"
            }, {
                slug: "port-orange-fl",
                id: 720,
                name: "Port Orange, FL"
            }, {
                slug: "port-st.-lucie-fl",
                id: 721,
                name: "Port St. Lucie, FL"
            }, {
                slug: "portage-mi",
                id: 722,
                name: "Portage, MI"
            }, {
                slug: "porterville-ca",
                id: 723,
                name: "Porterville, CA"
            }, {
                slug: "portland-me",
                id: 724,
                name: "Portland, ME"
            }, {
                slug: "portland-or",
                id: 725,
                name: "Portland, OR"
            }, {
                slug: "portsmouth-va",
                id: 726,
                name: "Portsmouth, VA"
            }, {
                slug: "poway-ca",
                id: 727,
                name: "Poway, CA"
            }, {
                slug: "prescott-valley-az",
                id: 728,
                name: "Prescott Valley, AZ"
            }, {
                slug: "prescott-az",
                id: 729,
                name: "Prescott, AZ"
            }, {
                slug: "providence-ri",
                id: 730,
                name: "Providence, RI"
            }, {
                slug: "provo-ut",
                id: 731,
                name: "Provo, UT"
            }, {
                slug: "pueblo-co",
                id: 732,
                name: "Pueblo, CO"
            }, {
                slug: "puyallup-wa",
                id: 733,
                name: "Puyallup, WA"
            }, {
                slug: "quincy-il",
                id: 734,
                name: "Quincy, IL"
            }, {
                slug: "quincy-ma",
                id: 735,
                name: "Quincy, MA"
            }, {
                slug: "racine-wi",
                id: 736,
                name: "Racine, WI"
            }, {
                slug: "raleigh-nc",
                id: 737,
                name: "Raleigh, NC"
            }, {
                slug: "rancho-cordova-ca",
                id: 738,
                name: "Rancho Cordova, CA"
            }, {
                slug: "rancho-cucamonga-ca",
                id: 739,
                name: "Rancho Cucamonga, CA"
            }, {
                slug: "rancho-palos-verdes-ca",
                id: 740,
                name: "Rancho Palos Verdes, CA"
            }, {
                slug: "rancho-santa-margarita-ca",
                id: 741,
                name: "Rancho Santa Margarita, CA"
            }, {
                slug: "rapid-city-sd",
                id: 742,
                name: "Rapid City, SD"
            }, {
                slug: "reading-pa",
                id: 743,
                name: "Reading, PA"
            }, {
                slug: "redding-ca",
                id: 744,
                name: "Redding, CA"
            }, {
                slug: "redlands-ca",
                id: 745,
                name: "Redlands, CA"
            }, {
                slug: "redmond-wa",
                id: 746,
                name: "Redmond, WA"
            }, {
                slug: "redondo-beach-ca",
                id: 747,
                name: "Redondo Beach, CA"
            }, {
                slug: "redwood-city-ca",
                id: 748,
                name: "Redwood City, CA"
            }, {
                slug: "reno-nv",
                id: 749,
                name: "Reno, NV"
            }, {
                slug: "renton-wa",
                id: 750,
                name: "Renton, WA"
            }, {
                slug: "revere-ma",
                id: 751,
                name: "Revere, MA"
            }, {
                slug: "rialto-ca",
                id: 752,
                name: "Rialto, CA"
            }, {
                slug: "richardson-tx",
                id: 753,
                name: "Richardson, TX"
            }, {
                slug: "richland-wa",
                id: 754,
                name: "Richland, WA"
            }, {
                slug: "richmond-ca",
                id: 755,
                name: "Richmond, CA"
            }, {
                slug: "richmond-va",
                id: 756,
                name: "Richmond, VA"
            }, {
                slug: "rio-rancho-nm",
                id: 757,
                name: "Rio Rancho, NM"
            }, {
                slug: "riverside-ca",
                id: 758,
                name: "Riverside, CA"
            }, {
                slug: "riverton-ut",
                id: 759,
                name: "Riverton, UT"
            }, {
                slug: "roanoke-va",
                id: 760,
                name: "Roanoke, VA"
            }, {
                slug: "rochester-hills-mi",
                id: 761,
                name: "Rochester Hills, MI"
            }, {
                slug: "rochester-mn",
                id: 762,
                name: "Rochester, MN"
            }, {
                slug: "rochester-ny",
                id: 763,
                name: "Rochester, NY"
            }, {
                slug: "rock-hill-sc",
                id: 764,
                name: "Rock Hill, SC"
            }, {
                slug: "rock-island-il",
                id: 765,
                name: "Rock Island, IL"
            }, {
                slug: "rockford-il",
                id: 766,
                name: "Rockford, IL"
            }, {
                slug: "rocklin-ca",
                id: 767,
                name: "Rocklin, CA"
            }, {
                slug: "rockville-md",
                id: 768,
                name: "Rockville, MD"
            }, {
                slug: "rockwall-tx",
                id: 769,
                name: "Rockwall, TX"
            }, {
                slug: "rocky-mount-nc",
                id: 770,
                name: "Rocky Mount, NC"
            }, {
                slug: "rogers-ar",
                id: 771,
                name: "Rogers, AR"
            }, {
                slug: "rohnert-park-ca",
                id: 772,
                name: "Rohnert Park, CA"
            }, {
                slug: "romeoville-il",
                id: 773,
                name: "Romeoville, IL"
            }, {
                slug: "rosemead-ca",
                id: 774,
                name: "Rosemead, CA"
            }, {
                slug: "roseville-ca",
                id: 775,
                name: "Roseville, CA"
            }, {
                slug: "roseville-mi",
                id: 776,
                name: "Roseville, MI"
            }, {
                slug: "roswell-ga",
                id: 777,
                name: "Roswell, GA"
            }, {
                slug: "roswell-nm",
                id: 778,
                name: "Roswell, NM"
            }, {
                slug: "round-rock-tx",
                id: 779,
                name: "Round Rock, TX"
            }, {
                slug: "rowlett-tx",
                id: 780,
                name: "Rowlett, TX"
            }, {
                slug: "roy-ut",
                id: 781,
                name: "Roy, UT"
            }, {
                slug: "royal-oak-mi",
                id: 782,
                name: "Royal Oak, MI"
            }, {
                slug: "sacramento-ca",
                id: 783,
                name: "Sacramento, CA"
            }, {
                slug: "saginaw-mi",
                id: 784,
                name: "Saginaw, MI"
            }, {
                slug: "salem-ma",
                id: 785,
                name: "Salem, MA"
            }, {
                slug: "salem-or",
                id: 786,
                name: "Salem, OR"
            }, {
                slug: "salina-ks",
                id: 787,
                name: "Salina, KS"
            }, {
                slug: "salinas-ca",
                id: 788,
                name: "Salinas, CA"
            }, {
                slug: "salt-lake-city-ut",
                id: 789,
                name: "Salt Lake City, UT"
            }, {
                slug: "sammamish-wa",
                id: 790,
                name: "Sammamish, WA"
            }, {
                slug: "san-angelo-tx",
                id: 791,
                name: "San Angelo, TX"
            }, {
                slug: "san-antonio-tx",
                id: 792,
                name: "San Antonio, TX"
            }, {
                slug: "san-bernardino-ca",
                id: 793,
                name: "San Bernardino, CA"
            }, {
                slug: "san-bruno-ca",
                id: 794,
                name: "San Bruno, CA"
            }, {
                slug: "san-clemente-ca",
                id: 795,
                name: "San Clemente, CA"
            }, {
                slug: "san-diego-ca",
                id: 796,
                name: "San Diego, CA"
            }, {
                slug: "san-francisco-ca",
                id: 797,
                name: "San Francisco, CA"
            }, {
                slug: "san-gabriel-ca",
                id: 798,
                name: "San Gabriel, CA"
            }, {
                slug: "san-jacinto-ca",
                id: 799,
                name: "San Jacinto, CA"
            }, {
                slug: "san-jose-ca",
                id: 800,
                name: "San Jose, CA"
            }, {
                slug: "san-leandro-ca",
                id: 801,
                name: "San Leandro, CA"
            }, {
                slug: "san-luis-obispo-ca",
                id: 802,
                name: "San Luis Obispo, CA"
            }, {
                slug: "san-marcos-ca",
                id: 803,
                name: "San Marcos, CA"
            }, {
                slug: "san-marcos-tx",
                id: 804,
                name: "San Marcos, TX"
            }, {
                slug: "san-mateo-ca",
                id: 805,
                name: "San Mateo, CA"
            }, {
                slug: "san-rafael-ca",
                id: 806,
                name: "San Rafael, CA"
            }, {
                slug: "san-ramon-ca",
                id: 807,
                name: "San Ramon, CA"
            }, {
                slug: "sandy-springs-ga",
                id: 808,
                name: "Sandy Springs, GA"
            }, {
                slug: "sandy-ut",
                id: 809,
                name: "Sandy, UT"
            }, {
                slug: "sanford-fl",
                id: 810,
                name: "Sanford, FL"
            }, {
                slug: "santa-ana-ca",
                id: 811,
                name: "Santa Ana, CA"
            }, {
                slug: "santa-barbara-ca",
                id: 812,
                name: "Santa Barbara, CA"
            }, {
                slug: "santa-clara-ca",
                id: 813,
                name: "Santa Clara, CA"
            }, {
                slug: "santa-clarita-ca",
                id: 814,
                name: "Santa Clarita, CA"
            }, {
                slug: "santa-cruz-ca",
                id: 815,
                name: "Santa Cruz, CA"
            }, {
                slug: "santa-fe-nm",
                id: 816,
                name: "Santa Fe, NM"
            }, {
                slug: "santa-maria-ca",
                id: 817,
                name: "Santa Maria, CA"
            }, {
                slug: "santa-monica-ca",
                id: 818,
                name: "Santa Monica, CA"
            }, {
                slug: "santa-rosa-ca",
                id: 819,
                name: "Santa Rosa, CA"
            }, {
                slug: "santee-ca",
                id: 820,
                name: "Santee, CA"
            }, {
                slug: "sarasota-fl",
                id: 821,
                name: "Sarasota, FL"
            }, {
                slug: "savannah-ga",
                id: 822,
                name: "Savannah, GA"
            }, {
                slug: "sayreville-nj",
                id: 823,
                name: "Sayreville, NJ"
            }, {
                slug: "schaumburg-il",
                id: 824,
                name: "Schaumburg, IL"
            }, {
                slug: "schenectady-ny",
                id: 825,
                name: "Schenectady, NY"
            }, {
                slug: "scottsdale-az",
                id: 826,
                name: "Scottsdale, AZ"
            }, {
                slug: "scranton-pa",
                id: 827,
                name: "Scranton, PA"
            }, {
                slug: "seattle-wa",
                id: 828,
                name: "Seattle, WA"
            }, {
                slug: "shakopee-mn",
                id: 829,
                name: "Shakopee, MN"
            }, {
                slug: "shawnee-ks",
                id: 830,
                name: "Shawnee, KS"
            }, {
                slug: "sheboygan-wi",
                id: 831,
                name: "Sheboygan, WI"
            }, {
                slug: "shelton-ct",
                id: 832,
                name: "Shelton, CT"
            }, {
                slug: "sherman-tx",
                id: 833,
                name: "Sherman, TX"
            }, {
                slug: "shoreline-wa",
                id: 834,
                name: "Shoreline, WA"
            }, {
                slug: "shreveport-la",
                id: 835,
                name: "Shreveport, LA"
            }, {
                slug: "sierra-vista-az",
                id: 836,
                name: "Sierra Vista, AZ"
            }, {
                slug: "simi-valley-ca",
                id: 837,
                name: "Simi Valley, CA"
            }, {
                slug: "sioux-city-ia",
                id: 838,
                name: "Sioux City, IA"
            }, {
                slug: "sioux-falls-sd",
                id: 839,
                name: "Sioux Falls, SD"
            }, {
                slug: "skokie-il",
                id: 840,
                name: "Skokie, IL"
            }, {
                slug: "smyrna-ga",
                id: 841,
                name: "Smyrna, GA"
            }, {
                slug: "smyrna-tn",
                id: 842,
                name: "Smyrna, TN"
            }, {
                slug: "somerville-ma",
                id: 843,
                name: "Somerville, MA"
            }, {
                slug: "south-bend-in",
                id: 844,
                name: "South Bend, IN"
            }, {
                slug: "south-gate-ca",
                id: 845,
                name: "South Gate, CA"
            }, {
                slug: "south-jordan-ut",
                id: 846,
                name: "South Jordan, UT"
            }, {
                slug: "south-san-francisco-ca",
                id: 847,
                name: "South San Francisco, CA"
            }, {
                slug: "southaven-ms",
                id: 848,
                name: "Southaven, MS"
            }, {
                slug: "southfield-mi",
                id: 849,
                name: "Southfield, MI"
            }, {
                slug: "spanish-fork-ut",
                id: 850,
                name: "Spanish Fork, UT"
            }, {
                slug: "sparks-nv",
                id: 851,
                name: "Sparks, NV"
            }, {
                slug: "spartanburg-sc",
                id: 852,
                name: "Spartanburg, SC"
            }, {
                slug: "spokane-valley-wa",
                id: 853,
                name: "Spokane Valley, WA"
            }, {
                slug: "spokane-wa",
                id: 854,
                name: "Spokane, WA"
            }, {
                slug: "springdale-ar",
                id: 855,
                name: "Springdale, AR"
            }, {
                slug: "springfield-il",
                id: 856,
                name: "Springfield, IL"
            }, {
                slug: "springfield-ma",
                id: 857,
                name: "Springfield, MA"
            }, {
                slug: "springfield-mo",
                id: 858,
                name: "Springfield, MO"
            }, {
                slug: "springfield-oh",
                id: 859,
                name: "Springfield, OH"
            }, {
                slug: "springfield-or",
                id: 860,
                name: "Springfield, OR"
            }, {
                slug: "st.-charles-mo",
                id: 861,
                name: "St. Charles, MO"
            }, {
                slug: "st.-clair-shores-mi",
                id: 862,
                name: "St. Clair Shores, MI"
            }, {
                slug: "st.-cloud-fl",
                id: 863,
                name: "St. Cloud, FL"
            }, {
                slug: "st.-cloud-mn",
                id: 864,
                name: "St. Cloud, MN"
            }, {
                slug: "st.-george-ut",
                id: 865,
                name: "St. George, UT"
            }, {
                slug: "st.-joseph-mo",
                id: 866,
                name: "St. Joseph, MO"
            }, {
                slug: "st.-louis-park-mn",
                id: 867,
                name: "St. Louis Park, MN"
            }, {
                slug: "st.-louis-mo",
                id: 868,
                name: "St. Louis, MO"
            }, {
                slug: "st.-paul-mn",
                id: 869,
                name: "St. Paul, MN"
            }, {
                slug: "st.-peters-mo",
                id: 870,
                name: "St. Peters, MO"
            }, {
                slug: "st.-petersburg-fl",
                id: 871,
                name: "St. Petersburg, FL"
            }, {
                slug: "stamford-ct",
                id: 872,
                name: "Stamford, CT"
            }, {
                slug: "stanton-ca",
                id: 873,
                name: "Stanton, CA"
            }, {
                slug: "state-college-pa",
                id: 874,
                name: "State College, PA"
            }, {
                slug: "sterling-heights-mi",
                id: 875,
                name: "Sterling Heights, MI"
            }, {
                slug: "stillwater-ok",
                id: 876,
                name: "Stillwater, OK"
            }, {
                slug: "stockton-ca",
                id: 877,
                name: "Stockton, CA"
            }, {
                slug: "streamwood-il",
                id: 878,
                name: "Streamwood, IL"
            }, {
                slug: "strongsville-oh",
                id: 879,
                name: "Strongsville, OH"
            }, {
                slug: "suffolk-va",
                id: 880,
                name: "Suffolk, VA"
            }, {
                slug: "sugar-land-tx",
                id: 881,
                name: "Sugar Land, TX"
            }, {
                slug: "summerville-sc",
                id: 882,
                name: "Summerville, SC"
            }, {
                slug: "sumter-sc",
                id: 883,
                name: "Sumter, SC"
            }, {
                slug: "sunnyvale-ca",
                id: 884,
                name: "Sunnyvale, CA"
            }, {
                slug: "sunrise-fl",
                id: 885,
                name: "Sunrise, FL"
            }, {
                slug: "surprise-az",
                id: 886,
                name: "Surprise, AZ"
            }, {
                slug: "syracuse-ny",
                id: 887,
                name: "Syracuse, NY"
            }, {
                slug: "tacoma-wa",
                id: 888,
                name: "Tacoma, WA"
            }, {
                slug: "tallahassee-fl",
                id: 889,
                name: "Tallahassee, FL"
            }, {
                slug: "tamarac-fl",
                id: 890,
                name: "Tamarac, FL"
            }, {
                slug: "tampa-fl",
                id: 891,
                name: "Tampa, FL"
            }, {
                slug: "taunton-ma",
                id: 892,
                name: "Taunton, MA"
            }, {
                slug: "taylor-mi",
                id: 893,
                name: "Taylor, MI"
            }, {
                slug: "taylorsville-ut",
                id: 894,
                name: "Taylorsville, UT"
            }, {
                slug: "temecula-ca",
                id: 895,
                name: "Temecula, CA"
            }, {
                slug: "tempe-az",
                id: 896,
                name: "Tempe, AZ"
            }, {
                slug: "temple-tx",
                id: 897,
                name: "Temple, TX"
            }, {
                slug: "terre-haute-in",
                id: 898,
                name: "Terre Haute, IN"
            }, {
                slug: "texarkana-tx",
                id: 899,
                name: "Texarkana, TX"
            }, {
                slug: "texas-city-tx",
                id: 900,
                name: "Texas City, TX"
            }, {
                slug: "the-colony-tx",
                id: 901,
                name: "The Colony, TX"
            }, {
                slug: "thornton-co",
                id: 902,
                name: "Thornton, CO"
            }, {
                slug: "thousand-oaks-ca",
                id: 903,
                name: "Thousand Oaks, CA"
            }, {
                slug: "tigard-or",
                id: 904,
                name: "Tigard, OR"
            }, {
                slug: "tinley-park-il",
                id: 905,
                name: "Tinley Park, IL"
            }, {
                slug: "titusville-fl",
                id: 906,
                name: "Titusville, FL"
            }, {
                slug: "toledo-oh",
                id: 907,
                name: "Toledo, OH"
            }, {
                slug: "topeka-ks",
                id: 908,
                name: "Topeka, KS"
            }, {
                slug: "torrance-ca",
                id: 909,
                name: "Torrance, CA"
            }, {
                slug: "tracy-ca",
                id: 910,
                name: "Tracy, CA"
            }, {
                slug: "trenton-nj",
                id: 911,
                name: "Trenton, NJ"
            }, {
                slug: "troy-mi",
                id: 912,
                name: "Troy, MI"
            }, {
                slug: "troy-ny",
                id: 913,
                name: "Troy, NY"
            }, {
                slug: "tucson-az",
                id: 914,
                name: "Tucson, AZ"
            }, {
                slug: "tulare-ca",
                id: 915,
                name: "Tulare, CA"
            }, {
                slug: "tulsa-ok",
                id: 916,
                name: "Tulsa, OK"
            }, {
                slug: "turlock-ca",
                id: 917,
                name: "Turlock, CA"
            }, {
                slug: "tuscaloosa-al",
                id: 918,
                name: "Tuscaloosa, AL"
            }, {
                slug: "tustin-ca",
                id: 919,
                name: "Tustin, CA"
            }, {
                slug: "twin-falls-id",
                id: 920,
                name: "Twin Falls, ID"
            }, {
                slug: "tyler-tx",
                id: 921,
                name: "Tyler, TX"
            }, {
                slug: "union-city-ca",
                id: 922,
                name: "Union City, CA"
            }, {
                slug: "union-city-nj",
                id: 923,
                name: "Union City, NJ"
            }, {
                slug: "upland-ca",
                id: 924,
                name: "Upland, CA"
            }, {
                slug: "urbana-il",
                id: 925,
                name: "Urbana, IL"
            }, {
                slug: "urbandale-ia",
                id: 926,
                name: "Urbandale, IA"
            }, {
                slug: "utica-ny",
                id: 927,
                name: "Utica, NY"
            }, {
                slug: "vacaville-ca",
                id: 928,
                name: "Vacaville, CA"
            }, {
                slug: "valdosta-ga",
                id: 929,
                name: "Valdosta, GA"
            }, {
                slug: "vallejo-ca",
                id: 930,
                name: "Vallejo, CA"
            }, {
                slug: "valley-stream-ny",
                id: 931,
                name: "Valley Stream, NY"
            }, {
                slug: "vancouver-wa",
                id: 932,
                name: "Vancouver, WA"
            }, {
                slug: "ventura-ca",
                id: 933,
                name: "Ventura, CA"
            }, {
                slug: "victoria-tx",
                id: 934,
                name: "Victoria, TX"
            }, {
                slug: "victorville-ca",
                id: 935,
                name: "Victorville, CA"
            }, {
                slug: "vineland-nj",
                id: 936,
                name: "Vineland, NJ"
            }, {
                slug: "virginia-beach-va",
                id: 937,
                name: "Virginia Beach, VA"
            }, {
                slug: "visalia-ca",
                id: 938,
                name: "Visalia, CA"
            }, {
                slug: "vista-ca",
                id: 939,
                name: "Vista, CA"
            }, {
                slug: "waco-tx",
                id: 940,
                name: "Waco, TX"
            }, {
                slug: "walnut-creek-ca",
                id: 941,
                name: "Walnut Creek, CA"
            }, {
                slug: "waltham-ma",
                id: 942,
                name: "Waltham, MA"
            }, {
                slug: "warner-robins-ga",
                id: 943,
                name: "Warner Robins, GA"
            }, {
                slug: "warren-mi",
                id: 944,
                name: "Warren, MI"
            }, {
                slug: "warren-oh",
                id: 945,
                name: "Warren, OH"
            }, {
                slug: "warwick-ri",
                id: 946,
                name: "Warwick, RI"
            }, {
                slug: "washington-dc",
                id: 947,
                name: "Washington, DC"
            }, {
                slug: "waterbury-ct",
                id: 948,
                name: "Waterbury, CT"
            }, {
                slug: "waterloo-ia",
                id: 949,
                name: "Waterloo, IA"
            }, {
                slug: "watsonville-ca",
                id: 950,
                name: "Watsonville, CA"
            }, {
                slug: "waukegan-il",
                id: 951,
                name: "Waukegan, IL"
            }, {
                slug: "waukesha-wi",
                id: 952,
                name: "Waukesha, WI"
            }, {
                slug: "wausau-wi",
                id: 953,
                name: "Wausau, WI"
            }, {
                slug: "wauwatosa-wi",
                id: 954,
                name: "Wauwatosa, WI"
            }, {
                slug: "wellington-fl",
                id: 955,
                name: "Wellington, FL"
            }, {
                slug: "weslaco-tx",
                id: 956,
                name: "Weslaco, TX"
            }, {
                slug: "west-allis-wi",
                id: 957,
                name: "West Allis, WI"
            }, {
                slug: "west-covina-ca",
                id: 958,
                name: "West Covina, CA"
            }, {
                slug: "west-des-moines-ia",
                id: 959,
                name: "West Des Moines, IA"
            }, {
                slug: "west-haven-ct",
                id: 960,
                name: "West Haven, CT"
            }, {
                slug: "west-jordan-ut",
                id: 961,
                name: "West Jordan, UT"
            }, {
                slug: "west-new-york-nj",
                id: 962,
                name: "West New York, NJ"
            }, {
                slug: "west-palm-beach-fl",
                id: 963,
                name: "West Palm Beach, FL"
            }, {
                slug: "west-sacramento-ca",
                id: 964,
                name: "West Sacramento, CA"
            }, {
                slug: "west-valley-city-ut",
                id: 965,
                name: "West Valley City, UT"
            }, {
                slug: "westerville-oh",
                id: 966,
                name: "Westerville, OH"
            }, {
                slug: "westfield-ma",
                id: 967,
                name: "Westfield, MA"
            }, {
                slug: "westland-mi",
                id: 968,
                name: "Westland, MI"
            }, {
                slug: "westminster-ca",
                id: 969,
                name: "Westminster, CA"
            }, {
                slug: "westminster-co",
                id: 970,
                name: "Westminster, CO"
            }, {
                slug: "weston-fl",
                id: 971,
                name: "Weston, FL"
            }, {
                slug: "weymouth-town-ma",
                id: 972,
                name: "Weymouth Town, MA"
            }, {
                slug: "wheaton-il",
                id: 973,
                name: "Wheaton, IL"
            }, {
                slug: "wheeling-il",
                id: 974,
                name: "Wheeling, IL"
            }, {
                slug: "white-plains-ny",
                id: 975,
                name: "White Plains, NY"
            }, {
                slug: "whittier-ca",
                id: 976,
                name: "Whittier, CA"
            }, {
                slug: "wichita-falls-tx",
                id: 977,
                name: "Wichita Falls, TX"
            }, {
                slug: "wichita-ks",
                id: 978,
                name: "Wichita, KS"
            }, {
                slug: "wilkes-barre-pa",
                id: 979,
                name: "Wilkes-Barre, PA"
            }, {
                slug: "wilmington-de",
                id: 980,
                name: "Wilmington, DE"
            }, {
                slug: "wilmington-nc",
                id: 981,
                name: "Wilmington, NC"
            }, {
                slug: "wilson-nc",
                id: 982,
                name: "Wilson, NC"
            }, {
                slug: "winston-salem-nc",
                id: 983,
                name: "Winston-Salem, NC"
            }, {
                slug: "winter-garden-fl",
                id: 984,
                name: "Winter Garden, FL"
            }, {
                slug: "woburn-ma",
                id: 985,
                name: "Woburn, MA"
            }, {
                slug: "woodbury-mn",
                id: 986,
                name: "Woodbury, MN"
            }, {
                slug: "woodland-ca",
                id: 987,
                name: "Woodland, CA"
            }, {
                slug: "woonsocket-ri",
                id: 988,
                name: "Woonsocket, RI"
            }, {
                slug: "worcester-ma",
                id: 989,
                name: "Worcester, MA"
            }, {
                slug: "wylie-tx",
                id: 990,
                name: "Wylie, TX"
            }, {
                slug: "wyoming-mi",
                id: 991,
                name: "Wyoming, MI"
            }, {
                slug: "yakima-wa",
                id: 992,
                name: "Yakima, WA"
            }, {
                slug: "yonkers-ny",
                id: 993,
                name: "Yonkers, NY"
            }, {
                slug: "yorba-linda-ca",
                id: 994,
                name: "Yorba Linda, CA"
            }, {
                slug: "york-pa",
                id: 995,
                name: "York, PA"
            }, {
                slug: "youngstown-oh",
                id: 996,
                name: "Youngstown, OH"
            }, {
                slug: "yuba-city-ca",
                id: 997,
                name: "Yuba City, CA"
            }, {
                slug: "yucaipa-ca",
                id: 998,
                name: "Yucaipa, CA"
            }, {
                slug: "yuma-az",
                id: 999,
                name: "Yuma, AZ"
            }])
        }
    }, this.Distilled.Locations = e, e
}(),
function() {
    this.Distilled = this.Distilled || {};
    var e = function() {
        this._init()
    };
    return e.prototype = {
        mShowingCalendar: null,
        mShowingTooltip: null,
        mLocations: null,
        mLocation: null,
        mCalendars: null,
        mTypeAhead: null,
        mCurrentLocation: null,
        mMobileView: null,
        mSlick: null,
        mLookingAhead: null,
        mFocusedMonth: null,
        mEnteredMonth: null,
        _init: function() {
            this._checkSize(), this.mLocations = new Distilled.Locations, this.mLocation = new Distilled.Location(this._onLocationLoadComplete, this._onLocationLoadError, this), this._setupInput(), this._setupCalendar(), this._setupCalendarAccessibility(), this._addEventListeners()
        },
        _checkSize: function() {
            var e = window.innerHeight,
                a = window.innerWidth,
                n = Math.min(e, a),
                i = Math.max(e, a);
            this.mMobileView = null, n < 768 && Distilled.core.HAS_TOUCH && (this.mMobileView = !0, $("html").addClass("mobile_view"))
        },
        _setupInput: function() {
            var e = this,
                a = this.mLocations.getData(),
                n;
            if (Distilled.core.HASH) {
                var i = this.mLocations.find(Distilled.core.HASH);
                i && (n = i.name)
            }
            var l = null,
                t = null,
                o = function() {
                    var e = $("#city_autocomplete").val();
                    return null !== l && void 0 !== l ? l : e.length > 0 ? e : null
                },
                s = function() {
                    var e = o();
                    e ? $("#city_autocomplete_container .autocomplete__wrapper").addClass("autocomplete__value") : $("#city_autocomplete_container .autocomplete__wrapper").removeClass("autocomplete__value")
                },
                d = accessibleAutocomplete({
                    element: document.querySelector("#city_autocomplete_container"),
                    id: "city_autocomplete",
                    source: a,
                    placeholder: "enter city",
                    showNoOptionsFound: !1,
                    autoselect: !1,
                    showAllValues: !0,
                    minLength: 0,
                    displayMenu: "overlay",
                    defaultValue: n,
                    onConfirm: function(a) {
                        l = a, s();
                        var n = o();
                        e._locationSelected(n), n && ($("#best_day_submit_btn").focus(), setTimeout(function() {
                            $("#best_day_submit_btn").focus()
                        }, 100))
                    }
                });
            $(window).on("keyup", function(e) {
                16 != e.keyCode && (t = e.keyCode)
            }), $("#city_autocomplete").on("input", function(e) {
                s()
            }), $("#best_day_submit_btn").on("click", function() {
                var a = o();
                e._locationSelected(a)
            }), $("#city_autocomplete_container .autocomplete__wrapper").append("<button tabindex='0' id='autocomplete__clear' class='autocomplete__clear clear_btn'><span class='autocomplete__clear_label'>Clear</span></button>"), $("#autocomplete__clear").on("click", function(e) {
                l = null, t = null, $("#city_autocomplete").val(""), s(), setTimeout(function() {
                    t = null, $("#city_autocomplete").val(""), $("#city_autocomplete").focus()
                }, 100)
            }), $("#city_autocomplete_container .autocomplete__wrapper").append("<div id='autocomplete__combo' class='autocomplete__combo combo_btn'></div>"), Distilled.core.HASH && this._locationSelected(Distilled.core.HASH)
        },
        _setupCalendar: function() {
            var e = new Date,
                a = e.getMonth(),
                n = e.getFullYear();
            a++, 12 == a && (a = 0, n++);
            var i = {};
            if (1 == this.mMobileView ? i.mouseClickMonth = this._onMouseClickMonth.bind(this) : (i.mouseOnDay = this._onMouseOverDay.bind(this), i.mouseOutDay = this._onMouseOutDay.bind(this)), this.mCalendars = [], this._createCalendar("#calendar_container", "calendar_01", a, n, i, !0), n++, this._createCalendar("#calendar_container", "calendar_02", a, n, i), 1 == this.mMobileView) {
                var n = e.getFullYear();
                i = {}, i.mouseOnDay = this._onMouseOverDayMobile.bind(this), this._createCalendar("#mobile_calendar_container", "mobile_calendar_01", a, n, i, !0)
            } else $("#mobile_calendar_container").remove()
        },
        _setupCalendarAccessibility: function() {
            console.log("[View] MONTHS:", $(".calendar .month"))
        },
        _addEventListeners: function() {
            var e = {
                self: this
            };
            $(".look_ahead_btn").on("click", e, this._onLookAheadClick), $("#methodology_open_btn").on("click", e, this._onMethodologyOpenClick), $("#methodology_close_btn").on("click", e, this._onMethodologyCloseClick), $("#tooltip_close_btn").on("click", e, this._onTooltipCloseClick), $(document).on("focusin", e, this._onFocus), $(document).on("keydown", e, this._onDocumentKeyDown)
        },
        _createCalendar: function(e, a, n, i, l, t) {
            $(e).append("<div id='" + a + "' class='clearfix'></div>");
            var o = this,
                s, d = $("#" + a).calendar({
                    startYear: i,
                    startMonth: n,
                    showDays: !0,
                    showYear: t,
                    customDayRenderer: function(e, a) {
                        o.mLocation.setDay(e, a)
                    },
                    mouseOnDay: l.mouseOnDay,
                    mouseOutDay: l.mouseOutDay,
                    mouseClickMonth: l.mouseClickMonth
                });
            this.mCalendars.push(d)
        },
        _locationSelected: function(e) {
            var a = this.mLocations.find(e);
            if (a && this.mCurrentLocation != a.slug) {
                if (1 == this.mShowingCalendar) return this._hideDates(), this._hideCalendar(), this._hideLookAhead(), void TweenLite.delayedCall(.5, this._locationSelected, [e], this);
                this.mCurrentLocation = a.slug, this._showLoading(), this.mLoadingComplete = null, Distilled.core.setHash(a.slug), this.mLocation.load(a.slug)
            }
        },
        _setData: function() {
            this._hideLoading();
            for (var e = this.mCalendars, a = e.length, n = 0; n < a; n++) e[n].update();
            var i = this.mLocation.getPerfectDay(),
                l = i.season;
            $(".dates_block").removeClass("not_summer not_winter not_fall not_spring"), $(".calendar_block").removeClass("summer winter fall spring"), $(".dates_block").addClass("not_" + l), $(".calendar_block").addClass(l), $("#perfect_day").html(i.dateHTML), $("#perfect_summer").html(this.mLocation.getPerfectSummer()), $("#perfect_spring").html(this.mLocation.getPerfectSpring()), $("#perfect_fall").html(this.mLocation.getPerfectAutumn()), $("#perfect_winter").html(this.mLocation.getPerfectWinter());
            var t = this.mLocation.getLocationTitle(),
                o = this.mLocation.getTwitterDate(),
                s = "The best day for a wedding in " + t + " is " + o + ". Find your perfect wedding day";
            $(".social-likes").socialLikes({
                title: s,
                via: "Bloomingdales"
            }), $("#typeahead__input").val(t), this._showCalendar(), this._showDates(), 1 == this.mMobileView && this._setupMobileCalendar()
        },
        _showLoading: function() {
            TweenLite.set("#loading", {
                y: -50,
                autoAlpha: 0,
                height: "auto"
            });
            var e = $("#loading").outerHeight();
            TweenLite.set("#loading", {
                height: 0
            }), TweenLite.to("#loading", .25, {
                autoAlpha: 1,
                height: e,
                y: 0,
                ease: Sine.easeInOut
            }), this.mLoadingDelayComplete = null;
            var a = this;
            TweenLite.delayedCall(1, function() {
                a.mLoadingDelayComplete = !0, 1 == a.mLoadingComplete && a._setData()
            })
        },
        _hideLoading: function() {
            TweenLite.to("#loading", .5, {
                autoAlpha: 0,
                y: -50,
                ease: Sine.easeInOut
            }), TweenLite.to("#loading", .25, {
                height: 0,
                delay: .5,
                ease: Sine.easeInOut
            })
        },
        _showCalendar: function() {
            var e = $(".calendar_block").first(),
                a = .5;
            TweenLite.set(".look_ahead", {
                autoAlpha: 1,
                height: "auto"
            }), TweenLite.set(e, {
                display: "block",
                height: "auto"
            });
            var n = e.outerHeight();
            TweenLite.set(e, {
                height: 0,
                y: -50
            }), TweenLite.to(e, .25, {
                height: n,
                delay: a,
                ease: Sine.easeInOut,
                onComplete: this._resetHeight,
                onCompleteParams: [e],
                onCompleteScope: this
            }), TweenLite.to(e, .5, {
                autoAlpha: 1,
                y: 0,
                delay: a + .5,
                ease: Sine.easeInOut
            }), this.mShowingCalendar = !0, this.mLookingAhead = null, setTimeout(function() {
                $("#calendar_title").focus()
            }, 500)
        },
        _hideCalendar: function() {
            var e = $(".calendar_block").first();
            TweenLite.to(e, .5, {
                autoAlpha: 0,
                y: -50,
                ease: Sine.easeInOut
            }), TweenLite.to(e, .25, {
                height: 0,
                delay: .5,
                ease: Sine.easeInOut
            }), this.mShowingCalendar = null
        },
        _showDates: function() {
            var e = $(".dates_block").first(),
                a = 1;
            TweenLite.set(e, {
                display: "block",
                height: "auto"
            });
            var n = e.outerHeight();
            TweenLite.set(e, {
                height: 0,
                y: -50
            }), TweenLite.to(e, .25, {
                height: n,
                delay: a,
                ease: Sine.easeInOut,
                onComplete: this._resetHeight,
                onCompleteParams: [e],
                onCompleteScope: this
            }), TweenLite.to(e, .5, {
                autoAlpha: 1,
                y: 0,
                delay: a + .5,
                ease: Sine.easeInOut
            })
        },
        _hideDates: function() {
            var e = $(".dates_block").first();
            TweenLite.to(e, .5, {
                autoAlpha: 0,
                y: -50,
                ease: Sine.easeInOut
            }), TweenLite.to(e, .25, {
                height: 0,
                delay: .5,
                ease: Sine.easeInOut
            })
        },
        _showLookAhead: function() {
            var e = $("#calendar_02");
            TweenLite.set(e, {
                display: "inline-block",
                height: "auto"
            });
            var a = e.outerHeight();
            TweenLite.set(e, {
                height: 0
            }), TweenLite.to(e, .25, {
                height: a,
                ease: Sine.easeInOut
            }), TweenLite.to(e, .5, {
                autoAlpha: 1,
                delay: .5,
                ease: Sine.easeInOut
            }), TweenLite.to(".look_ahead", .25, {
                autoAlpha: 0,
                height: 0,
                ease: Sine.easeInOut
            }), this.mLookingAhead = !0
        },
        _hideLookAhead: function() {
            var e = $("#calendar_02");
            TweenLite.to(e, .5, {
                autoAlpha: 0,
                ease: Sine.easeInOut
            }), TweenLite.to(e, .25, {
                height: 0,
                delay: .5,
                ease: Sine.easeInOut
            })
        },
        _showMobileCalendar: function(e) {
            e++;
            var a = null;
            $("#mobile_calendar_container .month-container").each(function(n) {
                var i = $(this).data("month-id");
                i == e && (a = n)
            }), this.mSlick[0].slick.goTo(a), TweenLite.set(".mobile_calendar", {
                display: "block",
                left: 0,
                autoAlpha: 0
            }), TweenLite.to(".mobile_calendar", .5, {
                autoAlpha: 1,
                ease: Sine.easeInOut
            })
        },
        _hideMobileCalendar: function() {
            TweenLite.to(".mobile_calendar", .5, {
                autoAlpha: 0,
                ease: Sine.easeInOut,
                onComplete: function() {
                    TweenLite.set(".mobile_calendar", {
                        display: "none"
                    })
                }
            })
        },
        _showTooltip: function(e, a) {
            var n = e.position(),
                i = e.outerWidth(),
                l = e.outerHeight();
            n.top += l, n.left += .5 * i, n.top += 10, n.left = n.left >> 0, n.top = n.top >> 0;
            var t = $("#calendar_tooltip"),
                o = e.data("day"),
                s = a.format("mmmm dS, yyyy"),
                d = this._getTooltipContent(o, s),
                u = this._getTooltipText(o, a);
            this._updateCalendarStatus(u), t.find(".tooltip_inner").html(d);
            var m = Math.min(window.innerWidth, 962),
                r = .5 * t.outerWidth(),
                g = m - r,
                c = 110,
                h = 0;
            n.left > g ? (h = n.left - g, n.left = g) : n.left < c && (h = n.left - c, n.left = c), t.find(".tooltip_arrow").css("left", r + h), TweenLite.killTweensOf(t), TweenLite.set(t, n), TweenLite.to(t, .25, {
                autoAlpha: 1,
                ease: Sine.easeInOut
            }), this.mShowingTooltip = !0
        },
        _hideTooltip: function(e) {
            var a = this;
            TweenLite.to("#calendar_tooltip", .25, {
                autoAlpha: 0,
                delay: e ? 0 : 1,
                ease: Sine.easeInOut,
                onStart: function() {
                    a.mShowingTooltip = null
                },
                onComplete: function() {
                    $("#calendar_tooltip").attr("aria-hidden", "true")
                }
            })
        },
        _setupMobileCalendar: function(e) {
            this.mSlick = $("#mobile_calendar_container .months-container").slick({
                dots: !1,
                infinite: !1,
                speed: 300,
                slidesToShow: 1,
                slidesToScroll: 1,
                adaptiveHeight: !1,
                arrows: !0,
                slickGoTo: e,
                nextArrow: '<button type="button" class="slick-next"></button>',
                prevArrow: '<button type="button" class="slick-prev"></button>'
            }), TweenLite.set("#mobile_calendar_block", {
                display: "none"
            }), $("#full_year_btn").on("click", {
                self: this
            }, this._onfullYearClick), $("#tooltip_clear_btn").on("click", {
                self: this
            }, this._onTooltipClearClick), $("#mobile_calendar_container .months-container").on("beforeChange", {
                self: this
            }, this._onMobileCarouselMonthChange)
        },
        _getTooltipContent: function(e, a) {
            var n = "";
            return n += "<h4>" + a + (1 == e.isPerfectDay ? " - your perfect day" : "") + "</h4>", n += "<p>Average temperature <span class='value'>" + e.tempAvg + "&#x2109;</span></p>", n += "<p>Chance of rain <span class='value'>" + e.chanceRain + "%</span></p>", n += "<p>Chance of clear sky <span class='value'>" + e.chanceClear + "%</span></p>", n += "<p>Humidity <span class='value'>" + e.humidity + "%</span></p>"
        },
        _getTooltipText: function(e, a) {
            var n = a.format("dS"),
                i = a.format("mmmm"),
                l = a.format("yyyy"),
                t = n + " of " + i + ", " + l + (1 == e.isPerfectDay ? " - your perfect day" : "");
            return t += ", Average temperature " + e.tempAvg + "&#x2109;", t += ", Chance of rain " + e.chanceRain + "%", t += ", Chance of clear sky " + e.chanceClear + "%", t += ", Humidity " + e.humidity + "%"
        },
        _resetHeight: function(e) {
            TweenLite.set(e, {
                height: "auto"
            })
        },
        _getMonthContainer: function(e) {
            var a = this.mFocusedMonth,
                n = e.closest(".month-container");
            a && a.not(n).length > 0 && this._exitMonth(), this.mFocusedMonth = n, console.log("[View] FOCUSED MONTH:", n.find(".month-title").text())
        },
        _enterMonth: function() {
            var e = this.mFocusedMonth.find(".day.focusable");
            e.attr("tabindex", "0"), e.first().focus(), this.mEnteredMonth = !0
        },
        _exitMonth: function() {
            this.mFocusedMonth && this.mFocusedMonth.find(".day.focusable").attr("tabindex", ""), this.mEnteredMonth = null
        },
        _selectDay: function() {
            var e = this.mFocusedMonth.find(".day.focusable:focus");
            if (e.length > 0) {
                var a = e.data("date");
                this._showTooltip(e, a)
            }
        },
        _updateCalendarStatus: function(e) {
            $("#calendar_status").remove();
            var a = "<div id='calendar_status' aria-atomic='true' aria-live='assertive' role='alert' style='border: 0px; clip: rect(0px 0px 0px 0px); height: 1px; margin-bottom: -1px; margin-right: -1px; overflow: hidden; padding: 0px; position: absolute; white-space: nowrap; width: 1px;'>";
            a += e, a += "</div>", $("#calendar_container").append(a)
        },
        _onLookAheadClick: function(e) {
            var a = e.data.self;
            return e.preventDefault(), a._showLookAhead(), !1
        },
        _onLocationLoadComplete: function() {
            this.mLoadingComplete = !0, 1 == this.mLoadingDelayComplete && this._setData()
        },
        _onLocationLoadError: function() {
            this._hideLoading()
        },
        _onMouseOverDay: function(e) {
            this._showTooltip(e.element, e.date)
        },
        _onMouseOutDay: function() {
            this._hideTooltip()
        },
        _onMouseClickMonth: function(e) {
            var a = e.date.getMonth();
            this._showMobileCalendar(a)
        },
        _onMouseOverDayMobile: function(e) {
            var a = e.element.data("day"),
                n = e.date.format("mmmm dS, yyyy"),
                i = this._getTooltipContent(a, n),
                l = $("#mobile_calendar_tooltip");
            l.find(".tooltip_inner").html(i), l.addClass("show"), TweenLite.to(l, .25, {
                autoAlpha: 1,
                ease: Sine.easeInOut
            })
        },
        _onfullYearClick: function(e) {
            var a = e.data.self;
            $("#mobile_calendar_tooltip").removeClass("show"), a._hideMobileCalendar()
        },
        _onTooltipClearClick: function(e) {
            $("#mobile_calendar_tooltip").removeClass("show")
        },
        _onMobileCarouselMonthChange: function(e, a, n, i) {
            var l = e.data.self;
            $("#mobile_calendar_tooltip").removeClass("show")
        },
        _onMethodologyOpenClick: function(e) {
            var a = e.data.self;
            TweenLite.set("#methodology", {
                display: "table",
                autoAlpha: 0
            }), TweenLite.to("#methodology", .25, {
                autoAlpha: 1,
                ease: Sine.easeInOut
            }), $(document).on("keydown", e.data, a._onMethodologyCloseClick), TweenLite.delayedCall(.25, function() {
                $("#methodology").focus()
            })
        },
        _onMethodologyCloseClick: function(e) {
            var a = e.data.self;
            e.keyCode && 27 !== e.keyCode || ($(document).off("keydown"), $("#methodology_open_btn").focus(), TweenLite.to("#methodology", .25, {
                autoAlpha: 0,
                ease: Sine.easeInOut,
                onComplete: function() {
                    TweenLite.set("#methodology", {
                        display: "none",
                        autoAlpha: 0
                    })
                }
            }))
        },
        _onTooltipCloseClick: function(e) {
            var a = e.data.self;
            TweenLite.to("#calendar_tooltip", .25, {
                autoAlpha: 0,
                ease: Sine.easeInOut
            })
        },
        _onFocus: function(e) {
            var a = e.data.self,
                n = $(e.target);
            if (a._hideTooltip(), n.hasClass("month-title")) {
                a._getMonthContainer(n);
                var i = n.text() + ", to navigate the month press enter.";
                a._updateCalendarStatus(i)
            } else if (n.hasClass("day")) {
                var l = n.data("date");
                if (a._showTooltip(n, l), null == a.mFocusedMonth) return void a._getMonthContainer(n);
                0 == a.mFocusedMonth.has(".day.focusable:focus").length && a._getMonthContainer(n)
            } else a.mFocusedMonth = null
        },
        _onDocumentKeyDown: function(e) {
            var a = e.data.self;
            if (a.mFocusedMonth) {
                if (13 == e.keyCode) return void(a.mShowingTooltip ? a._hideTooltip(!0) : a._enterMonth());
                if (9 == e.keyCode && a._hideTooltip(!0), 27 == e.keyCode) return void(a.mShowingTooltip ? a._hideTooltip(!0) : (a.mFocusedMonth.find(".month-title").focus(), a._exitMonth()));
                if (a.mEnteredMonth) {
                    var n = a.mFocusedMonth.find(".day.focusable:focus");
                    if (n.length > 0) {
                        if (39 != e.keyCode && 37 != e.keyCode || a._hideTooltip(!0), 39 == e.keyCode) {
                            var i = n.next(".day.focusable");
                            if (i.length > 0) i.focus();
                            else {
                                var l = n.parent().next(".week");
                                if (l.length > 0) l.find(".day.focusable").first().focus();
                                else {
                                    var t = a.mFocusedMonth.next(".month-container");
                                    if (t.length > 0) a._exitMonth(), a.mFocusedMonth = null, t.find(".month-title").focus();
                                    else {
                                        var o = a.mFocusedMonth.closest(".calendar"),
                                            s = o.next(".calendar:visible");
                                        s.length > 0 && (a._exitMonth(), a.mFocusedMonth = null, s.find(".month-title").first().focus())
                                    }
                                }
                            }
                        }
                        if (37 == e.keyCode) {
                            var d = n.prev(".day.focusable");
                            if (d.length > 0) d.focus();
                            else {
                                var u = n.parent().prev(".week");
                                u.length > 0 ? u.find(".day.focusable").last().focus() : a.mFocusedMonth.find(".month-title").focus()
                            }
                        }
                    } else 39 == e.keyCode && a.mFocusedMonth.find(".day.focusable").first().focus()
                }
            }
        }
    }, this.Distilled.View = e, e
}(),
function() {
    this.Distilled = this.Distilled || {};
    var e = function() {
        this._init()
    };
    return e.prototype = {
        IS_MOBILE: null,
        IS_TABLET: null,
        IS_DESKTOP: null,
        IS_IE: null,
        HAS_TOUCH: null,
        IE_VERSION: null,
        HASH: null,
        loaded: function() {
            setTimeout(function() {
                $(".loading").removeClass("loading")
            }, 500)
        },
        setHash: function(e) {
            window.location.hash = "#" + e
        },
        _init: function() {
            this._getHash(), this._getDeviceType(), this._checkBrowser(), this._checkForTouch(), console.log("[Core] IS IE:", this.IS_IE), console.log("[Core] IE VERSION:", this.IE_VERSION), console.log("[Core] HAS TOUCH:", this.HAS_TOUCH)
        },
        _getHash: function(e) {
            window.location.hash ? this.HASH = window.location.hash.substring(1) : this.HASH = null, console.log("[Core] HASH:", this.HASH)
        },
        _getDeviceType: function() {
            var e = this._isMobileCheck(navigator.userAgent || navigator.vendor || window.opera),
                a = /ipad|android 3|android|sch-i800|playbook|tablet|kindle|gt-p1000|sgh-t849|shw-m180s|a510|a511|a100|dell streak|silk/i.test(navigator.userAgent.toLowerCase()),
                n = !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i);
            this.IS_MOBILE = 1 == e || null, this.IS_TABLET = 1 == a || null, this.IS_DESKTOP = 1 == n || null, console.log("[Core] IS MOBILE:", this.IS_MOBILE), console.log("[Core] IS TABLET:", this.IS_TABLET), console.log("[Core] IS DESKTOP:", this.IS_DESKTOP), this.IS_MOBILE && (this.IS_TABLET = !1, this.IS_DESKTOP = !1), this.IS_TABLET && (this.IS_MOBILE = !1, this.IS_DESKTOP = !1), this.IS_DESKTOP && (this.IS_MOBILE = !1, this.IS_TABLET = !1), this.IS_MOBILE && $("html").addClass("mobile"), this.IS_TABLET && $("html").addClass("tablet"), this.IS_DESKTOP && $("html").addClass("desktop")
        },
        _checkBrowser: function() {
            var e = window.navigator.userAgent,
                a = e.indexOf("MSIE ");
            if (a > 0) return this.IS_IE = !0, void(this.IE_VERSION = parseInt(e.substring(a + 5, e.indexOf(".", a)), 10));
            var n = e.indexOf("Trident/");
            if (n > 0) {
                var i = e.indexOf("rv:");
                return this.IS_IE = !0, void(this.IE_VERSION = parseInt(e.substring(i + 3, e.indexOf(".", i)), 10))
            }
            var l = e.indexOf("Edge/");
            return l > 0 ? (this.IS_IE = !0, void(this.IE_VERSION = parseInt(e.substring(l + 5, e.indexOf(".", l)), 10))) : (this.IS_IE = null, void(this.IE_VERSION = null))
        },
        _isMobileCheck: function(e) {
            return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(e) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0, 4))
        },
        _checkForTouch: function() {
            this.HAS_TOUCH = "ontouchstart" in window || navigator.maxTouchPoints || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0, 0 == this.HAS_TOUCH ? (this.HAS_TOUCH = null, $("html").addClass("notouch")) : $("html").addClass("touch")
        },
        _fixScreenSize: function() {
            $("#content").height("auto");
            var e = window.innerHeight;
            console.log("INNER HEIGHT:", window.innerHeight), console.log("OUTER HEIGHT:", window.outerHeight), console.log("CLIENT HEIGHT:", document.body.clientHeight), $("#content").height(e)
        },
        _scrollToBottom: function() {
            setTimeout(function() {
                window.scrollTo(0, 1)
            }, 500)
        },
        _preventScroll: function() {
            window.addEventListener("gesturestart", function(e) {
                e.preventDefault()
            }), document.addEventListener("gesturestart", function(e) {
                e.preventDefault()
            })
        },
        _onResize: function(e) {
            var a = e.data.self;
            a._fixScreenSize(), setTimeout(function() {
                a._fixScreenSize()
            }, 250), setTimeout(function() {
                a._fixScreenSize()
            }, 500), setTimeout(function() {
                a._fixScreenSize()
            }, 1), setTimeout(function() {
                a._fixScreenSize()
            }, 2)
        }
    }, this.Distilled.Core = e, e
}(), this.Distilled = this.Distilled || {}, Distilled.DEBUG = !0, "loading" == document.readyState ? document.addEventListener("DOMContentLoaded", onReady) : onReady();
//# sourceMappingURL=./app.js.map
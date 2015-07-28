angular.module("submodules.3party", []), angular.module("submodules.navigationmain", []), 
angular.module("submodules.sectionsignup", []), angular.module("submodules.modallogin", []), 
angular.module("submodules.sectionhome", []), angular.module("submodules.sectionjointventure", []), 
angular.module("submodules.sectionjointventureresults", []), angular.module("submodules.sectionrent", []), 
angular.module("submodules.sectionsell", []), angular.module("submodules.servicesoffered", []), 
angular.module("submodules.sectionportfolio", []), angular.module("submodules.sectionabout", []), 
angular.module("submodules.footermain", []), angular.module("submodules.sitewidecommon", []), 
angular.module("submodules.sitewidecommon").service("googleMapsAPI", [ "$http", function($http) {
    var googleAPIKey = "AIzaSyBVb3vFIGCpc3et0NSf42IfMFyzrxHzogM", bangaloreLatLang = "12.9539975,77.6309395";
    this.getLocationSuggestions = function(options) {
        var input = options.input || options[0], responseJson = (options.types || options[1] || "regions", 
        options.location, options.radius, {}), autoCompleteURL = "https://maps.googleapis.com/maps/api/place/autocomplete/json", post = {
            input: input,
            types: "geocode",
            location: bangaloreLatLang,
            radius: "25000",
            key: googleAPIKey
        }, httpOptions = {
            method: "GET",
            url: autoCompleteURL,
            params: post
        };
        return responseJson = $http(httpOptions);
    };
} ]), angular.module("submodules.sitewidecommon").service("scrollToDivSvc", [ function() {
    var strCurrentDivId;
    this.getCurrentDivId = function() {
        return strCurrentDivId;
    }, this.setCurrentDivId = function(strCurrentDivIdFromDom) {
        strCurrentDivId = strCurrentDivIdFromDom;
    };
} ]), angular.module("submodules.3party").directive("backAnimation", [ "$browser", "$location", function($browser, $location) {
    return {
        link: function(scope, element) {
            $browser.onUrlChange(function(newUrl) {
                $location.absUrl() === newUrl && (console.log("Back"), element.addClass("reverse"));
            }), scope.__childrenCount = 0, scope.$watch(function() {
                scope.__childrenCount = element.children().length;
            }), scope.$watch("__childrenCount", function(newCount, oldCount) {
                newCount !== oldCount && 1 === newCount && element.removeClass("reverse");
            });
        }
    };
} ]), angular.module("submodules.navigationmain").directive("navigationMain", function() {
    return {
        restrict: "AE",
        templateUrl: "templates/tpl-navigation-main.html"
    };
}), angular.module("submodules.sectionsignup").directive("sectionSignup", function() {
    return {
        restrict: "AE",
        templateUrl: "templates/tpl-section-signup.html",
        link: function(scope, element, attrs, tabsCtrl) {
            $("#modalLogin").modal("hide"), scope.$emit("childLoading");
        }
    };
}), angular.module("submodules.modallogin").directive("modalLogin", function() {
    return {
        restrict: "AE",
        templateUrl: "templates/tpl-modal-login.html",
        link: function(scope, element) {}
    };
}), angular.module("submodules.sectionhome").directive("sectionHome", function() {
    return {
        restrict: "AE",
        templateUrl: "templates/tpl-section-home.html",
        link: function(scope, element, attrs, tabsCtrl) {}
    };
}), angular.module("submodules.sectionjointventure").directive("sectionJointVenture", [ "googleMapsAPI", function(googleMapsAPI) {
    return {
        restrict: "AE",
        templateUrl: "templates/tpl-section-jointventure.html",
        link: function(scope, element, attrs, tabsCtrl) {
            scope.addrtags = [], scope.loadAddrTags = function(query) {
                var options = {
                    input: query,
                    types: "geocode",
                    location: "12.9539975,77.6309395",
                    radius: 25e3
                };
                return googleMapsAPI.getLocationSuggestions(options).then(function(response) {
                    return "OK" == response.data.status ? response.data.predictions : void 0;
                });
            }, $(element).find("button").on("click", function(e) {
                $(e.target).parent().find("input#Area").val();
            }), $(element).find("#farmtype,#budget").multiselect({
                buttonWidth: "100%",
                buttonText: function(options, select) {
                    if (0 === options.length) return $(select).attr("id").toString();
                    var labels = [];
                    return options.each(function() {
                        void 0 !== $(this).attr("label") ? labels.push($(this).attr("label")) : labels.push($(this).html());
                    }), labels.join(", ") + "";
                }
            }), scope.$emit("childLoading");
        }
    };
} ]), angular.module("submodules.sectionjointventureresults").directive("sectionJointVentureResults", [ "googleMapsAPI", function(googleMapsAPI) {
    return {
        restrict: "AE",
        templateUrl: "templates/tpl-section-jointventure-results.html",
        link: function(scope, element, attrs, tabsCtrl) {
            scope.addrtags = [], scope.ventures = [ {
                name: "Agricultural Land",
                company: "",
                location: "Bangalore",
                status: "Ready to Move",
                details: "Dimensions 147.7 x 147.6 ft",
                price: "Rs. 88.5Lac",
                sftprice: "406 per sft",
                dpcount: "2"
            }, {
                name: "Agricultural Land",
                company: "",
                location: "Kanakpura Road",
                status: "Resale Freehold",
                details: "",
                price: "Rs. 19 Lac",
                sftprice: "Negotiable",
                dpcount: "5"
            } ], scope.loadAddrTags = function(query) {
                var options = {
                    input: query,
                    types: "geocode",
                    location: "12.9539975,77.6309395",
                    radius: 25e3
                };
                return googleMapsAPI.getLocationSuggestions(options).then(function(response) {
                    return "OK" == response.data.status ? response.data.predictions : void 0;
                });
            }, $(element).find("button").on("click", function(e) {
                $(e.target).parent().find("input#Area").val();
            }), $(element).find("#farmtype,#budget,#postedby").multiselect({
                buttonWidth: "100%",
                buttonText: function(options, select) {
                    if (0 === options.length) return $(select).attr("id").toString();
                    var labels = [];
                    return options.each(function() {
                        void 0 !== $(this).attr("label") ? labels.push($(this).attr("label")) : labels.push($(this).html());
                    }), labels.join(", ") + "";
                }
            }), scope.$emit("childLoading");
        }
    };
} ]), angular.module("submodules.sectionrent").directive("sectionRent", function() {
    return {
        restrict: "AE",
        templateUrl: "templates/tpl-section-rent.html",
        link: function(scope, element, attrs, tabsCtrl) {
            addParallax(element);
        }
    };
}), angular.module("submodules.sectionsell").directive("sectionSell", function() {
    return {
        restrict: "AE",
        templateUrl: "templates/tpl-section-sell.html",
        link: function(scope, element, attrs, tabsCtrl) {
            scope.$emit("childLoading");
        }
    };
}), angular.module("submodules.servicesoffered").directive("servicesOffered", function() {
    return {
        restrict: "AE",
        templateUrl: "templates/tpl-services-offered.html"
    };
}), angular.module("submodules.sectionportfolio").directive("sectionPortfolio", function() {
    return {
        restrict: "AE",
        templateUrl: "templates/tpl-section-portfolio.html"
    };
}), angular.module("submodules.sectionabout").directive("sectionAbout", function() {
    return {
        restrict: "AE",
        templateUrl: "templates/tpl-section-about.html"
    };
}), angular.module("submodules.footermain").directive("footerMain", function() {
    return {
        restrict: "AE",
        templateUrl: "templates/tpl-footer-main.html"
    };
}), angular.module("submodules.sitewidecommon").directive("bodyDir", [ "scrollToDivSvc", function(scrollToDivSvc) {
    return {
        link: function(scope, element, attrs) {
            scope.$watch(scrollToDivSvc.getCurrentDivId, function(newVal, oldVal) {
                if (newVal && newVal !== oldVal) {
                    var target = $("#" + newVal);
                    target = target.length ? target : $("[name=" + newVal + "]"), target.length && $("html,body").animate({
                        scrollTop: target.offset().top
                    }, 1e3);
                }
            });
        }
    };
} ]), angular.module("submodules.sitewidecommon").directive("siteWideCommon", [ function() {
    return {
        link: function(scope, element, attrs) {
            scope.$on("childLoading", function() {
                for (var commonFns = attrs.siteWideCommon.split(","), i = 0; i < commonFns.length; i++) "undefined" != typeof siteWideCommonFunctions[commonFns[i].toString().trim()] && siteWideCommonFunctions[commonFns[i].toString().trim()]();
            });
        }
    };
} ]), angular.module("submodules", [ "submodules.3party", "submodules.sitewidecommon", "submodules.navigationmain", "submodules.footermain", "submodules.servicesoffered", "submodules.sectionabout", "submodules.sectionportfolio", "submodules.sectionhome", "submodules.sectionjointventure", "submodules.sectionjointventureresults", "submodules.sectionrent", "submodules.sectionsell", "submodules.modallogin", "submodules.sectionsignup" ]).controller("MainController", function($rootScope, $scope, scrollToDivSvc) {
    $scope.appWideScope = {
        appTitle: "Joint Venture 2015"
    }, $scope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams) {
        console.log(toState.name), toParams && "undefined" != typeof toParams.scrollTo && scrollToDivSvc.setCurrentDivId(toParams.scrollTo);
    });
}), angular.module("jointVentureApp", [ "ui.router", "ngAnimate", "ngTagsInput", "submodules" ]).config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/"), $stateProvider.state("/", {
        url: "/",
        params: {
            scrollTo: {
                value: null
            }
        },
        templateUrl: "views/section-home.html",
        controller: "MainController"
    }).state("home", {
        url: "/home",
        templateUrl: "views/section-home.html",
        controller: "MainController"
    }).state("jointventure", {
        url: "/jointventure",
        templateUrl: "views/section-jointventure.html",
        controller: "MainController"
    }).state("sell", {
        url: "/sell",
        templateUrl: "views/section-sell.html",
        controller: "MainController"
    }).state("signup", {
        url: "/signup",
        templateUrl: "views/section-signup.html",
        controller: "MainController"
    }).state("rent", {
        url: "/rent",
        templateUrl: "views/section-rent.html"
    }).state("jointventureresults", {
        url: "/jointventureresults",
        templateUrl: "views/section-jointventure-results.html"
    });
});
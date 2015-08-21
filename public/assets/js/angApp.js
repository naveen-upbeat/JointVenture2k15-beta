angular.module("submodules.3rdparty", []), angular.module("submodules.navigationmain", []), 
angular.module("submodules.sectionsignup", []), angular.module("submodules.modallogin", []), 
angular.module("submodules.sectionhome", []), angular.module("submodules.sectionjointventure", []), 
angular.module("submodules.sectionjointventureresults", []), angular.module("submodules.sectionrent", []), 
angular.module("submodules.sectionsell", []), angular.module("submodules.servicesoffered", []), 
angular.module("submodules.sectionportfolio", []), angular.module("submodules.sectionabout", []), 
angular.module("submodules.footermain", []), angular.module("submodules.sitewidecommon", []), 
angular.module("submodules.sectionsample", []), angular.module("submodules.sitewidecommon").service("googleMapsAPI", [ "$http", function($http) {
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
} ]), angular.module("submodules.sitewidecommon").factory("transformRequestAsFormPost", function() {
    function transformRequest(data, getHeaders) {
        var headers = getHeaders();
        return headers["Content-type"] = "application/x-www-form-urlencoded; charset=utf-8", 
        serializeData(JSON.stringify(data));
    }
    function serializeData(data) {
        if (!angular.isObject(data)) return null === data ? "" : data.toString();
        var buffer = [];
        for (var name in data) if (data.hasOwnProperty(name)) {
            var value = data[name];
            buffer.push(encodeURIComponent(name) + "=" + encodeURIComponent(null === value ? "" : value));
        }
        var source = buffer.join("&").replace(/%20/g, "+");
        return source;
    }
    return transformRequest;
}), angular.module("submodules.sectionsignup").controller("sectionSignupCtrl", [ "$scope", "$http", "transformRequestAsFormPost", function($scope, $http, transformRequestAsFormPost) {
    $scope.signupUser = {
        emailmodel: "sample",
        valid: !0
    }, $scope.$watch("signupUser", function(newVal, oldVal) {
        newVal.emailmodel !== oldVal.emailmodel && $scope.checkUserExists(newVal);
    }, !0), $scope.usertypes = {}, $scope.origUserCopy = angular.copy($scope.user), 
    $scope.resetForm = function() {
        $scope.user = angular.copy($scope.origUserCopy);
    }, $scope.checkUserExists = function(signupUser) {
        $http({
            method: "GET",
            url: "/api/checkemailid",
            params: {
                email: signupUser.emailmodel
            }
        }).success(function(data, status, headers, cfg) {
            data.length > 0 ? signupUser.valid = !1 : signupUser.valid = !0;
        }).error(function(data, status, headers, cfg) {
            signupUser.valid = !1;
        });
    }, $scope.getUserTypes = function(userModel) {
        $http({
            method: "GET",
            url: "/api/getusertypes"
        }).success(function(data, status, headers, cfg) {
            data.length > 0 && ($scope.usertypes = data);
        }).error(function(data, status, headers, cfg) {});
    }, $scope.getUserTypes();
} ]), angular.module("submodules.modallogin").controller("modalLoginController", [ "$scope", "$http", "transformRequestAsFormPost", function($scope, $http, transformRequestAsFormPost) {
    $scope.user = {
        usernamemodel: "",
        passwordmodel: "",
        valid: !0
    }, $scope.origUserCopy = angular.copy($scope.user), $scope.resetForm = function() {
        $scope.user = angular.copy($scope.origUserCopy);
    }, $scope.loginUser = function(userModel) {
        $http({
            method: "POST",
            url: "/api/logincheck",
            transformRequest: transformRequestAsFormPost,
            data: {
                username: userModel.usernamemodel,
                password: userModel.password
            }
        }).success(function(data, status, headers, cfg) {
            data.length > 0 ? userModel.valid = !0 : userModel.valid = !1;
        }).error(function(data, status, headers, cfg) {
            userModel.valid = !1;
        });
    };
} ]), angular.module("submodules.3rdparty").directive("appJvBackAnimation", [ "$browser", "$location", function($browser, $location) {
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
} ]), angular.module("submodules.navigationmain").directive("appJvNavigationMain", function() {
    return {
        restrict: "AE",
        templateUrl: "templates/tpl-navigation-main.html"
    };
}), angular.module("submodules.sectionsignup").directive("appJvSectionSignup", function() {
    return {
        restrict: "AE",
        templateUrl: "templates/tpl-section-signup.html",
        link: function(scope, element, attrs, tabsCtrl) {
            $("#modalLogin").modal("hide"), scope.$watch("usertypes", function(newVal, oldVal) {
                newVal.length !== oldVal.length && scope.$emit("childLoading");
            }), $(element).find("#inputEmail").on("blur", function(event) {
                scope.$apply(function() {
                    scope.signupUser.emailmodel = $(event.target).val();
                });
            }), scope.$emit("childLoading");
        }
    };
}), angular.module("submodules.modallogin").directive("appJvModalLogin", function() {
    return {
        restrict: "AE",
        templateUrl: "templates/tpl-modal-login.html",
        link: function(scope, element) {
            $(element).find(".link-singnup").on("click", function() {
                $("#modalLogin").modal("hide");
            }), scope.$watch("user", function(newVal, oldVal) {}, !0);
        }
    };
}), angular.module("submodules.sectionhome").directive("appJvSectionHome", function() {
    return {
        restrict: "AE",
        templateUrl: "templates/tpl-section-home.html",
        link: function(scope, element, attrs, tabsCtrl) {}
    };
}), angular.module("submodules.sectionjointventure").directive("appJvSectionJointVenture", [ "googleMapsAPI", function(googleMapsAPI) {
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
} ]), angular.module("submodules.sectionjointventureresults").directive("appJvSectionJointVentureResults", [ "googleMapsAPI", function(googleMapsAPI) {
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
} ]), angular.module("submodules.sectionrent").directive("appJvSectionRent", function() {
    return {
        restrict: "AE",
        templateUrl: "templates/tpl-section-rent.html",
        link: function(scope, element, attrs, tabsCtrl) {
            addParallax(element);
        }
    };
}), angular.module("submodules.sectionsell").directive("appJvSectionSell", function() {
    return {
        restrict: "AE",
        templateUrl: "templates/tpl-section-sell.html",
        link: function(scope, element, attrs, tabsCtrl) {
            scope.$emit("childLoading");
        }
    };
}), angular.module("submodules.servicesoffered").directive("appJvServicesOffered", function() {
    return {
        restrict: "AE",
        templateUrl: "templates/tpl-services-offered.html"
    };
}), angular.module("submodules.sectionportfolio").directive("appJvSectionPortfolio", function() {
    return {
        restrict: "AE",
        templateUrl: "templates/tpl-section-portfolio.html"
    };
}), angular.module("submodules.sectionabout").directive("appJvSectionAbout", function() {
    return {
        restrict: "AE",
        templateUrl: "templates/tpl-section-about.html"
    };
}), angular.module("submodules.footermain").directive("appJvFooterMain", function() {
    return {
        restrict: "AE",
        templateUrl: "templates/tpl-footer-main.html"
    };
}), angular.module("submodules.sitewidecommon").directive("appJvBodyDir", [ "scrollToDivSvc", function(scrollToDivSvc) {
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
} ]), angular.module("submodules.sitewidecommon").directive("appJvSiteWideCommon", [ function() {
    return {
        link: function(scope, element, attrs) {
            scope.$on("childLoading", function() {
                for (var commonFns = attrs.appJvSiteWideCommon.split(","), i = 0; i < commonFns.length; i++) "undefined" != typeof siteWideCommonFunctions[commonFns[i].toString().trim()] && siteWideCommonFunctions[commonFns[i].toString().trim()]();
            });
        }
    };
} ]), angular.module("submodules.sectionsample").directive("appJvSectionSample", function() {
    return {
        restrict: "AE",
        templateUrl: "templates/tpl-section-sample.html"
    };
}), angular.module("submodules", [ "submodules.3rdparty", "submodules.sitewidecommon", "submodules.navigationmain", "submodules.footermain", "submodules.servicesoffered", "submodules.sectionabout", "submodules.sectionportfolio", "submodules.sectionhome", "submodules.sectionjointventure", "submodules.sectionjointventureresults", "submodules.sectionrent", "submodules.sectionsell", "submodules.modallogin", "submodules.sectionsignup", "submodules.sectionsample" ]).controller("MainController", function($rootScope, $scope, scrollToDivSvc) {
    $scope.appWideScope = {
        appTitle: "Joint Venture 2015",
        user: {
            username: "",
            email: ""
        }
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
        views: {
            "top-section": {
                templateUrl: "views/section-home.html",
                controller: "MainController"
            }
        }
    }).state("home", {
        url: "/home",
        views: {
            "top-section": {
                templateUrl: "views/section-home.html",
                controller: "MainController"
            }
        }
    }).state("jointventure", {
        url: "/jointventure",
        views: {
            "top-section": {
                templateUrl: "views/section-jointventure.html",
                controller: "MainController"
            }
        }
    }).state("sell", {
        url: "/sell",
        views: {
            "top-section": {
                templateUrl: "views/section-sell.html",
                controller: "MainController"
            }
        }
    }).state("signup", {
        url: "/signup",
        views: {
            "top-section": {
                templateUrl: "views/section-signup.html",
                controller: "MainController"
            }
        }
    }).state("rent", {
        url: "/rent",
        views: {
            "top-section": {
                templateUrl: "views/section-rent.html"
            }
        }
    }).state("jointventureresults", {
        url: "/jointventureresults",
        views: {
            "top-section": {
                templateUrl: "views/section-jointventure-results.html"
            }
        }
    });
});
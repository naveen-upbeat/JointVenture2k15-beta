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
}), angular.module("submodules.sitewidecommon").service("userLoginSvc", [ "transformRequestAsFormPost", "$http", function(transformRequestAsFormPost, $http) {
    var _userSessionData = {
        bln_logged_in: !1,
        user_data: {}
    };
    this.getUserSessionData = function() {
        return _userSessionData;
    }, this.setUserSessionData = function(userData) {
        _userSessionData.bln_logged_in = !0, _userSessionData.user_data = userData;
    }, this.clearUserSessionData = function() {
        _userSessionData.user_data = {}, _userSessionData.bln_logged_in = !1;
    }, this.getUserFromServerSession = function() {
        return $http({
            method: "get",
            url: "/api/get_usersession_data"
        });
    }, this.logoutUser = function() {
        return $http({
            method: "get",
            url: "/api/logoutuser"
        });
    }, this.validateUser = function(strUserName, strPassword) {
        return $http({
            method: "POST",
            url: "/api/verifyuser",
            transformRequest: transformRequestAsFormPost,
            data: {
                username: strUserName,
                password: strPassword
            }
        });
    }, this.resetPassword = function(strUserName) {
        return $http({
            method: "POST",
            url: "/api/reset_password_email",
            transformRequest: transformRequestAsFormPost,
            data: {
                username: strUserName
            }
        });
    };
} ]), angular.module("submodules.sectionsignup").controller("sectionSignupCtrl", [ "$scope", "$http", "transformRequestAsFormPost", function($scope, $http, transformRequestAsFormPost) {
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
} ]), angular.module("submodules.modallogin").controller("modalLoginCtrl", [ "$scope", "$http", "transformRequestAsFormPost", "userLoginSvc", "$mdDialog", function($scope, $http, transformRequestAsFormPost, userLoginSvc, $mdDialog) {
    $scope.modelLoginForm = {
        username: "",
        password: "",
        str_modal_header: "login",
        modal_header_options: {
            login: "Login",
            forgotpassword: "Forgot Password"
        },
        is_valid: !0,
        fn_getModalHeaderText: function() {
            return this.modal_header_options[this.str_modal_header];
        },
        fn_resetModel: function() {
            this.username = "", this.password = "";
        }
    }, $scope.origUserCopy = angular.copy($scope.modelLoginForm), $scope.fn_resetForm = function() {
        $scope.modelLoginForm = angular.copy($scope.origUserCopy);
    }, $scope.fn_loginUser = function(userModel) {
        ("" === userModel.username || "" === userModel.password) && (userModel.is_valid = !1, 
        $scope.loginForm.username.$setDirty(), $scope.loginForm.password.$setDirty()), (userModel.is_valid || $scope.loginForm.$valid) && userLoginSvc.validateUser(userModel.username, userModel.password).success(function(data, status, headers, cfg) {
            data.length > 0 ? (userModel.is_valid = !0, userLoginSvc.setUserSessionData(angular.fromJson(data[0])), 
            $mdDialog.hide()) : userModel.is_valid = !1;
        }).error(function(data, status, headers, cfg) {
            userModel.is_valid = !1;
        });
    }, $scope.fn_resetPassword = function(userModel) {
        "" !== userModel.username && userLoginSvc.resetPassword(userModel.username).success(function(data, status, headers, cfg) {
            data.length > 0 && $mdDialog.hide();
        }).error(function(data, status, headers, cfg) {});
    };
} ]), angular.module("submodules.sectionjointventure").controller("jvSearchCtrl", [ "$scope", "transformRequestAsFormPost", "$http", function($scope, transformRequestAsFormPost, $http) {
    $scope.modelJvSearchForm = {
        residential: {
            location: "",
            bedrooms: {
                "1": !1,
                "2": !1,
                "3": !1,
                "4": !1
            },
            budget: {
                min: 0,
                max: 1
            }
        },
        commercial: {
            location: "",
            area: {
                unit: "",
                min: "",
                max: ""
            },
            budget: {
                min: "",
                max: ""
            }
        },
        agricultural: {
            location: "",
            area: {
                unit: "",
                min: "",
                max: ""
            },
            budget: {
                min: "",
                max: ""
            }
        }
    }, $scope.fn_getJointVentureResults = function(form) {
        return $http({
            method: "POST",
            url: "/api/get_jointventure_results",
            transformRequest: transformRequestAsFormPost,
            data: {
                location: form.residential.location
            }
        });
    };
} ]), angular.module("submodules.navigationmain").directive("appJvNavigationMain", function(userLoginSvc, $mdMedia, $mdSidenav, $mdDialog, $state) {
    return {
        restrict: "AE",
        templateUrl: "templates/tpl-navigation-main.html",
        link: function(scope, element, attrs) {
            scope.$emit("childLoading"), scope.fn_logoutUser = function() {
                userLoginSvc.logoutUser().success(function(data, status, headers, cfg) {
                    userLoginSvc.clearUserSessionData();
                });
            }, scope.fn_toggle_sidenav = function(menuId) {
                $mdSidenav(menuId).toggle();
            }, scope.fn_open_menu = function($mdOpenMenu, ev) {
                $mdOpenMenu(ev);
            }, scope.fn_show_login_dialog = function(ev) {
                $mdDialog.show({
                    template: '<md-dialog aria-label="Login" ng-controller="modalLoginCtrl" layout="row" flex="45"><app-jv-modal-login></app-jv-modal-login></md-dialog>',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: !0
                }).then(function(answer) {}, function() {});
            };
        }
    };
}), angular.module("submodules.sectionsignup").directive("appJvSectionSignup", function() {
    return {
        restrict: "AE",
        templateUrl: "templates/tpl-section-signup.html",
        link: function(scope, element, attrs, tabsCtrl) {
            $(element).find("select").material_select(), scope.$watch("usertypes", function(newVal, oldVal) {
                newVal.length !== oldVal.length && scope.$emit("childLoading");
            }), $(element).find("#inputEmail").on("blur", function(event) {
                scope.$apply(function() {
                    scope.signupUser.emailmodel = $(event.target).val();
                });
            }), $(element).find("#showPassword field-confirm-password").on("change", function(event) {
                this.checked;
            }), scope.signupNewUser = function(formSignupUser) {
                console.log(formSignupUser);
            }, scope.$emit("childLoading");
            var captch_script = document.createElement("script");
            captch_script.setAttribute("src", "https://www.google.com/recaptcha/api.js"), document.head.appendChild(captch_script);
        }
    };
}), angular.module("submodules.modallogin").directive("appJvModalLogin", function(userLoginSvc, $mdDialog, $mdMedia) {
    return {
        restrict: "AE",
        templateUrl: "templates/tpl-modal-login.html",
        replace: !0,
        link: function(scope, element) {
            scope.$watch(function() {
                return userLoginSvc.getUserSessionData();
            }, function(newVal, oldVal) {
                newVal && newVal.bln_logged_in && ($mdDialog.hide(), scope.modelLoginForm.fn_resetModel());
            }, !0), scope.modalLoginTabs = {
                tabs: [ {
                    title: "Login"
                }, {
                    title: "Forgot Password"
                } ],
                active_tab_index: "1"
            }, scope.fn_close = function() {
                $mdDialog.cancel();
            }, scope.fn_login = function() {
                setTimeout(function() {
                    $("#btn_back_to_login").click();
                }, 600);
            }, scope.fn_go_to_login = function() {
                scope.modalLoginTabs.active_tab_index = 0;
            }, scope.fn_go_to_forgot_password = function() {
                scope.modalLoginTabs.active_tab_index = 1;
            }, scope.fn_login();
        }
    };
}), angular.module("submodules.sectionhome").directive("appJvSectionHome", function() {
    return {
        restrict: "AE",
        templateUrl: "templates/tpl-section-home.html",
        link: function(scope, element, attrs, tabsCtrl) {
            scope.$emit("childLoading");
        }
    };
}), angular.module("submodules.sectionjointventure").directive("appJvSectionJointVenture", [ "googleMapsAPI", function(googleMapsAPI) {
    return {
        restrict: "AE",
        templateUrl: "templates/tpl-section-jointventure.html",
        link: function(scope, element, attrs, tabsCtrl) {
            scope.addrtags = [], scope.locationPredictionsNow = [], scope.selectedLocations = [], 
            scope.selectedLocation = null, scope.searchLocationText = null, scope.searchTextChange = function(searchText) {
                scope.searchLocationText = searchText, scope.modelJvSearchForm.residential.location = searchText, 
                "" !== searchText && window.initService(searchText);
            }, window.initService = function(query) {
                var displaySuggestions = function(predictions, status) {
                    return scope.locationPredictionsNow = [], status != google.maps.places.PlacesServiceStatus.OK ? void console.log(status) : void predictions.forEach(function(prediction) {
                        scope.locationPredictionsNow.push(prediction);
                    });
                };
                if (google.maps.places) {
                    var service = new google.maps.places.AutocompleteService();
                    service.getQueryPredictions({
                        input: query || ""
                    }, displaySuggestions);
                }
            }, scope.loadSearchCityTags = function() {
                var googleAPIScriptSrc = "http://maps.googleapis.com/maps/api/js?libraries=places&window=initService";
                if (0 === $('head script[src=""]').length) {
                    var googleMapsAPIScript = document.createElement("script");
                    googleMapsAPIScript.setAttribute("src", googleAPIScriptSrc), document.head.appendChild(googleMapsAPIScript);
                }
            }, scope.loadSearchCityTags(), scope.loadAddrTags = function(query) {
                var options = {
                    input: query,
                    types: "geocode",
                    location: "12.9539975,77.6309395",
                    radius: 25e3
                };
                return googleMapsAPI.getLocationSuggestions(options).then(function(response) {
                    return "OK" == response.data.status ? response.data.predictions : void 0;
                });
            };
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
}), angular.module("submodules.sitewidecommon").directive("appJvBodyDir", [ "$mdMedia", function($mdMedia) {
    return {
        link: function(scope, element, attrs) {
            scope.$on("$locationChangeSuccess", function(event, newURL, oldURL, newState, oldState) {
                console.log(newURL), siteWideCommonFunctions.scrollToSection(newURL.split("?scrollTo=")[1]);
            }), scope.$on("$stateChangeSuccess", function(event, newState, newStateParams, oldState, oldStateParams) {
                newStateParams.scrollTo && siteWideCommonFunctions.scrollToSection(newStateParams.scrollTo);
            });
        }
    };
} ]), angular.module("submodules.sitewidecommon").directive("appJvParallax", [ function() {
    return {
        link: function(scope, element, attrs) {
            $(element).find(".parallax").parallax();
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
}), angular.module("submodules", [ "submodules.3rdparty", "submodules.sitewidecommon", "submodules.navigationmain", "submodules.footermain", "submodules.servicesoffered", "submodules.sectionabout", "submodules.sectionportfolio", "submodules.sectionhome", "submodules.sectionjointventure", "submodules.sectionjointventureresults", "submodules.sectionrent", "submodules.sectionsell", "submodules.modallogin", "submodules.sectionsignup", "submodules.sectionsample" ]).controller("MainController", [ "$rootScope", "$scope", "userLoginSvc", "$state", function($rootScope, $scope, userLoginSvc, $state) {
    $scope.appWideScope = {
        str_app_title: "Joint Venture 2015",
        user_session_data: {
            is_logged_in: !1,
            user_data: {}
        }
    }, userLoginSvc.getUserFromServerSession().success(function(data, status, headers, cfg) {
        "user_data" in data && "_id" in data.user_data && userLoginSvc.setUserSessionData(data.user_data);
    }), $scope.$watch(function() {
        return userLoginSvc.getUserSessionData();
    }, function(newVal, oldVal) {
        newVal && newVal.bln_logged_in !== oldVal.bln_logged_in && ($scope.appWideScope.user_session_data.is_logged_in = newVal.bln_logged_in, 
        $scope.appWideScope.user_session_data.user_data = newVal.user_data);
    }, !0), $scope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams) {}), 
    $scope.fn_goToState = function(stateName, scrollTo) {
        scrollTo ? $state.transitionTo($state.current.name, {
            scrollTo: scrollTo
        }) : $state.go(stateName);
    };
} ]), angular.module("jointVentureApp", [ "ui.router", "ngMaterial", "submodules" ]).config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/"), $stateProvider.state("/", {
        url: "/",
        params: {
            scrollTo: {
                value: "top"
            }
        },
        views: {
            "top-section": {
                templateUrl: "views/section-home.html",
                controller: "MainController"
            }
        }
    }).state("home", {
        url: "/home?scrollTo",
        params: {
            scrollTo: {
                value: "top"
            }
        },
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
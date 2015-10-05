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
} ]), angular.module("submodules.sectionsignup").controller("sectionRegisterUserCtrl", [ "$scope", "$http", "transformRequestAsFormPost", function($scope, $http, transformRequestAsFormPost) {
    $scope.modelRegisterUserForm = {
        usertype: "",
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        confirm_password: "",
        show_password: "",
        mobile: "",
        alternate_mobile: "",
        city: "",
        captcha_valid: !1,
        valid: !0,
        success: !1
    }, $scope.usertypes = {}, $scope.origUserCopy = angular.copy($scope.user), $scope.resetForm = function() {
        $scope.user = angular.copy($scope.origUserCopy);
    }, $scope.checkUserExists = function(email) {
        return $http({
            method: "GET",
            url: "/api/check_email_exists",
            params: {
                email: email
            }
        });
    }, $scope.getUserTypes = function(userModel) {
        $http({
            method: "GET",
            url: "/api/getusertypes"
        }).success(function(data, status, headers, cfg) {
            data.length > 0 && ($scope.usertypes = data);
        }).error(function(data, status, headers, cfg) {});
    }, $scope.fn_register_user = function(modelRegisterUserForm) {
        $http({
            method: "POST",
            url: "/api/register_user",
            transformRequest: transformRequestAsFormPost,
            data: {
                id: modelRegisterUserForm,
                first_name: modelRegisterUserForm.first_name,
                last_name: modelRegisterUserForm.last_name,
                email: modelRegisterUserForm.email,
                password: modelRegisterUserForm.password,
                city: modelRegisterUserForm.city,
                mobile: modelRegisterUserForm.mobile,
                alternate_mobile: modelRegisterUserForm.alternate_mobile,
                usertype: modelRegisterUserForm.usertype
            }
        }).then(function(data) {
            data.data.id && (modelRegisterUserForm.success = !0);
        });
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
        error_text: "",
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
            $mdDialog.hide()) : (userModel.is_valid = !1, userModel.error_text = data.error_text);
        }).error(function(data, status, headers, cfg) {
            userModel.is_valid = !1;
        });
    }, $scope.fn_resetPassword = function(userModel) {
        "" !== userModel.username && userLoginSvc.resetPassword(userModel.username).success(function(data, status, headers, cfg) {
            data.length > 0 && $mdDialog.hide();
        }).error(function(data, status, headers, cfg) {});
    };
} ]), angular.module("submodules.sectionjointventure").controller("jvSearchCtrl", [ "$scope", "transformRequestAsFormPost", "$http", "$state", function($scope, transformRequestAsFormPost, $http, $state) {
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
        $http({
            method: "POST",
            url: "/api/get_jointventure_results",
            transformRequest: transformRequestAsFormPost,
            data: {
                location: form.residential.location
            }
        }).then(function(data) {
            $state.go("jointventureresults");
        });
    };
} ]), angular.module("submodules.sectionjointventure").controller("jvSearchResultCtrl", [ "$scope", "transformRequestAsFormPost", "$http", "$state", function($scope, transformRequestAsFormPost, $http, $state) {
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
    }, $scope.modelJvSearchResults = {}, $scope.fn_getJointVentureResults = function(form) {
        $http({
            method: "POST",
            url: "/api/get_jointventure_results",
            transformRequest: transformRequestAsFormPost,
            data: {
                location: form.residential.location
            }
        }).then(function(data) {});
    };
} ]), angular.module("submodules.sectionrent").controller("sectionRentPropertyCtrl", [ "$scope", "$http", "transformRequestAsFormPost", function($scope, $http, transformRequestAsFormPost) {
    $scope.modelRentPropertyForm = {
        usertype: "",
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        confirm_password: "",
        show_password: "",
        mobile: "",
        alternate_mobile: "",
        city: "",
        captcha_valid: !1,
        valid: !0
    }, $scope.usertypes = {}, $scope.origUserCopy = angular.copy($scope.user), $scope.resetForm = function() {
        $scope.user = angular.copy($scope.origUserCopy);
    }, $scope.checkUserExists = function(email) {
        return $http({
            method: "GET",
            url: "/api/check_email_exists",
            params: {
                email: email
            }
        });
    }, $scope.getUserTypes = function(userModel) {
        $http({
            method: "GET",
            url: "/api/getusertypes"
        }).success(function(data, status, headers, cfg) {
            data.length > 0 && ($scope.usertypes = data);
        }).error(function(data, status, headers, cfg) {});
    }, $scope.fn_rent_property = function(modelRentPropertyForm) {
        return $http({
            method: "POST",
            url: "/api/register_user",
            transformRequest: transformRequestAsFormPost,
            data: {
                id: modelRentPropertyForm,
                first_name: modelRentPropertyForm.first_name,
                last_name: modelRentPropertyForm.last_name,
                email: modelRentPropertyForm.email,
                password: modelRentPropertyForm.password,
                city: modelRentPropertyForm.city,
                mobile: modelRentPropertyForm.mobile,
                alternate_mobile: modelRentPropertyForm.alternate_mobile,
                usertype: modelRentPropertyForm.usertype
            }
        });
    }, $scope.getUserTypes();
} ]), angular.module("submodules.sectionsell").controller("sectionSellCtrl", [ "$scope", "$http", "transformRequestAsFormPost", "userLoginSvc", function($scope, $http, transformRequestAsFormPost, userLoginSvc) {
    $scope.modelSellForm = {
        image_ref: "",
        image_url: [],
        user_details: {
            usertype: userLoginSvc.getUserSessionData().user_data.usertype,
            email: userLoginSvc.getUserSessionData().user_data.id,
            mobile: userLoginSvc.getUserSessionData().user_data.mobile,
            alternate_mobile: userLoginSvc.getUserSessionData().user_data.alternate_mobile
        },
        address: "",
        city: "",
        price_unit: "",
        price: "",
        is_negotiable: !1,
        area_unit: "",
        built_area: "",
        possession_type: "",
        possession_details: "",
        property_description: "",
        status: "",
        near_by: "",
        captcha_valid: !1,
        valid: !0
    }, $scope.usertypes = {}, $scope.getUserTypes = function(userModel) {
        $http({
            method: "GET",
            url: "/api/getusertypes"
        }).success(function(data, status, headers, cfg) {
            data.length > 0 && ($scope.usertypes = data);
        }).error(function(data, status, headers, cfg) {});
    }, $scope.fn_sell_property = function(modelSellForm) {
        return $http({
            method: "POST",
            url: "/api/list_sell",
            transformRequest: transformRequestAsFormPost,
            data: modelSellForm
        });
    }, $scope.getUserTypes();
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
}), angular.module("submodules.sectionsignup").directive("appJvSectionRegisterUser", function($mdDialog, $state) {
    return {
        restrict: "AE",
        templateUrl: "templates/tpl-section-register-user.html",
        link: function(scope, element, attrs, tabsCtrl) {
            var recaptchaSrc = "https://www.google.com/recaptcha/api.js";
            if (0 === $('head script[src="' + recaptchaSrc + '"]').length) {
                var captch_script = document.createElement("script");
                captch_script.setAttribute("src", recaptchaSrc), document.head.appendChild(captch_script);
            }
            scope.$watch("modelRegisterUserForm.success", function(newVal, oldVal) {
                if (newVal && newVal === !0) {
                    var confirm = $mdDialog.confirm().title("User Registration Successful!").content("Please verify your email id to login with your credentials.").ariaLabel("Lucky day").ok("Go to Home");
                    $mdDialog.show(confirm).then(function() {
                        $state.go("home");
                    }, function() {});
                }
            }, !0);
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
            scope.addrtags = [], scope.locationPredictionsNow = [], scope.selectedLocations = [], 
            scope.selectedLocation = null, scope.searchLocationText = null, scope.searchTextChange = function(searchText) {
                scope.searchLocationText = searchText, scope.modelJvSearchForm.residential.location = searchText, 
                "" !== searchText && window.initService(searchText);
            }, scope.$emit("childLoading");
        }
    };
} ]), angular.module("submodules.sectionrent").directive("appJvSectionRent", function() {
    return {
        restrict: "AE",
        templateUrl: "templates/tpl-section-rent.html",
        link: function(scope, element, attrs) {
            var recaptchaSrc = "https://www.google.com/recaptcha/api.js";
            if (0 === $('head script[src="' + recaptchaSrc + '"]').length) {
                var captch_script = document.createElement("script");
                captch_script.setAttribute("src", recaptchaSrc), document.head.appendChild(captch_script);
            }
        }
    };
}), angular.module("submodules.sectionsell").directive("appJvSectionSell", function() {
    return {
        restrict: "AE",
        templateUrl: "templates/tpl-section-sell.html",
        link: function(scope, element, attrs, tabsCtrl) {
            var recaptchaSrc = "https://www.google.com/recaptcha/api.js";
            $('head script[src="' + recaptchaSrc + '"]').length && $('head script[src="' + recaptchaSrc + '"]').remove();
            var captch_script = document.createElement("script");
            captch_script.setAttribute("src", recaptchaSrc), document.head.appendChild(captch_script);
            var uploadCareSrc = "https://ucarecdn.com/widget/2.5.5/uploadcare/uploadcare.min.js";
            scope.fn_onUploadCare = function(files) {
                var uploadDialog = uploadcare.openDialog(files, {
                    imagesOnly: !0,
                    multiple: !0
                });
                uploadDialog.done(function(file) {
                    scope.modelSellForm.image_ref = file, scope.modelSellForm.image_url = [];
                    for (var fileDone = function(fileInfo) {
                        scope.modelSellForm.image_url.push(fileInfo.cdnUrl);
                    }, i = 0; i < uploadDialog.fileColl.__items.length; i++) uploadDialog.fileColl.__items[0].then(fileDone);
                });
            }, scope.upload_images = function() {
                var files = scope.modelSellForm.image_ref ? scope.modelSellForm.image_ref.files() : null;
                "undefined" == typeof uploadcare ? $.getScript(uploadCareSrc, function() {
                    scope.fn_onUploadCare(files);
                }) : scope.fn_onUploadCare(files);
            };
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
                siteWideCommonFunctions.scrollToSection(newURL.split("?scrollTo=")[1]);
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
} ]), angular.module("submodules.sitewidecommon").directive("appJvVerifyCaptcha", [ "$q", "$interval", function($q, $interval) {
    return {
        restrict: "A",
        require: "ngModel",
        link: function(scope, element, attrs, ngModel) {
            window.intervalRef = null;
            var captchaTxtArea = $(element).find("#g-recaptcha-response");
            captchaTxtArea || clearInterval(window.intervalRef);
        }
    };
} ]), angular.module("submodules.sitewidecommon").directive("appJvVerfiyUnique", [ "$q", "$interval", function($q, $interval) {
    return {
        restrict: "A",
        require: "ngModel",
        scope: {
            appJvVerfiyUnique: "&"
        },
        link: function(scope, element, attrs, ngModel) {
            var intervalRef, isValid = !1;
            scope.$parent.$watch(attrs.ngModel, function(newVal, oldVal) {
                angular.isDefined(intervalRef) ? ($interval.cancel(intervalRef), intervalRef = void 0) : intervalRef = $interval(function() {
                    scope.appJvVerfiyUnique()(newVal).then(function(res) {
                        isValid = 0 === res.data.length ? !0 : !1, ngModel.$setValidity(attrs.ngModel, isValid);
                    });
                }, 500, 1);
            }, !0);
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
    }).state("register_user", {
        url: "/register_user",
        views: {
            "top-section": {
                templateUrl: "views/section-register-user.html",
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
    }).state("jointventureresults", {
        url: "/jointventureresults",
        views: {
            "top-section": {
                templateUrl: "views/section-jointventure-results.html"
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
    }).state("rent", {
        url: "/rent",
        views: {
            "top-section": {
                templateUrl: "views/section-rent.html"
            }
        }
    });
}).config(function($mdThemingProvider) {
    $mdThemingProvider.theme("default").primaryPalette("indigo").accentPalette("deep-orange");
});
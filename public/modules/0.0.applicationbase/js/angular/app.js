angular.module('jointVentureApp', [
        'ui.router',
        'ngMaterial',
        'submodules'
    ])
    .config(function($stateProvider, $urlRouterProvider) {
        //
        // For any unmatched url, redirect to /
        $urlRouterProvider.otherwise("/");
        //
        // Now set up the states
        $stateProvider
            .state('/', {
                url: "/",
                params: {
                    'scrollTo': {
                        'value': 'top'
                    }
                },
                views: {
                    'top-section': {
                        templateUrl: "views/section-home.html",
                        controller: 'MainController'
                    }
                }
            })
            .state('home', {
                url: "/home?scrollTo",
                params: {
                    'scrollTo': {
                        'value': 'top'
                    }
                },
                views: {
                    'top-section': {
                        templateUrl: "views/section-home.html",
                        controller: 'MainController'
                    }
                }

            })
            .state('register_user', {
                url: "/register_user",
                views: {
                    'top-section': {
                        templateUrl: "views/section-register-user.html",
                        controller: 'MainController'
                    }
                }
            })
            .state('jointventure', {
                url: "/jointventure",
                views: {
                    'top-section': {
                        templateUrl: "views/section-jointventure.html",
                        controller: 'MainController'
                    }
                }

            })
            .state('jointventureresults', {
                url: "/jointventureresults",
                views: {
                    'top-section': {
                        templateUrl: "views/section-jointventure-results.html"
                    }
                }
            })
            .state('sell', {
                url: "/sell",
                views: {
                    'top-section': {
                        templateUrl: "views/section-sell.html",
                        controller: 'MainController'
                    }
                }
            })
            .state('rent', {
                url: "/rent",
                views: {
                    'top-section': {
                        templateUrl: "views/section-rent.html"
                    }
                }
            });
    })
    /* Theming settings used by angular material */
    .config(function($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('indigo')
            .accentPalette('deep-orange');
    });

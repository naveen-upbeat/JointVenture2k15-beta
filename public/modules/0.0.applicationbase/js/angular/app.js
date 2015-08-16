angular.module('jointVentureApp', [
        'ui.router',
        'ngAnimate',
        'ngTagsInput',
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
                        'value': null
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
                url: "/home",

                views: {
                    'top-section': {
                        templateUrl: "views/section-home.html",
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
            .state('sell', {
                url: "/sell",
                views: {
                    'top-section': {
                        templateUrl: "views/section-sell.html",
                        controller: 'MainController'
                    }
                }
            })
            .state('signup', {
                url: "/signup",
                views: {
                    'top-section': {
                        templateUrl: "views/section-signup.html",
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
            })
            .state('jointventureresults', {
                url: "/jointventureresults",
                views: {
                    'top-section': {
                        templateUrl: "views/section-jointventure-results.html"
                    }
                }
            });
    });
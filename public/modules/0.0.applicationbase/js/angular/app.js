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
                templateUrl: "views/section-home.html",
                controller: 'MainController'
            })
            .state('home', {
                url: "/home",
                templateUrl: "views/section-home.html",
                controller: 'MainController'
            })
            .state('jointventure', {
                url: "/jointventure",
                templateUrl: "views/section-jointventure.html",
                controller: 'MainController'
            })
            .state('sell', {
                url: "/sell",
                templateUrl: "views/section-sell.html",
                controller: 'MainController'
            })
            .state('signup', {
                url: "/signup",
                templateUrl: "views/section-signup.html",
                controller: 'MainController'

            })
            .state('rent', {
                url: "/rent",
                templateUrl: "views/section-rent.html"
            })
            .state('jointventureresults', {
                url: "/jointventureresults",
                templateUrl: "views/section-jointventure-results.html"
            })
    });

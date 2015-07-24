angular.module('jointVentureApp', [
        'ui.router',
        'ngAnimate',
        'ngTagsInput',
        'submodules'
    ])
    /*.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

        $routeProvider

            // home page
            .when('/', {
                redirectTo:"/jointventure"
            })

            .when('/rent', {
                templateUrl: 'views/section-rent.html',
                controller: 'MainController'
            })

            .when('/signup', {
                templateUrl: 'views/section-signup.html',
                controller: 'MainController'
            })

            .when('/jointventure', {
                templateUrl: 'views/section-jointventure.html',
                controller: 'MainController'    
            });

        //$locationProvider.html5Mode(true);

    }])*/
    .config(function($stateProvider, $urlRouterProvider) {
        //
        // For any unmatched url, redirect to /state1
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
                templateUrl: "views/section-jointventure.html",
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
    });

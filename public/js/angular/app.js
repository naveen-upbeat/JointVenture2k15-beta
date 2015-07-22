angular.module('jointVentureApp', [
	'ngRoute',
	'ngAnimate',
	'ngTagsInput',
	 'submodules'])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/section-jointventure.html',
			controller: 'MainController'
		})

		.when('/rent', {
			templateUrl: 'views/section-rent.html',
			controller: 'MainController'
		})

		.when('/jointventure', {
			templateUrl: 'views/section-jointventure.html',
			controller: 'MainController'	
		});

	//$locationProvider.html5Mode(true);

}]);;
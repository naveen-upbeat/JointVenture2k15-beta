angular.module('jointVentureApp', [
	'ngRoute',
	 'submodules'])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		.when('/rent', {
			templateUrl: 'views/section-rent.html',
			controller: 'MainController'
		})

		.when('/geeks', {
			templateUrl: 'views/geek.html',
			controller: 'GeekController'	
		});

	//$locationProvider.html5Mode(true);

}]);;
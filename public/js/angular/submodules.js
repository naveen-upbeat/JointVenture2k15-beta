angular.module('submodules', [
	'submodules.mainnavigation',
	'submodules.mainfooter',
	'submodules.servicesoffered',
	'submodules.sectionabout',
	'submodules.sectionportfolio',
	'submodules.sectionhome'])
.controller('MainController', function($scope) {

	$scope.tagline = 'To the moon and back!';	

});
angular.module('submodules', [
	'submodules.3party',
	'submodules.sitewidecommon',
	'submodules.mainnavigation',
	'submodules.mainfooter',
	'submodules.servicesoffered',
	'submodules.sectionabout',
	'submodules.sectionportfolio',
	'submodules.sectionhome',
	'submodules.sectionjointventure',
	'submodules.sectionrent',
	'submodules.modallogin'])
.controller('MainController', function($scope) {

	$scope.appWideScope = {
		appTitle : 'Joint Venture 2015'
	};

});
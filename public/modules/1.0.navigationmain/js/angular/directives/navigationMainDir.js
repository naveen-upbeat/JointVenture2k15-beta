/**
 * @ngdoc directive
 * @name submodules.navigationmain:appJvNavigationMain
 * @scope
 * @restrict AE
 *
 * @description
 * The directive for main navigation, loads the template related to the main navigation
 *
 * @param {object}  field   A field object
 *
 */
angular.module('submodules.navigationmain')
.directive('appJvNavigationMain', function() {
	return{
		restrict: "AE",
		templateUrl : 'templates/tpl-navigation-main.html'
	};

});
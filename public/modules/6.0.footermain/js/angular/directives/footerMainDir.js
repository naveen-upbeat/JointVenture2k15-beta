/**
 * @ngdoc directive
 * @name submodules.footermain:appJvFooterMain
 * @scope
 * @restrict AE
 *
 * @description
 * The directive for footer section, loads the related template, 
 * 
 * @param {object}  field   A field object
 *
 */
angular.module('submodules.footermain')
.directive('appJvFooterMain', function() {
	return{
		restrict: "AE",
		templateUrl : 'templates/tpl-footer-main.html'
	}

});
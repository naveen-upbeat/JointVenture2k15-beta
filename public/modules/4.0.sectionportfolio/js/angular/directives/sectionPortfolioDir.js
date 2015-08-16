/**
 * @ngdoc directive
 * @name submodules.sectionportfolio:appJvSectionPortfolio
 * @scope
 * @restrict AE
 *
 * @description
 * The directive for Portfolio section, loads the related template, 
 * 
 * @param {object}  field   A field object
 *
 */
angular.module('submodules.sectionportfolio')
.directive('appJvSectionPortfolio', function() {
	return{
		restrict: "AE",
		templateUrl : 'templates/tpl-section-portfolio.html'
	}

});
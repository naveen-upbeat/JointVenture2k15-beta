/**
 * @ngdoc directive
 * @name submodules.sectionsample:appJvSectionSample
 * @scope
 * @restrict AE
 *
 * @description
 * The directive for Sample section, loads the related template, 
 * 
 * @param {object}  field   A field object
 *
 */
angular.module('submodules.sectionsample')
.directive('appJvSectionSample', function() {
	return{
		restrict: "AE",
		templateUrl : 'templates/tpl-section-sample.html'
	};
});
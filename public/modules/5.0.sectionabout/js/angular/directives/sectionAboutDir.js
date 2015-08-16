/**
 * @ngdoc directive
 * @name submodules.sectionabout:appJvSectionAbout
 * @scope
 * @restrict AE
 *
 * @description
 * The directive for About section, loads the related template, 
 * 
 * @param {object}  field   A field object
 *
 */
angular.module('submodules.sectionabout')
.directive('appJvSectionAbout', function() {
	return{
		restrict: "AE",
		templateUrl : 'templates/tpl-section-about.html'
	}

});
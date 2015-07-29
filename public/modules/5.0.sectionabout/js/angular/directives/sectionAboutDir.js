/**
 * @ngdoc directive
 * @name submodules.sectionabout:sectionAbout
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
.directive('sectionAbout', function() {
	return{
		restrict: "AE",
		templateUrl : 'templates/tpl-section-about.html'
	}

});
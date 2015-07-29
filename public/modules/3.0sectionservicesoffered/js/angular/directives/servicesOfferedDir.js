/**
 * @ngdoc directive
 * @name submodules.servicesoffered:servicesOffered
 * @scope
 * @restrict AE
 *
 * @description
 * The directive for Services section, loads the related template, 
 * 
 * @param {object}  field   A field object
 *
 */
angular.module('submodules.servicesoffered')
.directive('servicesOffered', function() {
	return{
		restrict: "AE",
		templateUrl : 'templates/tpl-services-offered.html'
	}

});
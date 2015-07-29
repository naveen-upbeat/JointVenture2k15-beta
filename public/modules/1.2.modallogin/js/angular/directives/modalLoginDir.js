/**
 * @ngdoc directive
 * @name submodules.modallogin:modalLogin
 * @scope
 * @restrict AE
 *
 * @description
 * The directive for singin in modal, loads the related template
 *
 * @param {object}  field   A field object
 *
 */
angular.module('submodules.modallogin')
.directive('modalLogin', function() {
	return{
		restrict: "AE",
		templateUrl : 'templates/tpl-modal-login.html',
		link : function(scope,element){
			
			
		
		}
	}

});
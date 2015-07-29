/**
 * @ngdoc service
 * @name submodules.sitewidecommon:scrollToDivSvc
 * @description
 * A service to spy on body scroll and set current div top
 */
angular.module('submodules.sitewidecommon')
    .service('scrollToDivSvc', [function() {
		
		var strCurrentDivId;
		
		this.getCurrentDivId = function(){
			return strCurrentDivId;
		};
		
		this.setCurrentDivId = function( strCurrentDivIdFromDom ){
			strCurrentDivId = strCurrentDivIdFromDom;
		};

}]);

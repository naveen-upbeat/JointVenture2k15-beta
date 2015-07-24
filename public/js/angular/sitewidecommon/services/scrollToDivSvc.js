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

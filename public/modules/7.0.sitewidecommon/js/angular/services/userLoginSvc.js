/**
 * @ngdoc service
 * @name submodules.sitewidecommon:userLoginSvc
 * @description
 * A service to get set User data from Session
 */
angular.module('submodules.sitewidecommon')
    .service('userLoginSvc', ['transformRequestAsFormPost', '$http', function(transformRequestAsFormPost, $http) {

        var _userSessionData = {
        	'bln_logged_in' : false,
        	'user_data' : {}
        };

        this.getUserSessionData = function() {
            return _userSessionData;
        };

        this.setUserSessionData = function( userData ) {
        	_userSessionData.bln_logged_in = true;
            _userSessionData.user_data = userData;
        };

        this.clearUserSessionData = function(){
        	_userSessionData.user_data = {};
        	_userSessionData.bln_logged_in = false;
        };

        this.getUserFromServerSession = function() {
        	return $http({
                method: 'get',
                url: '/api/get_usersession_data',
            });
        };

        this.logoutUser = function() {
            return $http({
                method: 'get',
                url: '/api/logoutuser',
            });
        };

        this.validateUser = function(strUserName, strPassword) {
            return $http({
                method: 'POST',
                url: '/api/verifyuser',
                transformRequest: transformRequestAsFormPost,
                data: {
                    'username': strUserName,
                    'password': strPassword
                }
            });
        };

        this.resetPassword = function(strUserName){
            return $http({
                method: 'POST',
                url: '/api/reset_password_email',
                transformRequest: transformRequestAsFormPost,
                data: {
                    'username': strUserName
                }
            });
        };

    }]);
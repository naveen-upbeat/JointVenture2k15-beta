/**
 * @ngdoc controller
 * @name submodules.sectionrent:sectionRentPropertyCtrl
 * @scope
 * 
 * @description
 * The controller used for validating the rent property
 *
 */
angular.module('submodules.sectionsell')
    .controller('sectionSellCtrl', ['$scope', '$http', 'transformRequestAsFormPost', 'userLoginSvc', function($scope, $http, transformRequestAsFormPost, userLoginSvc) {

        //A scope variable to hold the form data
        $scope.modelSellForm = {
            image_ref: '',
            image_url: [],
            user_details: {
                usertype: userLoginSvc.getUserSessionData().user_data.usertype,
                email: userLoginSvc.getUserSessionData().user_data.id,
                mobile: userLoginSvc.getUserSessionData().user_data.mobile,
                alternate_mobile: userLoginSvc.getUserSessionData().user_data.alternate_mobile
            },
            address: '',
            city: '',
            price_unit: '',
            price: '',
            is_negotiable: false,
            area_unit: '',
            built_area: '',
            possession_type: '',
            possession_details: '',
            property_description: '',
            status: '',
            near_by: '',
            captcha_valid: false,
            valid: true
        };

        $scope.usertypes = {

        };

        // A getUserTypes function, to get all the user types
        $scope.getUserTypes = function(userModel) {
            $http({
                method: 'GET',
                url: '/api/getusertypes'
            }).success(function(data, status, headers, cfg) {
                if (data.length > 0) {
                    $scope.usertypes = data;
                }
            }).error(function(data, status, headers, cfg) {

            });
        };

        // Register User
        $scope.fn_sell_property = function(modelSellForm) {

            return $http({
                method: 'POST',
                url: '/api/list_sell',
                transformRequest: transformRequestAsFormPost,
                data: modelSellForm
            });
        };

        $scope.getUserTypes();
    }]);

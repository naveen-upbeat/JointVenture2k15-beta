    /**
     * @ngdoc controller
     * @name submodules.sectionjointventure:jvSearchCtrl
     * @scope
     * 
     * @description
     * The controller is used for Joint Venture section, stores search options
     *
     * @param {object}  field   A field object
     *
     */
    angular.module('submodules.sectionjointventure')
        .controller('jvSearchCtrl', ['$scope','transformRequestAsFormPost','$http', function($scope, transformRequestAsFormPost, $http) {

            $scope.modelJvSearchForm = {
                'residential': {
                    'location': '',
                    'bedrooms': {
                        '1': false,
                        '2': false,
                        '3': false,
                        '4': false
                    },
                    'budget': {
                        'min': 0,
                        'max': 1
                    }
                },
                'commercial': {
                    'location': '',
                    'area': {
                        'unit': '',
                        'min': '',
                        'max': ''
                    },
                    'budget': {
                        'min': '',
                        'max': ''
                    }
                },
                'agricultural': {
                    'location': '',
                    'area': {
                        'unit': '',
                        'min': '',
                        'max': ''
                    },
                    'budget': {
                        'min': '',
                        'max': ''
                    }
                }
            };

            $scope.fn_getJointVentureResults = function(form) {
            return $http({
                method: 'POST',
                url: '/api/get_jointventure_results',
                transformRequest: transformRequestAsFormPost,
                data: {
                    'location': form.residential.location
                }
            });
        };

        }]);

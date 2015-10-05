/**
 * @ngdoc directive
 * @name submodules.sitewidecommon:appJvVerfiyUnique
 * @scope
 * @restrict AE
 *
 * @description
 * The directive is used for uniqueness verification of inputs
 * 
 * @param {object}  field   A field object
 *
 */
angular.module('submodules.sitewidecommon')
    .directive('appJvVerfiyUnique', ['$q', '$interval', function($q, $interval) {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                appJvVerfiyUnique: '&'
            },
            link: function(scope, element, attrs, ngModel) {
                var intervalRef, isValid = false;

                scope.$parent.$watch(attrs.ngModel, function(newVal, oldVal) {
                    if (angular.isDefined(intervalRef)) {
                        $interval.cancel(intervalRef);
                        intervalRef = undefined;
                    } else {
                        intervalRef = $interval(
                            function() {

                                scope.appJvVerfiyUnique()(newVal).then(function(res) {
                                    if (res.data.length === 0) {
                                        isValid = true;
                                    }else{
                                        isValid = false;
                                    }
                                    ngModel.$setValidity(attrs.ngModel, isValid);
                                });

                            }, 500, 1);
                    }

                }, true);
            }
        };
    }]);

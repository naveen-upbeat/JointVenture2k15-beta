/**
 * @ngdoc directive
 * @name submodules.sectionsell:appJvSectionSell
 * @scope
 * @restrict AE
 *
 * @description
 * The directive for Sell section, loads the related template, 
 * Emits an event 'childLoading' to notify parent controller to intialize material.init();
 * 
 * @param {object}  field   A field object
 *
 */
angular.module('submodules.sectionsell')
    .directive('appJvSectionSell', function() {
        return {
            restrict: "AE",
            templateUrl: 'templates/tpl-section-sell.html',
            link: function(scope, element, attrs, tabsCtrl) {
                var recaptchaSrc = "https://www.google.com/recaptcha/api.js";
                if ($('head script[src="' + recaptchaSrc + '"]').length) {
                    $('head script[src="' + recaptchaSrc + '"]').remove();
                }
                var captch_script = document.createElement('script');
                captch_script.setAttribute('src', recaptchaSrc);
                document.head.appendChild(captch_script);

                var uploadCareSrc = "https://ucarecdn.com/widget/2.5.5/uploadcare/uploadcare.min.js";

                scope.fn_onUploadCare = function(files) {
                    var uploadDialog = uploadcare.openDialog(files, {
                        imagesOnly: true,
                        multiple: true
                    });

                    uploadDialog.done(function(file) {
                        scope.modelSellForm.image_ref = file;
                        scope.modelSellForm.image_url = [];
                        var fileDone = function(fileInfo) {

                            scope.modelSellForm.image_url.push(fileInfo.cdnUrl);
                        };

                        for (var i = 0; i < uploadDialog.fileColl.__items.length; i++) {
                            uploadDialog.fileColl.__items[0].then(fileDone);
                        }

                    });
                };

                scope.upload_images = function() {
                    var files = scope.modelSellForm.image_ref ? scope.modelSellForm.image_ref.files() : null;
                    if (typeof uploadcare === 'undefined') {
                        $.getScript(uploadCareSrc, function() {
                            scope.fn_onUploadCare(files);
                        });
                    } else {
                        scope.fn_onUploadCare(files);
                    }
                };
            }
        };
    });

/*
 * @author: naveen
 * @description: This file contains the list of functions used by various interactions 
 * of the user with the content / div / etc
 * 
 */
(function($) {
    $(function() {
        /* START: Materialize Initializing parallax and sideNav */
        siteWideCommonFunctions.initMaterialDesign();
        /* END: Materialize INIT  */

        //On page load set the containerHeight
        //siteWideCommonFunctions.adjustngViewContainerHeight();
    });
})(jQuery);

// Collection of common functions to be used by angular directives
var siteWideCommonFunctions = {

    adjustngViewContainerHeight: function() {
        setTimeout(function() {
            var $pageView = $('.page-view'),
                outerContentHeight = $pageView.children(0).outerHeight();
            if (outerContentHeight < 500) {
                outerContentHeight = 500 + parseInt($pageView.children(0).css('padding-top'));
            }
            $pageView.height(outerContentHeight);
            $('.ng-view-container').height(outerContentHeight);
        }, 300);

    },

    initMaterialDesign: function() {

        //materialize remove previous instance
        //$('.button-collapse').sideNav('remove');
        //$('.modal-trigger').leanModal('remove');
        //$('ul.tabs').tabs('remove');
        //$('.dropdown-button').dropdown('remove');

        //materialize init code
        /*
        $('.button-collapse').sideNav();
        $('.modal-trigger').leanModal({
            dismissible: true
        });
        $('ul.tabs').tabs();
        $('.dropdown-button').dropdown();
*/
    },

    scrollToSection: function(divId) {
        if ($('#' + divId).length > 0) {
            $('html, body').animate({
                scrollTop: $("#" + divId).offset().top
            }, 2000);
        }
    }


};

(function($) {

    $.fn.dropdown_custom = function() {
        var _this = $(this);
        if ($('.click-through-div').length === 0) {
            $('<div class="click-through-div"></div>').appendTo('body');
        }
        if (_this.data('dropdown-button-custom')) {

        } else {

            var dropdown_content = _this.parent().find('ul.dropdown-content-custom');
            dropdown_content.appendTo(_this.closest('.row'));

            dropdown_content.addClass('white').hide();
            dropdown_content.css('position', 'absolute').css('top', _this.offset().top + _this.height() + 'px').css('left', _this.offset().left + 'px');

            _this.on('click', function(event) {
                if (!dropdown_content.is(':visible')) {

                    $('.click-through-div').height($(window).height()).width($(window).width());

                    dropdown_content.slideToggle();

                    event.stopPropagation();
                    event.preventDefault();
                }
            });

            _this.data('dropdown-button-custom', true);
        }
    };

    $('body').on('click', '.click-through-div', function(evt) {
        $('body').find('ul.dropdown-content-custom').toggle();
        $(evt.target).height(0).width(0);
        starter = document.elementFromPoint(evt.clientX, evt.clientY);
        // send click to element at finger point
        $(starter).click();
    });

})(jQuery);

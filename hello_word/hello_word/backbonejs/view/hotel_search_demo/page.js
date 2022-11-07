$(document).ready(function () {
    skygate.util.namespace('skygate.view.hotel_search_demo').PageView = Backbone.View.extend({
        el: 'body',
        jqBtnScrollTop: $('#btn-scroll-top'),
        jqWindow: $(window),
        initialize: function () {
            var self = this;
            $(document).click(function (event) {
                if (!$(event.target).closest('.js-box-modal-city,.box-modal').length) {
                    $('body').find('.js-box-modal-city').removeClass('box-modal-open');
                }
                if (!$(event.target).closest('.js-box-modal-number-room,.box-modal').length) {
                    $('body').find('.js-box-modal-number-room').removeClass('box-modal-open');
                }
                if (!$(event.target).closest('.js-box-modal-room-02,.box-modal').length) {
                    $('body').find('.js-box-modal-room-02').removeClass('box-modal-open');
                }
                if (!$(event.target).closest('.js-box-modal-passengers,.box-modal').length) {
                    $('body').find('.js-box-modal-passengers').removeClass('box-modal-open');
                }
            });
            $(window).on('scroll', function () {
                var scrollPosition = $(window).height() + $(window).scrollTop();
                self.jqBtnScrollTop.css('visibility', scrollPosition > (self.jqWindow.height() + (self.jqWindow.height() / 2)) ? 'visible' : 'hidden');
            });
            $('.block-search-list').css('visibility', 'hidden');
        },
        events: {
            'click #btn-scroll-top': 'scrollToTop',
        },
        scrollToTop: function () {
            $('html, body').animate({scrollTop: 0}, 300);
        }
    });
})

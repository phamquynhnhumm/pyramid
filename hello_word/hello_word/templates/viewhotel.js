(function (window, $) {
    var DetailAgsMstView = Backbone.View.extend({
        el: '#foo',
        events: {
            'click .loadAgtMst': 'loadAgtMst',
            'change .rooms': 'invaliRooms',
        },
        initialize: function () {
            console.log('js mới ');
            console.log('js mới ');
        },
        loadAgtMst: function () {
            var rooms = $('.rooms').val();
            alert("show thu rooms loadding" + rooms);
            console.log(rooms)
        },
    });
    new DetailAgsMstView();
})(window, jQuery);

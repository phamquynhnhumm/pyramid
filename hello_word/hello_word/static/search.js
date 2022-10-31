(function (window, $) {
    var DetailAgsMstView = Backbone.View.extend({

        el: '#foo',

        events: {
            'click .loadAgtMst': 'loadAgtMst',
        },
        initialize: function () {
            console.log('initialize');
        },
        loadAgtMst: function () {
            $('#')
            alert("xin chao 123")
        },
    });
    new DetailAgsMstView()
})(window, jQuery);


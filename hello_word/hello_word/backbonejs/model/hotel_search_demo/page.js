$(document).ready(function () {
    skygate.util.namespace('skygate.model.hotel_search_demo').PageModel = Backbone.Model.extend({
        defaults: {
            areaCode: null,
            subAreaCode: null,
            checkin: null,
            checkout: null,
            rooms: [],
            size: null,
            page: 1,
            sort: null
        },
    });
});


$(document).ready(function () {
    skygate.util.namespace('skygate.model.hotel_search_demo').HotelListCollection = Backbone.Collection.extend({
        model: skygate.model.hotel_search_demo.HotelItemModel
    });
});


$(document).ready(function () {
    skygate.util.namespace('skygate.model.hotel_search_demo').ControlBarModel = Backbone.Model.extend({
        defaults: {
            totalItems: 0,
            pageSizes: [10, 20, 50, 100],
            currentPageSize: 20,
            sort: 'ASC'
        },
    });
});


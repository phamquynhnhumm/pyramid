$(document).ready(function () {
    skygate.util.namespace('skygate.model.hotel_search_demo').PaginationModel = Backbone.Model.extend({
        defaults: {
            numOfPages: 0,
            currentPage: 1
        },
    });
});


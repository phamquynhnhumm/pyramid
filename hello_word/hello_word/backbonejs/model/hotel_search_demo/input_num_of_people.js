$(document).ready(function () {
    skygate.util.namespace('skygate.model.hotel_search_demo').InputNumOfPeopleModel = Backbone.Model.extend({
        defaults: {
            ordinal: '1st',
            numOfAdultsConfig: {
                min: 1,
                max: 9
            },
            numOfChildrensConfig: {
                min: 0,
                max: 9
            }
        },
    });
});


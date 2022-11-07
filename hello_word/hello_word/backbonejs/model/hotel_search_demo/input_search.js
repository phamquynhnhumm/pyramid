$(document).ready(function () {
    skygate.util.namespace('skygate.model.hotel_search_demo').InputSearchModel = Backbone.Model.extend({
        defaults: {
            cities: [
                {
                    areaCode: 'A04',
                    subAreaCode: '1301',
                    label: 'TYO, Tokyo'
                },
                {
                    areaCode: 'A08',
                    subAreaCode: '2701',
                    label: 'OSA, Osaka'
                }
            ],
            checkoutOffset: 1, // check out = checkin date + 1
            numOfRoomsConfig: {
                min: 1,
                max: 9
            },
            numOfAdultsConfig: {
                min: 1,
                max: 9
            },
            numOfChildrensConfig: {
                min: 0,
                max: 9
            },
            dateFormat: 'yyyy/MM/dd'
        },
    });
});


$(document).ready(function () {
     skygate.util.namespace('skygate.model.hotel_search_demo').HotelItemModel = Backbone.Model.extend({
         defaults: {
             name: '',
             address: '',
             thumbnail: '',
             rating: 0,
             numOfReviews: 0,
             price: '',
             tax: '',
             discount: '',
             total: '',
         },
     });
});


$(document).ready(function () {
    skygate.util.namespace('skygate.view.hotel_search_demo').HotelItemView = Backbone.View.extend({
        tagName: 'li',
        template: _.template($('#hotel-item-template').html()),
        initialize: function () {
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
});

function renderStars(rating) {
    var hasStarHalf = (rating + '').split('.').length > 1;
    var numOfStar = Math.floor(rating)
    var numOfStarEmpty = 5 - numOfStar - (hasStarHalf ? 1 : 0)
    var htmlStar = ''
    htmlStar = _.reduce(_.range(numOfStar), function (acc) {
        return acc + '<li><span class="star"></span></li>';
    }, htmlStar);
    htmlStar += hasStarHalf ? '<li><span class="star star-half"></span></li>' : '';
    htmlStar = _.reduce(_.range(numOfStarEmpty), function (acc) {
        return acc + '<li><span class="star star-empty"></span></li>';
    }, htmlStar);
    return htmlStar
}


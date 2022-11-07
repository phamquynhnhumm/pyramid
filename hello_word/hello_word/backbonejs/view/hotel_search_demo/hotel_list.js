$(document).ready(function () {
    skygate.util.namespace('skygate.view.hotel_search_demo').HotelListView = Backbone.View.extend({
        el: '.item-search-list',
        initialize: function () {
            this.listenTo(this.model, 'reset', this.render)
        },
        render: function () {
            this.$el.empty();
            var hotelItems = this.model.toJSON();
            if (hotelItems.length > 0) {
                this.$el.append(
                    hotelItems.map(function (item) {
                        return new skygate.view.hotel_search_demo.HotelItemView({model: new skygate.model.hotel_search_demo.HotelItemModel(item)}).render().$el;
                    })
                );
            } else {
                this.$el.html('<div style="text-align: center">No records found</div>');
            }
            $('.block-search-list').css('visibility', 'visible');
            return this;
        }
    });
})

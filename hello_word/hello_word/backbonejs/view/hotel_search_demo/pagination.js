$(document).ready(function () {
    skygate.util.namespace('skygate.view.hotel_search_demo').PaginationView = Backbone.View.extend({
        el: '.pagination',
        jqPagination: $('.pagination ul'),
        template: _.template('<li class="<%= active ? \'active\' : \'\' %>"><a href="javascript:;"><%= value %></a></li>'),
        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },
        render: function () {
            var self = this;
            var currentPage = this.model.get('currentPage');
            this.jqPagination.html(
                _.range(1, this.model.get('numOfPages') + 1)
                    .map(function (value, index) {
                        return self.template({value: value, active: value === currentPage});
                    })
                    .join('')
            );

            return this;
        },
        events: {
            'click li': 'pageChange',
        },
        pageChange: function (evt) {
            this.trigger('pageChange', $(evt.currentTarget).find('a').first().html());
        }
    });
})

$(document).ready(function () {
    skygate.util.namespace('skygate.view.hotel_search_demo').ControlBarView = Backbone.View.extend({
        el: '.top-search-list',
        jqTotalItems: $('.search-list-text-result p strong'),
        jqSelectPageSize: $('#select-page-size'),
        jqSearchListFilterSort: $('.search-list-filter-sort'),
        templatePageSizeOption: _.template('<option value="<%= value %>"><%= value %></option>'),
        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },
        render: function () {
            var self = this;
            this.jqTotalItems.html(this.model.get('totalItems'));
            self.jqSelectPageSize.empty();
            this.model.get('pageSizes').map(function (pageSize) {
                self.jqSelectPageSize.append(self.templatePageSizeOption({value: pageSize}));
            });
            this.jqSelectPageSize.val(this.model.get('currentPageSize'));
            var sort = this.model.get('sort');
            this.jqSearchListFilterSort[sort === 'ASC' ? 'removeClass' : 'addClass']('active')
            this.jqSearchListFilterSort.find('span').first().text(`Sort by ${sort === 'ASC' ? 'lowest' : 'highest'} price`)

            return this;
        },
        events: {
            'click .search-list-filter-sort': 'sortChange',
            'change #select-page-size': 'pageSizeChange'
        },
        sortChange: function () {
            this.trigger('sortChange', this.jqSearchListFilterSort.hasClass('active') ? 'PRICE_ASC' : 'PRICE_DESC');
        },
        pageSizeChange: function () {
            this.trigger('pageSizeChange', this.jqSelectPageSize.val());
        },
    });
})

$(document).ready(function () {
    var DEFAULT_PAGE_SIZE = 20;
    var DEFAULT_SORT = 'PRICE_ASC';
    var API_URL = 'hotel-search-api-demo';

    var pageModel = new skygate.model.hotel_search_demo.PageModel({sort: DEFAULT_SORT, size: DEFAULT_PAGE_SIZE});
    new skygate.view.hotel_search_demo.PageView();
    pageModel.on('change', function (data) {
        $.ajax({
            url: API_URL,
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(data.toJSON()),
            beforeSend: function () {
                $('.b-loading,.b-overlay').addClass('show');
            },
            complete: function () {
                $('html, body').animate({
                    scrollTop: $('.wrap-search-list').offset().top - 50
                }, 1000, function () {
                    $('.b-loading,.b-overlay').removeClass('show');
                });
            },
        }).done(function (data) {
            controlBarModel.set({
                totalItems: data.numOfTotalItems,
                sort: pageModel.get('sort') === 'PRICE_ASC' ? 'ASC' : 'DESC',
            });
            paginationModel.set({
                numOfPages: data.numOfPages,
                currentPage: data.currentPage
            });
            hotelListCollection.reset(data.items);

        })
    });

    var hotelSearchModel = new skygate.model.hotel_search_demo.InputSearchModel();
    var hotelSearchView = new skygate.view.hotel_search_demo.InputSearchView({model: hotelSearchModel});
    hotelSearchView.on('submit', function (data) {
        pageModel.set(data);
    });

    var controlBarModel = new skygate.model.hotel_search_demo.ControlBarModel({currentPageSize: DEFAULT_PAGE_SIZE});
    var controlBarView = new skygate.view.hotel_search_demo.ControlBarView({model: controlBarModel}).render();
    controlBarView.on('sortChange', function (data) {
        pageModel.set({
            page: 1,
            sort: data
        });
    });
    controlBarView.on('pageSizeChange', function (data) {
        pageModel.set({
            page: 1,
            size: data
        });
    });

    var paginationModel = new skygate.model.hotel_search_demo.PaginationModel();
    var paginationView = new skygate.view.hotel_search_demo.PaginationView({model: paginationModel}).render();
    paginationView.on('pageChange', function (data) {
        pageModel.set('page', data);
    });

    var hotelListCollection = new skygate.model.hotel_search_demo.HotelListCollection();
    new skygate.view.hotel_search_demo.HotelListView({model: hotelListCollection});

})

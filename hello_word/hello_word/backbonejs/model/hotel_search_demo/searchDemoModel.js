new DetailAgsMstView()
var AgsMstModel = Backbone.Model.extend(
    {
        initialize: function () {
            _.bindAll(this, 'loadAgtMstMode', '_getAgtMst');
            this.set('agtMei', '');
            this.set('telNo', '');
            this.set('mlAdr', '');
        },
        loadAgtMstMode: function () {
            var promise = this._getAgtMst();
            var that = this;
            promise.done(function (data) {
                that.set('agtMei', data.result.result.agtMei);
                that.set('telNo', data.result.result.telNo);
                that.set('mlAdr', data.result.result.mlAdr);
                that.trigger('change:agsMstModel');
            }).fail(function (data) {
            });
        },
        _getAgtMst: function () {
            var promise = $.ajax(skygate.util.getLocation('/agtMst'), {
                type: 'get',
                dataType: 'json',
                cache: false,
                data: $.param({})
            });
            return promise;
        },
    }
);
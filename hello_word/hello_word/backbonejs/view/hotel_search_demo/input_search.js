$(document).ready(function () {
    var DEFAULT_CHILD_AGE = 5;

    skygate.util.namespace('skygate.view.hotel_search_demo').InputSearchView = Backbone.View.extend({
        el: '.wrap-search',
        jqCheckin: $('#checkin-date'),
        jqCheckout: $('#checkout-date'),
        jqRooms: $('#rooms'),
        jqBoxModalCity: $('.js-box-modal-city'),
        jqLabelCity: $('.js-box-modal-city .txt strong'),
        jqInputNumOfRooms: $('#input-num-of-room'),
        jqLabelNumOfRooms: $('.js-box-modal-number-room .txt strong'),
        jqInputAreaCode: $('#area-code'),
        jqInputSubAreaCode: $('#sub-area-code'),
        jqWrapBoxS: $('.wrap-box-s'),
        initialize: function () {
            this.render()
        },
        render: function () {
            var jqChkout = this.jqCheckout;
            var checkoutOffset = this.model.get('checkoutOffset');
            this.jqCheckin.datepicker({
                minDate: 0,
                dateFormat: 'yy/mm/dd',
                onSelect: function (dateText) {
                    var msecsInADay = 86400000
                    var offsetDay = new Date(new Date(dateText).getTime() + (msecsInADay * checkoutOffset))
                    jqChkout.datepicker('option', 'minDate', offsetDay);
                    jqChkout.datepicker('setDate', offsetDay);
                }
            }).datepicker('setDate', new Date())
            this.jqCheckout.datepicker({
                minDate: this.model.get('checkoutOffset'),
                dateFormat: 'yy/mm/dd'
            }).datepicker('setDate', this.model.get('checkoutOffset'))
            this.jqInputNumOfRooms.val(this.model.get('numOfRoomsConfig').min).trigger('change');
            for (var i = 0; i < this.model.get('numOfRoomsConfig').min; i++) {
                this.addOneInputPerson();
            }

            return this;
        },
        events: {
            'click .js-box-modal': 'openBoxModal',
            'click .add-room': 'increaseNumOfRoom',
            'click .sub-room': 'decreaseNumOfRoom',
            'click .lst-city a': 'selectCity',
            'click .btn-search': 'search',
            'change #area-code': 'areaCodeChange',
            'change #input-num-of-room': 'numOfRoomsChange',
        },
        openBoxModal: function (evt) {
            $(evt.currentTarget).toggleClass('box-modal-open');
        },
        numOfRoomsChange: function (evt) {
            this.jqLabelNumOfRooms.html($(evt.currentTarget).val());
        },
        addOneInputPerson: function () {
            var ordinal = this.jqRooms.children().length + 1
            ordinal += ordinal === 1 ? 'st' : ordinal === 2 ? 'nd' : ordinal === 3 ? 'rd' : 'th'
            this.jqRooms.append(new skygate.view.hotel_search_demo.InputNumOfPeopleView({
                model: new skygate.model.hotel_search_demo.InputNumOfPeopleModel({
                    ordinal: ordinal,
                    numOfAdultsConfig: this.model.get('numOfAdultsConfig'),
                    numOfChildrensConfig: this.model.get('numOfChildrensConfig'),
                })
            }).render().el)

            this.jqLabelNumOfRooms.val(this.jqRooms.children().length);
        },
        increaseNumOfRoom: function (evt) {
            var jqInputNumOfRoom = $(evt.currentTarget).next();
            var newValue = +jqInputNumOfRoom.val() + 1;
            if (newValue <= this.model.get('numOfRoomsConfig').max) {
                jqInputNumOfRoom.val(newValue).trigger('change');
                this.addOneInputPerson();
            }
        },
        decreaseNumOfRoom: function (evt) {
            var jqInputNumOfRoom = $(evt.currentTarget).prev();
            var newValue = +jqInputNumOfRoom.val() - 1;
            if (newValue >= this.model.get('numOfRoomsConfig').min) {
                jqInputNumOfRoom.val(newValue).trigger('change');
                this.jqRooms.children().last().remove();
            }
        },
        selectCity: function (evt) {
            var jqTarget = $(evt.jqInputAreaCode)
            this.jqBoxModalCity.removeClass('box-modal-open')
            this.jqLabelCity.html($(evt.currentTarget).html())
            this.jqInputAreaCode.val(jqTarget.data('area-code')).trigger('change')
            this.jqInputSubAreaCode.val(jqTarget.data('sub-area-code')).trigger('change')
        },
        areaCodeChange: function (evt) {
            this.jqWrapBoxS.removeClass('has-error')
        },
        validate: function () {
            // Check city code
            var areaCode = this.jqInputAreaCode.val()
            var subAreaCode = this.jqInputSubAreaCode.val()
            if (!areaCode || !subAreaCode) {
                this.jqBoxModalCity.parent().addClass('has-error')
                return false
            }
            return true
        },
        search: function () {
            if (this.validate()) {
                this.jqWrapBoxS.removeClass('has-error')
                this.trigger('submit', {
                    areaCode: this.jqInputAreaCode.val(),
                    subAreaCode: this.jqInputSubAreaCode.val(),
                    checkin: $.datepicker.formatDate('yymmdd', this.jqCheckin.datepicker('getDate')),
                    checkout: $.datepicker.formatDate('yymmdd', this.jqCheckout.datepicker('getDate')),
                    rooms: this.jqRooms.children().toArray().map(function (wrapBox) {
                        return {
                            adult: parseInt($(wrapBox).find('.adult input').first().val()),
                            childAges: _.times($(wrapBox).find('.child input').first().val(), function () {
                                return DEFAULT_CHILD_AGE
                            })
                        }
                    })
                });
            }
        }
    });
})

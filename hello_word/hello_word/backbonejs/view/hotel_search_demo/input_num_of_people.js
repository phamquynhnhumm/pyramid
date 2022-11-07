$(document).ready(function () {
    skygate.util.namespace('skygate.view.hotel_search_demo').InputNumOfPeopleView = Backbone.View.extend({
        className: 'wrap-box-s',
        template: _.template($('#input-room-template').html()),
        events: {
            'click button': 'changeQuantity'
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()))
            return this
        },
        changeQuantity: function (evt) {
            var jqBtn = $(evt.currentTarget);
            var isAdultChange = jqBtn.parent().hasClass('adult');
            var newValue;
            var hasChanged = false;
            if (jqBtn.hasClass('add')) {
                var jqInput = jqBtn.next();
                newValue = +jqInput.val() + 1;
                if (newValue <= (isAdultChange ? this.model.get('numOfAdultsConfig').max : this.model.get('numOfChildrensConfig').max)) {
                    jqInput.val(newValue)
                    hasChanged = true
                }
            } else {
                var jqInput = jqBtn.prev()
                newValue = +jqInput.val() - 1;
                if (newValue >= (isAdultChange ? this.model.get('numOfAdultsConfig').min : this.model.get('numOfChildrensConfig').min)) {
                    jqInput.val(newValue);
                    hasChanged = true
                }
            }

            if (hasChanged) {
                if (isAdultChange) {
                    jqBtn.closest('.wrap-box-s').find('.adults span').html(newValue)
                } else {
                    jqBtn.closest('.wrap-box-s').find('.children span').html(newValue)
                }

            }
        }
    });
});

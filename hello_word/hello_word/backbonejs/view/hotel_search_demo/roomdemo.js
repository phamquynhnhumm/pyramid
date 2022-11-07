;(function (window, $) {
    var RoomModel = Backbone.Model.extend({
        defaults: {
            roomMaxNum: 4,
            rooms: [],
            roomDefault: {
                adult: 1,
                childAges: []
            }
        },

        initialize: function () {
            _.bindAll(this, 'increment', 'decrement', 'setRoomNum', 'getRooms');
        },

        deserialize: function (roomsAsStr) {
            return _.reduce(roomsAsStr.split(':'), function (memo, one) {
                var adultAndChildren = _.map(one.split(','), function (v) {
                    return parseInt(v, 10);
                });
                memo.push({
                    adult: adultAndChildren.shift(),
                    childAges: adultAndChildren || []
                });
                return memo;
            }, []);
        },

        deserializeAndUpdate: function (roomsAsStr) {
            var rooms = this.deserialize(roomsAsStr);
            this.set('rooms', rooms);
            return rooms;
        },

        formatStr: function (roomList) {
            var rooms = [];
            _.each(roomList, function (room) {
                var temp = room.adult;
                if (room.childAges.length > 0) {
                    temp += ',' + room.childAges.join(',');
                }
                rooms.push(temp);
            });
            return rooms.join(':');
        },

        increment: function () {
            var rooms = this.get('rooms');
            var roomNum = rooms.length;
            var roomMaxNum = this.get('roomMaxNum');
            if (roomNum < roomMaxNum) {
                rooms[roomNum] = $.extend(true, {}, this.get('roomDefault'));
                this.trigger('change');
            }
        },

        decrement: function () {
            var rooms = this.get('rooms');
            var roomNum = rooms.length;
            if (1 < roomNum) {
                rooms.pop();
                this.trigger('change');
            }
        },

        setRoomNum: function (roomNum) {
            var roomMaxNum = this.get('roomMaxNum');
            if (1 <= roomNum && roomNum <= roomMaxNum) {
                var rooms = this.get('rooms');
                if (rooms.length < roomNum) {
                    var roomDefault = this.get('roomDefault');
                    _.each(_.range(rooms.length, roomNum), function () {
                        rooms.push($.extend(true, {}, roomDefault));
                    });
                } else {
                    rooms.length = roomNum;
                }
                this.trigger('change');
            }
        },

        getRooms: function () {
            return this.formatStr(this.get('rooms'));
        },

        getRoomsAsObject: function () {
            var rooms = this.get('rooms');
            _.each(rooms, function (room) {
                room.adult = parseInt(room.adult, 10);
                if (!_.isEmpty(room.childAges)) {
                    _.each(room.childAges, function (ca, i) {
                        room.childAges[i] = parseInt(ca, 10);
                    });
                }
            });
            return rooms;
        },

        setRooms: function (roomIndex, updateData) {
            var rooms = this.get('rooms');
            rooms[roomIndex] = updateData;
        }
    });
    skygate.util.namespace('airlink.model.hotel.searchform.components').RoomModel = RoomModel;
})(window, jQuery);
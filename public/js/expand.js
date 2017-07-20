$(function(){
    var init = function () {
        //--------------------------------------------------Get expandision setting
        get_initialSetting();
        //--------------------------------------------------Set LanAccess
        $('#LAN_access')
            .click(set_lanaccess);
        //--------------------------------------------------Set hotel number
        $('#search_hotelnumber')
            .click(set_hotelnumber)
        //--------------------------------------------------Set calendar search
        $('#search_calendar')
            .click(set_calendar)
    }
    var get_initialSetting = function () {
        $.ajax("/expand/api/getexpandision", {
            method: "GET"
        }).success(function (res) {
            
            if(res.result['lan_access'] == "false") {
                $('#LAN_access').attr({unchecked: 1});
            } else {
                $('#LAN_access').attr({checked: 1});

                var lanDisplayTemplate = '<a href=' + res.hostname + ' target="left-menu">' +res.hostname + '</a>'
                $('#lan-display').append(lanDisplayTemplate);
            }

            if(res.result['hotel_number'] == "false") {
                $('#search_hotelnumber').attr({unchecked: 1});
            } else {
                $('#search_hotelnumber').attr({checked: 1});
            }
            if(res.result['calendar_search'] == "false") {
                $('#search_calendar').attr({unchecked: 1});
            } else {
                $('#search_calendar').attr({checked: 1});
            }
        });
    }
    var set_lanaccess = function () {
        var isChecked;
        if($('#LAN_access').is(":checked")) {
            isChecked = true
        } else {
            isChecked = false
        }
        $.ajax("/expand/api/setexpandision", {
            method: "GET",
            data:  {LanChecked: isChecked},

        }).success(function (res) {
            
            $('#lan-display').find('a').remove();
            if(res.checked == "true"){
                $('#lan-display').show();
            }else{
                $('#lan-display').hide();

            }
            res.data.forEach(function (address) {
                var lanDisplayTemplate = '<a href=' + address + ' target="left-menu">' +address + '</a>'
                $('#lan-display').append(lanDisplayTemplate);
            })
        })
    }
    var set_hotelnumber = function () {
        var isChecked;
        if($('#search_hotelnumber').is(":checked")) {
            isChecked = true
        } else {
            isChecked = false
        }
        $.ajax("/expand/api/setexpandision", {
            method: "GET",
            data:  {HotelNumChecked: isChecked},

        }).success(function (res) {

        })
    }
    var set_calendar = function () {
        var isChecked;
        if($('#search_calendar').is(":checked")) {
            isChecked = true
        } else {
            isChecked = false
        }
        $.ajax("/expand/api/setexpandision", {
            method: "GET",
            data:  {CalendarChecked: isChecked},

        }).success(function (res) {

        })
    }
    init()
})

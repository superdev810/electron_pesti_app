$(document).ready(function(){

    var init = function () {
        get_saveEmail();
        $("#save_email_btn")
            .click(check_emailaddress);

        //----------------------------------------------------------------Get calendar search setting
        $.ajax("/expand/api/getexpandision", {
            method: "GET"
        }).success(function (res) {
            
            if (res.result['calendar_search'] == "false") {
                $('#datepicker').css({
                    display: 'none'
                })
            } else {
                $('#datepicker').css({
                    display: 'block'
                });
                search_calendar();
            }
        });


    }



    //----------------------------------------------------------------Calendar serach
    var search_calendar = function () {
        //------------------------------------------------------------------------------- Calendar search
        $.ajax('/customer/api/getreservation',{
            method:'GET'
        }).success(function (res) {
            $("#datepicker").datepicker({
                changeMonth: true,
                changeYear: true,
                autoSize: true,
                onChangeMonthYear: function (year, month, inst) {
                    setTimeout(function () {
                        Object(res).forEach(function (val) {
                            var r_date = new Date(val.text);
                            var r_year = r_date.getFullYear();
                            var r_month = r_date.getMonth();
                            var r_day = r_date.getDate() - 1;
                            $("td[data-month='" + r_month + "']" + "[data-year='" + r_year + "']:eq('" + r_day + "') a").attr({
                                href: '/left-menu',
                                target: 'menu-frame'
                            });
                            $("td[data-month='" + r_month + "']" + "[data-year='" + r_year + "']:eq('" + r_day + "') a").css({
                                'background-repeat' : 'no-repeat',
                                'background-size'   : 'contain',
                                'background-image'  : "url('../img/star.png')"
                            });

                        });
                    }, 100)
                },
                onSelect: function (dateText, inst) {
                    var sel_date = new Date(dateText)
                    var sel_year = sel_date.getFullYear()
                    var sel_month = sel_date.getMonth()
                    var sel_day = sel_date.getDate() - 1

                    setTimeout(function () {
                        var re_id = "";
                        Object(res).forEach(function (val) {
                            var r_date = new Date(val.text)
                            var r_year = r_date.getFullYear()
                            var r_month = r_date.getMonth()
                            var r_day = r_date.getDate() - 1
                            if(sel_year == r_year && sel_month == r_month && sel_day == r_day) {
                                re_id += val.id + " "
                            }
                            $("td[data-month='" + r_month + "']" + "[data-year='" + r_year + "']:eq('" + r_day + "') a").css({
                                'background-repeat': 'no-repeat',
                                'background-size': 'contain',
                                'background-image': "url('../img/star.png')"
                            });
                        })
                        parent.window.document.getElementById("menu-frame").src = "/left-menu?ids=" + re_id;
                    }, 100)
                }
            });
            Object(res).forEach(function (val) {
                var r_date = new Date(val.text)
                var r_year = r_date.getFullYear()
                var r_month = r_date.getMonth()
                var r_day = r_date.getDate() - 1

                $("td[data-month='" + r_month + "']" + "[data-year='" + r_year + "']:eq('" + r_day + "') a").css({
                    'background-repeat': 'no-repeat',
                    'background-size': 'contain',
                    'background-image': "url('../img/star.png')"
                });
            })

        })
    }


    //--------------------------------------------------------------------------Get saved email address
    var get_saveEmail = function () {
        if(localStorage.getItem('useremail')) {
            $('#user_email').val(window.localStorage.getItem("useremail"));
        }
    }
    //---------------------------------------------------------------------------Check email address
    var check_emailaddress = function () {
        if (checkEmailValidation($('#user_email').val())) {
            window.localStorage.setItem('useremail', $('#user_email').val());
            $('#setting-email-error').css({
                display: 'none'
            });
        } else {
            $('#setting-email-error').css({
                display: 'block'
            });
        }
    }


    init();
});






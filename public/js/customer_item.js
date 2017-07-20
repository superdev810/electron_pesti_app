////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            新規顧客ページ
// DATA MODEL EX:
// postits = [
//  {
//      name:"住所",
//      fields:[
//          {fieldName: "郵便番号", fieldType:"text", fieldValue:"xxxx", autoSize:false, background:"#xxx"},
//          {fieldName: "住所",     fieldType:"text", fieldValue:"xxxx", autoSize:false, background:"#xxx"}
//      ]
//  }
//  ...
// ]
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function(){
    //------------------------------------------- Define constants
    var DEFAULT_BACKGROUND = '#abcf9a';

    //------------------------------------------- Datas
    var new_customer_name = '';
    var new_pronounce_name = '';
    var customer_id = $(customer_result_id).val();
    var postits = [];
    var result_postit = [];
    //------------------------------------------- UI View Components
    var container = $('.extend-tags-area');

    //------------------------------------------- init
    var init = function(){
        initExpansionSetting();
        getCustomerInfo();
    };

    //------------------------------------------- init expansion setting
    var initExpansionSetting = function(){
        var host_name
        $.ajax("/expand/api/getexpandision", {
            method: "GET"
        }).success(function (res) {
            if(res.result['hotel_number'] == "false") {
                $('#customerNumber_postit').css({ display: 'none' });
            } else {
                $('#customerNumber_postit').css({ display: 'block' });
            }
            host_name = res.hostname
        });
        $(this).click(function (e) {
            if(e.target.id != 'customer_postit') {
                $('#customer_menu').css({ display: 'none' });
            }
        });
    }
    //------------------------------------------- Get One Customer Info
    var getCustomerInfo = function () {
        $.ajax("/customer/api/getcustomer?id=" + customer_id, {
            method: "GET",
        }).success(function (res) {
            result_postit = res[0].data.postit;
            result_postit.forEach(function (postit) {
                postits.push(new Postit(container, postit, false));
            })
        });
    }

    //------------------------------------------- run initialize
    init();
});

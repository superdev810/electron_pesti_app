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
    //--------------------------------------------Page number
    var page_number = 1;
    //------------------------------------------- Define constants
    var DEFAULT_BACKGROUND = '#abcf9a';

    //------------------------------------------- Datas
    var new_customer_name = '';
    var new_pronounce_name = '';
    var postits = [];

    //------------------------------------------- UI View Components
    var container = $('.extend-tags-area');
    var dialogComp = $('#postit_dialog');
    var fileDialogComp = $('#fileupload_dialog'); // please update FileDialog
    var fileDialog = new PostitFileDialog(fileDialogComp);
    var dialog = new PostitDialog(dialogComp);

    //------------------------------------------- init
    var init = function(){
        initExpansionSetting();

        $('#customer_pagenum').text(page_number);

        $('#customer_postit').click(function (e) {
            $('#customer_menu').show();// this code is not good
        });
        $('#customer_save').click(onSaveClicked);

        // init cumstomer_menu
        $("#customer_menu #default_postit")
            .click(addDefaultPostit);

        $("#customer_menu #address_postit")
            .click(addAddressPostit);

        $("#customer_menu #reservation_postit")
            .click(addReservationPostit);

        $("#customer_menu #customerNumber_postit")
            .click(addCumstomerNumbernPostit);

        $("#customer_menu #file_postit")
            .click(addFilePostit);
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

    //------------------------------------------- デフォルト付箋の追加
    var addDefaultPostit = function(evt){
        // show dialog
        dialog.show({
            name:"",
            fields:[
                {fieldName: "部屋番号", fieldType:"text", fieldValue:"", autoSize:false, background:DEFAULT_BACKGROUND},
                {fieldName: "電話番号", fieldType:"tel",  fieldValue:"", autoSize:false, background:DEFAULT_BACKGROUND},
                {fieldName: "メモ",     fieldType:"text", fieldValue:"", autoSize:false, background:DEFAULT_BACKGROUND}
            ]
        }, function(values) {
            //--- ok callback
            postits.push(new Postit(container, values, true));
        }, function(values) {
            //--- cancel callback
            // any nothing
        });
    };
    //------------------------------------------- 住所付箋の追加
    var addAddressPostit = function(evt){
        // show dialog
        dialog.show({
            name:"住所",
            fields:[
                {fieldName: "郵便番号", fieldType:"text", fieldValue:"", autoSize:false, background:DEFAULT_BACKGROUND},
                {fieldName: "住所",    fieldType:"text", fieldValue:"", autoSize:false, background:DEFAULT_BACKGROUND}
            ]
        }, function(values) {
            //--- ok callback
            postits.push(new Postit(container, values, true));
        }, function(values) {
            //--- cancel callback
            // any nothing
        });
    };
    //------------------------------------------- 予約・宿泊データ付箋の追加
    var addReservationPostit = function(evt){
        // show dialog
        dialog.show({
            name:"予約・宿泊データ付箋",
            fields:[
                {fieldName: "予約日",      fieldType:"text", fieldValue:"", autoSize:false, background:DEFAULT_BACKGROUND},
                {fieldName: "宿泊予定日",  fieldType:"text", fieldValue:"", autoSize:false, background:DEFAULT_BACKGROUND},
                {fieldName: "宿泊数",      fieldType:"text", fieldValue:"", autoSize:false, background:DEFAULT_BACKGROUND},
                {fieldName: "人数",        fieldType:"text", fieldValue:"", autoSize:false, background:DEFAULT_BACKGROUND},
                {fieldName: "部屋番号",    fieldType:"text", fieldValue:"", autoSize:false, background:DEFAULT_BACKGROUND},
                {fieldName: "担当者",      fieldType:"text", fieldValue:"", autoSize:false, background:DEFAULT_BACKGROUND},
                {fieldName: "各種メモ",    fieldType:"text", fieldValue:"", autoSize:false, background:DEFAULT_BACKGROUND}
            ]
        }, function(values) {
            postits.push(new Postit(container, values, true));
        });
    };
    //------------------------------------------- 予約・宿泊データ付箋の追加
    var addCumstomerNumbernPostit = function(evt){
        // show dialog
        dialog.show({
            name:"顧客番号",
            fields:[
                {fieldName: "顧客番号", fieldType:"text", fieldValue:"", autoSize:false, background:DEFAULT_BACKGROUND}
            ]
        }, function(values) {
            postits.push(new Postit(container, values, true));
        });
    };
    //------------------------------------------- ファイル添付の追加
    var addFilePostit = function(evt){
        // show file dialog
        fileDialog.show({
            name:"ファイル添付用",
            fields:[
                {fieldName: "file_postit", fieldType:"text", fieldValue:"", fileType: "", fileInfo: ""}
            ]
        }, function (values) {
            // Save Upload File Success Callback
            postits.push(new Postit(container, values, true));
        }, function (values) {
            // Save Upload File Failed Callback
            console.log('Save File Upload Failed');
        })
    };
    //------------------------------------------- On Save Clicked
    var onSaveClicked = function(evt){
        var check = true, validation = true;
        new_customer_name = $('#customer_name').val();
        new_pronounce_name = $('#customer_name_pronounce').val();

        if(new_customer_name == '' || new_pronounce_name == '') {
            validation = false
            $('#validation_click').click();
            return;
        }
        var datas = postits.map(function(postit){
            check &= postit.checkValue();
            return postit.getValue();
        });
        
        Object(datas).forEach(function (val) {
            Object(val.fields).forEach(function (val) {
                if(val.fieldName == '電話番号' && validation == true) {
                    if(!checkPhoneValidation(val.fieldValue)) {
                        validation = false
                        alert('Phone number is not valid')
                        return;
                    }
                }
                if(val.fieldName == '郵便番号' && validation == true) {
                    if(!checkEmailValidation(val.fieldValue)) {
                        validation = false
                        alert('Mail address is not valid')
                        return;
                    }
                }

                if((val.fieldName == '予約日' || val.fieldName == '宿泊予定日') && validation == true) {
                    if(!checkDateValidation(val.fieldValue)) {
                        validation = false
                        alert('Date format is not valid')
                        return;
                    }
                }

            })
        })

        // ------------------Set up POST save data with name and pronounce


        var save_datas = {};
        save_datas.customer_name = new_customer_name;
        save_datas.pronounce = new_pronounce_name;
        save_datas.page_number = 1;
        save_datas.postit = datas;

        if(check && validation){
            
            //alert("Check Ok!, Please integrate the save logic");
            $.ajax("/customer/api/savecustomer", {
                method: "POST",
                data: save_datas
            }).success(function (res) {
                //Success Save API and Init Postit Tags
                postits = [];
                $('.tag-postit').remove();
                $('#customer_name').val('');
                $('#customer_name_pronounce').val('');

                // Increase page number
                $('#customer_pagenum').text(++ page_number);
            })

        }
    }
    //------------------------------------------- run initialize
    init();
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            Postit Add Dialog Class
// DATA MODEL EX:
// value = {
//      name:"住所",
//      fields:[
//          {fieldName: "郵便番号", fieldType:"text", fieldValue:"xxxx", autoSize:false, background:"#xxx"},
//          {fieldName: "住所",    fieldType:"text", fieldValue:"xxxx", autoSize:false, background:"#xxx"}
//      ]
// }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var PostitDialog = Class.extend(function(){
    var me = this;
    var dialogView, titleView, listView;
    var okHandler, cancelHandler;
    var value = {};

    //------------------------------------------------- constructor
    this.constructor = function(view){
        me.super.constructor();

        dialogView = view;
        titleView = view.find(".modal-title");
        listView = view.find(".item-list");

        dialogView.find(".save_btn").click(function(){
            me.hide();
            if(okHandler)okHandler(value);
        });
        dialogView.find(".cancel_btn").click(function(){
            me.hide();
            if(cancelHandler)cancelHandler(value);
        });
    };
    //------------------------------------------------- show
    this.show = function(defaultValue, _okHandler, _cancelHandler){

        value = defaultValue;
        okHandler = _okHandler;
        cancelHandler = _cancelHandler;

        titleView.html(value.name);
        listView.empty();
        for(var i=0; i<value.fields.length; i++){
            var field = value.fields[i];

            var obj = $(fieldTemplete.replaceValues({
                id          : i,
                fieldName   : field.fieldName,
                checked     : field.autoSize ? 'checked' : '',
                background  : field.background
            }));
            obj.find('.field-type').val(field.fieldType);

            obj.find('.autosize-checkbox').bind('change', onAutoSizeChanged);
            obj.find('.background-color' ).bind('change', onBackColorChanged);

            listView.append(obj);
        }

        dialogView.modal("show");
    };
    //------------------------------------------------- hide
    this.hide = function(){
        dialogView.modal('hide');
    };
    //------------------------------------------------- Change auto-resize checkbox
    var onAutoSizeChanged = function(evt){
        var id = $(this).closest('.field-row').attr("index");
        value.fields[id].autoSize = $(this).is(":checked");
    };
    //------------------------------------------------- Change background color
    var onBackColorChanged = function(evt){
        var id = $(this).closest('.field-row').attr("index");
        value.fields[id].background = $(this).val();
    };
    //------------------------------------------------- HTML Templete
    var fieldTemplete =
        '<div class="field-row col-xs-12" index="{{id}}">' +

        '   <span class="field-name col-xs-3 text-info">{{fieldName}}</span>' +

        '   <select class="field-type col-xs-3 text-info">' +
        '       <option value="text">フリーメモ</option>' +
        '       <option value="tel">TEL</option>' +
        '       <option value="email">Email</option>' +
        '   </select>' +

        '   <div class="col-xs-3">' +
        '       <input type="checkbox" class="autosize-checkbox" {{checked}} />' +
        '   </div>' +

        '   <input type="color" class="background-color col-xs-3" value="{{background}}"/>' +

        '</div>';
});

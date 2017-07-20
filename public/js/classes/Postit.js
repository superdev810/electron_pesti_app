////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            Postit Editor Class
// DATA MODEL
// value = {
//      name:"住所",
//      fields:[
//          {fieldName: "郵便番号", fieldType:"text", fieldValue:"xxxx", autoSize:false, background:"#xxx"},
//          {fieldName: "住所",    fieldType:"text", fieldValue:"xxxx", autoSize:false, background:"#xxx"}
//      ]
// }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var Postit = Class.extend(function(){
    var me = this;
    var parent, contentView, fieldsListView;
    var value = {};
    var fieldViews = [];
    var editMode = false;
    //------------------------------------------------- constructor
    this.constructor = function(parentObj, val, mode){
        me.super.constructor();

        parent = parentObj;
        value = val;
        editMode = mode;

        create();
    };
    //------------------------------------------------- Create view
    var create = function(parentObj){

        contentView = $(contnetTemplete.replaceValues(value));
        parent.append(contentView);
        fieldsListView = contentView.find(".fields");

        if(value.fields){
            fieldViews = value.fields.map(function(field){
               return new PostitField(fieldsListView, field, editMode);
            });
        }
    };
    //------------------------------------------------- Get Value
    this.getValue = function(){
        return value;
    };
    //------------------------------------------------- Check Value
    this.checkValue = function(){
        var result = true;
        fieldViews.forEach(function(fieldView){
            result &= fieldView.checkValue();
        });
        return result;
    }
    //------------------------------------------------- HTML Templetes
    var contnetTemplete =
        '<div class="tag tag-postit">' +
        '   <div class="tag-name">{{name}}</div>'+
        '   <div class="fields"></div>'+
        '</div>';
});

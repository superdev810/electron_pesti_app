////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            Postit Field Class
// DATA MODEL
// value = {
//      fieldName   : "郵便番号",
//      fieldType   : "text",
//      fieldValue  : "xxxx",
//      autoSize    : "true/false",
//      background  : "#xxx"
// }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var PostitField = Class.extend(function(){
    var me = this;
    var parent, contentView, valueView;
    var value;
    var editMode = false;
    //------------------------------------------------- Constructor
    this.constructor = function(parentObj, val, mode){
        me.super.constructor();

        parent = parentObj;
        value = val;
        editMode = mode;

        create();
    };

    //------------------------------------------------- Create view
    var create = function(){
        console.log('Post Field-------');
        console.log(value);
        if(value.fileType != undefined){
            if(value.fileType == 'image'){
                console.log('Image Post Field');
                console.log(value);
                contentView = $(imageUploadTemplate.replaceValues(value))
            }else{
                console.log('Post Field File-------');
                contentView = $(fileUploadTemplate.replaceValues(value))
            }
        }else{
            console.log('Post Field Default-------');
            contentView = $(contnetTemplete.replaceValues(value));
            contentView.css({
                background: value.background
            });

            valueView = contentView.find('.field-value');
            valueView.attr({
                "contenteditable": editMode,
            }).css({
                width: value.autoSize ? "auto" : "285px"
            });
            valueView.bind('blur keyup paste cut', onChangeValue);

            contentView.find(".voice-btn").click(onVoiceClicked);
        }

        parent.append(contentView);
    };
    //------------------------------------------------- change value event
    var onChangeValue = function(evt){
        value.fieldValue = $(this).text();
    };
    //------------------------------------------------- Check Value
    this.checkValue = function(){
        var val = value.fieldValue = value.fieldValue || '';
        if(value.fileType != undefined)
            return true;
        var result = true;
        if(val == '') result = false;

        // to do check fieldType
        if( ( value.fieldType == 'Email' && !val.isEmailType() ) ||
            ( value.fieldType == 'Date' && !val.isDateType() ) ||
            ( value.fieldType == 'TEL' && !val.isPhoneType() ) )
        {
            result = false;
        }

        if(result == false){
            valueView.addClass("warning");
        }else{
            valueView.removeClass("warning");
        }
        return result;
    };
    //------------------------------------------------- Voice Recognition
    var onVoiceClicked = function(){
        // to do voice recognition
    };
    //------------------------------------------------- HTML Templetes
    var contnetTemplete =
        '<div class="field">' +
        '   <span class="field-name">{{fieldName}}</span>' +
        '   <div class="field-value">{{fieldValue}}</div>' +
        '   <div class="btn voice-btn"><i class="fa fa-microphone"></i></div>' +
        '</div>' +
        '<div class="clearfix">';

    var fileUploadTemplate =
        '<div class="field">' +
        '       <a href="{{fileInfo}}">{{fieldValue}}</a>' +
        '       <input id="filetype" type="hidden"  value="{{fileType}}"/>' +
        '       <input id="fileinfo" type="hidden"  value="{{fileInfo}}"/>' +
        '       <input id="filename" type="hidden"  value="{{fieldValue}}"/>' +
        '</div>' +
        '<div class="clearfix">';

    var imageUploadTemplate =
        '<div class="field">' +
        '    <img class="file-image" src="{{fileInfo}}"/>' +
        '    <input id="filetype" type="hidden"  value="{{fileType}}"/>' +
        '    <input id="fileinfo" type="hidden"  value="{{fileInfo}}"/>' +
        '</div>' +
        '<div class="clearfix">';
});


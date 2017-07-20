////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                            Postit Add File Dialog Class
// DATA MODEL EX:
// value = {
//
// }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var PostitFileDialog = Class.extend(function(){
    var me = this;
    var container, dialogView, titleView, dropZone, clickHere, fileUpload;
    var okHandler, cancelHandler;
    var value = {};
    var isCanUpload = true;
    var host_name;
    //------------------------------------------------- constructor
    this.constructor = function(view){
        me.super.constructor();

        dialogView = view;
        container = $('.extend-tags-area');
        titleView = view.find(".modal-title");
        dropZone = view.find("#drop-zone");
        clickHere = view.find('#click-here');
        fileUpload = view.find('#file-upload');

        //Initialize File Dialog and Add Event Listener
        me.getHostName();
        clickHere.find('span').text('Drag and drop file on this panel');

        console.log('File Upload Change');
        fileUpload.bind('change', onFileUploadChanged);


        // Save and Cancel Function Event
        dialogView.find("#save_file_btn").click(function(){
            console.log('Save');
            me.saveFileUpload();
            me.hide();

        });
        dialogView.find("#cancel_file_btn").click(function(){
            me.hide();
            if(cancelHandler)cancelHandler(value);
        });
    };
    //------------------------------------------------- show
    this.show = function(defaultValue, _okHandler, _cancelHandler){

        value = defaultValue;
        okHandler = _okHandler;
        cancelHandler = _cancelHandler;
        if(clickHere.find('input').length == 0) {
            console.log('Empty Input');
            clickHere.append(fileUploadTemplate)
            fileUpload = dialogView.find('#file-upload');
            fileUpload.bind('change', onFileUploadChanged);
        }
        dialogView.modal("show");
    };
    //------------------------------------------------- hide
    this.hide = function(){
        dialogView.modal('hide');
    };
    //------------------------------------------------- Get Host Name Method -------------------------------------------
    this.getHostName = function () {
        $.ajax("/expand/api/getexpandision", {
            method: "GET"
        }).success(function (res) {
            host_name = res.hostname
        })
    }
    //------------------------------------------------- Save Upload Method ---------------------------------------------
    this.saveFileUpload = function () {
        if(!isCanUpload) {
            alert("file Size is larger than 10MB or it is not file")
        } else {
            console.log('Save File Upload');
            console.log(fileUpload);
            fileUpload.fileupload(
                {
                    dataType: 'json',
                    autoUpload: false,
                    fail: onFileUploadFail,
                    done: onFileUploadDone
                }).fileupload("send", {files: fileUpload[0].files, url: "/customer/api/fileupload"});
            fileUpload.remove();
        }
    }
    
    //------------------------------------------------- File Upload Done CallBack --------------------------------------
    var onFileUploadDone = function (e, data) {
        var filePath = data.result.files[0].url.replace("http://" + host_name, "");
        if (data.files[0].type.substr(0, 5) == 'image') {
            value.fields[0].fieldValue = data.result.files[0].url;
            value.fields[0].fileType = 'image';
            value.fields[0].fileInfo = filePath;
        } else {
            nowDate = new Date()

            var year = nowDate.getFullYear()
            var month = nowDate.getMonth() + 1
            var day = nowDate.getDate()
            var curr_date = month + '/' + day + '/' + year

            var hour = nowDate.getHours()
            var minutes = nowDate.getMinutes()
            var second = nowDate.getSeconds()
            var curr_time = hour + ':' + minutes + ':' + second

            value.fields[0].fieldValue = data.result.files[0].name + ' ' + curr_date + ' ' + curr_time;
            value.fields[0].fileType = 'file';
            value.fields[0].fileInfo = filePath;
        }
        if(okHandler)okHandler(value);
    };
    //------------------------------------------------- File Upload Fail CallBack --------------------------------------
    var onFileUploadFail = function (e, data) {
        
    };
    //------------------------------------------------- Change File Upload ---------------------------------------------
    var onFileUploadChanged = function(evt){
        var files = $(this)[0].files
        console.log(files);
        if(files == undefined)
            return false;
        clickHere.find('span').text(files[0].name);
        if(files[0].size > 1024 * 1024 * 10) {
            isCanUpload = false
        } else {
            isCanUpload = true
        }
    };

    //------------------------------------------------- HTML Templete
    var fileUploadTemplate = '<input type="file" name="files" id="file-upload" data-url="/customer/api/fileupload"/>';
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                              Utilities
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//--------------------------------------------------------------------- Check Email Validation
function checkEmailValidation(mail) {
    var pattern = /^([a-zA-Z][a-zA-Z0-9]*)(\.[a-zA-Z][a-zA-Z0-9]*)*@([a-zA-Z][a-zA-Z]*)(\.[a-zA-Z][a-zA-Z]*)*$/;
    return pattern.test(mail);
}
String.prototype.isEmailType = function(){
    return checkEmailValidation(this);
}

//--------------------------------------------------------------------- Check Date Validation
function checkDateValidation(dateStr) {
    var pattern = /^([0-9]*[/][0-9]*[/][0-9]*)$/;
    return pattern.test(dateStr);
}
String.prototype.isDateType = function(){
    return checkDateValidation(this);
}

//--------------------------------------------------------------------- Check Phone Validation
function checkPhoneValidation(phoneStr) {
    var pattern = /^(([0-9][-]*)*[0-9])$/;
    return pattern.test(phoneStr );
}
String.prototype.isPhoneType = function(){
    return checkPhoneValidation(this);
}
//--------------------------------------------------------------------- Replace All
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

//--------------------------------------------------------------------- Replace HTML Templete Values
String.prototype.replaceValues = function(values) {
    var target = this;
    Object.keys(values).forEach(function(key){
        target = target.replace(new RegExp('{{'+key+'}}', 'g'), values[key]);
    });
    return target;
};
//--------------------------------------------------------------------- Check Number Validation
function checkNumberValidation(numberStr) {
    var pattern = /^(([0-9]+)*)$/;
    return pattern.test(numberStr );
}
String.prototype.isNumberType = function(){
    return checkNumberValidation(this);
}

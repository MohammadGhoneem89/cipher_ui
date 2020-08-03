/**
 * Created by bilal.mahroof on 8/21/2017.
 */


var isValidValue= function (e) {

    var regex;
    var val = $('#' + e).val();
    console.log(val);

    switch (e) {
        case "firstName":
            regex = /[a-zA-Z/]{1,50}$/;
            break;
        case "lastName":
            regex = /[a-zA-Z/]{1,50}$/;
            break;
        case "gender":
            regex = /[a-zA-Z/]{1,50}$/;
            break;
        case "phoneNumber":
            regex = /[0-9-]{1,6}$/;
            break;
        case "nic":
            regex = /\b\d{5}[-]?\d{7}[-]?\d{1}\b/;
            break;
        case "designation":
            regex = /[a-zA-Z/]{1,100}$/;
            break;
        case "desiredName":
            regex = /^[a-zA-Z][a-zA-Z0-9._$!-*]{1,30}/;
            break;
        case "password":
            regex = /^[a-zA-Z][a-zA-Z0-9._$!-*]{1,30}/;
            break;
        case "status":
            regex = /[a-zA-Z/]{1,50}$/;
            break;
        case "email":
            regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            break;
        case "userTypeCode":
            regex = /[0-9-]{1,6}$/;
            break;
        case "title":
            regex = /[a-zA-Z/]{1,50}$/;
            break;
        case "url":
            regex = /[a-zA-Z/]{1,50}$/;
            break;
        case "message":
            regex = /[a-zA-Z/]{1,50}$/;
            break;
        case "description":
            regex = /[a-zA-Z/]{1,50}$/;
            break;
        case "contactName":
            regex = /[a-zA-Z/]{1,50}$/;
            break;
        case "contactValue":
            regex = /[a-zA-Z/]{1,50}$/;
            break;
        case "subject":
            regex = /[a-zA-Z/]{1,50}$/;
            break;
        case "question":
            regex = /[a-zA-Z/]{1,50}$/;
            break;
        case "answer":
            regex = /[a-zA-Z/]{1,50}$/;
            break;
        case "name":
            regex = /[a-zA-Z/]{1,50}$/;
            break;
        case "roles":
            regex = /[a-zA-Z/]{1,50}$/;
            break;

        default:
            regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            break;
    }
    console.log(regex);
    return regex.test(val);

}
var maxTitleLenght=50;
var maxDescriptionLenght=200;
var maxUrlLenght=200;

exports.isValidValue;
exports.maxTitleLenght;
exports.maxDescriptionLenght;
exports.maxUrlLenght;


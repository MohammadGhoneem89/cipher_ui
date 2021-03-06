/*global constants import*/
import * as arabic from '../constants/appARResources.js';
import * as resEnglish from '../constants/appENResources.js';
import * as gridColumns from '../constants/appGridColumns';
// import * as cresEnglish from '../constants/componentResources_EN.js';
// import * as cresArabic from '../constants/componentResources_AR.js';
import moment from 'moment'
import _ from 'lodash';

let lang = sessionStorage.lang;

let resArabic = Object.assign({}, resEnglish, arabic);
export function getClassForStatusLabel(type) {
  switch (type) {
    case "INITIATED":
      return "label label-info";
    case "REJECTED":
      return "label label-danger";
    case "Pending":
      return "label label-warning";
    case "PENDING":
      return "label label-warning";
    case "CORRECTED":
      return " label label-success";
    case "CORRECT":
      return "label label-success";
    case "ACCEPTED":
      return "label label-primary";
    case "PROBLEM":
      return "label label-danger";
    default:
      return "label label-success";
  }
}
export function getLabelByID(labelId) {
  let retValue;
  switch (lang) {

    case "EN": {
      retValue = resEnglish[labelId];
      retValue = retValue ? retValue : labelId;
    }
      break;
    case "AR": {
      retValue = resArabic[labelId];
      retValue = retValue ? retValue : labelId;
    }
      break;
    default: retValue = labelId;
      break;
  }

  return retValue;
}

export function getLabelForLang(option) {
  let retValue;
  switch (lang) {

    case "EN": {
      retValue = option.label;
      retValue = retValue ? retValue : '-';
    }
      break;
    case "AR": {
      retValue = option.labelAR;
      retValue = retValue ? retValue : '-';
    }
      break;
    default: retValue = '-';
      break;
  }

  return retValue;
}

export function getConfirmUserName() {
  let retValue;
  switch (lang) {

    case "EN": {
      retValue = "Not " + sessionStorage.firstName + " ?";
    }
      break;
    case "AR": {
      retValue = " ? Not " + sessionStorage.firstName;
    }
      break;
    default: retValue = '-';
      break;
  }

  return retValue;
}

export function getButtonLabelByID(labelId) {
  let retValue;
  switch (lang) {
    // case "EN": retValue= _.get(cresEnglish, `buttons[${labelId}].displayText`, labelId);
    // break;
    // case "AR":  retValue= _.get(cresArabic, `buttons[${labelId}].displayText`, labelId);
    // break;
    default: retValue = labelId;
      break;
  }

  return retValue;
}

export function getButtonClassByID(labelId) {
  let retValue
  try {
    switch (lang) {
      case "EN": retValue = cresEnglish.buttons[labelId].displayClass;
        break;
      case "AR": retValue = cresEnglish.buttons[labelId].displayClass;
        break;
      default: retValue = labelId;
        break;
    }

  } catch (exp) {
    retValue = labelId;
  }
  return retValue;
}

export function setLang(lng) {
  lang = lng;

}

export function getGridColumnByName(gridName) {
  return gridColumns[gridName];

}
export function CreateGuid() {
  function _p8(s) {
    var p = (Math.random().toString(16) + "000000000").substr(2, 8);
    return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
  }
  return _p8() + _p8(true) + _p8(true) + _p8();
}

export function formatAmountField(val) {

  let negativeAmount = false;
  if (val.toString().indexOf('(') > -1) {
    negativeAmount = true;
    val = val.replace('(', '');
    val = val.replace(')', '');

  }

  let nStr = parseFloat(val).toFixed(2);
  var x = nStr.split('.');
  var x1 = x[0];
  var x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  let retVal = x1 + x2;
  if (negativeAmount)
    retVal = '(' + retVal + ')'
  return retVal;
}
export function UNIXConvertToDate(UNIXTS) {
  if (!UNIXTS || UNIXTS == 0)
    return "";
  return moment.unix(UNIXTS / 1000).format('DD/MM/YYYY')

}


export function getDatesDiff(fromDate, toDate) {
  var date1 = new Date(fromDate.replace('/', '-'));
  var date2 = new Date(toDate.replace('/', '-'));
  var diffDays = parseInt((date2 - date1) / (1000 * 60 * 60 * 24));
  return diffDays;
}


export function padding_left(s, c, n) {
  if (!s || !c || s.length >= n) {
    return s;
  }
  var max = (n - s.length) / c.length;
  for (var i = 0; i < max; i++) {
    s = c + s;
  }
  return s;
}


export function padding_right(s, c, n) {
  if (!s || !c || s.length >= n) {
    return s;
  }
  var max = (n - s.length) / c.length;
  for (var i = 0; i < max; i++) {
    s += c;
  }
  return s;
}


let _ = require('lodash')
module.exports = function (path, value) {
    let td = {
        declarationType,
        regimeType,
        transportMode
    }
    return _.get(td, `${path}.${value}`, "Not Available")
}


let regimeType = {
    1: "Import",
    2: "Export",
    3: "Transit",
    4: "Temporary Admission",
    5: "Transfer",

}
let declarationType = {
    101: "Import to Local from ROW",
    102: "Import to Local from FZ",
    103: "Import to Local from CW",
    104: "Import to Local from GCC (statistical Import)",
    105: "Import for Re Export to Local from ROW",
    106: "Import for Re Export to Local from FZ",
    107: "Import for Re Export to Local from CW",
    108: "Import to CW from ROW",
    109: "Import to CW from FZ",
    111: "Import to CW from Local (after temporary admission)",
    114: "Courier Import",
    116: "Import to Local After Temporary Admission",
    123: "Currency Import",
    201: "Export from Local to ROW",
    202: "Export from Local to FZ",
    203: "Export from Local to GCC (statistical export)",
    204: "Temporary Export from Local to ROW",
    205: "Temporary Export from Local to FZ",
    206: "Export from CW to ROW",
    207: "Export from CW to FZ",
    208: "Re Export to ROW (after import for re export)",
    209: "Re Export to FZ (after Import for Re Export)",
    210: "Return to FZ after Temporary Admission",
    211: "Return to ROW after Temporary Admission",
    214: "Courier Export",
    216: "Currency Export",
    301: "Transit  (ROW to ROW) ",
    302: "FZ Transit In",
    303: "FZ Transit Out",
    305: "FZ Transit In from GCC and other Emirates FZ and GCC Local Market",
    306: "FZ Transit between Dubai based FZ",
    307: "Courier Transit",
    401: "Temporary Admission from ROW to Local",
    402: "Temporary Admission from FZ to Local",
    403: "Temporary Admission from CW to Local",
    501: "Transfer of Cargo between Dubai based CW",
    502: "Transfer within a FZ",
    504: "GCFT LV",
    505: "GCFT HV",

}

let transportMode = {
    1: "Air",
    2: "Sea",
    3: "Land",
    4: "Courier",
    5: "Postal",
    6: "Coastal",
    7: "Courier Land",
    8: "Courier Air",
    9: "Passenger"

}
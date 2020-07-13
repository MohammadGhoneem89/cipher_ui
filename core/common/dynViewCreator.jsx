/*standard imports*/
import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions/generalAction";
import * as constants from "../constants/Communication";
import Table from "../common/Datatable.jsx"
import * as utils from '../common/utils.js';
import * as gen from '../common/generalActionHandler';
import Portlet from '../common/Portlet.jsx';
import ModalBox from '../common/ModalBox.jsx';
import { browserHistory } from 'react-router';
import * as coreConstants from '../constants/Communication';
import * as requestCreator from '../common/request';
import backOffices from '../../applications/backOffices';
let baseUrl = backOffices.baseUrl;


/* constant functions to return views */
/* header view in case of mismatch */
const headerMisMatch = () => {
    return (
        <div className="form-group">
            <div className="row">

                <div className="col-md-6 text-center Ocrheading">
                    <label><storng className="mis-match-panel-head-missmatch" >CSV</storng></label>
                </div>
                <div className="col-md-6 text-center Ocrheading">
                    <label><storng className="mis-match-panel-head-missmatch"> OCR </storng></label>
                </div>
            </div>
        </div>)
}
/* header view in case of OCR */
const headerOCR = () => {
    return (
        <div className="form-group">
            <div className="row">
                <div className="col-md-12 text-center Ocrheading">
                    <label><storng className="mis-match-panel-head-missmatch" >OCR</storng></label>
                </div>
            </div>
        </div>)
}
/* table view in case of array */
const tableView = (gridColumns, gridData, actionHandler) => {
    return (
        <Table
            marginTop={true}
            gridColumns={gridColumns}
            gridData={gridData}
            pagination={false}
            componentFunction={actionHandler}
        />
    )
}
/* view to show equal views of different object same key having different values */
const bothNotValues = (name, mapping, trailKey, fieldType, onChangeValue, type) => {
    return (
        <div className="form-group">
            <div className="row">
                <div className="col-md-4">
                    <label><storng className="mis-match-panel-title" >{name}</storng></label>
                </div>

                <div className="col-md-8">
                    <input type={type} onChange={(e) => onChangeValue(trailKey, mapping, e.target.value)} className="form-control mis-match-input" name="name" />
                </div>
            </div>
        </div>
    )
}

/* view to show to views of different object both have to key or values  */
const bothNotEqual = (name, val_1, val_2, mapping, trailKey, fieldType, onChangeValue, type) => {
    return (
        <div className="form-group">
            <div className="row">
                <fieldset id={mapping}>

                    <div className="col-md-4">
                        <label className="mis-match-panel-title"><storng>{name}</storng></label>
                    </div>
                    <div className="col-md-1">
                        <div className="icheck-list">
                            <label className="mt-checkbox mt-checkbox-outline mis-match-input">
                                <label />
                                <input type="radio" name={mapping} onClick={(e) => onChangeValue(trailKey, mapping, val_1, fieldType)} defaultValue className="form-control mis-match-input" /><span /></label>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <input type={type} className="form-control mis-match-input" name="name" id="name" value={val_1} />
                    </div>
                    <div className="col-md-1 text-right">
                        <div className="icheck-list">
                            <label className="mt-checkbox mt-checkbox-outline mis-match-input">
                                <label />
                                <input type="radio" name={mapping} onClick={(e) => onChangeValue(trailKey, mapping, val_2, fieldType)} defaultValue className="form-control mis-match-input" /><span /></label>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <input type={type} className="form-control mis-match-input" name="name" id="name" value={val_2} />
                    </div>
                </fieldset>
            </div>
        </div>
    )
}

/* view to show equal values of different object */
const bothEquals = (name, val_1, val_2) => {
    return (
        <div className="form-group">
            <div className="row">
                <div className="col-md-5">
                    <label><storng className="mis-match-panel-title">{name} : </storng></label>
                </div>
                <div className="col-md-4">
                    <label><storng> {val_1} </storng></label>
                </div>
                <div className="col-md-3">
                    <label><storng> {val_2} </storng></label>
                </div>
            </div>
        </div>
    )
}

/* view to show only electronic object value to show */
const onlyElectronic = (name, value, mapping, trailKey, fieldType, onChangeValue, type) => {
    return (
        <div className="form-group">
            <div className="row">
                <div className="col-md-4">
                    <label><storng className="mis-match-panel-title" >{name}</storng></label>
                </div>

                <div className="col-md-8">
                    <input type={type} defaultValue={value} onChange={(e) => onChangeValue(trailKey, mapping, e.target.value, fieldType)} className="form-control mis-match-input" name="name" />
                </div>
            </div>
        </div>
    )
}

/* view to show only OCR object value */
const onlyOcr = (name, value, mapping, trailKey, fieldType, onChangeValue, type, typeData, typeDataArray) => {
    let selectView = [];

    console.log(typeData , typeDataArray);

    if (typeData) {
        if (typeDataArray) {
            selectView = typeDataArray.map(view => {

                if (view.value == value) {
                    return <option value={view.value} selected > {view.label} </option>
                } else {
                    return <option value={view.value}> {view.label} </option>
                }
            })
            selectView.unshift(<option value="">Choose Any Option</option>);
        }
    }

    if (type == 'decimal') {
        type = 'number';
    }

    return (
        <div className="form-group">
            <div className="row">
                <div className="col-md-4">
                    <label><storng className="mis-match-panel-title" >{name}</storng></label>
                </div>
                {
                    typeData ?
                        <div className="col-md-8">
                            <select onChange={(e) => onChangeValue(trailKey, mapping, e.target.value, fieldType)} style={{ borderColor: '#719e19', borderRadius: '5px', padding: '4px 12px 6px', fontSize: '14px', width: '100%' }}>
                                {
                                    selectView.map(obj => {
                                        return obj
                                    })
                                }
                            </select>
                        </div>
                        :
                        <div className="col-md-8">
                            <input type={type} defaultValue={value} onChange={(e) => onChangeValue(trailKey, mapping, e.target.value, fieldType)} className="form-control mis-match-input" />
                        </div>
                }
            </div>
        </div>
    )
}


/* Dynamic View Creator Component */
class DynamicViewCreator extends React.Component {
    constructor(props, context) {
        super(props, context);

        /* This State */
        this.state = {
            showImage: true,
            isLoading: false,
            /* sectionView: the data to render on screen */
            sectionView: [],
            /* fields: is an array of object containing the name, type, section */
            fields: [],
            /* sections: array that render as a tab */
            sections: [],
            /* object_1 and object_2: the data need to be compare in case of comparison:false only object_1 is used */
            object_1: null,
            object_2: null,
            /* comparison: check if need to show mismatch case or show only values */
            comparison: false,
            /* activeTable: is to show the active tab */
            activeTable: 0,
            /* isOpen: toggle modal */
            isOpen: false,
            /* tableData to show array data */
            tableData: [],
            /* table data that needs to be edit */
            tableObjectData: [],
            /* data that is edited on table need to show on modal */
            modalView: [],
            // customTabs: contain name, view and position to view the data
            customTabs: [],
            // contains the missMatchCount for each tabs
            missMatchCount: [],
            finalCorrectedData: [{}],
            formData: {},
            tableIndex: 0,
            batchNo: "",
            mappedData: null,
            mismatchFields: [],
            fileHash : null,
            invoiceImagesNamesList: [],
            invoiceImageIndex : 0,
            customTabsMapped: 0
        }
        this.generalHandler = gen.generalHandler.bind(this);
        this.actionHandler = this.actionHandler.bind(this);
        this.onChangeValue = this.onChangeValue.bind(this);
        this.generalHandler = gen.generalHandler.bind(this);
    }



    /* Life cycle hooks */
    /* 
    @params
        nextProps: {
          @params  fields : array
          @params  sections : array
          @params  object_1 : object
          @params  object_2 : object
          @params  comparison boolean
        }
    */
    componentWillReceiveProps(nextProps) {
        let {
            fields = [],
            sections = [],
            object_1 = null,
            object_2 = null,
            comparison = false,
            customTabs = [],
            submitType = false,
            batchNo = "",
            invoiceNo = "",
            UTCRefNo = "",
            invoiceLength = 0,
            sliderIndex = 0,
            typeData = {},
            mismatchFields = [],
            fileHash = null,
            invoiceImagesNamesList = []
        } = nextProps;


        const shellowCopy = (data) => {
            return JSON.parse(JSON.stringify(data))
        }

        object_1 = shellowCopy(object_1);
        object_2 = shellowCopy(object_2);
        let sec = shellowCopy(sections);

        


        this.setState({
            fields,
            sections: sec,
            sectionView: [],
            object_1,
            object_2,
            comparison,
            customTabs,
            batchNo,
            invoiceNo,
            UTCRefNo,
            invoiceLength,
            sliderIndex,
            typeData,
            mismatchFields,
            fileHash,
            invoiceImageFile : '../../../assets/imgs/no-image-found.png',
            invoiceImagesNamesList,
        }, () => {
            this.createDynamicView()
            // this.downloadInvoiceImage()
        })
    }


    componentDidMount() {
        this.props.actions.generalProcess(coreConstants.getTypeData,
            requestCreator.createTypeDataRequest([
                'CURRENCY',
                'Country'
            ]));
    }




    /* createDynamicView: method called after state update to start creating the view */
   async createDynamicView() {
        let mappedArray = this.createMappingObject(this.state.sections, this.state.fields);
        let { object_1 = null, object_2 = null } = this.state;
        console.log("I am here" , object_1 );
        let mappedData = this.concatValueWithObject(mappedArray, this.state.comparison, object_1, object_2);
        let { mismatchCount, view } = this.iterateObject(mappedData);

        this.setState({
            sectionView: view,
            missMatchCount: mismatchCount,
            mappedData,
        }, () => {
            this.addCustomTabs();
        })
    }
   

    collapseImage(value) {
        if (value == true) {
            this.setState({
                showImage: !value,
            })
        } else if (value == false) {
            this.setState({
                showImage: !value
            })
        }
    }


    /* actionHandler : to perform action on edit table data and show on modal */
    actionHandler(data) {
        console.log("data in action handler " , data , this.state.tableData[index]);
        let { index } = data;
        let [firstObject = {}, secondObject = {}] = this.state.tableData[index];
        let { productLines: { subFields } } = this.state.tableObjectData;

        let keys = Object.keys(subFields);
        keys.map((obj, index) => {
            if(!this.state.object_1 && this.state.object_2){
                console.log("in here" , firstObject[obj]);
                subFields[obj].object_1Value = firstObject[obj];
                subFields[obj].object_2Value = firstObject[obj];
            }
            else if (this.state.comparison) {
                subFields[obj].object_1Value = firstObject[obj];
                subFields[obj].object_2Value = secondObject[obj];
            } else {
                if (firstObject[obj]) {
                    subFields[obj].object_1Value = firstObject[obj];
                }
            }
            return obj
        })
        console.log(subFields) ;
        let { dataView } = this.createView(subFields, [], [], 0, [], "array");
        this.setState({
            isOpen: true,
            modalView: dataView,
            tableIndex: index
        })
    }


    onChangeValue(trail, name, value, fieldType) {
        console.log(trail, name, value, fieldType, fieldType == 'array')
        let correctedData = [...this.state.finalCorrectedData]
        let exists = false, index = 0, object = false, array = false, tabnameE = null, tabnameO = null;
        let tabnameKey = ''
        if (fieldType == 'array') {
            tabnameKey = "productLines";
            let tabnameElec = _.get(this.state, `object_1[${tabnameKey}]`, null)
            let tabnameOcr = _.get(this.state, `object_2[${tabnameKey}]`, null)
            tabnameE = tabnameElec;
            tabnameO = tabnameOcr;
            array = true;
        }
        if (fieldType == 'object') {
            tabnameKey = trail[0];
            let tabnameElec = _.get(this.state, `object_1[${tabnameKey}]`, null)
            let tabnameOcr = _.get(this.state, `object_2[${tabnameKey}]`, null)
            tabnameE = tabnameElec;
            tabnameO = tabnameOcr;
            object = true;
        }
        if (correctedData.length) {
            for (let [indx, elem] of correctedData.entries()) {
                let tName = name
                if (array) {
                    tName = tabnameKey
                    if (elem["fieldName"] === tabnameKey && elem["index"] == this.state.tableIndex) {
                        index = indx
                        exists = true
                        break;
                    }
                } else {
                    if (object) {
                        tName = tabnameKey
                    }
                    if (elem["fieldName"] === tName) {
                        index = indx
                        exists = true
                        break;
                    }
                }
            }


            if (object) {
                if (!exists) {
                    let mappedObject = tabnameE || tabnameO
                    let keys = Object.keys(mappedObject);
                    if (keys && keys.length) {
                        for (let [i, t] of trail.entries()) {
                            if (i !== 0) {
                                let innerKeys = Object.keys(mappedObject[t])
                                if (innerKeys.includes(name)) {
                                    if (innerKeys && innerKeys.length && innerKeys.includes(name)) {
                                        mappedObject[t][name] = value
                                        break;
                                    }
                                }
                            } else {
                                if (keys.includes(name)) {
                                    mappedObject[name] = value
                                    break;
                                }
                            }
                        }
                    }
                    let tempObject = {
                        fieldName: tabnameKey,
                        value: { ...mappedObject }
                    }

                    correctedData.push(tempObject)
                } else {
                    let mappedObject = correctedData[index]["value"]
                    let keys = Object.keys(mappedObject);
                    if (keys && keys.length) {
                        for (let [i, t] of trail.entries()) {
                            if (i !== 0) {
                                let innerKeys = Object.keys(mappedObject[t])
                                if (innerKeys.includes(name)) {
                                    if (innerKeys && innerKeys.length && innerKeys.includes(name)) {
                                        mappedObject[t][name] = value
                                        break;
                                    }
                                }
                            } else {
                                if (keys.includes(name)) {
                                    mappedObject[name] = value
                                    break;
                                }
                            }
                        }
                    }

                    correctedData[index]["value"] = { ...mappedObject };
                }
            } else if (array) {
                if (!exists) {
                    if (tabnameE && tabnameE.length) {
                        let mappedObject = tabnameE && tabnameE.length ? tabnameE[this.state.tableIndex] : tabnameO[this.state.tableIndex]
                        mappedObject[name] = value;
                        let tempObject = {
                            fieldName: tabnameKey,
                            value: { ...mappedObject },
                            index: this.state.tableIndex,
                            type: "array"
                        }
                        correctedData.push(tempObject)
                    } else {
                        let mappedObject = tabnameO[this.state.tableIndex];
                        mappedObject[name] = value
                        let tempObject = {
                            fieldName: tabnameKey,
                            value: mappedObject,
                            index: this.state.tableIndex,
                            type: "array"
                        }
                        correctedData.push(tempObject)
                    }
                } else {
                    if (tabnameE && tabnameE.length) {
                        let mappedObject = correctedData[index]["value"];
                        mappedObject[name] = value;
                        correctedData[index]["value"] = { ...mappedObject };
                    } else {
                        let mappedObject = correctedData[index]["value"];
                        mappedObject[name] = value;
                        correctedData[index]["value"] = mappedObject
                    }
                }


            } else {
                if (!exists) {
                    correctedData.push({
                        fieldName: name,
                        value
                    })
                } else {
                    correctedData[index]["value"] = value;
                }
            }

        } else {
            if (!object) {
                correctedData.push({
                    fieldName: name,
                    value
                })
            }
        }
        this.setState({
            finalCorrectedData: correctedData
        })
        console.log("correctedData", correctedData)
    }




    onSublmit = () => {
        let { object_1: electroniceData = null, batchNo = "", UTCRefNo = "", invoiceNo = "", sliderIndex = 0, invoiceLength = 0 } = { ...this.state };
        let { object_2: ocrData = null } = { ...this.state };
        // let correctData = [...this.state.finalCorrectedData];

        let correctData = JSON.parse(JSON.stringify(this.state.finalCorrectedData));

        let body = {
            batchNo,
            correctData: [{
                documentNo: invoiceNo,
                UTCRefNo: UTCRefNo,
                fieldsData: []
            }]
        }

        if (electroniceData && Object.keys(electroniceData).length) {
            correctData.splice(0, 1)
            body.correctData[0].fieldsData = correctData;
        } 
        
        else {
            console.log("ocr data before" , ocrData);
            if (ocrData) {
                let keys = Object.keys(ocrData)
                for (let [i, e] of correctData.entries()) {    
                    if (_.isArray(ocrData[e["fieldName"]])) {
                        ocrData[e["fieldName"]][e["index"]] = e["value"];
                    } else {
                    ocrData[e["fieldName"]] = e["value"]
                    }
                }

                console.log("ocr data after" , ocrData);

                for (let [index, elem] of keys.entries()) {
                    if (_.isArray(ocrData[elem])) {
                        ocrData[elem].map((e, ind) => {
                            body.correctData[0].fieldsData.push({
                                fieldName: elem,
                                index: ind,
                                value: e
                            })
                        })
                    }
                    else {
                        body.correctData[0].fieldsData.push({
                            fieldName: elem,
                            value: ocrData[elem]
                        })
                    }
                }
            }
        }


        console.log("body is here", body);
        this.validateRequest(body, invoiceLength , sliderIndex , batchNo);
    }



    validateRequest(body, invoiceLength , sliderIndex, batchNo) {
        // const { mismatchFields } = this.state;
        // let { correctData } = body;
        // let [data] = correctData;
        // let fieldsData = data.fieldsData;
        // for (const mmf of mismatchFields) {
        //     let check = fieldsData.find(obj => {
        //         if (mmf.fieldName == obj.fieldName) {
        //             return true;
        //         }
        //     })
        //     if (!check) {
        //         alert(`${mmf.fieldName} is required`);
        //     }
        // }
        this.sendRequest(body, invoiceLength , sliderIndex, batchNo);
    }

    sendRequest(body, invoiceLength , sliderIndex, batchNo) {

        console.log("mismatchFields", this.state.mismatchFields);
        console.log("body ", body);
        this.setState({
            isLoading: true
        })

        this.props.actions.generalAjxProcess(constants.resubmitDocument, {
            body
        }).then(res => {
            this.setState({
                isLoading: false
            })
            if (res.message && res.message.status === "OK") {
                // this.props.removeInvoice(sliderIndex)
                this.setState({
                    finalCorrectedData: [{}]
                })
                if (invoiceLength === sliderIndex) {
                    browserHistory.push(`/utc/batchDetail/${batchNo}`)
                } else {
                    this.props.sliderIncremental()
                }
            }
        });
    }





    /* Function to change the mapping fields to a proper object according to the section */
    createMappingObject(sections, fields) {
        const reducedObject = (array) => {
            return array.reduce((accumulator, currentValue) => {
                accumulator[`${currentValue.mapping}`] = { name: currentValue.name, mapping: currentValue.mapping, type: currentValue.type, typeData: currentValue.typeData, isRequired: currentValue.isRequired };
                const { subFields } = currentValue;
                if (subFields) {
                    accumulator[`${currentValue.mapping}`].subFields = reducedObject(subFields)
                    return accumulator;
                }
                return accumulator
            }, {})
        }

        let mappedArray = sections.map(sec => {
            return fields.reduce((accumulator, currentValue) => {
                const { section, subFields } = currentValue;
                if (section == sec.name) {
                    accumulator[`${currentValue.mapping}`] = { name: currentValue.name, mapping: currentValue.mapping, type: currentValue.type, typeData: currentValue.typeData, isRequired: currentValue.isRequired };
                    if (subFields) {
                        accumulator[`${currentValue.mapping}`].subFields = reducedObject(subFields)
                        return accumulator;
                    }
                    return accumulator;
                } else {
                    return accumulator
                }
            }, {})
        })
        console.log("mappedArray", mappedArray);
        return mappedArray;
    }

    /* Function to concat value with the object */
    concatValueWithObject(mappedArray, comparison = null, object_1 = {}, object_2 = {}) {
        let mappedData = mappedArray.map(f => {
            const mapAgain = (fields, object_1, object_2) => {
                let keys = Object.keys(fields);
                keys.map(key => {
                    if (comparison && object_2 !== null && object_1 !== null) {
                        if (fields[key].type == 'string' || fields[key].type == 'decimal' || fields[key].type == 'array') {
                            let defaultValue = null;
                            if (fields[key].type == 'decimal') {
                                defaultValue = 0;
                            }
                            const object_1Value = object_1[fields[key].mapping] ? object_1[fields[key].mapping] : defaultValue;
                            const object_2Value = object_2[fields[key].mapping] ? object_2[fields[key].mapping] : defaultValue;
                            fields[key] = { ...fields[key], object_1Value, object_2Value }
                        } else if (fields[key].type == 'object' || fields[key].type == 'Object' || fields[key].type == 'OBJECT') {
                            let obj_1 = object_1[fields[key].mapping] ? object_1[fields[key].mapping] : {};
                            let obj_2 = object_2[fields[key].mapping] ? object_2[fields[key].mapping] : {};
                            mapAgain(fields[key].subFields, obj_1, obj_2)
                        }
                    } else if (object_1 === null && object_2 !== null) {
                        if (fields[key].type == 'string' || fields[key].type == 'decimal' || fields[key].type == 'array') {
                            let defaultValue = null;
                            if (fields[key].type == 'decimal') {
                                defaultValue = 0;
                            }
                            console.log("ERROR in here" , defaultValue ,  fields[key].type , fields[key].mapping , object_2 );
                            const object_1Value = null;
                            const object_2Value = object_2[fields[key].mapping] ? object_2[fields[key].mapping] : defaultValue;
                            fields[key] = { ...fields[key], object_1Value, object_2Value }
                        } else if (fields[key].type == 'object' || fields[key].type == 'Object' || fields[key].type == 'OBJECT') {
                            let obj_2 = object_2[fields[key].mapping] ? object_2[fields[key].mapping] : {};
                            mapAgain(fields[key].subFields, null, obj_2)
                        }
                    }
                    else {
                        if (fields[key].type == 'string' || fields[key].type == 'decimal' || fields[key].type == 'array') {
                            let defaultValue = null;
                            if (fields[key].type == 'decimal') {
                                defaultValue = 0;
                            }
                            const object_1Value = object_1[fields[key].mapping] ? object_1[fields[key].mapping] : defaultValue;
                            fields[key] = { ...fields[key], object_1Value }
                        } else if (fields[key].type == 'object' || fields[key].type == 'Object' || fields[key].type == 'OBJECT') {
                            mapAgain(fields[key].subFields, object_1[fields[key].mapping])
                        }
                    }

                })
            }
            mapAgain(f, object_1, object_2)
            return f
        });
        if (mappedData.length) {
            return mappedData;
        } else {
            return [];
        }
    }



    /* comparisonView: push the view to dataView array in case of comparison  */
    comparisonView = (data, key, dataView, mismatchCounter, trailKey, fieldType) => {
        let val_1 = data[key].object_1Value;
        let val_2 = data[key].object_2Value;
        let name = data[key].name;
        let mapping = data[key].mapping;
        let type = data[key].type;
        let typeData = data[key].typeData ? data[key].typeData : null;
        let typeDataArray = this.state.typeData[typeData] ? this.state.typeData[typeData] : null;

        if (!this.state.object_1 && this.state.object_2) {
                mismatchCounter.push(1);
                dataView.push(onlyOcr(name, val_2, mapping, trailKey, fieldType, this.onChangeValue, type, typeData, typeDataArray));
        } 
        else {
            if ((!val_1 && !val_2) && (val_1 != 0 && val_2 != 0)) {
                mismatchCounter.push(1);
                dataView.push(bothNotValues(name, mapping, trailKey, fieldType, this.onChangeValue, type));
            }
            else if (val_1 == val_2) {
                dataView.push(bothEquals(name, val_1, val_2));
            }
            else if ((val_1 && !val_2) || (val_1 == 0 && !val_2)) {
                mismatchCounter.push(1);
                dataView.push(onlyElectronic(name, val_1, mapping, trailKey, fieldType, this.onChangeValue, type));
            }
            else if ((!val_1 && val_2) || (!val_1 && val_2 == 0)) {
                mismatchCounter.push(1);
                dataView.push(onlyOcr(name, val_2, mapping, trailKey, fieldType, this.onChangeValue, type, typeData, typeDataArray));
            }
            else if (val_1 != val_2) {
                mismatchCounter.push(1);
                dataView.push(bothNotEqual(name, val_1, val_2, mapping, trailKey, fieldType, this.onChangeValue, type));
            }
        }
    }


    /* showValueView: push the view to dataView in case of just values */
    showValueView = (data, key, dataView) => {
        let val_1 = data[key].object_1Value;
        let name = data[key].name;
        dataView.push(bothEquals(name, val_1, ''));
    }

    /* arrayView: prepare table data that needs to show from array */
    arrayView = (data, key, dataView, mismatchCounter) => {

            let subFieldsKeys = Object.keys(data[key].subFields);
            let gridColumns = subFieldsKeys.map(obj => {
                let { name, mapping } = data[key].subFields[obj];
                return { alias: `${name}`, key: `${mapping}`, type: "string" };
            })
            if (this.state.comparison && this.state.object_1) {
                gridColumns.push({ alias: "Status", key: "status", type: "statusLabel" })
            }
            gridColumns.push({ alias: "Action", key: "actions", type: "action" })
            let gridData = [];
            let tableData = [];
            let actions = [
                { label: "EDIT", iconName: "fa fa-pencil", actionType: "COMPONENT_FUNCTION" }
            ];

            tableData = _.zip(data[key].object_1Value, data[key].object_2Value);
            let dataToMap = []

            if (data[key].object_1Value) {
                dataToMap = data[key].object_1Value;
            } else if (data[key].object_2Value) {
                dataToMap = data[key].object_2Value
            }

            gridData = dataToMap.map((obj, index) => {
                let object = JSON.parse(JSON.stringify(dataToMap[index]))
                if (this.state.comparison) {
                    //  let checkEquality = _.isEqual(data[key].object_1Value[index], data[key].object_2Value[index]);
                    let checkEquality = false;
                    if (data[key].object_1Value && data[key].object_2Value) {
                        checkEquality = _.isEqual(data[key].object_1Value[index], data[key].object_2Value[index]);
                    }

                    if (checkEquality) {
                        object.status = {
                            value: 'Matched',
                            type: 'SUCCESS'
                        };
                    } else {
                        mismatchCounter.push(1);
                        object.status = {
                            value: 'Mismatch',
                            type: 'ERROR'
                        };
                    }
                }
                if(object){
                    object.actions = actions;
                }
                return object
            })
            gridData = gridData.filter(obj => {
                if(obj){
                    return obj;
                }
            })
            dataView.push(tableView(gridColumns, gridData, this.actionHandler));
            console.log("tableData" , tableData)
            this.setState({
                tableObjectData: data,
                tableData: tableData
            })
        
    }


    /* createView: function that starts the iteration on the data objects/object */
    createView = (data, dataView, mismatchCounter, index = 0, trailKey = [], fieldType = null) => {
        let keys = Object.keys(data);
        const keyMapper = (keys) => {
            keys.map(key => {
                if (data[key].type == 'string' || data[key].type == 'decimal') {

                    if (index == 0) {
                        if (this.state.object_2 && !this.state.object_1) {
                            dataView.unshift(headerOCR())
                        } else
                            if (this.state.comparison) {
                                dataView.unshift(headerMisMatch())
                            }
                    }
                    index = index + 1;
                    if (this.state.comparison) {
                        this.comparisonView(data, key, dataView, mismatchCounter, trailKey, fieldType);
                    } else {
                        this.showValueView(data, key, dataView);
                    }
                }
                else if (data[key].type == 'object' || data[key].type == 'Object') {
                    if (index == 0) {
                        if (this.state.object_2 && !this.state.object_1) {
                            dataView.unshift(headerOCR())
                        } else
                            if (this.state.comparison) {
                                dataView.unshift(headerMisMatch())
                            }
                    }
                    trailKey.push(data[key].mapping)
                    index = index + 1;
                    this.createView(data[key].subFields, dataView, mismatchCounter, index, trailKey, "object");
                } else if (data[key].type == 'array') {
                    this.arrayView(data, key, dataView, mismatchCounter)
                }
            })
        }
        keyMapper(keys)
        return {
            count: mismatchCounter.length,
            dataView
        }
    }

    /* iterateObject: functions that we pass the array to start the iteration */
    iterateObject(mappedData) {
        let countArray = [];
        let view = mappedData.map(obj => {
            let { dataView, count } = this.createView(obj, [], []);
            countArray.push(count)
            return dataView;
        })
        return {
            view,
            mismatchCount: countArray
        }
    }

    /* changeTab: change the tab view */
    changeTab = (index) => {
        this.setState({
            activeTable: index
        })
    }
    /* close modal */
    closeModal = () => {
        this.setState({
            isOpen: false
        })
    }


    updateInvoiceImageIndex(status){
        if(status){
            let index = this.state.invoiceImageIndex + 1; 
            if(index >= this.state.invoiceImagesNamesList.length){
                alert("No more images next");
            } else {
                this.setState({
                    invoiceImageIndex : index
                }) 
            }
        } else {
            let index = this.state.invoiceImageIndex - 1; 
            if(index < 0){
                alert("No more images prev");
            } else {
                this.setState({
                    invoiceImageIndex : index
                }) 
            }
        }
    }

//    async downloadInvoiceImage() {
//        console.log("ma yaha pa aya");
//         try{
//             this.props.actions.generalAjxProcess(`${constants.downloadInvoice}${this.state.invoiceImagesNamesList[this.state.invoiceImageIndex]}`, {})
//             // document.getElementById('invoiceImage').src = `${this.props.actions.generalAjxProcess(`${constants.downloadInvoice}${this.state.invoiceImagesNamesList[this.state.invoiceImageIndex]}`, {})}`
//         }catch(err){
//             console.log("image erro is here", err);
//             return null  
//         }
//         // this.props.actions.generalAjxProcess(`${constants.downloadInvoice}${this.state.invoiceImagesNamesList[this.state.invoiceImageIndex]}`, {}).then(res => {
//         //     document.getElementById('invoiceImages').src=res
//         // }).catch(err => {
//         //     console.log("image erro is here", err);         
//         // });
//     }



    addCustomTabs() {

        console.log("add custom tttttttttttttttttttttttttttttttttttttttttttttttttttttt"); 
        // if(this.state.customTabsMapped  == 0){
            let view = this.state.sectionView
            let sections = this.state.sections;
            this.state.customTabs.map(obj => {
                if (obj.position == 'top') {
                    view.unshift([obj.view]);
                    sections.unshift(obj.section)
                } else if (obj.position == 'bottom') {
                    view.push([obj.view]);
                    sections.push(obj.section)
                }
            })
            let customTabsMapped = this.state.customTabsMapped + 1
            this.setState({
                sectionView: view,
                sections: sections, 
                customTabsMapped : customTabsMapped
            })
        // }
    }

    /* render function */
    render() {
        console.log(this.props.batchDetail);
        if (!this.state.isLoading) {

            let checkOcrCase = this.state.object_1 ? true : false;

            return (
                <div className="row">
                    <div className="col-md-12">
                        <div className="tab-pane in active">
                            <div className="col-md-12">
                                <div className="tab-pane in active invoice-detail-tabs">
                                    <div style={{paddingTop: '0px'}} className=" tabbable-line boxless">
                                        {/* ui-regulartabs */}
                                        <ul id="adHocTabs" className="nav nav-tabs">
                                            {
                                                this.state.sections.map((section, index) => {
                                                    return (<li id="filtersTabLink" className={index === this.state.activeTable ? 'active' : ''}>
                                                        <a href={'#' + index} onClick={() => this.changeTab(index)} data-toggle="tab">
                                                            <span> {section.name}
                                                                {
                                                                    this.state.comparison && this.state.missMatchCount[index] != 0 && checkOcrCase ? ` (${this.state.missMatchCount[index]})` : null

                                                                }

                                                            </span>
                                                        </a>
                                                    </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                    <div className="tab-content ui-tabcontentbody filetabs" style={{ minHeight: "350px" }}>
                                        {this.state.sectionView.map((section, index) => {
                                            let displayImage = this.state.sections[index].displayImage ? this.state.sections[index].displayImage : false;
                                            let applyClass;

                                            if (this.state.showImage && this.props.submitType) {

                                                applyClass = this.state.showImage && this.props.submitType ? "col-md-5" : "col-md-11"
                                            }
                                            if (this.state.showImage && this.state.sections[index].name == 'ProductLines') {
                                                applyClass = "col-md-12"
                                            }
                                            if (this.state.showImage == false && this.props.submitType == true &&
                                                this.state.sections[index].name != 'ProductLines') {
                                                applyClass = "col-md-11"
                                            }
                                            if (this.state.sections[index].name == 'Summary') {
                                                // applyClass = this.state.showImage && this.state.sections[index].name != 'Summary' ? 'col-md-6' : 'col-md-12'
                                                applyClass = 'col-md-12'
                                            }
                                            if (this.state.sections[index].name == 'Logo' || this.state.sections[index].name == 'Duplicate') {
                                                applyClass = 'col-md-12'
                                            }
                                            if (!this.props.submitType && (this.state.sections[index].name == 'Buyer' || this.state.sections[index].name == 'Invoice' || this.state.sections[index].name == 'Supplier')) {
                                                applyClass = 'col-md-6'
                                            }

                                            return (
                                                <div id={'#' + index} className={index === this.state.activeTable ? "tab-pane active in ui-fieldtable" : "tab-pane in ui-fieldtable"}>
                                                    <div className="row miss-match-panel">
                                                        {displayImage ?
                                                            // <div className={!this.state.showImage ? 'hide' : 'col-md-6'}>
                                                            //     {this.props.batchDetail && this.props.batchDetail.data && this.props.batchDetail.data.images ? 
                                                            //     this.props.batchDetail.data.images.map(img => {
                                                            //         if (img.imageType == "INVOICE") {
                                                            //         return (
                                                            //             <img
                                                            //         src={`${constants.ipfsGet}${img.hash}`}
                                                            //         width="100%"
                                                            //     />
                                                            //         )
                                                            //     }
                                                            //     })
                                                            //       : 
                                                            //       <embed src={`${baseUrl}/images/${this.state.fileHash}.pdf`} width="500" height="675" />
                                                            //       /* <embed src={'http://10.0.229.147:9085/images/GULF%20READYMADE%207.pdf'} width="500" height="475" /> */
                                                            //     } 
                                                            // </div>


                                                            <div className={!this.state.showImage ? 'hide' : 'col-md-6'}>
                                                                <div className="col-md-3 noti-col-div-invoice">
                                                                    <div id="d3" className="left-toggle-button-ntofi">
                                                                        <span onClick={() => this.updateInvoiceImageIndex(false)}>
                                                                            {"<"}
                                                                        </span>
                                                                    </div>
                                                                    <div className="ntofi-count">
                                                                        <span> {`${this.state.invoiceImageIndex + 1}`} </span>
                                                                    </div>
                                                                    <div id="d3" className="right-toggle-button-ntofi">
                                                                        <span onClick={() => this.updateInvoiceImageIndex(true)}>
                                                                            {">"}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <br /><br /><br />

                                                                {this.state.invoiceImagesNamesList[this.state.invoiceImageIndex]
                                                                ? 
                                                                <img
                                                                id={'invoiceImage'}
                                                                src= {`${constants.downloadInvoice}${this.state.invoiceImagesNamesList[this.state.invoiceImageIndex]}`} 
                                                                    width="100%"
                                                                />
                                                                : 
                                                                
                                                                <img
                                                                id={'invoiceImage'}
                                                                src= {`../../../assets/imgs/no-image-found.png`} 
                                                                    width="100%"
                                                                />
                                                                }

                                                               
                                                            </div>

                                                            : null}
                                                        {this.props.submitType == true && (index == 0 || index == 1 || index == 2) ?

                                                            <div className="col-md-1 image-toggler" onClick={() => this.collapseImage(this.state.showImage)}>
                                                                <img src="/assets/layouts/layout2/img/expand.png" className="expandImg" />
                                                            </div> : ''
                                                        }
                                                        <div className={applyClass}>
                                                            {
                                                                section.map(myView => {
                                                                    return myView
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    {this.props.submitType ? <button style={{ bottom: '60px', right: '75px', position: 'absolute' }}
                                        onClick={this.onSublmit}
                                        className="btn default" type="submit">Submit</button> : ''}
                                </div>
                            </div>
                            <ModalBox isOpen={this.state.isOpen}>
                                <Portlet title={utils.getLabelByID("ProductLine")} isPermissioned={true}>
                                    <div className="row" >
                                        <div className="col-md-12">
                                            {this.state.modalView.map(myView => {
                                                return myView
                                            })}
                                        </div>
                                        {this.props.submitType ? <button style={{ bottom: '60px', right: '75px', position: 'absolute' }}
                                            onClick={this.onSublmit}
                                            className="btn default" type="submit">Submit</button> : ''}

                                        <button style={{ bottom: '60px', right: '75px', position: 'absolute' }}
                                            onClick={this.closeModal}
                                            className="btn default" type="submit">Close</button>
                                    </div>

                                </Portlet>
                            </ModalBox>


                        </div>
                    </div>
                </div>


            );
        } else {
            return (<div className="loader-container"><div className="loader">isLoading...</div></div>)
        }
    }
}

function mapStateToProps(state, ownProps) {
    return {
        typeData: _.get(state.app, "typeData.data", null),
        blockchainResponse: _.get(state.app, "blockchainResponse", null),
        getInvoiceImageList: _.get(state.app, "getInvoiceImageList", null),
    };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DynamicViewCreator);
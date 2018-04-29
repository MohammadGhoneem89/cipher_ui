import React from 'react';
import * as constants from '../constants/Communication.js';
import { baseUrl } from '../constants/Communication.js';
import { browserHistory } from 'react-router';
import * as utils from '../common/utils.js';
import * as dates from '../common/dates.js';


class TableCell extends React.Component {
    constructor() {
        super();

    }

    getClassForStatus(type) {

        switch (type) {
            case "INFO":
                return "badge badge-primary badge-roundless";
            case "ERROR":
                return "badge badge-danger badge-roundless";
            case "WARNING":
                return " badge badge-warning badge-roundless";


            default:
                return "badge badge-success badge-roundless";
        }
    }

    getClassForOverdue(type) {

        switch (type) {
            case "INFO":
                return "";
            case "ERROR":
                return "danger";
            case "WARNING":
                return "warning";


            default:
                return "";
        }
    }

    renderIcon(type) {
        switch (type) {
            case "Error":
                return (
                    <span className={"label label-sm label-danger"}>
                        <i className="fa fa-bell-o" />
                    </span>
                );
            case "Info":
                return (
                    <span className={"label label-sm label-info"}>
                        <i className="fa fa-bell-o" />
                    </span>
                );
            case "Warning":
                return (
                    <span className={"label label-sm label-warning"}>
                        <i className="fa fa-bell-o" />
                    </span>
                );
            default:
                return (
                    <span className={"label label-sm label-success"}>
                        <i className="fa fa-bell-o" />
                    </span>
                );

        }


    }

    renderActionButton(cellData) {

        if (cellData == null)
            return ''

        if (cellData && cellData.actionType === "modal") {
            return (<a href="javascript:;" data-toggle="modal" data-target={cellData.URI[0]}
                data-id={this.props.rowData[this.props.recordID]}
                onClick={this.renderPopupBody.bind(this, this.props.rowData[this.props.recordID])}>
                <i className={cellData.iconName} /> {cellData.label} </a>);
        }
        else if (cellData && cellData.actionType === "COMPONENT_FUNCTION") {

            return (<a href="javascript:;"
                onClick={this.props.componentFunction && this.props.componentFunction.bind(this, {
                    index: this.props.rowIndex,
                    actionName: cellData.label
                })}>
                <i className={cellData.iconName} /> {cellData.label} </a>);
        }
        else {
            // return (<a href="javascript:;" onClick={this.getMenuitem.bind(this,  cellData.actionURI + this.props.rowData[this.props.recordID])}>
            return (<a href="javascript:;"
                onClick={this.getMenuitem.bind(this, cellData.URI[0] + this.props.rowData[this.props.recordID])}>
                <i className={cellData.iconName} /> {cellData.label} </a>);


        }
    }

    renderHyperLinkField(cellData) {

        return (<a href={this.props.url + "/" + cellData}>
            {cellData} </a>);
    }

    renderPopupBody(dataID) {

        this.props.renderPopupBody(dataID);


        //$(".modal-body #hiddenValue").val(modalDataID);

    }

    getCheckedItems(element) {
        this.props.getCheckedItems(element.ID, element.checked)
    }


    renderDownloadAttachement(name, UUID) {

        return (<a href={constants.getUploadedFile + "/" + UUID+"?JWT="+sessionStorage.token} download>
            {name} </a>);

    }


    getMenuitem(index) {
        browserHistory.push(index);
    }

    processRowData(columnElement, type) {
        console.log("columnElement:" + columnElement);
        console.log("type:" + type);

        switch (type) {
            case "action":
                return "";
            case "statusLabel":
                return columnElement.value;
            default:
                return columnElement;


        }
    }

    renderActions(cellData) {


        if (cellData.length > 0) {
            return (
                <td>
                    <div className="actions">
                        <div className="btn-group">
                            <a className="btn white btn-circle btn-sm" href="javascript:;" data-toggle="dropdown"
                                data-hover="dropdown" data-close-others="true" aria-expanded="false"> <i
                                    className="fa fa-ellipsis-h" aria-hidden="true"></i> </a>

                            <ul className="dropdown-menu pull-right" role="menu">

                                {
                                    cellData.map((cellData, index) => (
                                        <li key={index.toString()}>
                                            {this.renderActionButton(cellData)}
                                        </li>
                                    ))}

                            </ul>
                        </div>
                    </div>
                </td>
            )
        }
        else
            return (<td>N/A</td>)
    }

    render() {
        let cellData;
        switch (this.props.type) {

            case "action":
                cellData = this.props.cellData ? this.props.cellData : [];
                return (
                    this.renderActions(cellData)
                );
            case "dateTime":
                let fullDate = new Date(this.props.cellData);
                let dd = fullDate.getDate();
                let mm = fullDate.getMonth() + 1; //January is 0!
                let yyyy = fullDate.getFullYear();
                if (dd < 10) {
                    dd = '0' + dd;
                }
                if (mm < 10) {
                    mm = '0' + mm;
                }
                let today = dd + '/' + mm + '/' + yyyy;
                return (<td>{today}</td>);
            case "statusLabel":
                return (<td><span
                    className={this.getClassForStatus(this.props.cellData.type)}
                    style={{ fontSize: "13px!important", height: "16x" }}>{this.props.cellData.value}</span></td>);
            case "overDueLabel":
                return (<td className={this.getClassForOverdue(this.props.cellData.type)}><span
                    style={{ fontSize: "13px!important" }}>{this.props.cellData.value}</span></td>);
            case "image":
                return (<td className="ent_nme" style={{ width: this.props.columnWidth }}><img
                    width="28px" height="28px"
                    src={baseUrl + (this.props.cellData.imageURL || "/images/blank.png")} /> &nbsp;&nbsp; {"   " + this.props.cellData.name}
                </td>);
            case "statusLabelBig":
                return (<td><span
                    className={this.getClassForStatus(this.props.cellData.type)}
                    style={{ fontSize: '30px', height: "38px" }}>{this.props.cellData.value}</span></td>);
            case "imageBig":
                return (<td className="ent_nme" align="center" style={{ width: this.props.columnWidth, paddingLeft: "50%" }}><img
                    width="50px" height="50px" style={{ width: "50px", height: "50px" }}
                    src={baseUrl + this.props.cellData.imageURL} /> &nbsp;&nbsp; <b> {"   " + this.props.cellData.name} </b>
                </td>);
            case "stringBig":
                return (<td> <font style={{ fontSize: "30px" }}>{this.props.cellData}</font> </td>);
            case "icon":
                return (<td>{this.renderIcon(this.props.cellData)}</td>);
            case "cb":
                return (<td><label
                    className="mt-checkbox mt-checkbox-single mt-checkbox-outline"><input type="checkbox"
                        className="checkboxes"
                        value={this.props.rowData[this.props.recordID]} /><span /></label>
                </td>);
            case "cbDisabled":
                return (<td><label
                    className="mt-checkbox mt-checkbox-single mt-checkbox-outline"><input type="checkbox" disabled
                        className="checkboxes"
                        checked={this.props.cellData} /><span /></label>
                </td>);
            case "downloadAttachement":
                cellData = this.props.cellData ? this.props.cellData : {};
                return (
                    <td className="text-center">
                        {this.renderDownloadAttachement(cellData.name, cellData.UUID)}
                    </td>
                );
            case "array":
                return (
                    <td className="text-center">
                        {this.props.cellData.toString()}
                    </td>
                );
            case "hiddenID":
                return null;
            case "amount":
                return (<td style={{ textAlign: "right" }}> {utils.formatAmountField(this.props.cellData)}</td>);
            case "rightAlign":
                return (<td style={{ textAlign: "right" }}> {this.props.cellData}</td>);
            case "leftAlign":
                return (<td style={{ textAlign: "left" }}> {this.props.cellData}</td>);
            case "serialNo":
                return (<td> {parseInt(this.props.searialNo) + "."}</td>);
            case "epochDate":
                return (<td> {utils.UNIXConvertToDate(this.props.cellData)}</td>);
            case "epochDate1":
                return (<td> {dates.MSddMMyyyy(this.props.cellData)}</td>);
            case "clpVal":
                return (<td><span className="clp_val">{this.props.cellData}</span></td>)
            case "hyperlink":
                return (<td><span>{this.renderHyperLinkField(this.props.cellData)}</span></td>)
            case "orgType":
                return (<td> {this.props.cellData === "E" ? "Entity" : "Acquirer"} </td>);
            case "errors":
                let cellData = this.props.cellData.toString().replace(/ *, */g, '\n').split('\n').map((item, i) => {
                    return (<span key={i}>{item}<br /></span>);
                });

                return (<td> {cellData} </td>);
            default:
                return (<td> {this.props.cellData} </td>);

        }

    }
}

export default TableCell;


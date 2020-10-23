import React from 'react';
import * as constants from '../constants/appCommunication';
import { baseUrl } from '../constants/appCommunication';
import { browserHistory } from 'react-router';
import * as utils from '../../../core/common/utils';
import * as dates from '../../../core/common/dates';
import _, { constant } from 'lodash';



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

  getClassForStatusLabel(type) {
    switch (type) {
      case "Alive" || "Reachable" || "LINK UP":
        return " badge badge-success badge-roundless";
      case "INITIATED":
        return "badge badge-info badge-roundless";
      case "REJECTED":
        return "badge badge-danger badge-roundless";
      case "PENDING":
        return "badge badge-warning badge-roundless";
      case "Pending":
        return "badge badge-warning badge-roundless";
      case "CORRECTED":
        return " badge badge-success badge-roundless";
      case "CORRECT":
        return "badge badge-success badge-roundless";
      case "Processed":
        return "badge badge-success badge-roundless";
      case "ACCEPTED":
        return "badge badge-primary badge-roundless";
      case "PROBLEM":
        return "badge badge-danger badge-roundless";
      case "Inactive":
        return "badge badge-danger badge-roundless";
      case "Reconciled":
        return " badge badge-success badge-roundless";
      case "Not Reconciled":
        return " badge badge-danger badge-roundless";
      case "FINALIZED":
        return " badge badge-warning badge-roundless";
      case "HAWB CREATED":
        return " badge badge-warning badge-roundless";
      case "EXPORT CLEARED":
        return " badge badge-warning badge-roundless";
      case "DELIVERED":
        return " badge badge-success badge-roundless";
      case "RETURN BY CUSTOMER":
        return " badge badge-warning badge-roundless";
      case "UNDELIVERED":
        return " badge badge-danger badge-roundless";
      case "IMPORT CLEARED":
        return " badge badge-warning badge-roundless";
      case "PARTIAL RETURN":
        return " badge badge-success badge-roundless";
      case "FULL RETURN":
        return " badge badge-success badge-roundless";
      default:
        return " badge badge-danger badge-roundless";

    }
  }
  // Reconciled

  getClassForStatusBig(type) {
    switch (type) {
      case "INFO":
        return "label label-primary";
      case "ERROR":
        return "label label-danger";
      case "WARNING":
        return " label label-warning";
      default:
        return "label label-success";
    }
  }

  getClassForOverdue(type) {

    switch (type) {
      case "INFO":
        return "info";
      case "ERROR":
        return "danger";
      case "WARNING":
        return "warning";


      default:
        return "success";
    }
  }

  getCriticalWarnStatus(type){
    switch (type) {
      case "critical":
        return "#FF0000";
      case "warn":
        return "#FFCC00";
      default:
        return '';
    }
  }

  getClassForStatusLabel_Updated(type) {
    switch (type.toUpperCase()) {
      case "EXIT":
        return "badge badge-warning badge-roundless";
      case "DECLARED":
        return "badge badge-warning badge-roundless";
      case "TRANSPORTED":
        return "badge badge-warning badge-roundless";
      case "INITIATED":
        return "badge badge-success badge-roundless";
      case "CLEARED":
        return "badge badge-success badge-roundless";
      case "SUBMITTED":
        return "badge badge-success badge-roundless";
      case "DECLINED":
        return "badge badge-danger badge-roundless";
      case "RETURN_BY_CUSTOMER":
        return "badge badge-danger badge-roundless";
      case "REJECTED":
        return "badge badge-danger badge-roundless";
      case "FAIL DISPATCH":
        return "badge badge-danger badge-roundless";
      case "CANCELLED":
        return " badge badge-danger badge-roundless";
      case "DETAINED":
        return " badge badge-danger badge-roundless";
      case "SUSPEND":
        return " badge badge-danger badge-roundless";
      case "HAWB CREATED":
        return " badge badge-warning badge-roundless";
      case "EXPORT CLEARED":
        return " badge badge-warning badge-roundless";
      case "DELIVERED":
        return " badge badge-success badge-roundless";
      case "RETURN BY CUSTOMER":
        return " badge badge-danger badge-roundless";
      case "UNDELIVERED":
        return " badge badge-danger badge-roundless";
      case "FINALIZED":
        return " badge badge-success badge-roundless";
      case "IMPORT CLEARED":
        return " badge badge-warning badge-roundless";
      case "PARTIAL RETURN":
        return " badge badge-warning badge-roundless";
      case "FULL RETURN":
        return " badge badge-warning badge-roundless";
      case "CLEARANCE SUBJECT TO INSPECTION":
        return " badge badge-warning badge-roundless";
      case "RELEASE FOR INSPECTION":
        return " badge badge-warning badge-roundless";
      case "CLEARANCE SUBJECT TO INSPECTION":
        return " badge badge-warning badge-roundless";  
      case "RET_TRANSPORTED":
        return " badge badge-warning badge-roundless";
      case "RET_DECLARED":
        return " badge badge-warning badge-roundless";
        
      
      default:
        return " badge badge-danger badge-roundless";

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
      let url = cellData.URI[0] + '/' + this.props.rowData[this.props.recordID];
      url = url.replace('//', '/');//to avoid double slash
      // return (<a href="javascript:;" onClick={this.getMenuitem.bind(this,  cellData.actionURI + this.props.rowData[this.props.recordID])}>
      return (<a href="javascript:"
        onClick={this.getMenuitem.bind(this, url)}>
        <i className={cellData.iconName} /> {cellData.label} </a>);


    }
  }

  redirectAnchor(address) {
    browserHistory.push(address)
  }
  openInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
  }
  renderHyperLinkFieldNewTab(cellData) {
    //console.log(this.props.url + "/" + cellData);
    return (<a href='javascript:void(0)' onClick={this.openInNewTab.bind(this, this.props.url + "/" + cellData)}>
      {cellData} </a>);
  }
  renderHyperLinkField(cellData) {
    //console.log(this.props.url + "/" + cellData);
    return (<a href='javascript:void(0)' onClick={this.redirectAnchor.bind(this, this.props.url + "/" + cellData)}>
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

    return (<a href={constants.getUploadedFile + "/" + UUID + "?JWT=" + sessionStorage.token} download>
      {name} </a>);

  }


  getMenuitem(index) {
    browserHistory.push(index);
  }

  onChangeEditColumn(index, e) {
    alert(index)
    alert(e.target.value)
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
                data-hover="dropdown" data-close-others="true" aria-expanded="false">
                <i className="fa fa-ellipsis-h"
                  aria-hidden="true" /> </a>

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
    function text_truncate(str, length, ending) {
      if (length == null) {
        length = 100;
      }
      if (ending == null) {
        ending = '...';
      }
      if (str.length > length) {
        return str.substring(0, length - ending.length) + ending;
      } else {
        return str;
      }
    }


    let cellData;
    let fontWeightStyle = this.props.footerRow ? 'bold' : 'normal'
    switch (this.props.type) {

      case "action":
        cellData = this.props.cellData ? this.props.cellData : [];
        return (this.renderActions(cellData));
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
          style={{ fontSize: "15px!important" }}>{this.props.cellData.value}</span></td>);
      case "image":
        if (this.props.url) {
          return (<td className="ent_nme" style={{ width: this.props.columnWidth }}><img
            width="28px" height="28px"
            src={baseUrl + (this.props.cellData.imageURL || "/images/blank.png")} /> &nbsp;&nbsp; <a
              href={this.props.url + '/' + this.props.rowData[this.props.recordID]}>{"   " + this.props.cellData.name}</a>
          </td>);
        }
        else {
          return (<td className="ent_nme" style={{ width: this.props.columnWidth }}><img
            width="28px" height="28px"
            src={baseUrl + (this.props.cellData.imageURL || "/images/blank.png")} /> &nbsp;&nbsp; {"   " + this.props.cellData.name}
          </td>);
        }
      case "statusBox":
        return (<td><span className={this.getClassForStatusLabel_Updated(this.props.cellData)}
        >{this.props.cellData.toUpperCase()}</span></td>);
      case "statusLabelBig":
        return (<td><h3><span className={this.getClassForStatusBig(this.props.cellData.type)}
          style={{ height: "20px" }}>{this.props.cellData.value}</span></h3></td>);
      case "editableColumn":
        return (<td><input type="text" className="form-control" value={this.props.cellData.value} onChange={this.onChangeEditColumn.bind(this, this.props.searialNo)} /></td>);
      case "imageBig":
        return (<td className="ent_nme" align="center" style={{ width: this.props.columnWidth, paddingLeft: "50%" }}><img
          width="50px" height="50px" style={{ width: "50px", height: "50px" }}
          src={baseUrl + this.props.cellData.imageURL} /> &nbsp;&nbsp; <b> {"   " + this.props.cellData.name} </b>
        </td>);
      case "stringBig":
        return (<td className="ent_nme caption-subject font-black bold ">
          <h4> {utils.getLabelByID(this.props.cellData) || this.props.cellData}</h4></td>);
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
        return (<td style={{
          textAlign: "right",
          fontWeight: fontWeightStyle
        }}> {utils.formatAmountField(this.props.cellData)}</td>);
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
      case "hyperlinkNewTab":
        return (<td><span>{this.renderHyperLinkFieldNewTab(this.props.cellData)}</span></td>)
      case "orgType":
        return (<td> {this.props.cellData === "E" ? "Entity" : "Acquirer"} </td>);
      case "errors":
        let cellData = this.props.cellData.toString().replace(/ *, */g, '\n').split('\n').map((item, i) => {
          return (<span key={i}>{item}<br /></span>);
        });

        return (<td style={{ fontWeight: fontWeightStyle }}> {cellData} </td>);
      case "longString":
        let temp = text_truncate(this.props.cellData, 100);
        return <td style={{ fontWeight: fontWeightStyle }}>
          <a href="javascript:" onClick={this.renderPopupBody.bind(this, this.props.cellData)}> {temp}</a>
        </td>;
      case "criticalWarn":
        console.log("Condition criticalWarn");
        if(this.getCriticalWarnStatus(this.props.cellData.type) !== ""){
          return (<td style={{ fontSize:"12px", color:"white", width: this.props.columnWidth, backgroundColor:this.getCriticalWarnStatus(this.props.cellData.type)}}>
                    {this.props.cellData.value}
                  </td>);
        }
        else{
          return (<td style={{ fontSize:"12px", width: this.props.columnWidth}}>
                    {this.props.cellData.value}
                  </td>);
        }
        
      case "actionCustom":
        console.log("actionCustom");
        temp = text_truncate(this.props.cellData.errorDescription, 20);
        if(temp !== "-"){
          return (<td style={{fontWeight: "normal", width: this.props.columnWidth}} onClick={()=>this.props.cellData.action(this.props.cellData.errors)}>
                {temp}</td>);
        }
        else if(temp !== "-"){
          return (<td style={{fontWeight: "normal", width: this.props.columnWidth}} onClick={()=>this.props.cellData.action(this.props.cellData.errors)}>
                {temp}</td>);
        }        
      
      case "stringCustom":
        console.log("actionCustom");
        return (
          <td style={{fontSize: "10px", width: this.props.columnWidth}}><span style={{color:"#ae8b4b"}}>{this.props.cellData.orderNo}</span><br/><span style={{color:"black"}}>{this.props.cellData.invoiceNo}</span> - <span style={{color:"grey"}}>{this.props.cellData.declarationNo}</span> </td>
        )

      case "imageCustom":
      if (this.props.url) {
        return (<td className="ent_nme" style={{ width: this.props.columnWidth }}><img
          width="28px" height="28px"
          src={(this.props.cellData.imageURL || "/images/blank.png")} /> &nbsp;&nbsp; <a
            href={this.props.url + '/' + this.props.rowData[this.props.recordID]}>{"   " + this.props.cellData.name}</a>
        </td>);
      }
      else {
        return (<td className="ent_nme" style={{ width: this.props.columnWidth }}><img
          width="28px" height="28px"
          src={(this.props.cellData.imageURL || "/images/blank.png")} /> &nbsp;&nbsp; {"   " + this.props.cellData.name}
        </td>);
      }
      default:
        return (<td style={{ fontWeight: fontWeightStyle }}> {_.upperFirst(this.props.cellData)} </td>);

    }

  }
}

export default TableCell;

